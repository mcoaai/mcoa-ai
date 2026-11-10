import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySignedToken, hasAnyRole, ROLES } from '@/lib/auth';

// Simple in-memory sliding window rate limiter for edge/server
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string, maxRequests: number, windowSeconds: number): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowSeconds * 1000 });
    return true;
  }

  if (entry.count >= maxRequests) {
    return false;
  }

  entry.count++;
  return true;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = request.ip || request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';

  // 1. Rate Limiting on Authentication & Lead Capture endpoints
  if (pathname === '/api/auth/login' && request.method === 'POST') {
    if (!checkRateLimit(`login_${ip}`, 10, 60)) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please wait 1 minute before trying again.' },
        { status: 429, headers: { 'Retry-After': '60' } }
      );
    }
  }

  if (pathname === '/api/auth/forgot-password' && request.method === 'POST') {
    if (!checkRateLimit(`forgot_${ip}`, 5, 60)) {
      return NextResponse.json(
        { error: 'Password recovery limit reached. Please wait 1 minute.' },
        { status: 429, headers: { 'Retry-After': '60' } }
      );
    }
  }

  if (pathname === '/api/auth/mfa/verify' && request.method === 'POST') {
    if (!checkRateLimit(`mfa_${ip}`, 10, 60)) {
      return NextResponse.json(
        { error: 'Too many verification attempts. Please wait 1 minute.' },
        { status: 429, headers: { 'Retry-After': '60' } }
      );
    }
  }

  if (pathname === '/api/leads' && request.method === 'POST') {
    if (!checkRateLimit(`lead_${ip}`, 6, 60)) {
      return NextResponse.json(
        { error: 'Inquiry submission limit exceeded. Please wait a moment.' },
        { status: 429, headers: { 'Retry-After': '60' } }
      );
    }
  }

  // 2. Identify if route requires authentication
  const isAdminPage = pathname.startsWith('/admin');
  const isStudentPage = pathname.startsWith('/student');
  const isTrainerPage = pathname.startsWith('/trainer');

  const isAdminApi = pathname.startsWith('/api/admin');
  const isLeadsAdminApi = pathname.startsWith('/api/leads') && (request.method === 'GET' || request.method === 'PATCH' || request.method === 'DELETE');
  const isFinanceApi = pathname.startsWith('/api/payments/finance');
  const isTrainerApi = pathname.startsWith('/api/trainer');
  const isStudentApi = pathname.startsWith('/api/student');
  const isWhatsappApi = pathname.startsWith('/api/whatsapp');
  const isPlacementsApi = pathname.startsWith('/api/placements');
  const isSessionsApi = pathname.startsWith('/api/sessions');

  const isProtectedPage = isAdminPage || isStudentPage || isTrainerPage;
  const isProtectedApi = isAdminApi || isLeadsAdminApi || isFinanceApi || isTrainerApi || isStudentApi || isWhatsappApi || isPlacementsApi || isSessionsApi;

  if (!isProtectedPage && !isProtectedApi) {
    return NextResponse.next();
  }

  // 3. Verify Session Cookie (HMAC-SHA256 Signed Token)
  const token = request.cookies.get('mcoa_session')?.value;
  const session = await verifySignedToken(token);

  // If unauthenticated:
  if (!session) {
    if (isProtectedApi) {
      return NextResponse.json(
        {
          error: 'Unauthorized: Authentication required',
          code: 'AUTH_REQUIRED',
        },
        { status: 401 }
      );
    }

    // Redirect unauthenticated page requests to login with redirect back URL
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const role = session.role;

  // 4. Role-Based Access Control (RBAC) - Deny By Default

  // --- Admin Pages & APIs ---
  if (isAdminPage || isAdminApi) {
    // Specifically Finance section
    if (pathname.startsWith('/admin/finance')) {
      if (!hasAnyRole(role, [ROLES.SUPER_ADMIN, ROLES.FINANCE])) {
        return handleForbidden(request, session, isProtectedApi);
      }
    }
    // Specifically Placements section
    else if (pathname.startsWith('/admin/placements')) {
      if (!hasAnyRole(role, [ROLES.SUPER_ADMIN, ROLES.PLACEMENT, ROLES.BRANCH_MANAGER])) {
        return handleForbidden(request, session, isProtectedApi);
      }
    }
    // CRM & Admissions section
    else if (pathname.startsWith('/admin/crm') || pathname.startsWith('/admin/admissions')) {
      if (!hasAnyRole(role, [ROLES.SUPER_ADMIN, ROLES.BRANCH_MANAGER, ROLES.COUNSELOR])) {
        return handleForbidden(request, session, isProtectedApi);
      }
    }
    // General Admin / Executive dashboard
    else {
      if (!hasAnyRole(role, [ROLES.SUPER_ADMIN, ROLES.BRANCH_MANAGER])) {
        // Counselors navigating to /admin should land on /admin/crm
        if (hasAnyRole(role, [ROLES.COUNSELOR])) {
          return NextResponse.redirect(new URL('/admin/crm', request.url));
        }
        return handleForbidden(request, session, isProtectedApi);
      }
    }
  }

  // --- Leads API (Read / Modify) ---
  if (isLeadsAdminApi) {
    if (!hasAnyRole(role, [ROLES.SUPER_ADMIN, ROLES.BRANCH_MANAGER, ROLES.COUNSELOR])) {
      return NextResponse.json({ error: 'Forbidden: Insufficient CRM access permissions' }, { status: 403 });
    }
  }

  // --- Finance API ---
  if (isFinanceApi) {
    // Students can query their own fees via ?userId, staff can query academy finances
    if (!hasAnyRole(role, [ROLES.SUPER_ADMIN, ROLES.FINANCE, ROLES.STUDENT, ROLES.BRANCH_MANAGER])) {
      return NextResponse.json({ error: 'Forbidden: Insufficient finance access permissions' }, { status: 403 });
    }
  }

  // --- Trainer Pages & APIs ---
  if (isTrainerPage || isTrainerApi) {
    if (!hasAnyRole(role, [ROLES.SUPER_ADMIN, ROLES.TRAINER])) {
      return handleForbidden(request, session, isProtectedApi);
    }
  }

  // --- Student Pages & APIs ---
  if (isStudentPage || isStudentApi) {
    if (!hasAnyRole(role, [ROLES.SUPER_ADMIN, ROLES.STUDENT, ROLES.COUNSELOR, ROLES.TRAINER])) {
      return handleForbidden(request, session, isProtectedApi);
    }
  }

  // --- WhatsApp Broadcasting API ---
  if (isWhatsappApi) {
    if (!hasAnyRole(role, [ROLES.SUPER_ADMIN, ROLES.BRANCH_MANAGER, ROLES.COUNSELOR])) {
      return NextResponse.json({ error: 'Forbidden: Insufficient marketing permissions' }, { status: 403 });
    }
  }

  // --- Placements API ---
  if (isPlacementsApi) {
    if (request.method !== 'GET' && !hasAnyRole(role, [ROLES.SUPER_ADMIN, ROLES.PLACEMENT, ROLES.STUDENT])) {
      return NextResponse.json({ error: 'Forbidden: Insufficient placement permissions' }, { status: 403 });
    }
  }

  // --- Live Sessions API ---
  if (isSessionsApi) {
    if (request.method === 'POST' && !hasAnyRole(role, [ROLES.SUPER_ADMIN, ROLES.BRANCH_MANAGER, ROLES.TRAINER])) {
      return NextResponse.json({ error: 'Forbidden: Insufficient live session scheduling permissions' }, { status: 403 });
    }
  }

  // 5. Attach authenticated user headers for downstream route handlers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-id', session.id);
  requestHeaders.set('x-user-email', session.email);
  requestHeaders.set('x-user-role', session.role);
  if (session.branchId) {
    requestHeaders.set('x-user-branch', session.branchId);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

function handleForbidden(request: NextRequest, session: any, isApi: boolean) {
  if (isApi) {
    return NextResponse.json(
      { error: 'Forbidden: Access denied for your user role', userRole: session.role },
      { status: 403 }
    );
  }

  // Redirect to user's authorized home
  const roleLower = (session.role || '').toLowerCase();
  let defaultPortal = '/';

  if (roleLower.includes('student')) {
    defaultPortal = '/student';
  } else if (roleLower.includes('trainer')) {
    defaultPortal = '/trainer';
  } else if (roleLower.includes('counselor')) {
    defaultPortal = '/admin/crm';
  } else if (roleLower.includes('finance')) {
    defaultPortal = '/admin/finance';
  } else if (roleLower.includes('placement')) {
    defaultPortal = '/admin/placements';
  } else if (roleLower.includes('admin')) {
    defaultPortal = '/admin';
  }

  return NextResponse.redirect(new URL(defaultPortal, request.url));
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/student/:path*',
    '/trainer/:path*',
    '/api/admin/:path*',
    '/api/leads',
    '/api/leads/:path*',
    '/api/payments/finance/:path*',
    '/api/payments/razorpay/order',
    '/api/trainer/:path*',
    '/api/student/:path*',
    '/api/whatsapp',
    '/api/whatsapp/:path*',
    '/api/placements',
    '/api/placements/:path*',
    '/api/sessions',
    '/api/sessions/:path*',
    '/api/auth/login',
    '/api/auth/mfa/:path*',
    '/api/auth/forgot-password',
  ],
};
