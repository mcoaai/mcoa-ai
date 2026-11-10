import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { verifySignedToken, hasAnyRole, ROLES } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('mcoa_session')?.value;
    const session = await verifySignedToken(token);

    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized: Staff authentication required' }, { status: 401 });
    }

    // Restricted export: ONLY Super Admin and Branch Managers have export privileges
    if (!hasAnyRole(session.role, [ROLES.SUPER_ADMIN, ROLES.BRANCH_MANAGER])) {
      return NextResponse.json({ success: false, error: 'Forbidden: Insufficient permissions to export CRM lead records' }, { status: 403 });
    }

    const isSuperAdmin = hasAnyRole(session.role, [ROLES.SUPER_ADMIN]);
    const where: any = {};

    // Branch boundary enforcement: non-superadmin branch managers can only export their own branch's leads
    if (!isSuperAdmin && session.branchId) {
      where.branchId = session.branchId;
    }

    const leads = await prisma.lead.findMany({
      where,
      include: {
        branch: { select: { name: true } },
        course: { select: { title: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Audit log this high-risk data export event
    try {
      await prisma.auditLog.create({
        data: {
          action: 'DATA_EXPORT_LEADS',
          entityType: 'Lead',
          performedBy: `${session.name} (${session.email})`,
          details: JSON.stringify({
            exportedCount: leads.length,
            branchScope: isSuperAdmin ? 'ALL_BRANCHES' : session.branchId,
            ip: req.headers.get('x-forwarded-for') || '127.0.0.1',
          }),
        },
      });
    } catch (e) {}

    // Construct CSV
    const headers = ['ID', 'Full Name', 'Email', 'Phone', 'Education', 'Target Course', 'Campus', 'Status', 'Mode', 'Preferred Batch', 'Inquiry Date'];
    const rows = leads.map((l) => [
      `"${l.id}"`,
      `"${(l.fullName || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.educationBackground || '').replace(/"/g, '""')}"`,
      `"${(l.course?.title || 'General Inpatient/Outpatient').replace(/"/g, '""')}"`,
      `"${(l.branch?.name || 'Central Academy').replace(/"/g, '""')}"`,
      `"${l.status}"`,
      `"${l.mode}"`,
      `"${l.preferredBatch}"`,
      `"${new Date(l.createdAt).toISOString().slice(0, 10)}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const dateStr = new Date().toISOString().slice(0, 10);
    return new Response(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="mcoa_leads_export_${dateStr}.csv"`,
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (err: any) {
    console.error('Error exporting leads CSV:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

