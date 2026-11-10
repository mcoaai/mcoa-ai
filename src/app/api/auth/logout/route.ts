import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySignedToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('mcoa_session');

    if (sessionCookie) {
      const session = await verifySignedToken(sessionCookie.value);
      if (session) {
        try {
          await prisma.auditLog.create({
            data: {
              action: 'AUTH_LOGOUT',
              entityType: 'User',
              entityId: session.id,
              performedBy: session.email,
              details: JSON.stringify({ role: session.role }),
            },
          });
        } catch (e) {
          // Non-blocking audit log
        }
      }
    }
  } catch (e) {
    // Ignore cookie read error
  }

  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  response.cookies.set('mcoa_session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  return response;
}
