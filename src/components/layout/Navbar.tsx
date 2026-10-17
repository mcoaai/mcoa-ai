"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, MessageCircle, Menu, X, ChevronDown, GraduationCap, MapPin, ShieldCheck, User } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coursesDropdown, setCoursesDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-mcoa-pearl shadow-sm">
      {/* Top Notification & Hotline Strip */}
      <div className="bg-mcoa-midnight text-white text-xs py-2 px-4 border-b border-mcoa-amethyst/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-3 text-center sm:text-left">
            <span className="bg-mcoa-gold text-mcoa-midnight font-bold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase">
              New Batches Starting
            </span>
            <span className="hidden md:inline text-white/90">
              Weekend & Weekday Batches for CPC®, CCS®, and Advanced Medical Coding
            </span>
          </div>
          
          <div className="flex items-center space-x-4 text-xs font-medium">
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
              href="/student"
              className="flex items-center space-x-1 text-mcoa-gold hover:text-white transition"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Student LMS</span>
            </Link>
            <span className="text-white/30 hidden sm:inline">|</span>
            <Link
              href="/admin/crm"
              className="flex items-center space-x-1 text-white/80 hover:text-mcoa-gold transition"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Staff CRM</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Canonical Logo with high clarity */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative w-48 sm:w-56 h-14 flex items-center">
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

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-7 font-montserrat text-sm font-semibold text-mcoa-slate">
          <Link href="/" className="hover:text-mcoa-amethyst transition py-2">
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
              className="flex items-center space-x-1 hover:text-mcoa-amethyst transition py-2"
            >
              <span>Courses & Certifications</span>
              <ChevronDown className="w-4 h-4 text-mcoa-amethyst/70" />
            </Link>

            {coursesDropdown && (
              <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-royal border border-mcoa-pearl p-3 animate-fadeIn z-50">
                <div className="text-[11px] font-bold text-mcoa-amethyst uppercase tracking-wider px-3 py-1.5">
                  Certification Tracks
                </div>
                <Link
                  href="/courses/cpc-certification-prep"
                  className="flex items-start space-x-3 p-2.5 rounded-lg hover:bg-mcoa-pearl transition"
                >
                  <GraduationCap className="w-5 h-5 text-mcoa-amethyst mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-mcoa-midnight">CPC® Exam Prep (AAPC)</div>
                    <div className="text-[11px] text-gray-500 font-normal">Outpatient gold-standard credential</div>
                  </div>
                </Link>
                <Link
                  href="/courses/ccs-certification-prep"
                  className="flex items-start space-x-3 p-2.5 rounded-lg hover:bg-mcoa-pearl transition"
                >
                  <GraduationCap className="w-5 h-5 text-mcoa-gold mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-mcoa-midnight">CCS® Inpatient Prep (AHIMA)</div>
                    <div className="text-[11px] text-gray-500 font-normal">ICD-10-PCS & MS-DRG hospital coding</div>
                  </div>
                </Link>
                <Link
                  href="/courses/crc-risk-adjustment"
                  className="flex items-start space-x-3 p-2.5 rounded-lg hover:bg-mcoa-pearl transition"
                >
                  <GraduationCap className="w-5 h-5 text-mcoa-lavender mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-mcoa-midnight">CRC® Risk Adjustment (AAPC)</div>
                    <div className="text-[11px] text-gray-500 font-normal">CMS-HCC & Chronic disease scoring</div>
                  </div>
                </Link>
                <div className="border-t border-mcoa-pearl my-1.5"></div>
                <Link
                  href="/courses/advanced-medical-coding"
                  className="flex items-start space-x-3 p-2.5 rounded-lg bg-mcoa-pearl/70 hover:bg-mcoa-pearl transition"
                >
                  <div>
                    <div className="text-xs font-bold text-mcoa-midnight">Advanced Medical Coding Masterclass</div>
                    <div className="text-[11px] text-mcoa-amethyst font-normal">Flagship comprehensive career program</div>
                  </div>
                </Link>
                <div className="text-center pt-2">
                  <Link
                    href="/courses"
                    className="text-xs font-bold text-mcoa-amethyst hover:text-mcoa-midnight underline"
                  >
                    View All 11+ Specialized Programs →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/practice" className="hover:text-mcoa-amethyst transition py-2 text-mcoa-amethyst font-bold">
            Simulator
          </Link>

          <Link href="/mock-exams" className="hover:text-mcoa-amethyst transition py-2">
            Mock Exams
          </Link>

          <Link href="/webinars" className="hover:text-mcoa-amethyst transition py-2 text-mcoa-gold font-bold">
            Webinars
          </Link>

          <Link href="/blog" className="hover:text-mcoa-amethyst transition py-2">
            Blog & Insights
          </Link>

          <Link href="/why-mcoa" className="hover:text-mcoa-amethyst transition py-2">
            Why MCOA
          </Link>

          <Link href="/about" className="hover:text-mcoa-amethyst transition py-2">
            About & Founder
          </Link>

          <Link href="/contact" className="hover:text-mcoa-amethyst transition py-2 flex items-center space-x-1">
            <MapPin className="w-3.5 h-3.5 text-mcoa-amethyst" />
            <span>Branches</span>
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center space-x-3 font-montserrat">
          <Link
            href="/login"
            className="px-3.5 py-2 text-xs font-bold text-mcoa-midnight hover:text-mcoa-amethyst transition flex items-center space-x-1"
          >
            <User className="w-3.5 h-3.5" />
            <span>Login</span>
          </Link>
          <Link
            href="/apply"
            className="px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-mcoa-gold text-mcoa-midnight shadow-gold hover:bg-[#e0b760] transition-all transform hover:-translate-y-0.5"
          >
            Apply Now
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center space-x-2">
          <Link
            href="/apply"
            className="px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider bg-mcoa-gold text-mcoa-midnight"
          >
            Apply
          </Link>
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
          <div className="flex flex-col space-y-3 font-montserrat text-sm font-semibold text-mcoa-slate">
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
              <span>All Courses & Certifications</span>
              <span className="text-xs text-mcoa-gold font-bold">11+ Programs</span>
            </Link>
            <Link
              href="/courses/advanced-medical-coding"
              onClick={() => setMobileMenuOpen(false)}
              className="pl-4 py-1 text-xs text-mcoa-midnight"
            >
              • Advanced Medical Coding Masterclass
            </Link>
            <Link
              href="/courses/cpc-certification-prep"
              onClick={() => setMobileMenuOpen(false)}
              className="pl-4 py-1 text-xs text-mcoa-midnight"
            >
              • CPC® (Certified Professional Coder)
            </Link>
            <Link
              href="/courses/ccs-certification-prep"
              onClick={() => setMobileMenuOpen(false)}
              className="pl-4 py-1 text-xs text-mcoa-midnight"
            >
              • CCS® (Certified Coding Specialist)
            </Link>
            <Link
              href="/why-mcoa"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-gray-100"
            >
              Why MCOA & Placement Track
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-gray-100"
            >
              About MCOA & Dr. Jeevanantham
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-gray-100 flex items-center space-x-1"
            >
              <MapPin className="w-4 h-4 text-mcoa-amethyst" />
              <span>Branches: Chennai, Perambalur, Coimbatore, Karaikudi</span>
            </Link>
            <Link
              href="/admin/crm"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-mcoa-amethyst flex items-center space-x-1"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Staff CRM Portal</span>
            </Link>
          </div>

          <div className="pt-2 flex flex-col space-y-2">
            <Link
              href="/apply"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-lg text-xs font-bold uppercase tracking-wider bg-mcoa-gold text-mcoa-midnight shadow-gold"
            >
              Apply For Next Batch
            </Link>
            <a
              href="tel:+918072020716"
              className="w-full text-center py-2.5 rounded-lg text-xs font-bold border border-mcoa-amethyst text-mcoa-amethyst flex items-center justify-center space-x-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Counselor: +91 8072020716</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
