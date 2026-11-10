export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: string;
  branchId?: string | null;
  issuedAt: number;
  expiresAt: number;
}

export const ROLES = {
  SUPER_ADMIN: 'Super Admin',
  BRANCH_MANAGER: 'Branch Admin',
  COUNSELOR: 'Admissions Counselor',
  TRAINER: 'Trainer',
  STUDENT: 'Student',
  FINANCE: 'Finance Officer',
  PLACEMENT: 'Placement Officer',
} as const;

export type UserRole = typeof ROLES[keyof typeof ROLES] | string;

// Session secret with environment fallback
const AUTH_SECRET = process.env.NEXTAUTH_SECRET || process.env.SESSION_SECRET || 'mcoa_academy_sec_token_key_2026_prod_v2';
const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours

const encoder = new TextEncoder();

async function getCryptoKey(usage: 'sign' | 'verify') {
  return await crypto.subtle.importKey(
    'raw',
    encoder.encode(AUTH_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    [usage]
  );
}

/**
 * Sign session data using HMAC-SHA256
 */
export async function createSignedToken(payload: Omit<SessionUser, 'issuedAt' | 'expiresAt'> & { maxAgeMs?: number }): Promise<string> {
  const issuedAt = Date.now();
  const expiresAt = issuedAt + (payload.maxAgeMs || SESSION_MAX_AGE_MS);

  const sessionData: SessionUser = {
    id: payload.id,
    email: payload.email.toLowerCase().trim(),
    name: payload.name,
    role: payload.role,
    branchId: payload.branchId || null,
    issuedAt,
    expiresAt,
  };

  const jsonStr = JSON.stringify(sessionData);
  const dataBase64 = Buffer.from(jsonStr, 'utf-8').toString('base64url');

  const key = await getCryptoKey('sign');
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(dataBase64));
  const signatureHex = Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return `${dataBase64}.${signatureHex}`;
}

/**
 * Verify HMAC-SHA256 signature and expiration
 */
export async function verifySignedToken(token: string | undefined | null): Promise<SessionUser | null> {
  if (!token || typeof token !== 'string') return null;

  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [dataBase64, providedSigHex] = parts;

  try {
    const key = await getCryptoKey('sign');
    const expectedSigBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(dataBase64));
    const expectedSigHex = Array.from(new Uint8Array(expectedSigBuffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    // Constant-time length & comparison to prevent timing attacks
    if (providedSigHex.length !== expectedSigHex.length) return null;
    let mismatch = 0;
    for (let i = 0; i < providedSigHex.length; i++) {
      mismatch |= providedSigHex.charCodeAt(i) ^ expectedSigHex.charCodeAt(i);
    }
    if (mismatch !== 0) return null;

    const jsonStr = Buffer.from(dataBase64, 'base64url').toString('utf-8');
    const session: SessionUser = JSON.parse(jsonStr);

    // Validate structure
    if (!session.id || !session.email || !session.role || !session.expiresAt) {
      return null;
    }

    // Validate expiration
    if (Date.now() > session.expiresAt) {
      return null;
    }

    return session;
  } catch (err) {
    return null;
  }
}

/**
 * Role matching helper
 */
export function hasAnyRole(userRole: string | undefined, allowedRoles: string[]): boolean {
  if (!userRole) return false;
  const normalized = userRole.toLowerCase().trim();

  // Super Admin has universal access
  if (normalized.includes('super admin') || normalized.includes('executive')) {
    return true;
  }

  return allowedRoles.some((role) => normalized === role.toLowerCase().trim());
}

/**
 * Branch ownership check: Super Admin can access all; Branch staff can only access their branch
 */
export function canAccessBranch(user: SessionUser | null, branchId?: string | null): boolean {
  if (!user) return false;
  const roleLower = user.role.toLowerCase();
  if (roleLower.includes('super admin') || roleLower.includes('executive')) {
    return true;
  }
  if (!branchId) return true; // General/unassigned
  return user.branchId === branchId;
}

/**
 * Student data ownership check
 */
export function canAccessStudentRecord(user: SessionUser | null, targetStudentId: string): boolean {
  if (!user) return false;
  const roleLower = user.role.toLowerCase();

  // Super admin, counselors, trainers, and finance officers can view student records
  if (
    roleLower.includes('super admin') ||
    roleLower.includes('admissions') ||
    roleLower.includes('counselor') ||
    roleLower.includes('trainer') ||
    roleLower.includes('finance')
  ) {
    return true;
  }

  // A student can ONLY access their own records
  if (roleLower.includes('student')) {
    return user.id === targetStudentId;
  }

  return false;
}
