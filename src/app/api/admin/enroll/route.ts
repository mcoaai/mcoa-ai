import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { leadId, courseId, batchId, totalFee, paidFee } = await req.json();

    if (!leadId) {
      return NextResponse.json({ success: false, error: "leadId is required" }, { status: 400 });
    }

    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      include: { branch: true },
    });

    if (!lead) {
      return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 });
    }

    // Check if user already exists for this email
    let user = await prisma.user.findUnique({
      where: { email: lead.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: lead.email,
          name: lead.fullName,
          phone: lead.phone,
          passwordHash: "mcoa-student-secure-hash",
          role: "Student",
          branchId: lead.branchId,
        },
      });
    }

    // Generate unique Student ID Number (e.g. MCOA-2026-CHN-0104)
    const branchCode = lead.branch?.code?.slice(0, 3) || "CHN";
    const totalEnrollments = await prisma.enrollment.count();
    const studentIdNumber = `MCOA-2026-${branchCode}-${String(totalEnrollments + 101).padStart(4, "0")}`;

    // Target course
    const targetCourseId = courseId || lead.courseId;
    if (!targetCourseId) {
      return NextResponse.json({ success: false, error: "Course ID required" }, { status: 400 });
    }

    const course = await prisma.course.findUnique({ where: { id: targetCourseId } });
    const feeToCharge = totalFee || course?.discountFeeInr || course?.feeInr || 9500;

    const enrollment = await prisma.enrollment.create({
      data: {
        studentIdNumber,
        userId: user.id,
        courseId: targetCourseId,
        batchId: batchId || null,
        status: "Active",
        totalFee: feeToCharge,
        paidFee: paidFee || feeToCharge,
        progressPercent: 0,
      },
    });

    // Update lead status to Enrolled
    await prisma.lead.update({
      where: { id: leadId },
      data: { status: "Enrolled" },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        action: "ENROLLMENT_APPROVED",
        entityType: "Enrollment",
        entityId: enrollment.id,
        performedBy: "Admissions Desk",
        details: JSON.stringify({
          studentIdNumber,
          studentName: user.name,
          fee: feeToCharge,
        }),
      },
    });

    return NextResponse.json({
      success: true,
      enrollment,
      studentIdNumber,
      message: `Student successfully enrolled with ID ${studentIdNumber}`,
    });
  } catch (err: any) {
    console.error("Error creating enrollment:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
