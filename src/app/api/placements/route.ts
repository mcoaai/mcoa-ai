import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifySignedToken, hasAnyRole, ROLES } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("mcoa_session")?.value;
    const session = await verifySignedToken(token);

    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized: Authentication required" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const isStaff = hasAnyRole(session.role, [ROLES.SUPER_ADMIN, ROLES.PLACEMENT, ROLES.BRANCH_MANAGER]);

    // If staff, include full applicant details; if student, exclude other students' private applications
    const jobs = await prisma.jobOpening.findMany({
      include: isStaff
        ? {
            applications: {
              include: {
                user: {
                  select: { id: true, name: true, email: true, phone: true, branchId: true },
                },
              },
            },
          }
        : {
            applications: {
              where: { userId: session.id },
            },
          },
      orderBy: { createdAt: "desc" },
    });

    let myApplications: any[] = [];
    const queryUserId = isStaff ? (searchParams.get("userId") || session.id) : session.id;

    myApplications = await prisma.jobApplication.findMany({
      where: { userId: queryUserId },
      include: { job: true },
      orderBy: { appliedAt: "desc" },
    });

    // Compute placement statistics
    const totalOpenings = jobs.length;
    const totalVacancies = jobs.reduce((sum, j) => sum + j.vacancies, 0);

    return NextResponse.json({
      success: true,
      jobs,
      myApplications,
      stats: {
        totalOpenings,
        totalVacancies,
        totalApplications: myApplications.length,
      },
    });
  } catch (err: any) {
    console.error("Error fetching placements:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("mcoa_session")?.value;
    const session = await verifySignedToken(token);

    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized: Authentication required" }, { status: 401 });
    }

    const isStaff = hasAnyRole(session.role, [ROLES.SUPER_ADMIN, ROLES.PLACEMENT, ROLES.BRANCH_MANAGER]);
    const { jobId, userId, notes, stage, interviewDate, interviewLink, offeredCtc } = await req.json();

    if (!jobId) {
      return NextResponse.json({ success: false, error: "jobId is required" }, { status: 400 });
    }

    // IDOR protection: Students can only submit for themselves. Staff can apply on behalf of a student.
    const targetUserId = isStaff && userId ? userId : session.id;

    // Check if application already exists
    const existing = await prisma.jobApplication.findFirst({
      where: { jobId, userId: targetUserId },
    });

    if (existing) {
      // Only staff can update stage, interview date/link, offered CTC
      if (!isStaff && (stage || interviewDate || interviewLink || offeredCtc)) {
        return NextResponse.json({ success: false, error: "Forbidden: Only placement officers can update interview stages" }, { status: 403 });
      }

      // Update application stage or details
      const updated = await prisma.jobApplication.update({
        where: { id: existing.id },
        data: {
          stage: stage || existing.stage,
          interviewDate: interviewDate ? new Date(interviewDate) : existing.interviewDate,
          interviewLink: interviewLink || existing.interviewLink,
          offeredCtc: offeredCtc || existing.offeredCtc,
          notes: notes || existing.notes,
        },
        include: { job: true, user: true },
      });
      return NextResponse.json({ success: true, application: updated, message: "Application updated" });
    }

    // Create new application
    const application = await prisma.jobApplication.create({
      data: {
        jobId,
        userId: targetUserId,
        stage: "Applied",
        notes: notes || "Application submitted via MCOA Placement Assistance Cell.",
      },
      include: { job: true, user: true },
    });

    // Notify student via WhatsApp
    await prisma.whatsAppMessage.create({
      data: {
        recipientPhone: application.user?.phone || "+918072020716",
        recipientName: application.user?.name || "Student",
        templateName: "placement_application_received",
        content: `Application Sent: Your profile has been submitted to ${application.job.companyName} for "${application.job.title}". Our Placement Cell will coordinate your technical screening rounds.`,
        status: "Sent",
        category: "Placement",
        sentAt: new Date(),
        externalMessageId: `wamid.JOB_${Date.now()}`,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "PLACEMENT_APPLIED",
        entityType: "JobApplication",
        entityId: application.id,
        performedBy: `${session.name} (${session.email})`,
        details: JSON.stringify({ jobId, targetUserId, companyName: application.job.companyName }),
      },
    });

    return NextResponse.json({
      success: true,
      application,
      message: "Application submitted successfully to corporate RCM partner.",
    });
  } catch (err: any) {
    console.error("Error submitting job application:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
