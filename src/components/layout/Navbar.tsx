"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Phone,
  MessageCircle,
  Menu,
  X,
  ChevronDown,
  GraduationCap,
  MapPin,
  ShieldCheck,
  Laptop,
  FileCheck,
  Video,
  BookOpen,
  ArrowRight,
  Sparkles,
  Award,
} from "lucide-react";
import { openCounselorModal } from "@/components/common/LeadInquiryModal";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coursesDropdown, setCoursesDropdown] = useState(false);
  const [portalDropdown, setPortalDropdown] = useState(false);
  const [mobilePortalOpen, setMobilePortalOpen] = useState(false);

  // Hide public marketing navbar on Admin, Student LMS, and Trainer dashboards
  if (
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/student") ||
    pathname?.startsWith("/trainer")
  ) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-mcoa-pearl shadow-sm font-inter">
      {/* Top Notification & Hotline Strip */}
      <div className="bg-mcoa-midnight text-white text-xs py-2 px-4 border-b border-mcoa-amethyst/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-3 text-center sm:text-left">
            <span className="bg-mcoa-gold text-mcoa-midnight font-bold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase font-montserrat">
              Admissions Open
            </span>
            <span className="hidden md:inline text-white/90 text-xs">
              Upcoming Batches: AAPC CPC®, AHIMA CCS® & Advanced Medical Coding Masterclass
            </span>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4 text-xs font-medium">
            <a
              href="tel:+918072020716"
              className="flex items-center space-x-1.5 text-mcoa-gold hover:text-white transition"
              title="Direct Counselor Hotline"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+91 8072020716</span>
            </a>
            <span className="text-white/30 hidden sm:inline">|</span>
            <a
              href="https://wa.me/918072020716?text=Hi%20MCOA%20Team%2C%20I%20would%20like%20to%20know%20more%20about%20Medical%20Coding%20Courses"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 transition"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <span className="text-white/30 hidden sm:inline">|</span>
            <Link
              href="/login"
              className="flex items-center space-x-1 text-white/80 hover:text-mcoa-gold transition"
              title="Student & Staff Login"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Login</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Canonical Logo */}
        <Link href="/" className="flex items-center space-x-3 group shrink-0">
          <div className="relative w-44 sm:w-52 h-14 flex items-center">
            <Image
              src="/mcoa-logo.png"
              alt="MCOA - Medical Coding Officers Academy"
              width={260}
              height={70}
              priority
              className="object-contain max-h-14 w-auto drop-shadow-sm group-hover:scale-[1.02] transition-transform duration-200"
            />
          </div>
        </Link>

        {/* Streamlined Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-6 font-montserrat text-sm font-semibold text-mcoa-slate">
          <Link
            href="/"
            className={`transition py-2 ${
              pathname === "/" ? "text-mcoa-amethyst font-bold" : "hover:text-mcoa-amethyst"
            }`}
          >
            Home
          </Link>

          {/* Courses Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setCoursesDropdown(true)}
            onMouseLeave={() => setCoursesDropdown(false)}
          >
            <Link
              href="/courses"
              className={`flex items-center space-x-1 transition py-2 ${
                pathname?.startsWith("/courses")
                  ? "text-mcoa-amethyst font-bold"
                  : "hover:text-mcoa-amethyst"
              }`}
            >
              <span>Courses</span>
              <ChevronDown className="w-4 h-4 text-mcoa-amethyst/70" />
            </Link>

            {coursesDropdown && (
              <div className="absolute top-full left-0 w-84 bg-white rounded-2xl shadow-royal border border-mcoa-pearl p-3 animate-fadeIn z-50">
                <div className="text-[11px] font-bold text-mcoa-amethyst uppercase tracking-wider px-3 py-1.5">
                  Core Programs & Certifications
                </div>

                <Link
                  href="/courses/advanced-medical-coding"
                  className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-mcoa-pearl transition"
                >
                  <Award className="w-5 h-5 text-mcoa-gold shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-mcoa-midnight">
                      Advanced Medical Coding Masterclass
                    </div>
                    <div className="text-[11px] text-gray-500 font-normal">
                      Flagship 90-day comprehensive training with placement assistance
                    </div>
                  </div>
                </Link>

                <Link
                  href="/courses/cpc-certification-prep"
                  className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-mcoa-pearl transition"
                >
                  <GraduationCap className="w-5 h-5 text-mcoa-amethyst shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-mcoa-midnight">
                      CPC® Exam Prep (AAPC)
                    </div>
                    <div className="text-[11px] text-gray-500 font-normal">
                      Gold-standard outpatient physician coding credential
                    </div>
                  </div>
                </Link>

                <Link
                  href="/courses/ccs-certification-prep"
                  className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-mcoa-pearl transition"
                >
                  <GraduationCap className="w-5 h-5 text-mcoa-lavender shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-mcoa-midnight">
                      CCS® Inpatient Prep (AHIMA)
                    </div>
                    <div className="text-[11px] text-gray-500 font-normal">
                      ICD-10-PCS & MS-DRG hospital inpatient coding
                    </div>
                  </div>
                </Link>

                <Link
                  href="/courses/crc-risk-adjustment"
                  className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-mcoa-pearl transition"
                >
                  <GraduationCap className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-mcoa-midnight">
                      CRC® Risk Adjustment (AAPC)
                    </div>
                    <div className="text-[11px] text-gray-500 font-normal">
                      CMS-HCC & Chronic disease risk scoring
                    </div>
                  </div>
                </Link>

                <div className="border-t border-mcoa-pearl my-1.5"></div>
                <div className="text-center pt-1.5 pb-1">
                  <Link
                    href="/courses"
                    className="text-xs font-bold text-mcoa-amethyst hover:text-mcoa-midnight flex items-center justify-center space-x-1"
                  >
                    <span>Explore All 11+ Courses</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/why-mcoa"
            className={`transition py-2 ${
              pathname === "/why-mcoa"
                ? "text-mcoa-amethyst font-bold"
                : "hover:text-mcoa-amethyst"
            }`}
          >
            Why MCOA
          </Link>

          <Link
            href="/contact"
            className={`transition py-2 flex items-center space-x-1 ${
              pathname === "/contact"
                ? "text-mcoa-amethyst font-bold"
                : "hover:text-mcoa-amethyst"
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-mcoa-amethyst" />
            <span>Campuses</span>
          </Link>

          <Link
            href="/founder"
            className={`transition py-2 ${
              pathname === "/founder"
                ? "text-mcoa-amethyst font-bold"
                : "hover:text-mcoa-amethyst"
            }`}
          >
            About Founder
          </Link>

          {/* Grouped Student Portal & Learning Tools Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setPortalDropdown(true)}
            onMouseLeave={() => setPortalDropdown(false)}
          >
            <button
              className={`flex items-center space-x-1.5 transition py-2 ${
                pathname?.startsWith("/practice") ||
                pathname?.startsWith("/mock-exams") ||
                pathname?.startsWith("/webinars") ||
                pathname?.startsWith("/student")
                  ? "text-mcoa-amethyst font-bold"
                  : "hover:text-mcoa-amethyst"
              }`}
            >
              <GraduationCap className="w-4 h-4 text-mcoa-amethyst" />
              <span>Student Portal</span>
              <ChevronDown className="w-4 h-4 text-mcoa-amethyst/70" />
            </button>

            {portalDropdown && (
              <div className="absolute top-full right-0 w-80 bg-white rounded-2xl shadow-royal border border-mcoa-pearl p-3 animate-fadeIn z-50">
                <div className="text-[11px] font-bold text-mcoa-amethyst uppercase tracking-wider px-3 py-1.5">
                  Learning Tools & LMS
                </div>

                <Link
                  href="/student"
                  className="flex items-start space-x-3 p-2.5 rounded-xl bg-mcoa-pearl/70 hover:bg-mcoa-pearl transition"
                >
                  <GraduationCap className="w-5 h-5 text-mcoa-midnight shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-mcoa-midnight">Student LMS Login</div>
                    <div className="text-[11px] text-gray-600 font-normal">
                      Access enrolled courses, recorded lectures & assignments
                    </div>
                  </div>
                </Link>

                <Link
                  href="/practice"
                  className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-mcoa-pearl transition mt-1"
                >
                  <Laptop className="w-5 h-5 text-mcoa-amethyst shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-mcoa-midnight">Practice Simulator</div>
                    <div className="text-[11px] text-gray-500 font-normal">
                      100+ simulated hospital encounter charts & E&M calculator
                    </div>
                  </div>
                </Link>

                <Link
                  href="/mock-exams"
                  className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-mcoa-pearl transition"
                >
                  <FileCheck className="w-5 h-5 text-mcoa-gold shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-mcoa-midnight">Mock Exam Engine</div>
                    <div className="text-[11px] text-gray-500 font-normal">
                      Timed 100-question AAPC CPC® & AHIMA CCS® tests
                    </div>
                  </div>
                </Link>

                <Link
                  href="/webinars"
                  className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-mcoa-pearl transition"
                >
                  <Video className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-mcoa-midnight">Webinars & Masterclasses</div>
                    <div className="text-[11px] text-gray-500 font-normal">
                      Live interactive sessions & 2026 coding guideline updates
                    </div>
                  </div>
                </Link>

                <Link
                  href="/blog"
                  className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-mcoa-pearl transition"
                >
                  <BookOpen className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-mcoa-midnight">Coding Insights & Blog</div>
                    <div className="text-[11px] text-gray-500 font-normal">
                      Regulatory updates, CPT modifiers & career guidance
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Consistent 2-Action CTAs (Secondary + Primary) */}
        <div className="hidden lg:flex items-center space-x-3 font-montserrat shrink-0">
          {/* Secondary Action */}
          <Link
            href="/courses"
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-mcoa-midnight border border-mcoa-midnight/20 hover:border-mcoa-amethyst hover:text-mcoa-amethyst hover:bg-mcoa-pearl/50 transition"
          >
            Explore Courses
          </Link>

          {/* Consistent Primary Action */}
          <button
            onClick={() => openCounselorModal("Navbar Header Button")}
            className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-mcoa-gold text-mcoa-midnight shadow-gold hover:bg-[#e0b760] transition-all transform hover:-translate-y-0.5 flex items-center space-x-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Talk to an Admissions Counselor</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="lg:hidden flex items-center space-x-2">
          <button
            onClick={() => openCounselorModal("Mobile Nav Header")}
            className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-mcoa-gold text-mcoa-midnight"
          >
            Talk to Counselor
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-mcoa-midnight hover:bg-mcoa-pearl focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-mcoa-pearl px-5 pt-3 pb-6 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-2.5 font-montserrat text-sm font-semibold text-mcoa-slate">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-gray-100"
            >
              Home
            </Link>

            <Link
              href="/courses"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-gray-100 flex items-center justify-between"
            >
              <span>Courses & Certifications</span>
              <span className="text-xs text-mcoa-gold font-bold">11+ Tracks</span>
            </Link>

            <Link
              href="/why-mcoa"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-gray-100"
            >
              Why MCOA & Placements
            </Link>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-gray-100 flex items-center space-x-1"
            >
              <MapPin className="w-4 h-4 text-mcoa-amethyst" />
              <span>Campuses: Chennai, Perambalur, CBE, KKD</span>
            </Link>

            <Link
              href="/founder"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-gray-100"
            >
              About Founder Dr. Jeevanantham
            </Link>

            {/* Student Portal Accordion */}
            <div className="border-b border-gray-100 py-2">
              <button
                onClick={() => setMobilePortalOpen(!mobilePortalOpen)}
                className="w-full flex items-center justify-between text-mcoa-amethyst font-bold text-left"
              >
                <div className="flex items-center space-x-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>Student Portal & Learning Tools</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    mobilePortalOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobilePortalOpen && (
                <div className="pl-4 pt-2 space-y-2 text-xs text-gray-700">
                  <Link
                    href="/student"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1 hover:text-mcoa-amethyst"
                  >
                    • Student LMS Dashboard
                  </Link>
                  <Link
                    href="/practice"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1 hover:text-mcoa-amethyst"
                  >
                    • Practice Simulator (100+ Charts)
                  </Link>
                  <Link
                    href="/mock-exams"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1 hover:text-mcoa-amethyst"
                  >
                    • Mock Exam Simulator (AAPC / AHIMA)
                  </Link>
                  <Link
                    href="/webinars"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1 hover:text-mcoa-amethyst"
                  >
                    • Webinars & Masterclasses
                  </Link>
                  <Link
                    href="/blog"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1 hover:text-mcoa-amethyst"
                  >
                    • Coding Insights & Blog
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-mcoa-midnight flex items-center space-x-1"
            >
              <ShieldCheck className="w-4 h-4 text-mcoa-gold" />
              <span>Unified Login (Student & Staff)</span>
            </Link>
          </div>

          {/* Consistent Primary and Secondary CTAs */}
          <div className="pt-2 flex flex-col space-y-2.5 font-montserrat">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openCounselorModal("Mobile Drawer CTA");
              }}
              className="w-full text-center py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-mcoa-gold text-mcoa-midnight shadow-gold"
            >
              Talk to an Admissions Counselor
            </button>

            <Link
              href="/courses"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl text-xs font-bold border border-mcoa-midnight/30 text-mcoa-midnight hover:bg-mcoa-pearl"
            >
              Explore Courses
            </Link>

            <a
              href="tel:+918072020716"
              className="w-full text-center py-2.5 rounded-xl text-xs font-bold border border-mcoa-amethyst text-mcoa-amethyst flex items-center justify-center space-x-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Hotline: +91 8072020716</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
