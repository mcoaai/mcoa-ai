"use client";

import Link from "next/link";
import {
  TestTube2,
  Pill,
  HeartPulse,
  Stethoscope,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import { openCounselorModal } from "@/components/common/LeadInquiryModal";

export function WhoMcoaHelps() {
  const audiences = [
    {
      icon: TestTube2,
      badge: "Life Sciences",
      title: "B.Sc & M.Sc Life Sciences Graduates",
      degrees: "Biotechnology, Microbiology, Biochemistry, Zoology, Botany, Bioinformatics",
      description:
        "Bridge your foundational knowledge of human anatomy, cell biology, and pathology with international diagnostic (ICD-10-CM) and surgical procedure (CPT) coding standards.",
      careerPath: "Certified Medical Coder → Outpatient Senior Coder → Quality Auditor",
      careerTrack: "Core Coding Track",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      iconBg: "bg-blue-600 text-white",
    },
    {
      icon: Pill,
      badge: "Pharmacy",
      title: "B.Pharm, M.Pharm & Pharm.D",
      degrees: "Pharmacy Graduates & Clinical Pharmacologists",
      description:
        "Leverage your in-depth mastery of pharmacology, drug classifications, adverse effects, and disease interactions for high-demand Risk Adjustment (CRC®) and Specialty Coding roles.",
      careerPath: "Risk Adjustment Specialist → HCC Audit Specialist → RCM Team Lead",
      careerTrack: "Specialty CRC Track",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      iconBg: "bg-emerald-600 text-white",
    },
    {
      icon: HeartPulse,
      badge: "Nursing & Paramedical",
      title: "Nursing & Paramedical Professionals",
      degrees: "B.Sc Nursing, GNM, BPT, Medical Laboratory & Imaging Technology",
      description:
        "Transition from demanding 12-hour hospital shifts and physical bedside duties into structured corporate healthcare IT roles with leading multinational corporations.",
      careerPath: "Inpatient Coder (CCS®) → CDI Specialist → Corporate RCM Manager",
      careerTrack: "Hospital Inpatient Track",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
      iconBg: "bg-purple-600 text-white",
    },
    {
      icon: Stethoscope,
      badge: "Medical & Allied",
      title: "Doctors, Dentists & Allied Health",
      degrees: "BDS, BHMS, BAMS, Allied Health & Clinical Documentation Specialists",
      description:
        "Fast-track into healthcare informatics, Clinical Documentation Improvement (CDI), and Medical Auditing (CPMA®) where clinical diagnostic judgment commands industry respect.",
      careerPath: "Clinical Documentation Specialist → Compliance Auditor → HIM Director",
      careerTrack: "Clinical Audit Track",
      badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
      iconBg: "bg-amber-600 text-white",
    },
  ];

  return (
    <section className="py-20 bg-white font-inter border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-mcoa-amethyst font-montserrat">
            Who MCOA Helps
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-mcoa-midnight mt-2 font-montserrat">
            Built Strictly for Healthcare & Life Sciences Degree Holders
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-3">
            MCOA is not a generic software tuition center. Our doctor-engineered curriculum is purpose-built to convert clinical and biological degrees into globally certified US Healthcare IT careers.
          </p>
        </div>

        {/* 4 Focused Audience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {audiences.map((aud, idx) => {
            const Icon = aud.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-gray-200/90 hover:border-mcoa-gold hover:shadow-royal transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${aud.badgeColor} font-montserrat`}
                    >
                      {aud.badge}
                    </span>
                    <span className="text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-lg">
                      {aud.careerTrack}
                    </span>
                  </div>

                  <div className="flex items-start space-x-4 mb-3">
                    <div
                      className={`w-12 h-12 rounded-2xl ${aud.iconBg} flex items-center justify-center shrink-0 shadow-sm`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-bold text-lg text-mcoa-midnight group-hover:text-mcoa-amethyst transition leading-snug">
                        {aud.title}
                      </h3>
                      <p className="text-xs text-mcoa-amethyst font-semibold mt-0.5">
                        {aud.degrees}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-3">
                    {aud.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                    <div className="text-xs font-semibold text-gray-700 flex items-center space-x-2">
                      <span className="text-mcoa-gold font-bold">Career Pathway:</span>
                      <span className="text-gray-800">{aud.careerPath}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-montserrat">
                  <button
                    onClick={() =>
                      openCounselorModal(`Eligibility Check: ${aud.badge} Graduate`)
                    }
                    className="font-bold text-mcoa-amethyst hover:text-mcoa-midnight flex items-center space-x-1"
                  >
                    <span>Check Your Eligibility</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <Link
                    href="/courses"
                    className="font-semibold text-gray-500 hover:text-mcoa-midnight"
                  >
                    View Recommended Courses →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Free Eligibility Evaluation Banner */}
        <div className="mt-12 bg-gradient-to-r from-mcoa-midnight via-[#261758] to-mcoa-amethyst rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-mcoa-gold/20 border border-mcoa-gold/40 text-mcoa-gold flex items-center justify-center shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-montserrat font-bold text-base sm:text-lg text-white">
                Not sure if your degree qualifies for AAPC or AHIMA certification?
              </h4>
              <p className="text-xs sm:text-sm text-white/80 mt-1">
                Our admissions counselors provide a 100% free qualification and career roadmap review for your exact educational background.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-montserrat shrink-0">
            {/* Primary Action */}
            <button
              onClick={() => openCounselorModal("Eligibility Banner: Who MCOA Helps")}
              className="px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-mcoa-gold text-mcoa-midnight hover:bg-[#e0b760] transition shadow-gold flex items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Talk to an Admissions Counselor</span>
            </button>

            {/* Secondary Action */}
            <Link
              href="/courses"
              className="px-5 py-3 rounded-xl text-xs font-bold border border-white/30 text-white hover:bg-white/10 transition"
            >
              Explore Courses
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

