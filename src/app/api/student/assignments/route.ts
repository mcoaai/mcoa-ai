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
      return NextResponse.json({ success: false, error: "Unauthorized: Student authentication required" }, { status: 401 });
    }

    const { assignmentId, userId, content } = await req.json();

    if (!assignmentId || !content) {
      return NextResponse.json({ success: false, error: "assignmentId and content required" }, { status: 400 });
    }

    // A student can ONLY submit for their own user ID
    let targetUserId = session.id;
    const isStaff = hasAnyRole(session.role, [ROLES.SUPER_ADMIN, ROLES.TRAINER]);

    if (userId && isStaff) {
      targetUserId = userId;
    } else if (userId && userId !== session.id) {
      return NextResponse.json(
        { success: false, error: "Forbidden: Cannot submit assignments on behalf of another student" },
        { status: 403 }
      );
    }

    const submission = await prisma.assignmentSubmission.create({
      data: {
        assignmentId,
        userId: targetUserId,
        content,
      },
    });

    return NextResponse.json({ success: true, submission });
  } catch (err: any) {
    console.error("Error submitting assignment:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
