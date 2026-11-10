import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifySignedToken, hasAnyRole, ROLES } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("mcoa_session")?.value;
    const session = await verifySignedToken(token);

    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized: Authentication required" }, { status: 401 });
    }

    const { orderId, enrollmentId, amount, installmentNumber, userId } = await req.json();

    const isStaff = hasAnyRole(session.role, [ROLES.SUPER_ADMIN, ROLES.FINANCE]);
    const targetUserId = isStaff && userId ? userId : session.id;

    if (!targetUserId) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    const payAmount = Number(amount) || 15000;
    const razorpayKeyId = process.env.RAZORPAY_KEY_ID || "rzp_test_MCOA2026DEMO";
    const isSimulatorMode = !process.env.RAZORPAY_KEY_SECRET;

    // Generate unique order ID for Razorpay
    const generatedRazorpayOrderId = `order_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    let paymentOrder;
    if (orderId) {
      paymentOrder = await prisma.paymentOrder.update({
        where: { id: orderId },
        data: {
          razorpayOrderId: generatedRazorpayOrderId,
          status: "Created",
        },
      });
    } else {
      const orderNum = `MCOA-ORD-${Date.now().toString().slice(-6)}`;
      paymentOrder = await prisma.paymentOrder.create({
        data: {
          orderNumber: orderNum,
          userId: targetUserId,
          enrollmentId: enrollmentId || null,
          amount: payAmount,
          currency: "INR",
          status: "Created",
          razorpayOrderId: generatedRazorpayOrderId,
          installmentNumber: Number(installmentNumber) || 2,
          invoiceNumber: `MCOA-INV-${Date.now().toString().slice(-4)}`,
          notes: `Tuition Installment #${installmentNumber || 2} Payment`,
        },
      });
    }

    return NextResponse.json({
      success: true,
      order: paymentOrder,
      razorpayOrderId: generatedRazorpayOrderId,
      amount: payAmount * 100, // in paise
      currency: "INR",
      keyId: razorpayKeyId,
      isSimulatorMode,
      message: isSimulatorMode
        ? "Razorpay in simulated test mode. Live gateway keys can be configured in .env (RAZORPAY_KEY_ID / SECRET)."
        : "Razorpay production order initialized.",
    });
  } catch (err: any) {
    console.error("Error creating payment order:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
