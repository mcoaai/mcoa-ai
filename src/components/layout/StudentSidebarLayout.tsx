"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Code2,
  Award,
  TrendingUp,
  FileText,
  CalendarCheck,
  Briefcase,
  ShieldCheck,
  CreditCard,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
  GraduationCap,
  HelpCircle,
  Stethoscope,
} from "lucide-react";
import StudentCodingTutor from "@/components/ai/StudentCodingTutor";

interface StudentSidebarLayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  name: string;
  href: string;
  icon: any;
  badge?: string;
  badgeColor?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export default function StudentSidebarLayout({
  children,
}: StudentSidebarLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile drawer on route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Persist sidebar collapsed state
  useEffect(() => {
    const saved = localStorage.getItem("mcoa_student_sidebar_collapsed");
    if (saved !== null) {
      setCollapsed(saved === "true");
    }
  }, []);

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("mcoa_student_sidebar_collapsed", String(next));
      return next;
    });
  };

  const navSections: NavSection[] = [
    {
      title: "My Learning Space",
      items: [
        {
          name: "LMS Dashboard",
          href: "/student",
          icon: LayoutDashboard,
        },
        {
          name: "My Classroom",
          href: "/student/courses/advanced-medical-coding",
          icon: BookOpen,
          badge: "Active",
          badgeColor: "bg-mcoa-gold/20 text-mcoa-gold border-mcoa-gold/30",
        },
        {
          name: "Coding Simulator",
          href: "/practice",
          icon: Code2,
          badge: "Interactive",
          badgeColor: "bg-purple-500/20 text-purple-200 border-purple-500/30",
        },
        {
          name: "Mock Exam Arena",
          href: "/mock-exams",
          icon: Award,
          badge: "CPC®",
          badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        },
      ],
    },
    {
      title: "Performance & Submissions",
      items: [
        {
          name: "Readiness Analytics",
          href: "/student/analytics",
          icon: TrendingUp,
        },
        {
          name: "Chart Assignments",
          href: "/student/assignments",
          icon: FileText,
          badge: "1 Due",
          badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        },
        {
          name: "Live Attendance",
          href: "/student/attendance",
          icon: CalendarCheck,
          badge: "92%",
          badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        },
      ],
    },
    {
      title: "Career & Credentials",
      items: [
        {
          name: "Placement Cell",
          href: "/student/placements",
          icon: Briefcase,
          badge: "Drives",
          badgeColor: "bg-mcoa-gold/20 text-mcoa-gold border-mcoa-gold/30",
        },
        {
          name: "Certifications",
          href: "/student/certificates",
          icon: ShieldCheck,
        },
        {
          name: "Fee Ledger & Invoices",
          href: "/student/fees",
          icon: CreditCard,
        },
      ],
    },
  ];

  const isItemActive = (href: string) => {
    if (href === "/student") {
      return pathname === "/student";
    }
    return pathname.startsWith(href);
  };

  const currentItem = navSections
    .flatMap((s) => s.items)
    .find((item) => isItemActive(item.href));
  const pageTitle = currentItem?.name || "Student Learning Space";

  return (
    <div className="flex h-screen w-full bg-slate-50 font-inter overflow-hidden text-slate-800">
      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* ================= LEFT SIDEBAR ================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-gradient-to-b from-[#181136] via-[#1e1545] to-[#120a2e] text-white border-r border-mcoa-amethyst/30 transition-all duration-300 ease-in-out shadow-2xl lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0"
        } ${collapsed ? "lg:w-20" : "lg:w-64"}`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10 shrink-0">
          <Link
            href="/student"
            className={`flex items-center space-x-3 overflow-hidden ${
              collapsed ? "lg:justify-center w-full" : ""
            }`}
          >
            <div className="bg-white rounded-lg p-1.5 shadow-sm shrink-0">
              <Image
                src="/mcoa-logo.png"
                alt="MCOA Logo"
                width={collapsed ? 28 : 100}
                height={26}
                className="object-contain h-6 w-auto"
                priority
              />
            </div>

            {!collapsed && (
              <div className="min-w-0">
                <div className="flex items-center space-x-1.5">
                  <span className="font-montserrat font-bold text-xs uppercase tracking-wider text-mcoa-gold truncate">
                    Student LMS
                  </span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[10px] text-white/60 truncate font-mono">
                  Advanced Coding Hub
                </p>
              </div>
            )}
          </Link>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={toggleCollapsed}
            type="button"
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4 text-mcoa-gold" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-mcoa-gold" />
            )}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={() => setMobileOpen(false)}
            type="button"
            className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Student Progress Mini-Card */}
        <div className="p-3 shrink-0">
          {!collapsed ? (
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-2">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-mcoa-lavender to-mcoa-gold text-mcoa-midnight font-bold flex items-center justify-center text-xs shadow-md shrink-0">
                  SR
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">
                    Sneha Ramachandran
                  </p>
                  <p className="text-[10px] text-mcoa-gold font-mono truncate">
                    ID: MCOA-2026-CHN-0082
                  </p>
                </div>
              </div>

              {/* Course Progress bar */}
              <div className="pt-1">
                <div className="flex justify-between text-[10px] text-white/70 mb-1">
                  <span>Course Progress</span>
                  <span className="font-bold text-emerald-400">68%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-mcoa-lavender to-emerald-400 h-1.5 rounded-full"
                    style={{ width: "68%" }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center p-2 bg-white/5 rounded-xl border border-white/10"
              title="Sneha Ramachandran (ID: MCOA-2026-CHN-0082) - 68% Completed"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-mcoa-lavender to-mcoa-gold text-mcoa-midnight font-bold flex items-center justify-center text-xs shadow-md">
                SR
              </div>
              <span className="text-[9px] font-mono font-bold text-emerald-400 mt-1">
                68%
              </span>
            </div>
          )}
        </div>

        {/* Navigation Links Scrollable Area */}
        <div className="flex-1 overflow-y-auto px-3 py-1 space-y-5 custom-scrollbar">
          {navSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              {!collapsed && (
                <div className="px-3 pb-1 text-[10px] font-bold tracking-wider text-mcoa-lavender/70 uppercase">
                  {section.title}
                </div>
              )}

              {section.items.map((item) => {
                const active = isItemActive(item.href);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={collapsed ? item.name : undefined}
                    className={`group relative flex items-center rounded-xl text-xs font-medium transition-all duration-150 ${
                      collapsed
                        ? "justify-center py-2.5 px-2"
                        : "justify-between px-3 py-2.5"
                    } ${
                      active
                        ? "bg-gradient-to-r from-mcoa-amethyst/70 via-mcoa-midnight to-mcoa-amethyst/40 text-white font-semibold shadow-inner border-l-4 border-mcoa-gold"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <div
                      className={`flex items-center ${
                        collapsed ? "justify-center" : "space-x-3"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                          active
                            ? "text-mcoa-gold"
                            : "text-mcoa-lavender/80 group-hover:text-white"
                        }`}
                      />
                      {!collapsed && <span className="truncate">{item.name}</span>}
                    </div>

                    {!collapsed && item.badge && (
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider border ${
                          item.badgeColor ||
                          "bg-white/10 text-white/80 border-white/20"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}

                    {/* Floating Tooltip in Collapsed Mode */}
                    {collapsed && (
                      <div className="absolute left-full ml-3 px-2.5 py-1 bg-slate-900 text-white text-[11px] rounded-md shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                        {item.name}
                        {item.badge && (
                          <span className="ml-1.5 text-mcoa-gold text-[9px] font-mono">
                            [{item.badge}]
                          </span>
                        )}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}

          {/* Quick Shortcuts */}
          <div className="pt-2 border-t border-white/10 space-y-1">
            <Link
              href="/"
              target="_blank"
              className={`flex items-center text-xs text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition ${
                collapsed ? "justify-center p-2.5" : "space-x-3 px-3 py-2"
              }`}
              title="Academy Portal Home"
            >
              <ExternalLink className="w-4 h-4 text-white/60 shrink-0" />
              {!collapsed && <span className="truncate">Public Website</span>}
            </Link>
          </div>
        </div>

        {/* Sidebar Footer / Support & Logout */}
        <div className="p-3 border-t border-white/10 bg-black/20 shrink-0">
          {!collapsed ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-white/50">Student Support</p>
                <a
                  href="tel:+918072020716"
                  className="text-xs text-mcoa-gold font-semibold hover:underline"
                >
                  +91 8072020716
                </a>
              </div>
              <Link
                href="/login"
                className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition"
                title="Switch User / Logout"
              >
                <LogOut className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="flex justify-center">
              <Link
                href="/login"
                className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition"
                title="Switch User / Logout"
              >
                <LogOut className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </aside>

      {/* ================= RIGHT MAIN LAYOUT ================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Companion Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shrink-0 sticky top-0 z-30 shadow-xs">
          {/* Left: Mobile trigger & Breadcrumb */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileOpen(true)}
              type="button"
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
              aria-label="Open navigation drawer"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center space-x-2 text-xs text-slate-500">
                <span>Student LMS</span>
                <span>/</span>
                <span className="font-semibold text-mcoa-midnight">{pageTitle}</span>
              </div>
              <h1 className="text-sm sm:text-base font-bold text-slate-900 font-montserrat truncate">
                {pageTitle}
              </h1>
            </div>
          </div>

          {/* Right: AI Coding Tutor, Practice Shortcut, and Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3 text-xs">
            {/* Integrated Student Coding Tutor Widget Button */}
            <StudentCodingTutor />

            {/* Quick Practice Shortcut */}
            <Link
              href="/practice"
              className="hidden sm:inline-flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg font-medium transition"
            >
              <Code2 className="w-3.5 h-3.5 text-mcoa-amethyst" />
              <span>Simulator</span>
            </Link>

            {/* Mock Exam Shortcut */}
            <Link
              href="/mock-exams"
              className="hidden md:inline-flex items-center space-x-1.5 bg-gradient-to-r from-mcoa-gold to-amber-400 text-mcoa-midnight font-bold px-3 py-1.5 rounded-lg shadow-sm hover:brightness-105 transition"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Mock Exam</span>
            </Link>

            {/* Logout Shortcut */}
            <Link
              href="/login"
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </header>

        {/* Page Content Scroll Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50">
          <div className="max-w-7xl mx-auto w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
