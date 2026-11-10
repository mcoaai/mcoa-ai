import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifySignedToken, hasAnyRole, ROLES, canAccessBranch } from "@/lib/auth";
import { z } from "zod";

const leadSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(8, "Valid phone number required"),
  educationBackground: z.string(),
  courseSlug: z.string().optional(),
  branchCode: z.string().optional(),
  mode: z.string().default("Live Interactive Online"),
  preferredBatch: z.string().default("Weekend"),
  notes: z.string().optional(),
  source: z.string().default("Website Inquiry"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = leadSchema.parse(body);

    // Find course if specified
    let courseId: string | null = null;
    if (validated.courseSlug) {
      const course = await prisma.course.findUnique({
        where: { slug: validated.courseSlug },
      });
      if (course) courseId = course.id;
    }

    // Find branch if specified
    let branchId: string | null = null;
    if (validated.branchCode) {
      const branch = await prisma.branch.findFirst({
        where: {
          OR: [{ id: validated.branchCode }, { code: validated.branchCode }],
        },
      });
      if (branch) branchId = branch.id;
    }

    // Find default counselor
    const counselor = await prisma.user.findFirst({
      where: { role: "Admissions Counselor" },
    });

    const lead = await prisma.lead.create({
      data: {
        fullName: validated.fullName,
        email: validated.email,
        phone: validated.phone,
        educationBackground: validated.educationBackground,
        mode: validated.mode,
        preferredBatch: validated.preferredBatch,
        status: "New",
        source: validated.source,
        notes: validated.notes || null,
        courseId,
        branchId,
        assignedCounselorId: counselor ? counselor.id : null,
      },
    });

    // Create an audit entry
    await prisma.auditLog.create({
      data: {
        action: "LEAD_CREATED",
        entityType: "Lead",
        entityId: lead.id,
        performedBy: "Public Form",
        details: JSON.stringify({
          fullName: lead.fullName,
          email: lead.email,
          phone: lead.phone,
          course: validated.courseSlug,
        }),
      },
    });

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      message: "Lead successfully recorded in CRM",
    });
  } catch (error: any) {
    console.error("Error creating lead:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0]?.message || "Validation failed" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Internal server error saving lead" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("mcoa_session")?.value;
    const session = await verifySignedToken(token);

    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized: Staff authentication required" }, { status: 401 });
    }

    if (!hasAnyRole(session.role, [ROLES.SUPER_ADMIN, ROLES.BRANCH_MANAGER, ROLES.COUNSELOR])) {
      return NextResponse.json({ success: false, error: "Forbidden: Insufficient CRM access permissions" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const requestedBranchId = searchParams.get("branchId");
    const search = searchParams.get("search");

    const isSuperAdmin = hasAnyRole(session.role, [ROLES.SUPER_ADMIN]);

    // Enforce branch boundaries: Non-superadmins CANNOT query other branches
    if (!isSuperAdmin && session.branchId) {
      if (requestedBranchId && requestedBranchId !== "ALL" && requestedBranchId !== session.branchId) {
        return NextResponse.json(
          { success: false, error: "Forbidden: You cannot access leads outside your assigned branch" },
          { status: 403 }
        );
      }
    }

    const where: any = {};

    if (status && status !== "ALL") {
      where.status = status;
    }

    if (!isSuperAdmin && session.branchId) {
      where.branchId = session.branchId;
    } else if (requestedBranchId && requestedBranchId !== "ALL") {
      where.branchId = requestedBranchId;
    }

    if (search) {
      where.OR = [
        { fullName: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
      ];
    }

    const leads = await prisma.lead.findMany({
      where,
      include: {
        course: { select: { title: true, slug: true } },
        branch: { select: { name: true, city: true } },
        assignedCounselor: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    // Funnel counts scoped to allowed branch
    const countsByStatus = await prisma.lead.groupBy({
      by: ["status"],
      where: where.branchId ? { branchId: where.branchId } : undefined,
      _count: { _all: true },
    });

    return NextResponse.json({
      success: true,
      leads,
      countsByStatus,
      total: leads.length,
    });
  } catch (error: any) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("mcoa_session")?.value;
    const session = await verifySignedToken(token);

    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized: Staff authentication required" }, { status: 401 });
    }

    if (!hasAnyRole(session.role, [ROLES.SUPER_ADMIN, ROLES.BRANCH_MANAGER, ROLES.COUNSELOR])) {
      return NextResponse.json({ success: false, error: "Forbidden: Insufficient CRM access permissions" }, { status: 403 });
    }

    const body = await req.json();
    const { leadId, status, notes, assignedCounselorId } = body;

    if (!leadId) {
      return NextResponse.json(
        { success: false, error: "leadId is required" },
        { status: 400 }
      );
    }

    // Verify lead existence and branch ownership
    const existingLead = await prisma.lead.findUnique({
      where: { id: leadId },
    });

    if (!existingLead) {
      return NextResponse.json({ success: false, error: "Lead record not found" }, { status: 404 });
    }

    const isSuperAdmin = hasAnyRole(session.role, [ROLES.SUPER_ADMIN]);
    if (!isSuperAdmin && session.branchId && existingLead.branchId && existingLead.branchId !== session.branchId) {
      return NextResponse.json(
        { success: false, error: "Forbidden: Cannot modify lead records from another branch" },
        { status: 403 }
      );
    }

    const updateData: any = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;
    if (assignedCounselorId) updateData.assignedCounselorId = assignedCounselorId;

    const updated = await prisma.lead.update({
      where: { id: leadId },
      data: updateData,
    });

    // Record detailed audit log with authenticated actor identity
    await prisma.auditLog.create({
      data: {
        action: "LEAD_STATUS_CHANGED",
        entityType: "Lead",
        entityId: leadId,
        performedBy: session.email,
        details: JSON.stringify({
          ...updateData,
          actorRole: session.role,
          actorBranch: session.branchId,
        }),
      },
    });

    return NextResponse.json({
      success: true,
      lead: updated,
    });
  } catch (error: any) {
    console.error("Error updating lead:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update lead status" },
      { status: 500 }
    );
  }
}
