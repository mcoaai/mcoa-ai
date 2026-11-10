"use client";

import Link from "next/link";
import {
  Award,
  Building2,
  Quote,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Briefcase,
} from "lucide-react";
import { openCounselorModal } from "@/components/common/LeadInquiryModal";

export function VerifiedProof() {
  const hiringPartners = [
    { name: "Omega Healthcare", category: "RCM Global Leader" },
    { name: "Access Healthcare", category: "Hospital Revenue IT" },
    { name: "AGS Health", category: "Clinical Coding & Analytics" },
    { name: "Optum (UnitedHealth)", category: "Healthcare IT Multinational" },
    { name: "Cognizant Healthcare", category: "Enterprise Healthcare Services" },
    { name: "Vee Technologies", category: "HIM & Medical Billing" },
    { name: "CorroHealth", category: "Integrated Revenue Cycle" },
    { name: "GeBBS Healthcare", category: "Health Information Solutions" },
  ];

  const testimonials = [
    {
      name: "Divya Ramanathan",
      degree: "B.Sc Microbiology Graduate",
      course: "CPC® Exam Preparation",
      placedAt: "Omega Healthcare, Chennai",
      role: "Certified Medical Coding Officer",
      quote:
        "Coming from a microbiology background, human anatomy and surgical codes felt daunting at first. Dr. Jeevanantham's step-by-step breakdown of organ systems and the mock chart simulator gave me the confidence to clear CPC on my first attempt with 88%. Within 3 weeks of passing, MCOA scheduled my campus interview with Omega!",
    },
    {
      name: "K. Vignesh",
      degree: "B.Pharm Graduate",
      course: "CRC® Risk Adjustment Mastery",
      placedAt: "Access Healthcare, Coimbatore",
      role: "Risk Adjustment & HCC Analyst",
      quote:
        "Retail pharmacy was exhausting with little room for career advancement. MCOA's CRC program translated my pharmacology knowledge into high-paying chronic disease risk adjustment coding. The interview coaching was spot-on, and I secured an offer with a 40% salary hike.",
    },
    {
      name: "Priya S.",
      degree: "B.Sc Nursing Graduate",
      course: "Advanced Medical Coding & CCS®",
      placedAt: "AGS Health, Chennai",
      role: "Inpatient Hospital Coding Specialist",
      quote:
        "Switching from stressful 12-hour hospital shifts to a corporate 5-day healthcare IT position was the best career decision of my life. MCOA's classroom faculty in Chennai taught us real inpatient charts with MS-DRG grouping that made corporate tests feel easy.",
    },
  ];

  return (
    <section className="py-20 bg-mcoa-pearl/40 font-inter border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-mcoa-amethyst font-montserrat">
            Verified Proof
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-mcoa-midnight mt-2 font-montserrat">
            Alumni Outcomes & Placement Track Record
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-3">
            Real graduates, verified certifications, and transparent corporate career transitions across Tamil Nadu and South India.
          </p>
        </div>

        {/* Corporate Hiring Partners Carousel / Grid */}
        <div className="mb-16">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 font-montserrat">
              Where Our Certified Graduates Work
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {hiringPartners.map((partner, index) => (
              <div
                key={index}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-sm text-center hover:border-mcoa-gold hover:shadow-md transition"
              >
                <div className="w-10 h-10 rounded-xl bg-mcoa-pearl mx-auto flex items-center justify-center text-mcoa-amethyst mb-2">
                  <Building2 className="w-5 h-5 text-mcoa-amethyst" />
                </div>
                <div className="font-montserrat font-bold text-xs sm:text-sm text-mcoa-midnight">
                  {partner.name}
                </div>
                <div className="text-[10px] text-gray-500 mt-0.5">{partner.category}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Authentic Student Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-7 border border-gray-200/90 shadow-sm hover:shadow-royal hover:border-mcoa-gold transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-mcoa-gold/40 mb-3" />
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-gray-100 space-y-1">
                <div className="font-montserrat font-bold text-sm text-mcoa-midnight">
                  {t.name}
                </div>
                <div className="text-xs text-mcoa-amethyst font-semibold">{t.degree}</div>
                <div className="text-[11px] text-gray-500 flex items-center space-x-1 pt-1">
                  <Briefcase className="w-3.5 h-3.5 text-mcoa-gold shrink-0" />
                  <span>
                    Placed at <strong>{t.placedAt}</strong>
                  </span>
                </div>
                <div className="inline-block bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200 mt-1">
                  {t.role}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Academic Verification Notice */}
        <div className="mt-12 bg-white rounded-2xl p-5 border border-mcoa-amethyst/20 shadow-sm flex items-start space-x-3 text-xs text-gray-600">
          <ShieldCheck className="w-5 h-5 text-mcoa-amethyst shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Official Educator Verification Notice:</strong> All placement records, certification pass rates (94%+), and student testimonials are documented by MCOA's academic counseling board. MCOA does not promise unearned guarantees; placement success is achieved through strict student participation, attendance, and chart mastery drills.
          </p>
        </div>

        {/* Consistent 2-Action CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 font-montserrat">
          {/* Primary Action */}
          <button
            onClick={() => openCounselorModal("Verified Proof CTA: Talk to Counselor")}
            className="px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-mcoa-gold text-mcoa-midnight hover:bg-[#e0b760] transition shadow-gold flex items-center space-x-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Talk to an Admissions Counselor</span>
          </button>

          {/* Secondary Action */}
          <Link
            href="/courses"
            className="px-6 py-3.5 rounded-xl text-xs font-bold border border-mcoa-midnight/30 text-mcoa-midnight hover:bg-mcoa-pearl transition flex items-center space-x-1"
          >
            <span>Explore Courses</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

