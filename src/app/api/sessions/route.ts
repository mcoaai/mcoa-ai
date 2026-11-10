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
    const batchId = searchParams.get("batchId");

    const where: any = {};
    if (batchId) where.batchId = batchId;

    // If student, scope to batches they are actually enrolled in
    if (hasAnyRole(session.role, [ROLES.STUDENT])) {
      const enrollments = await prisma.enrollment.findMany({
        where: { userId: session.id },
        select: { batchId: true },
      });
      const enrolledBatchIds = enrollments.map((e) => e.batchId).filter(Boolean) as string[];

      where.OR = [
        { batchId: { in: enrolledBatchIds } },
        { batchId: null }, // General all-academy masterclasses
      ];
    }

    const sessions = await prisma.liveSession.findMany({
      where,
      include: {
        batch: { include: { branch: true } },
        course: true,
        trainer: { select: { id: true, name: true, email: true } },
      },
      orderBy: { scheduledStartTime: "asc" },
    });

    return NextResponse.json({ success: true, sessions });
  } catch (err: any) {
    console.error("Error fetching live sessions:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("mcoa_session")?.value;
    const session = await verifySignedToken(token);

    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized: Staff authentication required" }, { status: 401 });
    }

    if (!hasAnyRole(session.role, [ROLES.SUPER_ADMIN, ROLES.BRANCH_MANAGER, ROLES.TRAINER])) {
      return NextResponse.json({ success: false, error: "Forbidden: Insufficient session scheduling permissions" }, { status: 403 });
    }

    const body = await req.json();
    const { title, batchId, courseId, trainerId, platform, meetingUrl, meetingId, passcode, scheduledStartTime, scheduledEndTime, agenda } = body;

    if (!title || !meetingUrl || !scheduledStartTime) {
      return NextResponse.json({ success: false, error: "Title, meetingUrl, and scheduledStartTime are required" }, { status: 400 });
    }

    const assignedTrainerId = trainerId || (session.role === ROLES.TRAINER ? session.id : null);

    const liveSession = await prisma.liveSession.create({
      data: {
        title,
        batchId: batchId || null,
        courseId: courseId || null,
        trainerId: assignedTrainerId,
        platform: platform || "Zoom",
        meetingUrl,
        meetingId: meetingId || null,
        passcode: passcode || null,
        scheduledStartTime: new Date(scheduledStartTime),
        scheduledEndTime: scheduledEndTime ? new Date(scheduledEndTime) : new Date(new Date(scheduledStartTime).getTime() + 2 * 60 * 60 * 1000),
        status: "Scheduled",
        agenda: agenda || null,
      },
    });

    // Create Audit Log
    await prisma.auditLog.create({
      data: {
        action: "LIVE_SESSION_SCHEDULED",
        entityType: "LiveSession",
        entityId: liveSession.id,
        performedBy: `${session.name} (${session.email})`,
        details: JSON.stringify({ title, platform, meetingUrl }),
      },
    });

    return NextResponse.json({ success: true, session: liveSession });
  } catch (err: any) {
    console.error("Error scheduling live session:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
