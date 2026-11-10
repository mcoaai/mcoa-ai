import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySignedToken } from '@/lib/auth';

export async function GET() {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('mcoa_session');

    if (!sessionCookie) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
    }

    const session = await verifySignedToken(sessionCookie.value);

    if (!session) {
      const res = NextResponse.json({ authenticated: false, user: null }, { status: 401 });
      res.cookies.delete('mcoa_session');
      return res;
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        userId: session.id,
        email: session.email,
        name: session.name,
        role: session.role,
        branchId: session.branchId,
      },
    });
  } catch (err) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
  }
}
