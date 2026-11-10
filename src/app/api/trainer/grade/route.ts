import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifySignedToken, hasAnyRole, ROLES } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("mcoa_session")?.value;
    const session = await verifySignedToken(token);

    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized: Trainer authentication required" }, { status: 401 });
    }

    if (!hasAnyRole(session.role, [ROLES.SUPER_ADMIN, ROLES.TRAINER])) {
      return NextResponse.json({ success: false, error: "Forbidden: Only faculty/trainers can grade assignments" }, { status: 403 });
    }

    const { submissionId, score, feedback } = await req.json();

    if (!submissionId || score === undefined) {
      return NextResponse.json({ success: false, error: "submissionId and score required" }, { status: 400 });
    }

    const numScore = Number(score);
    if (isNaN(numScore) || numScore < 0 || numScore > 100) {
      return NextResponse.json({ success: false, error: "Score must be a number between 0 and 100" }, { status: 400 });
    }

    const existing = await prisma.assignmentSubmission.findUnique({
      where: { id: submissionId },
      include: { user: true },
    });

    if (!existing) {
      return NextResponse.json({ success: false, error: "Submission not found" }, { status: 404 });
    }

    const updated = await prisma.assignmentSubmission.update({
      where: { id: submissionId },
      data: {
        score: numScore,
        feedback: feedback || null,
        gradedAt: new Date(),
        gradedBy: session.name || session.email,
      },
    });

    // Record audit log
    await prisma.auditLog.create({
      data: {
        action: "ASSIGNMENT_GRADED",
        entityType: "AssignmentSubmission",
        entityId: submissionId,
        performedBy: session.email,
        details: JSON.stringify({
          studentId: existing.userId,
          score: numScore,
          grader: session.email,
        }),
      },
    });

    return NextResponse.json({ success: true, submission: updated });
  } catch (err: any) {
    console.error("Error grading submission:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
