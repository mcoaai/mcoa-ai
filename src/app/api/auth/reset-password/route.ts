import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifySignedToken } from '@/lib/auth';
import { hashPassword } from '@/lib/password';

export async function POST(req: Request) {
  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return NextResponse.json({ error: 'Reset token and new password are required' }, { status: 400 });
    }

    if (typeof newPassword !== 'string' || newPassword.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters in length' }, { status: 400 });
    }

    // Verify cryptographic signature and expiration of reset token
    const session = await verifySignedToken(token);

    if (!session || session.role !== 'PASSWORD_RESET') {
      return NextResponse.json({ error: 'Reset link is invalid or has expired. Please request a new link.' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.id },
    });

    if (!user || !user.isActive) {
      return NextResponse.json({ error: 'User account not found or deactivated' }, { status: 404 });
    }

    // Hash password with cryptographically secure PBKDF2 salt:hash
    const newPasswordHash = hashPassword(newPassword);

    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: newPasswordHash },
    });

    // Audit log reset success
    try {
      await prisma.auditLog.create({
        data: {
          action: 'PASSWORD_RESET_SUCCESS',
          entityType: 'User',
          entityId: user.id,
          performedBy: user.email,
          details: JSON.stringify({ ip: req.headers.get('x-forwarded-for') || '127.0.0.1' }),
        },
      });
    } catch (e) {}

    return NextResponse.json({
      success: true,
      message: 'Password successfully updated. You may now log in with your new credentials.',
    });
  } catch (error: any) {
    console.error('Password reset error:', error);
    return NextResponse.json({ error: 'Failed to reset password' }, { status: 500 });
  }
}

