import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifySignedToken, hasAnyRole, ROLES } from "@/lib/auth";
import { Users, Award, Calendar, CheckCircle2, ArrowRight, Building2, TrendingUp, ShieldAlert } from "lucide-react";

export const dynamic = "force-dynamic";

function maskPhone(phone: string | null | undefined): string {
  if (!phone) return "N/A";
  const clean = phone.trim();
  if (clean.length <= 4) return "****";
  return clean.slice(0, 4) + " •••• " + clean.slice(-2);
}

export default async function AdminOverviewPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("mcoa_session")?.value;
  const session = await verifySignedToken(token);

  if (!session) {
    redirect("/login?redirectTo=/admin");
  }

  if (!hasAnyRole(session.role, [ROLES.SUPER_ADMIN, ROLES.BRANCH_MANAGER])) {
    if (session.role === ROLES.COUNSELOR) {
      redirect("/admin/crm");
    }
    redirect("/login");
  }

  const isSuperAdmin = hasAnyRole(session.role, [ROLES.SUPER_ADMIN]);
  const branchFilter = isSuperAdmin ? {} : { branchId: session.branchId || undefined };

  const totalLeads = await prisma.lead.count({ where: branchFilter });
  const newLeads = await prisma.lead.count({ where: { ...branchFilter, status: "New" } });
  const scheduledLeads = await prisma.lead.count({
    where: {
      ...branchFilter,
      status: { in: ["Counseling Scheduled", "Demo Scheduled"] },
    },
  });
  const enrolledLeads = await prisma.lead.count({ where: { ...branchFilter, status: "Enrolled" } });

  const recentLeads = await prisma.lead.findMany({
    where: branchFilter,
    take: 6,
    orderBy: { createdAt: "desc" },
    include: {
      course: { select: { title: true } },
      branch: { select: { name: true, city: true } },
    },
  });

  const branches = await prisma.branch.findMany({
    where: isSuperAdmin ? {} : { id: session.branchId || undefined },
    include: {
      _count: {
        select: { leads: true },
      },
    },
  });

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-mcoa-midnight to-mcoa-amethyst rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-royal">
        <div>
          <span className="text-xs uppercase tracking-widest text-mcoa-gold font-bold">
            Executive Control Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-montserrat mt-1">
            Welcome, Dr. Jeevanantham
          </h1>
          <p className="text-xs text-white/80 mt-1 max-w-xl">
            Real-time admissions funnel, lead pipeline activity, and campus operations overview across Chennai, Perambalur, Coimbatore, and Karaikudi.
          </p>
        </div>

        <Link
          href="/admin/crm"
          className="px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-mcoa-gold text-mcoa-midnight hover:bg-[#e0b760] transition shadow-gold flex items-center space-x-1.5 shrink-0"
        >
          <span>Open Admissions CRM</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-xl border border-gray-200/90 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Inquiries</div>
            <div className="text-2xl font-bold text-mcoa-midnight font-montserrat mt-1">{totalLeads}</div>
            <div className="text-[11px] text-emerald-600 font-medium mt-1">Direct from Web & Forms</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-mcoa-pearl text-mcoa-amethyst flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200/90 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">New Actionable</div>
            <div className="text-2xl font-bold text-amber-600 font-montserrat mt-1">{newLeads}</div>
            <div className="text-[11px] text-gray-500 mt-1">Awaiting counselor call</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200/90 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Demos Scheduled</div>
            <div className="text-2xl font-bold text-mcoa-amethyst font-montserrat mt-1">{scheduledLeads}</div>
            <div className="text-[11px] text-mcoa-amethyst font-medium mt-1">Live counseling booked</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-mcoa-pearl text-mcoa-amethyst flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200/90 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Enrolled Students</div>
            <div className="text-2xl font-bold text-emerald-700 font-montserrat mt-1">{enrolledLeads}</div>
            <div className="text-[11px] text-emerald-600 font-medium mt-1">Confirmed batch seats</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 2-Column: Recent Leads Table & Branch Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Inquiries */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-montserrat font-bold text-base text-mcoa-midnight">
              Recent Inquiries & Applications
            </h2>
            <Link
              href="/admin/crm"
              className="text-xs font-bold text-mcoa-amethyst hover:underline"
            >
              View All in CRM →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-inter">
              <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Student Name</th>
                  <th className="py-2.5 px-3">Education</th>
                  <th className="py-2.5 px-3">Course</th>
                  <th className="py-2.5 px-3">Campus</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50/80">
                    <td className="py-3 px-3 font-semibold text-mcoa-midnight">
                      <div>{lead.fullName}</div>
                      <div className="text-[10px] text-gray-400 font-normal">{maskPhone(lead.phone)}</div>
                    </td>
                    <td className="py-3 px-3 text-gray-600">{lead.educationBackground}</td>
                    <td className="py-3 px-3 text-mcoa-amethyst font-medium">
                      {lead.course?.title || "General Coding"}
                    </td>
                    <td className="py-3 px-3 text-gray-500">
                      {lead.branch?.name || "Online / General"}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          lead.status === "New"
                            ? "bg-amber-100 text-amber-800"
                            : lead.status === "Enrolled"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-mcoa-pearl text-mcoa-amethyst"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Branch Inquiries Breakdown */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-mcoa-gold" />
            <h3 className="font-montserrat font-bold text-base text-mcoa-midnight">
              Campus Distribution
            </h3>
          </div>

          <div className="space-y-3">
            {branches.map((b) => (
              <div key={b.id} className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-mcoa-midnight">{b.name}</div>
                  <div className="text-[10px] text-gray-500">{b.city}</div>
                </div>
                <div className="text-sm font-bold text-mcoa-amethyst font-montserrat">
                  {b._count.leads} leads
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-center">
            <Link
              href="/admin/crm"
              className="text-xs font-semibold text-mcoa-midnight hover:text-mcoa-amethyst underline"
            >
              Filter CRM by Campus →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
