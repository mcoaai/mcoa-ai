import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createSignedToken } from '@/lib/auth';
import { verifyPassword, hashPassword } from '@/lib/password';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { email, password, mfaCode, tempToken } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Canonical official domain aliases
    const emailAliases: Record<string, string> = {
      'admin@mcoa.com': 'dr.jeeva@medicalcodingofficersacademy.com',
      'admin@medicalcodingofficersacademy.com': 'dr.jeeva@medicalcodingofficersacademy.com',
      'jeeva@mcoa.com': 'dr.jeeva@medicalcodingofficersacademy.com',
      'dr.jeeva@mcoa.com': 'dr.jeeva@medicalcodingofficersacademy.com',
      'trainer@medicalcodingofficersacademy.com': 'trainer.rajesh@medicalcodingofficersacademy.com',
      'trainer@mcoa.com': 'trainer.rajesh@medicalcodingofficersacademy.com',
      'counselor@mcoa.com': 'admissions@medicalcodingofficersacademy.com',
      'counselor@medicalcodingofficersacademy.com': 'admissions@medicalcodingofficersacademy.com',
      'admissions@mcoa.com': 'admissions@medicalcodingofficersacademy.com',
      'sneha.ramachandran@example.com': 'sneha.student@example.com',
      'student@mcoa.com': 'sneha.student@example.com',
    };

    const targetEmail = emailAliases[cleanEmail] || cleanEmail;

    // 1. Strict exact email lookup (prevent fuzzy auth bypass)
    let user = await prisma.user.findUnique({
      where: { email: targetEmail },
      include: { branch: true }
    });

    // Auto-seed if database has 0 users (e.g. initial deployment on fresh DB)
    if (!user) {
      const userCount = await prisma.user.count();
      if (userCount === 0) {
        const defaultUsers = [
          {
            email: "dr.jeeva@medicalcodingofficersacademy.com",
            name: "Dr. Jeevanantham Mariappan",
            passwordHash: hashPassword("admin123"),
            role: "Super Admin",
            phone: "+91 8072020716",
            isActive: true,
          },
          {
            email: "admissions@medicalcodingofficersacademy.com",
            name: "Kavitha Sundaram (Senior Counselor)",
            passwordHash: hashPassword("counselor123"),
            role: "Admissions Counselor",
            phone: "+91 8072020716",
            isActive: true,
          },
          {
            email: "trainer.rajesh@medicalcodingofficersacademy.com",
            name: "Dr. Rajesh Kannan, CPC, CCS",
            passwordHash: hashPassword("trainer123"),
            role: "Trainer",
            phone: "+91 8072020716",
            isActive: true,
          },
          {
            email: "sneha.student@example.com",
            name: "Sneha Ramachandran",
            passwordHash: hashPassword("student123"),
            role: "Student",
            phone: "+91 8072020716",
            isActive: true,
          },
        ];

        for (const u of defaultUsers) {
          await prisma.user.upsert({
            where: { email: u.email },
            update: u,
            create: u,
          });
        }

        user = await prisma.user.findUnique({
          where: { email: targetEmail },
          include: { branch: true }
        });
      }
    }

    // Generic error message to prevent user enumeration
    if (!user) {
      return NextResponse.json({
        error: 'Invalid email or password. Please verify your credentials.',
      }, { status: 401 });
    }

    if (!user.isActive) {
      return NextResponse.json({ error: 'This account has been deactivated. Please contact administration.' }, { status: 403 });
    }

    // 2. Cryptographic password verification with automatic migration to PBKDF2 salted hash
    const { isValid: isPasswordValid, needsRehash } = verifyPassword(password, user.passwordHash);

    if (!isPasswordValid) {
      // Record failed login audit log
      try {
        await prisma.auditLog.create({
          data: {
            action: 'AUTH_LOGIN_FAILED',
            entityType: 'User',
            entityId: user.id,
            performedBy: cleanEmail,
            details: JSON.stringify({
              reason: 'Incorrect password attempt',
              ip: req.headers.get('x-forwarded-for') || '127.0.0.1',
            }),
          },
        });
      } catch (e) {}

      return NextResponse.json({ error: 'Invalid email or password. Please verify your credentials.' }, { status: 401 });
    }

    // Rehash legacy plaintext passwords to salted PBKDF2
    if (needsRehash) {
      try {
        await prisma.user.update({
          where: { id: user.id },
          data: { passwordHash: hashPassword(password) },
        });
      } catch (rehashErr) {
        console.warn('Password rehash update failed:', rehashErr);
      }
    }

    // 3. Multi-Factor Authentication (MFA) Check for Privileged Staff
    const roleLower = user.role.toLowerCase();
    const isPrivilegedStaff =
      roleLower.includes('super admin') ||
      roleLower.includes('executive') ||
      roleLower.includes('branch admin') ||
      roleLower.includes('finance');

    // If privileged staff and MFA code not yet provided/verified
    if (isPrivilegedStaff) {
      if (!mfaCode || !tempToken) {
        // Generate secure 6-digit MFA OTP code
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const codeHash = crypto.createHash('sha256').update(otpCode).digest('hex');

        // Temporary 5-minute MFA token storing the expected code hash
        const mfaChallengeToken = await createSignedToken({
          id: user.id,
          email: user.email,
          name: user.name,
          role: `MFA_PENDING:${codeHash}`,
          branchId: user.branchId,
          maxAgeMs: 5 * 60 * 1000, // 5 minutes
        });

        // Audit log MFA dispatch
        try {
          await prisma.auditLog.create({
            data: {
              action: 'MFA_CHALLENGE_ISSUED',
              entityType: 'User',
              entityId: user.id,
              performedBy: user.email,
              details: JSON.stringify({ role: user.role, channel: 'TOTP / Secure Challenge' }),
            },
          });
        } catch (e) {}

        return NextResponse.json({
          mfaRequired: true,
          tempToken: mfaChallengeToken,
          email: user.email,
          role: user.role,
          message: 'Two-factor verification required for privileged staff account.',
          // In development/test mode, surface the OTP code for seamless testing
          devCode: process.env.NODE_ENV !== 'production' ? otpCode : undefined,
        });
      }

      // If mfaCode and tempToken ARE provided, verify the MFA challenge
      const { verifySignedToken } = await import('@/lib/auth');
      const mfaSession = await verifySignedToken(tempToken);

      if (!mfaSession || !mfaSession.role.startsWith('MFA_PENDING:')) {
        return NextResponse.json({ error: 'MFA session has expired or is invalid. Please log in again.' }, { status: 401 });
      }

      const expectedCodeHash = mfaSession.role.replace('MFA_PENDING:', '');
      const submittedCodeHash = crypto.createHash('sha256').update(mfaCode.trim()).digest('hex');

      if (expectedCodeHash !== submittedCodeHash) {
        return NextResponse.json({ error: 'Invalid 6-digit verification code. Please try again.' }, { status: 401 });
      }
    }

    // 4. Determine role-based destination redirect
    let redirectTo = '/student';

    if (roleLower.includes('super admin') || roleLower.includes('executive')) {
      redirectTo = '/admin';
    } else if (roleLower.includes('counselor') || roleLower.includes('admissions')) {
      redirectTo = '/admin/crm';
    } else if (roleLower.includes('trainer') || roleLower.includes('instructor')) {
      redirectTo = '/trainer';
    } else if (roleLower.includes('finance')) {
      redirectTo = '/admin/finance';
    } else if (roleLower.includes('placement')) {
      redirectTo = '/admin/placements';
    } else if (roleLower.includes('student')) {
      redirectTo = '/student';
    }

    // 5. Create cryptographically signed HMAC-SHA256 session token
    const sessionToken = await createSignedToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      branchId: user.branchId,
    });

    // Audit log successful authentication
    try {
      await prisma.auditLog.create({
        data: {
          action: 'AUTH_LOGIN_SUCCESS',
          entityType: 'User',
          entityId: user.id,
          performedBy: user.email,
          details: JSON.stringify({
            role: user.role,
            branchId: user.branchId,
            mfaVerified: isPrivilegedStaff,
            ip: req.headers.get('x-forwarded-for') || '127.0.0.1',
          }),
        },
      });
    } catch (auditErr) {
      console.warn('Audit log write error:', auditErr);
    }

    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful',
      redirectTo,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        branchName: user.branch?.name || 'Central Head Office',
      },
    });

    // 6. Set hardened HTTP-Only session cookie
    response.cookies.set('mcoa_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours session expiry
    });

    return response;
  } catch (error: any) {
    console.error('Login Auth Error:', error);
    return NextResponse.json({ error: 'Authentication failed', details: error.message }, { status: 500 });
  }
}
