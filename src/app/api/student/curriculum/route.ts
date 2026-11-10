import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifySignedToken } from "@/lib/auth";

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
    const courseSlug = searchParams.get("slug") || "advanced-medical-coding";

    const course = await prisma.course.findUnique({
      where: { slug: courseSlug },
      include: {
        modules: {
          orderBy: { order: "asc" },
          include: {
            lessons: {
              orderBy: { order: "asc" },
              include: {
                progress: {
                  where: { userId: session.id },
                },
              },
            },
          },
        },
      },
    });

    if (!course) {
      return NextResponse.json({ success: false, error: "Course not found" }, { status: 404 });
    }

    // Format modules with student completion status
    const formattedModules = course.modules.map((mod) => ({
      id: mod.id,
      title: mod.title,
      order: mod.order,
      lessons: mod.lessons.map((les) => {
        const isCompleted = les.progress.some((p) => p.completed);
        return {
          id: les.id,
          title: les.title,
          order: les.order,
          duration: les.duration,
          videoUrl: les.videoUrl,
          content: les.content,
          pdfUrl: les.pdfUrl,
          completed: isCompleted,
        };
      }),
    }));

    return NextResponse.json({ success: true, modules: formattedModules });
  } catch (err: any) {
    console.error("Error fetching curriculum:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
