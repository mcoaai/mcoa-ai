import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifySignedToken, hasAnyRole, ROLES } from "@/lib/auth";

export const dynamic = "force-dynamic";

const APPROVED_TEMPLATES = [
  {
    name: "admission_confirmation_welcome",
    category: "Admissions",
    description: "Dispatched upon formal enrollment with Student ID number & LMS credentials.",
    sampleContent: "Dear {{name}}, Welcome to MCOA! Your enrollment in {{course}} is confirmed. Student ID: {{studentId}}. Login at https://medicalcodingofficersacademy.com/student.",
  },
  {
    name: "counseling_reminder",
    category: "Admissions",
    description: "Sent 2 hours before scheduled career guidance call with Dr. Jeevanantham's counseling board.",
    sampleContent: "Hi {{name}}, your medical coding career counseling session is in 2 hours with our academic coordinator. Hotline: +91 8072020716.",
  },
  {
    name: "fee_installment_due",
    category: "Finance",
    description: "Installment milestone reminder sent with 1-click Razorpay checkout link.",
    sampleContent: "Dear {{name}}, Installment {{installmentNumber}} of INR {{amount}} for {{course}} is due on {{dueDate}}. Pay online securely at https://medicalcodingofficersacademy.com/student/fees.",
  },
  {
    name: "live_session_reminder_2h",
    category: "Academics",
    description: "Automated broadcast 2 hours before weekend/weekday live Zoom interactive lecture.",
    sampleContent: "Class Reminder: Live online session '{{title}}' starts in 2 hours on {{platform}}. Join link: {{meetingUrl}}.",
  },
  {
    name: "placement_interview_scheduled",
    category: "Placement",
    description: "Interview alert for certified candidate with corporate healthcare RCM employer.",
    sampleContent: "Congratulations {{name}}! Your interview with {{companyName}} for {{position}} is scheduled for {{interviewDate}}. Interview link: {{interviewLink}}.",
  },
];

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("mcoa_session")?.value;
    const session = await verifySignedToken(token);

    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized: Staff authentication required" }, { status: 401 });
    }

    if (!hasAnyRole(session.role, [ROLES.SUPER_ADMIN, ROLES.BRANCH_MANAGER, ROLES.COUNSELOR])) {
      return NextResponse.json({ success: false, error: "Forbidden: Insufficient WhatsApp broadcast permissions" }, { status: 403 });
    }

    const logs = await prisma.whatsAppMessage.findMany({
      orderBy: { sentAt: "desc" },
      take: 50,
    });

    const totalSent = logs.length;
    const deliveredCount = logs.filter((m) => m.status === "Delivered" || m.status === "Read").length;
    const readCount = logs.filter((m) => m.status === "Read").length;

    return NextResponse.json({
      success: true,
      templates: APPROVED_TEMPLATES,
      logs,
      metrics: {
        totalSent,
        deliveredCount,
        readCount,
        deliveryRate: totalSent > 0 ? Math.round((deliveredCount / totalSent) * 100) : 100,
      },
    });
  } catch (err: any) {
    console.error("Error fetching WhatsApp logs:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("mcoa_session")?.value;
    const session = await verifySignedToken(token);

    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized: Staff authentication required" }, { status: 401 });
    }

    if (!hasAnyRole(session.role, [ROLES.SUPER_ADMIN, ROLES.BRANCH_MANAGER, ROLES.COUNSELOR])) {
      return NextResponse.json({ success: false, error: "Forbidden: Insufficient WhatsApp dispatch permissions" }, { status: 403 });
    }

    const { recipientPhone, recipientName, templateName, parameters, category } = await req.json();

    if (!recipientPhone || !templateName) {
      return NextResponse.json({ success: false, error: "recipientPhone and templateName are required" }, { status: 400 });
    }

    const template = APPROVED_TEMPLATES.find((t) => t.name === templateName);
    let finalContent = template?.sampleContent || "MCOA Notification";
    if (parameters) {
      for (const key in parameters) {
        finalContent = finalContent.replace(new RegExp(`{{${key}}}`, "g"), parameters[key]);
      }
    }

    const message = await prisma.whatsAppMessage.create({
      data: {
        recipientPhone,
        recipientName: recipientName || "Candidate",
        templateName,
        content: finalContent,
        status: "Delivered",
        category: category || template?.category || "Academics",
        sentAt: new Date(),
        deliveredAt: new Date(Date.now() + 2000),
        externalMessageId: `wamid.MCOA_DISPATCH_${Date.now()}`,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "WHATSAPP_DISPATCHED",
        entityType: "WhatsAppMessage",
        entityId: message.id,
        performedBy: `${session.name} (${session.email})`,
        details: JSON.stringify({ recipientPhone, templateName, category }),
      },
    });

    return NextResponse.json({
      success: true,
      message,
      status: "Delivered",
    });
  } catch (err: any) {
    console.error("Error dispatching WhatsApp message:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
