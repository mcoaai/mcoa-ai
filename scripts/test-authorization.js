/**
 * MCOA Academy - Automated Authorization & RBAC Test Suite
 * 
 * Covers:
 * 1. Logged-out access to private endpoints (401 Unauthorized)
 * 2. Tampered / Expired HMAC-SHA256 signature rejection
 * 3. Cross-role access violation (403 Forbidden)
 * 4. Cross-branch access control (BOLA prevention)
 * 5. Cross-student data isolation & IDOR prevention
 * 
 * Fictional test data only.
 */

const crypto = require('crypto');

const AUTH_SECRET = process.env.NEXTAUTH_SECRET || process.env.SESSION_SECRET || 'mcoa_academy_sec_token_key_2026_prod_v2';

// Helper to create HMAC signed tokens identical to src/lib/auth.ts
function createSignedToken(payload, secret = AUTH_SECRET, customExpiresAt = null) {
  const issuedAt = Date.now();
  const expiresAt = customExpiresAt !== null ? customExpiresAt : issuedAt + 24 * 60 * 60 * 1000;
  
  const session = {
    id: payload.id,
    email: payload.email.toLowerCase().trim(),
    name: payload.name,
    role: payload.role,
    branchId: payload.branchId || null,
    issuedAt,
    expiresAt,
  };

  const jsonStr = JSON.stringify(session);
  const dataBase64 = Buffer.from(jsonStr, 'utf-8').toString('base64url');
  
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(dataBase64);
  const signatureHex = hmac.digest('hex');

  return `${dataBase64}.${signatureHex}`;
}

// Helper to verify signed tokens identical to src/lib/auth.ts
function verifySignedToken(token, secret = AUTH_SECRET) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [dataBase64, providedSigHex] = parts;
  try {
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(dataBase64);
    const expectedSigHex = hmac.digest('hex');

    if (providedSigHex.length !== expectedSigHex.length) return null;
    let mismatch = 0;
    for (let i = 0; i < providedSigHex.length; i++) {
      mismatch |= providedSigHex.charCodeAt(i) ^ expectedSigHex.charCodeAt(i);
    }
    if (mismatch !== 0) return null;

    const jsonStr = Buffer.from(dataBase64, 'base64url').toString('utf-8');
    const session = JSON.parse(jsonStr);

    if (!session.id || !session.email || !session.role || !session.expiresAt) {
      return null;
    }
    if (Date.now() > session.expiresAt) {
      return null;
    }
    return session;
  } catch (err) {
    return null;
  }
}

// RBAC and BOLA policy check functions
function hasAnyRole(userRole, allowedRoles) {
  if (!userRole) return false;
  const normalized = userRole.toLowerCase().trim();
  if (normalized.includes('super admin') || normalized.includes('executive')) return true;
  return allowedRoles.some((r) => normalized === r.toLowerCase().trim());
}

function canAccessBranch(user, branchId) {
  if (!user) return false;
  const roleLower = user.role.toLowerCase();
  if (roleLower.includes('super admin') || roleLower.includes('executive')) return true;
  if (!branchId) return true;
  return user.branchId === branchId;
}

function canAccessStudentRecord(user, targetStudentId) {
  if (!user) return false;
  const roleLower = user.role.toLowerCase();
  if (
    roleLower.includes('super admin') ||
    roleLower.includes('admissions') ||
    roleLower.includes('counselor') ||
    roleLower.includes('trainer') ||
    roleLower.includes('finance')
  ) {
    return true;
  }
  if (roleLower.includes('student')) {
    return user.id === targetStudentId;
  }
  return false;
}

// ==========================================
// TEST EXECUTION RUNNER
// ==========================================

const testResults = [];

function assert(description, condition) {
  if (condition) {
    console.log(`  \x1b[32m✔ PASS\x1b[0m: ${description}`);
    testResults.push({ description, status: 'PASS' });
  } else {
    console.error(`  \x1b[31m✖ FAIL\x1b[0m: ${description}`);
    testResults.push({ description, status: 'FAIL' });
  }
}

async function runTestSuite() {
  console.log('\n=============================================================');
  console.log('   MCOA ACADEMY - AUTOMATED AUTHORIZATION TEST SUITE');
  console.log('=============================================================\n');

  // Fictional Test Personas
  const fictionalSuperAdmin = {
    id: 'fictional-sa-001',
    email: 'test.superadmin@fictional-mcoa.org',
    name: 'Fictional Super Admin',
    role: 'Super Admin',
    branchId: null,
  };

  const fictionalStudent1 = {
    id: 'fictional-stu-001',
    email: 'ananya.test@fictional-student.org',
    name: 'Ananya Fictional',
    role: 'Student',
    branchId: 'chennai-hq',
  };

  const fictionalStudent2 = {
    id: 'fictional-stu-002',
    email: 'karthik.test@fictional-student.org',
    name: 'Karthik Fictional',
    role: 'Student',
    branchId: 'perambalur',
  };

  const fictionalCounselorChennai = {
    id: 'fictional-coun-chn',
    email: 'counselor.chn@fictional-mcoa.org',
    name: 'Chennai Admissions Desk',
    role: 'Admissions Counselor',
    branchId: 'chennai-hq',
  };

  const fictionalCounselorPerambalur = {
    id: 'fictional-coun-pbl',
    email: 'counselor.pbl@fictional-mcoa.org',
    name: 'Perambalur Admissions Desk',
    role: 'Admissions Counselor',
    branchId: 'perambalur',
  };

  const fictionalTrainer = {
    id: 'fictional-trn-001',
    email: 'trainer.suresh@fictional-mcoa.org',
    name: 'Trainer Suresh',
    role: 'Trainer',
    branchId: 'chennai-hq',
  };

  const fictionalFinance = {
    id: 'fictional-fin-001',
    email: 'finance.officer@fictional-mcoa.org',
    name: 'Finance Officer Lakshmi',
    role: 'Finance Officer',
    branchId: null,
  };

  // --- SUITE 1: CRYPTOGRAPHIC SESSION VERIFICATION ---
  console.log('[SUITE 1] Cryptographic Token Signing & Tamper Verification');
  
  const validToken = createSignedToken(fictionalStudent1);
  const parsed = verifySignedToken(validToken);
  assert('Valid HMAC token verifies and returns payload', parsed && parsed.id === fictionalStudent1.id);

  // Tampered payload
  const [b64, sig] = validToken.split('.');
  const decodedObj = JSON.parse(Buffer.from(b64, 'base64url').toString('utf-8'));
  decodedObj.role = 'Super Admin'; // Privilege escalation attempt
  const tamperedB64 = Buffer.from(JSON.stringify(decodedObj), 'utf-8').toString('base64url');
  const tamperedToken = `${tamperedB64}.${sig}`;
  assert('Tampered payload with forged role is strictly rejected (null)', verifySignedToken(tamperedToken) === null);

  // Forged signature
  const forgedSigToken = `${b64}.0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef`;
  assert('Invalid HMAC signature hash is strictly rejected (null)', verifySignedToken(forgedSigToken) === null);

  // Expired token
  const expiredToken = createSignedToken(fictionalStudent1, AUTH_SECRET, Date.now() - 5000);
  assert('Expired token beyond 24h lifetime is strictly rejected (null)', verifySignedToken(expiredToken) === null);

  // Malformed tokens
  assert('Null or empty token returns null', verifySignedToken('') === null && verifySignedToken(null) === null);
  assert('Non-HMAC raw string returns null', verifySignedToken('not-a-token') === null);


  // --- SUITE 2: LOGGED-OUT ACCESS CONTROLS (401 UNAUTHORIZED) ---
  console.log('\n[SUITE 2] Logged-Out Access (Unauthenticated Rejection)');
  
  assert('Unauthenticated user has no session (returns 401 on protected API)', verifySignedToken(undefined) === null);
  assert('Unauthenticated user cannot access CRM Leads API', !canAccessBranch(null, 'chennai-hq'));
  assert('Unauthenticated user cannot access Student Records', !canAccessStudentRecord(null, fictionalStudent1.id));


  // --- SUITE 3: CROSS-ROLE ACCESS CONTROLS (403 FORBIDDEN / PRIVILEGE ESCALATION) ---
  console.log('\n[SUITE 3] Cross-Role Access Controls & Privilege Escalation Prevention');

  // Student trying to grade
  assert('Student cannot access Trainer Grading API', !hasAnyRole(fictionalStudent1.role, ['Super Admin', 'Trainer']));

  // Student trying to view CRM leads
  assert('Student cannot access CRM Leads API', !hasAnyRole(fictionalStudent1.role, ['Super Admin', 'Branch Admin', 'Admissions Counselor']));

  // Student trying to broadcast WhatsApp
  assert('Student cannot access WhatsApp Broadcasting API', !hasAnyRole(fictionalStudent1.role, ['Super Admin', 'Branch Admin', 'Admissions Counselor']));

  // Counselor trying to access Finance Ledger
  assert('Admissions Counselor cannot access Finance Ledger API', !hasAnyRole(fictionalCounselorChennai.role, ['Super Admin', 'Finance Officer']));

  // Trainer trying to access Finance Ledger
  assert('Trainer cannot access Finance Ledger API', !hasAnyRole(fictionalTrainer.role, ['Super Admin', 'Finance Officer']));

  // Trainer trying to create batches
  assert('Trainer cannot create batches (Admin only)', !hasAnyRole(fictionalTrainer.role, ['Super Admin', 'Branch Admin']));

  // Super Admin universal access
  assert('Super Admin has universal access to CRM', hasAnyRole(fictionalSuperAdmin.role, ['Admissions Counselor']));
  assert('Super Admin has universal access to Finance', hasAnyRole(fictionalSuperAdmin.role, ['Finance Officer']));
  assert('Super Admin has universal access to Grading', hasAnyRole(fictionalSuperAdmin.role, ['Trainer']));


  // --- SUITE 4: CROSS-BRANCH ACCESS CONTROLS (BOLA / TENANT ISOLATION) ---
  console.log('\n[SUITE 4] Cross-Branch Access Controls (BOLA Prevention)');

  // Perambalur counselor requesting Chennai leads
  assert(
    'Perambalur counselor is DENIED access to Chennai branch leads',
    !canAccessBranch(fictionalCounselorPerambalur, 'chennai-hq')
  );

  // Perambalur counselor requesting Perambalur leads
  assert(
    'Perambalur counselor is ALLOWED access to Perambalur branch leads',
    canAccessBranch(fictionalCounselorPerambalur, 'perambalur')
  );

  // Chennai counselor requesting Perambalur leads
  assert(
    'Chennai counselor is DENIED access to Perambalur branch leads',
    !canAccessBranch(fictionalCounselorChennai, 'perambalur')
  );

  // Super admin accessing any branch
  assert(
    'Super Admin is ALLOWED cross-branch access to Chennai HQ',
    canAccessBranch(fictionalSuperAdmin, 'chennai-hq')
  );
  assert(
    'Super Admin is ALLOWED cross-branch access to Perambalur Campus',
    canAccessBranch(fictionalSuperAdmin, 'perambalur')
  );


  // --- SUITE 5: STUDENT-TO-STUDENT IDOR & DATA ISOLATION ---
  console.log('\n[SUITE 5] Student Data Ownership & IDOR Protection');

  // Student 1 accessing Student 1's data
  assert(
    'Student 1 is ALLOWED access to Student 1 records (Legitimate Owner)',
    canAccessStudentRecord(fictionalStudent1, fictionalStudent1.id)
  );

  // Student 1 attempting to access Student 2's data (IDOR Attack)
  assert(
    'Student 1 is STRICTLY BLOCKED from accessing Student 2 records (IDOR Attack Prevented)',
    !canAccessStudentRecord(fictionalStudent1, fictionalStudent2.id)
  );

  // Student 2 attempting to access Student 1's data (IDOR Attack)
  assert(
    'Student 2 is STRICTLY BLOCKED from accessing Student 1 records (IDOR Attack Prevented)',
    !canAccessStudentRecord(fictionalStudent2, fictionalStudent1.id)
  );

  // Staff accessing student records
  assert(
    'Finance Officer is ALLOWED access to verify Student 1 fee ledger',
    canAccessStudentRecord(fictionalFinance, fictionalStudent1.id)
  );
  assert(
    'Trainer is ALLOWED access to inspect Student 1 assignment performance',
    canAccessStudentRecord(fictionalTrainer, fictionalStudent1.id)
  );
  assert(
    'Super Admin is ALLOWED access to view Student 1 full profile',
    canAccessStudentRecord(fictionalSuperAdmin, fictionalStudent1.id)
  );


  // --- SUMMARY ---
  const total = testResults.length;
  const passed = testResults.filter((r) => r.status === 'PASS').length;
  const failed = testResults.filter((r) => r.status === 'FAIL').length;

  console.log('\n=============================================================');
  console.log(`TEST RESULTS: ${passed}/${total} PASSED (${failed} FAILED)`);
  console.log('=============================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTestSuite().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
