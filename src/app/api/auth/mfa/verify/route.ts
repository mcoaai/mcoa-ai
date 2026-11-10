import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createSignedToken, verifySignedToken } from '@/lib/auth';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { tempToken, mfaCode } = await req.json();

    if (!tempToken || !mfaCode) {
      return NextResponse.json({ error: 'MFA session token and 6-digit code are required' }, { status: 400 });
    }

    const session = await verifySignedToken(tempToken);

    if (!session || !session.role.startsWith('MFA_PENDING:')) {
      return NextResponse.json({ error: 'MFA session has expired or is invalid. Please log in again.' }, { status: 401 });
    }

    const expectedHash = session.role.replace('MFA_PENDING:', '');
    const providedHash = crypto.createHash('sha256').update(mfaCode.trim()).digest('hex');

    if (expectedHash !== providedHash) {
      // Record failed MFA attempt in audit log
      try {
        await prisma.auditLog.create({
          data: {
            action: 'MFA_VERIFY_FAILED',
            entityType: 'User',
            entityId: session.id,
            performedBy: session.email,
            details: JSON.stringify({ ip: req.headers.get('x-forwarded-for') || '127.0.0.1' }),
          },
        });
      } catch (e) {}

      return NextResponse.json({ error: 'Invalid 6-digit verification code. Please check and try again.' }, { status: 401 });
    }

    // Retrieve full user record
    const user = await prisma.user.findUnique({
      where: { id: session.id },
      include: { branch: true },
    });

    if (!user || !user.isActive) {
      return NextResponse.json({ error: 'User account not active.' }, { status: 403 });
    }

    // Determine redirect
    let redirectTo = '/student';
    const roleLower = user.role.toLowerCase();
    if (roleLower.includes('super admin') || roleLower.includes('executive')) {
      redirectTo = '/admin';
    } else if (roleLower.includes('counselor') || roleLower.includes('admissions')) {
      redirectTo = '/admin/crm';
    } else if (roleLower.includes('finance')) {
      redirectTo = '/admin/finance';
    } else if (roleLower.includes('placement')) {
      redirectTo = '/admin/placements';
    } else if (roleLower.includes('trainer')) {
      redirectTo = '/trainer';
    }

    // Issue authentic full session token
    const sessionToken = await createSignedToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      branchId: user.branchId,
    });

    // Record successful MFA audit log
    try {
      await prisma.auditLog.create({
        data: {
          action: 'MFA_VERIFY_SUCCESS',
          entityType: 'User',
          entityId: user.id,
          performedBy: user.email,
          details: JSON.stringify({ role: user.role, ip: req.headers.get('x-forwarded-for') || '127.0.0.1' }),
        },
      });
    } catch (e) {}

    const response = NextResponse.json({
      success: true,
      message: 'MFA verification successful',
      redirectTo,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        branchName: user.branch?.name || 'Central Head Office',
      },
    });

    response.cookies.set('mcoa_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error: any) {
    console.error('MFA Verification Error:', error);
    return NextResponse.json({ error: 'MFA verification failed', details: error.message }, { status: 500 });
  }
}
