import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { verifySignedToken, hasAnyRole, ROLES } from '@/lib/auth';

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('mcoa_session')?.value;
    const session = await verifySignedToken(token);

    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized: Staff authentication required' }, { status: 401 });
    }

    if (!hasAnyRole(session.role, [ROLES.SUPER_ADMIN, ROLES.BRANCH_MANAGER])) {
      return NextResponse.json({ success: false, error: 'Forbidden: Insufficient report access permissions' }, { status: 403 });
    }
    // 1. Branch Admissions & Collections Matrix
    const branches = await prisma.branch.findMany({
      include: {
        batches: {
          include: {
            enrollments: true
          }
        },
        leads: true
      }
    });

    const branchMatrix = branches.map(b => {
      let totalEnrolled = 0;
      let branchCollections = 0;
      let branchReceivables = 0;

      b.batches.forEach(batch => {
        batch.enrollments.forEach(enr => {
          totalEnrolled++;
          branchCollections += enr.paidFee;
          branchReceivables += Math.max(0, enr.totalFee - enr.paidFee);
        });
      });

      return {
        id: b.id,
        name: b.name,
        city: b.city,
        leadsCount: b.leads.length,
        enrollmentsCount: totalEnrolled,
        totalCollections: branchCollections,
        pendingReceivables: branchReceivables,
        conversionRate: b.leads.length > 0 ? ((totalEnrolled / b.leads.length) * 100).toFixed(1) + '%' : '0%'
      };
    });

    // 2. Conversion Funnel by Lead Source
    const allLeads = await prisma.lead.findMany();
    const sourceBuckets: Record<string, { total: number; enrolled: number }> = {};

    allLeads.forEach(l => {
      const src = l.source || 'Website Direct';
      if (!sourceBuckets[src]) sourceBuckets[src] = { total: 0, enrolled: 0 };
      sourceBuckets[src].total++;
      if (l.status === 'Enrolled' || l.status === 'Applied') {
        sourceBuckets[src].enrolled++;
      }
    });

    const funnelData = Object.keys(sourceBuckets).map(src => ({
      source: src,
      totalLeads: sourceBuckets[src].total,
      enrolled: sourceBuckets[src].enrolled,
      conversionRate: ((sourceBuckets[src].enrolled / Math.max(1, sourceBuckets[src].total)) * 100).toFixed(1) + '%'
    }));

    // 3. Academic Readiness & Practice Simulator Index
    const enrollments = await prisma.enrollment.findMany({
      include: {
        user: true,
        course: true,
        batch: true
      }
    });

    const averageProgress = enrollments.length > 0
      ? Math.round(enrollments.reduce((acc, curr) => acc + curr.progressPercent, 0) / enrollments.length)
      : 0;

    const totalRevenue = enrollments.reduce((acc, curr) => acc + curr.paidFee, 0);
    const totalReceivables = enrollments.reduce((acc, curr) => acc + Math.max(0, curr.totalFee - curr.paidFee), 0);

    // 4. AI Interaction & Escalation Stats
    const aiConversationsCount = await prisma.aiConversation.count();
    const aiEscalatedCount = await prisma.aiConversation.count({ where: { escalatedToHuman: true } });
    const knowledgeItemsCount = await prisma.aiKnowledgeItem.count();

    // 5. Landing Page Leads Conversion
    const landingPages = await prisma.landingPage.findMany();
    const landingStats = landingPages.map(lp => ({
      slug: lp.slug,
      title: lp.title,
      views: lp.viewsCount,
      leads: lp.leadsCount,
      conversionRate: lp.viewsCount > 0 ? ((lp.leadsCount / lp.viewsCount) * 100).toFixed(1) + '%' : '0%'
    }));

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      summary: {
        totalRevenue,
        totalReceivables,
        totalEnrolled: enrollments.length,
        averageProgress,
        totalLeads: allLeads.length,
        aiInteractions: aiConversationsCount,
        aiEscalations: aiEscalatedCount,
        knowledgeBaseArticles: knowledgeItemsCount
      },
      branchMatrix,
      funnelData,
      landingStats
    });
  } catch (error: any) {
    console.error('Reports API error:', error);
    return NextResponse.json({ error: 'Failed to generate academy reports', details: error.message }, { status: 500 });
  }
}
