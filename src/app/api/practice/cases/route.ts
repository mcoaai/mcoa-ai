import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifySignedToken, hasAnyRole, ROLES } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const slug = searchParams.get("slug");

    if (slug) {
      const practiceCase = await prisma.practiceCase.findUnique({
        where: { slug },
      });
      if (!practiceCase) {
        return NextResponse.json({ success: false, error: "Case not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, case: practiceCase });
    }

    const where: any = {};
    if (category && category !== "ALL") {
      where.category = category;
    }

    const cases = await prisma.practiceCase.findMany({
      where,
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ success: true, cases });
  } catch (err: any) {
    console.error("Error fetching practice cases:", err);
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

    const { caseId, userCodes, timeSpent, userId } = await req.json();

    if (!caseId || !userCodes) {
      return NextResponse.json({ success: false, error: "caseId and userCodes required" }, { status: 400 });
    }

    // IDOR protection: Students can only submit for themselves. Staff can test for a specific student.
    const isStaff = hasAnyRole(session.role, [ROLES.SUPER_ADMIN, ROLES.TRAINER]);
    const targetUserId = isStaff && userId ? userId : session.id;

    const practiceCase = await prisma.practiceCase.findUnique({ where: { id: caseId } });
    if (!practiceCase) {
      return NextResponse.json({ success: false, error: "Case not found" }, { status: 404 });
    }

    // Compare primary code
    const recommended = JSON.parse(practiceCase.recommendedCodes);
    const userSubmitted = typeof userCodes === "string" ? JSON.parse(userCodes) : userCodes;

    const isPrimaryMatch =
      recommended.primaryDiagnosis?.trim().toLowerCase() ===
      userSubmitted.primaryDiagnosis?.trim().toLowerCase();

    const attempt = await prisma.practiceAttempt.create({
      data: {
        caseId,
        userId: targetUserId,
        userCodes: typeof userCodes === "string" ? userCodes : JSON.stringify(userCodes),
        isCorrect: isPrimaryMatch,
        timeSpent: timeSpent || 60,
      },
    });

    return NextResponse.json({
      success: true,
      attempt,
      isCorrect: isPrimaryMatch,
      recommendedCodes: recommended,
      rationale: practiceCase.rationale,
      commonPitfalls: practiceCase.commonPitfalls,
      guidelineRef: practiceCase.guidelineRef,
    });
  } catch (err: any) {
    console.error("Error submitting practice attempt:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
