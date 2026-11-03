"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  CreditCard,
  CalendarCheck,
  Video,
  MessageSquare,
  Briefcase,
  Globe,
  Bot,
  TrendingUp,
  GraduationCap,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Search,
  ExternalLink,
  LogOut,
  Bell,
  PlusCircle,
  Building2,
  Sparkles,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";

interface AdminSidebarLayoutProps {
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

export default function AdminSidebarLayout({ children }: AdminSidebarLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navSearch, setNavSearch] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Persist sidebar state
  useEffect(() => {
    const saved = localStorage.getItem("mcoa_admin_sidebar_collapsed");
    if (saved !== null) {
      setCollapsed(saved === "true");
    }
  }, []);

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("mcoa_admin_sidebar_collapsed", String(next));
      return next;
    });
  };

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      console.error(e);
    } finally {
      router.push("/login");
    }
  };

  const navSections: NavSection[] = [
    {
      title: "CRM & Admissions",
      items: [
        {
          name: "Executive Overview",
          href: "/admin",
          icon: LayoutDashboard,
        },
        {
          name: "CRM Leads Pipeline",
          href: "/admin/crm",
          icon: Users,
          badge: "Active",
          badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        },
        {
          name: "Admissions Desk",
          href: "/admin/admissions",
          icon: ShieldCheck,
          badge: "Review",
          badgeColor: "bg-mcoa-gold/20 text-mcoa-gold border-mcoa-gold/30",
        },
      ],
    },
    {
      title: "Batches & Training",
      items: [
        {
          name: "Batch Management",
          href: "/admin/batches",
          icon: CalendarCheck,
        },
        {
          name: "Live Classes",
          href: "/admin/sessions",
          icon: Video,
          badge: "Live",
          badgeColor: "bg-red-500/20 text-red-300 border-red-500/30",
        },
        {
          name: "Faculty & Trainer View",
          href: "/trainer",
          icon: GraduationCap,
        },
      ],
    },
    {
      title: "Marketing & Growth",
      items: [
        {
          name: "WhatsApp Campaigns",
          href: "/admin/whatsapp",
          icon: MessageSquare,
          badge: "API",
          badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        },
        {
          name: "AI Admissions Desk",
          href: "/admin/ai",
          icon: Bot,
          badge: "AI",
          badgeColor: "bg-purple-400/20 text-purple-200 border-purple-400/30",
        },
        {
          name: "Landing Pages",
          href: "/admin/landing-pages",
          icon: Globe,
        },
      ],
    },
    {
      title: "Operations & Finance",
      items: [
        {
          name: "Finance & Fee Ledger",
          href: "/admin/finance",
          icon: CreditCard,
        },
        {
          name: "Corporate Placements",
          href: "/admin/placements",
          icon: Briefcase,
        },
        {
          name: "Analytics & Reports",
          href: "/admin/reports",
          icon: TrendingUp,
        },
      ],
    },
  ];

  // Filter sections when searching navigation
  const filteredSections = navSections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        item.name.toLowerCase().includes(navSearch.toLowerCase())
      ),
    }))
    .filter((section) => section.items.length > 0);

  // Helper to determine active state
  const isItemActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  // Find active title for breadcrumb
  const currentItem = navSections
    .flatMap((s) => s.items)
    .find((item) => isItemActive(item.href));
  const pageTitle = currentItem?.name || "Management Console";

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
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-gradient-to-b from-mcoa-midnight via-[#1a123a] to-[#120a28] text-white border-r border-mcoa-amethyst/30 transition-all duration-300 ease-in-out shadow-2xl lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0"
        } ${collapsed ? "lg:w-20" : "lg:w-64"}`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10 shrink-0">
          <Link
            href="/admin"
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
                    MCOA CRM
                  </span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[10px] text-white/60 truncate font-mono">
                  Executive Suite
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

        {/* Quick Nav Search (Expanded mode only) */}
        {!collapsed && (
          <div className="px-3 pt-3 pb-1 shrink-0">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                placeholder="Search CRM modules..."
                className="w-full bg-white/10 text-white placeholder-white/40 text-xs rounded-lg pl-8 pr-3 py-1.5 border border-white/10 focus:outline-hidden focus:border-mcoa-gold transition"
              />
              {navSearch && (
                <button
                  onClick={() => setNavSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Navigation Links Scrollable Area */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-5 custom-scrollbar">
          {filteredSections.map((section, idx) => (
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

          {/* Quick Switch to Student LMS */}
          <div className="pt-2 border-t border-white/10 space-y-1">
            <Link
              href="/student"
              className={`flex items-center text-xs text-mcoa-gold hover:text-white hover:bg-white/10 rounded-xl transition ${
                collapsed ? "justify-center p-2.5" : "space-x-3 px-3 py-2"
              }`}
              title="Switch to Student LMS"
            >
              <GraduationCap className="w-4 h-4 text-mcoa-gold shrink-0" />
              {!collapsed && (
                <div className="truncate">
                  <span className="block font-semibold">Student LMS</span>
                  <span className="text-[10px] text-white/50 block">Preview Learner Space</span>
                </div>
              )}
            </Link>

            <Link
              href="/"
              target="_blank"
              className={`flex items-center text-xs text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition ${
                collapsed ? "justify-center p-2.5" : "space-x-3 px-3 py-2"
              }`}
              title="Open Public Academy Website"
            >
              <ExternalLink className="w-4 h-4 text-white/60 shrink-0" />
              {!collapsed && <span className="truncate">Public Website</span>}
            </Link>
          </div>
        </div>

        {/* Sidebar Footer / Admin Profile */}
        <div className="p-3 border-t border-white/10 bg-black/20 shrink-0">
          <div
            className={`flex items-center ${
              collapsed ? "justify-center" : "justify-between"
            }`}
          >
            {!collapsed ? (
              <div className="flex items-center space-x-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-mcoa-gold to-amber-200 text-mcoa-midnight font-bold flex items-center justify-center text-xs shadow-md shrink-0">
                  JM
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">
                    Dr. Jeevanantham
                  </p>
                  <p className="text-[10px] text-mcoa-gold font-mono truncate">
                    Super Admin / CEO
                  </p>
                </div>
              </div>
            ) : (
              <div
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-mcoa-gold to-amber-200 text-mcoa-midnight font-bold flex items-center justify-center text-xs shadow-md shrink-0"
                title="Dr. Jeevanantham Mariappan (Super Admin)"
              >
                JM
              </div>
            )}

            {!collapsed && (
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                type="button"
                className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition"
                title="Sign out of Admin Portal"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
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
                <span>CRM Management</span>
                <span>/</span>
                <span className="font-semibold text-mcoa-midnight">{pageTitle}</span>
              </div>
              <h1 className="text-sm sm:text-base font-bold text-slate-900 font-montserrat truncate">
                {pageTitle}
              </h1>
            </div>
          </div>

          {/* Right: Actions, Network Status, and User Badge */}
          <div className="flex items-center space-x-2 sm:space-x-3 text-xs">
            {/* Campus Status Pill */}
            <div className="hidden xl:flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-200 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>4 Campuses Synced (CHN, PRB, CJB, KRD)</span>
            </div>

            {/* Quick Action: New Lead */}
            <Link
              href="/admin/crm"
              className="hidden sm:inline-flex items-center space-x-1.5 bg-mcoa-midnight hover:bg-mcoa-amethyst text-white px-3.5 py-1.5 rounded-lg font-semibold shadow-sm transition"
            >
              <PlusCircle className="w-3.5 h-3.5 text-mcoa-gold" />
              <span>Admissions Pipeline</span>
            </Link>

            {/* View Public Site Shortcut */}
            <Link
              href="/"
              target="_blank"
              className="hidden md:flex items-center space-x-1 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition"
              title="Preview Public Website"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Site</span>
            </Link>

            {/* Logout Shortcut */}
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
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
