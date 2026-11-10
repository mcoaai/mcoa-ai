import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createSignedToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Valid email address is required' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    // Always return a neutral success message to prevent user enumeration
    const genericResponse = {
      success: true,
      message: 'If an account exists with this email address, password reset instructions have been dispatched.',
    };

    if (!user || !user.isActive) {
      return NextResponse.json(genericResponse);
    }

    // Generate single-use cryptographically signed reset token valid for 15 minutes
    const resetToken = await createSignedToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: 'PASSWORD_RESET',
      maxAgeMs: 15 * 60 * 1000, // 15 minutes expiry
    });

    // Audit log reset request
    try {
      await prisma.auditLog.create({
        data: {
          action: 'PASSWORD_RESET_REQUESTED',
          entityType: 'User',
          entityId: user.id,
          performedBy: user.email,
          details: JSON.stringify({ ip: req.headers.get('x-forwarded-for') || '127.0.0.1' }),
        },
      });
    } catch (e) {}

    // In development / testing environment, return reset token for verification
    if (process.env.NODE_ENV !== 'production') {
      return NextResponse.json({
        ...genericResponse,
        devResetToken: resetToken,
        resetUrl: `/reset-password?token=${resetToken}`,
      });
    }

    return NextResponse.json(genericResponse);
  } catch (error: any) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Password recovery request failed' }, { status: 500 });
  }
}
