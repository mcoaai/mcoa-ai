import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifySignedToken, hasAnyRole, ROLES, canAccessBranch } from "@/lib/auth";

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("mcoa_session")?.value;
    const session = await verifySignedToken(token);

    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized: Authentication required" }, { status: 401 });
    }

    const batches = await prisma.batch.findMany({
      include: {
        branch: { select: { id: true, name: true, city: true } },
        course: { select: { title: true, slug: true } },
        trainer: { select: { name: true, email: true } },
        _count: { select: { enrollments: true, sessions: true } },
      },
      orderBy: { startDate: "desc" },
    });
    return NextResponse.json({ success: true, batches });
  } catch (err: any) {
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

    if (!hasAnyRole(session.role, [ROLES.SUPER_ADMIN, ROLES.BRANCH_MANAGER])) {
      return NextResponse.json({ success: false, error: "Forbidden: Insufficient batch creation permissions" }, { status: 403 });
    }

    const body = await req.json();
    const { name, code, mode, timing, startDate, capacity, branchId, courseId, trainerId } = body;

    if (!canAccessBranch(session, branchId)) {
      return NextResponse.json({ success: false, error: "Forbidden: Cannot create batches for another branch" }, { status: 403 });
    }

    const batch = await prisma.batch.create({
      data: {
        name,
        code,
        mode: mode || "Classroom",
        timing: timing || "Weekend",
        startDate: new Date(startDate),
        capacity: Number(capacity) || 30,
        status: "Upcoming",
        branchId: branchId || null,
        courseId,
        trainerId: trainerId || null,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "BATCH_CREATED",
        entityType: "Batch",
        entityId: batch.id,
        performedBy: `${session.name} (${session.email})`,
        details: JSON.stringify({ name, code, branchId, courseId }),
      },
    });

    return NextResponse.json({ success: true, batch });
  } catch (err: any) {
    console.error("Error creating batch:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
