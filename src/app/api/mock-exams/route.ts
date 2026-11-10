import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifySignedToken, hasAnyRole, ROLES } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug") || "cpc-diagnostic-sprint-2026";

    const exam = await prisma.mockExam.findUnique({
      where: { slug },
      include: {
        questions: {
          orderBy: { id: "asc" },
        },
      },
    });

    if (!exam) {
      return NextResponse.json({ success: false, error: "Mock Exam not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, exam });
  } catch (err: any) {
    console.error("Error fetching mock exam:", err);
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

    const { examId, answers, timeSpentSeconds, userId } = await req.json();

    if (!examId || !answers) {
      return NextResponse.json({ success: false, error: "examId and answers required" }, { status: 400 });
    }

    const isStaff = hasAnyRole(session.role, [ROLES.SUPER_ADMIN, ROLES.TRAINER]);
    const targetUserId = isStaff && userId ? userId : session.id;

    const exam = await prisma.mockExam.findUnique({
      where: { id: examId },
      include: { questions: true },
    });

    if (!exam) {
      return NextResponse.json({ success: false, error: "Exam not found" }, { status: 404 });
    }

    let correctCount = 0;
    const totalQuestions = exam.questions.length;
    const domainScores: Record<string, { correct: number; total: number; percent: number }> = {};
    const questionReview = [];

    for (const q of exam.questions) {
      const userSelected = answers[q.id];
      const isCorrect = Number(userSelected) === q.correctOptionIndex;
      if (isCorrect) correctCount++;

      // Track domain scores
      if (!domainScores[q.domain]) {
        domainScores[q.domain] = { correct: 0, total: 0, percent: 0 };
      }
      domainScores[q.domain].total += 1;
      if (isCorrect) domainScores[q.domain].correct += 1;

      questionReview.push({
        id: q.id,
        domain: q.domain,
        questionText: q.questionText,
        scenarioText: q.scenarioText,
        options: JSON.parse(q.options),
        userSelected,
        correctOptionIndex: q.correctOptionIndex,
        isCorrect,
        explanation: q.explanation,
        guidelineRef: q.guidelineRef,
      });
    }

    // Calculate domain percentages
    for (const dom in domainScores) {
      domainScores[dom].percent = Math.round(
        (domainScores[dom].correct / domainScores[dom].total) * 100
      );
    }

    const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const passed = percentage >= exam.passingScorePercent;

    const attempt = await prisma.examAttempt.create({
      data: {
        examId,
        userId: targetUserId,
        score: correctCount,
        total: totalQuestions,
        percentage,
        passed,
        domainScores: JSON.stringify(domainScores),
        answers: JSON.stringify(answers),
        timeSpentSeconds: timeSpentSeconds || 600,
      },
    });

    return NextResponse.json({
      success: true,
      attemptId: attempt.id,
      score: correctCount,
      total: totalQuestions,
      percentage,
      passed,
      domainScores,
      questionReview,
    });
  } catch (err: any) {
    console.error("Error evaluating mock exam:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
