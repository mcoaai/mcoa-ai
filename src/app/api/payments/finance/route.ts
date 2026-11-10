import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifySignedToken, hasAnyRole, ROLES, canAccessStudentRecord } from "@/lib/auth";

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
    const userId = searchParams.get("userId");

    // 1. If userId provided, check student ownership / staff access
    if (userId) {
      if (!canAccessStudentRecord(session, userId)) {
        return NextResponse.json(
          { success: false, error: "Forbidden: Cannot access another student's financial records" },
          { status: 403 }
        );
      }

      const orders = await prisma.paymentOrder.findMany({
        where: { userId },
        orderBy: { installmentNumber: "asc" },
      });

      const enrollment = await prisma.enrollment.findFirst({
        where: { userId },
        include: { course: true, batch: true },
      });

      return NextResponse.json({
        success: true,
        orders,
        enrollment,
      });
    }

    // 2. Otherwise, requester is asking for full academy finance ledger
    if (!hasAnyRole(session.role, [ROLES.SUPER_ADMIN, ROLES.FINANCE, ROLES.BRANCH_MANAGER])) {
      return NextResponse.json(
        { success: false, error: "Forbidden: Insufficient privileges for academy-wide financial overview" },
        { status: 403 }
      );
    }

    const isSuperAdmin = hasAnyRole(session.role, [ROLES.SUPER_ADMIN, ROLES.FINANCE]);

    const allOrders = await prisma.paymentOrder.findMany({
      where: isSuperAdmin
        ? undefined
        : {
            enrollment: {
              batch: {
                branchId: session.branchId || undefined,
              },
            },
          },
      include: {
        user: { select: { id: true, name: true, email: true, phone: true } },
        enrollment: {
          include: {
            course: { select: { title: true, slug: true } },
            batch: {
              include: { branch: { select: { name: true, city: true, id: true } } },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const paidOrders = allOrders.filter((o) => o.status === "Paid");
    const totalCollections = paidOrders.reduce((sum, o) => sum + o.amount, 0);

    const pendingOrders = allOrders.filter((o) => o.status !== "Paid");
    const pendingReceivables = pendingOrders.reduce((sum, o) => sum + o.amount, 0);

    const now = new Date();
    const overdueCount = allOrders.filter(
      (o) => o.status !== "Paid" && o.dueDate && new Date(o.dueDate) < now
    ).length;

    // Collections by Branch
    const collectionsByCampus: Record<string, number> = {};

    paidOrders.forEach((o) => {
      const campus = o.enrollment?.batch?.branch?.name || "Online / Central";
      collectionsByCampus[campus] = (collectionsByCampus[campus] || 0) + o.amount;
    });

    return NextResponse.json({
      success: true,
      metrics: {
        totalCollections,
        pendingReceivables,
        overdueCount,
        collectionsByCampus,
        totalOrdersCount: allOrders.length,
      },
      recentOrders: allOrders.slice(0, 20),
    });
  } catch (error: any) {
    console.error("Error fetching finance overview:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load financial records" },
      { status: 500 }
    );
  }
}
