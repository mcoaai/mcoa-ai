import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifySignedToken, canAccessStudentRecord } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("mcoa_session")?.value;
    const session = await verifySignedToken(token);

    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized: Authentication required" }, { status: 401 });
    }

    const { lessonId, userId, completed } = await req.json();

    if (!lessonId) {
      return NextResponse.json({ success: false, error: "lessonId required" }, { status: 400 });
    }

    const targetUserId = userId || session.id;

    if (!canAccessStudentRecord(session, targetUserId)) {
      return NextResponse.json(
        { success: false, error: "Forbidden: Cannot update progress for another student" },
        { status: 403 }
      );
    }

    const progress = await prisma.lessonProgress.upsert({
      where: {
        lessonId_userId: {
          lessonId,
          userId: targetUserId,
        },
      },
      update: {
        completed: completed !== undefined ? completed : true,
        completedAt: new Date(),
      },
      create: {
        lessonId,
        userId: targetUserId,
        completed: completed !== undefined ? completed : true,
        completedAt: new Date(),
      },
    });

    // Update overall course enrollment progress percent
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { module: true },
    });

    if (lesson) {
      const totalLessons = await prisma.lesson.count({
        where: { module: { courseId: lesson.module.courseId } },
      });

      const completedLessons = await prisma.lessonProgress.count({
        where: {
          userId: targetUserId,
          completed: true,
          lesson: { module: { courseId: lesson.module.courseId } },
        },
      });

      const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

      await prisma.enrollment.updateMany({
        where: {
          userId: targetUserId,
          courseId: lesson.module.courseId,
        },
        data: {
          progressPercent,
        },
      });
    }

    return NextResponse.json({ success: true, progress });
  } catch (err: any) {
    console.error("Error updating lesson progress:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
