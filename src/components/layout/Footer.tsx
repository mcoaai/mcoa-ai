"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin, Globe, ShieldCheck, ArrowRight, Sparkles, GraduationCap } from "lucide-react";
import { openCounselorModal } from "@/components/common/LeadInquiryModal";

export function Footer() {
  const pathname = usePathname();

  // Hide public marketing footer on Admin, Student LMS, and Trainer dashboards
  if (
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/student") ||
    pathname?.startsWith("/trainer")
  ) {
    return null;
  }

  return (
    <footer className="bg-mcoa-midnight text-white border-t border-mcoa-amethyst/30 pt-16 pb-12 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1 & 2: Brand Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white/95 rounded-xl p-3 inline-block shadow-md">
              <Image
                src="/mcoa-logo.png"
                alt="Medical Coding Officers Academy"
                width={240}
                height={65}
                className="object-contain h-12 w-auto"
              />
            </div>

            <p className="text-white/80 text-sm leading-relaxed pr-6">
              <strong className="text-mcoa-gold font-semibold">Medical Coding Officers Academy (MCOA)</strong> is South India’s premier healthcare education institution founded by <strong className="text-white">Dr. Jeevanantham Mariappan</strong>. Dedicated to transforming life sciences, pharmacy, nursing, and medical graduates into globally certified healthcare information and revenue cycle officers.
            </p>

            <div className="pt-2 flex flex-col space-y-2 text-xs text-white/90">
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-mcoa-gold shrink-0" />
                <a href="tel:+918072020716" className="hover:text-mcoa-gold transition font-medium">
                  +91 8072020716 (Counseling & Admissions)
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-mcoa-gold shrink-0" />
                <a href="mailto:medicalcodingofficers@gmail.com" className="hover:text-mcoa-gold transition font-medium">
                  medicalcodingofficers@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Globe className="w-4 h-4 text-mcoa-gold shrink-0" />
                <span className="text-white/80">https://medicalcodingofficersacademy.com</span>
              </div>
            </div>
          </div>

          {/* Col 3: Flagship Courses */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-mcoa-gold font-montserrat">
              Flagship Courses
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <Link href="/courses/advanced-medical-coding" className="hover:text-mcoa-gold transition">
                  Advanced Medical Coding Masterclass
                </Link>
              </li>
              <li>
                <Link href="/courses/cpc-certification-prep" className="hover:text-mcoa-gold transition">
                  CPC® Exam Prep (AAPC)
                </Link>
              </li>
              <li>
                <Link href="/courses/ccs-certification-prep" className="hover:text-mcoa-gold transition">
                  CCS® Inpatient Prep (AHIMA)
                </Link>
              </li>
              <li>
                <Link href="/courses/crc-risk-adjustment" className="hover:text-mcoa-gold transition">
                  CRC® Risk Adjustment
                </Link>
              </li>
              <li>
                <Link href="/courses/cpma-medical-auditor" className="hover:text-mcoa-gold transition">
                  CPMA® Medical Auditor
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-mcoa-gold hover:underline font-semibold pt-1 block">
                  View All 11+ Programs →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Student Portal & Learning Tools */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-mcoa-gold font-montserrat">
              Student Portal & Tools
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <Link href="/student" className="hover:text-mcoa-gold transition flex items-center space-x-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-mcoa-gold" />
                  <span>Student LMS Dashboard</span>
                </Link>
              </li>
              <li>
                <Link href="/practice" className="hover:text-mcoa-gold transition">
                  Practice Simulator (100+ Charts)
                </Link>
              </li>
              <li>
                <Link href="/mock-exams" className="hover:text-mcoa-gold transition">
                  Timed Mock Exam Engine
                </Link>
              </li>
              <li>
                <Link href="/webinars" className="hover:text-mcoa-gold transition">
                  Faculty Webinars & Masterclasses
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-mcoa-gold transition">
                  Coding Guidelines & Blog
                </Link>
              </li>
              <li>
                <Link href="/why-mcoa" className="hover:text-mcoa-gold transition">
                  Why Choose MCOA
                </Link>
              </li>
              <li>
                <Link href="/founder" className="hover:text-mcoa-gold transition">
                  About Dr. Jeevanantham
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Actions & Accreditation */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-mcoa-gold font-montserrat">
              Admissions Desk
            </h4>
            <div className="bg-white/5 rounded-xl p-3 border border-white/10 text-xs text-white/80 space-y-2">
              <div className="flex items-center space-x-2 text-mcoa-gold font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Certification Standards</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Curriculum strictly aligned with AAPC and AHIMA professional standards. 94%+ first-attempt pass rate and dedicated placement assistance.
              </p>
            </div>

            <div className="pt-2 space-y-2 font-montserrat">
              {/* Primary Action */}
              <button
                onClick={() => openCounselorModal("Footer Widget Button")}
                className="block text-center w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-mcoa-gold text-mcoa-midnight hover:bg-[#e0b760] transition shadow-gold flex items-center justify-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Talk to an Admissions Counselor</span>
              </button>

              {/* Secondary Action */}
              <Link
                href="/courses"
                className="block text-center w-full py-2 rounded-xl text-xs font-bold border border-white/20 text-white hover:bg-white/10 transition"
              >
                Explore Courses
              </Link>
            </div>
          </div>
        </div>

        {/* Branch Network Showcase */}
        <div className="py-8 border-b border-white/10">
          <h4 className="text-xs font-bold uppercase tracking-wider text-mcoa-gold mb-4 font-montserrat">
            Official Academy Branches
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-white/80">
            <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
              <div className="font-bold text-white mb-1">📍 Chennai Head Office</div>
              <p className="text-[11px] text-white/70">
                #70/1, 200 Feet Radial Road (Thoraipakkam to Pallavaram), Near A2B Hotel, Narayanapuram Lake, Pallikaranai, Chennai - 600100.
              </p>
            </div>
            <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
              <div className="font-bold text-white mb-1">📍 Perambalur Campus</div>
              <p className="text-[11px] text-white/70">
                3rd Floor, Annai Hospital, VRM IAS Academy, Near Krishna Theatre, Perambalur, Tamil Nadu - 621212.
              </p>
            </div>
            <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
              <div className="font-bold text-white mb-1">📍 Coimbatore Hub</div>
              <p className="text-[11px] text-white/70">
                #17 Sangam Street, Sundarapuram Post, Coimbatore - 641024.
              </p>
            </div>
            <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
              <div className="font-bold text-white mb-1">📍 Karaikudi Centre</div>
              <p className="text-[11px] text-white/70">
                #52, 5th Cross, TT Nagar, Near Corner Bakery, Karaikudi - 630 001.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Trademark Disclaimer */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-white/60 gap-4">
          <p>
            © {new Date().getFullYear()} Medical Coding Officers Academy (MCOA). All Rights Reserved. Founded by Dr. Jeevanantham Mariappan.
          </p>
          <p className="text-center md:text-right max-w-xl text-[10px] text-white/40">
            * Disclaimer: AAPC®, CPC®, CRC®, CPMA® are registered trademarks of the American Academy of Professional Coders. AHIMA®, CCS® are registered trademarks of the American Health Information Management Association. MCOA provides independent professional preparatory training and education.
          </p>
        </div>
      </div>
    </footer>
  );
}
