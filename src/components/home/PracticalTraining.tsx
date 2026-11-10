"use client";

import Link from "next/link";
import {
  FileText,
  Calculator,
  Timer,
  Stethoscope,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Laptop,
} from "lucide-react";
import { openCounselorModal } from "@/components/common/LeadInquiryModal";

export function PracticalTraining() {
  const pillars = [
    {
      icon: FileText,
      title: "100+ De-Identified Hospital Charts",
      description:
        "Students dissect authentic inpatient discharge summaries, operative surgical reports, pathology logs, and emergency physician encounters. Learn by coding real charts rather than memorizing textbook snippets.",
      tag: "Authentic Clinical Documentation",
    },
    {
      icon: Calculator,
      title: "2-of-3 E&M Medical Decision Making (MDM)",
      description:
        "Master the 2026 CMS and AMA Evaluation & Management coding rules. Our interactive MDM calculator guides you through Problem Complexity, Data Reviewed, and Risk of Complications with real cases.",
      tag: "Interactive Calculator",
    },
    {
      icon: Timer,
      title: "Timed AAPC & AHIMA Exam Drills",
      description:
        "Practice on computer-based testing simulators replicating the official 100-question, 4-hour AAPC format. Build the speed, accuracy, and codebook navigation needed to score 70%+ on your first attempt.",
      tag: "Exam Simulator",
    },
    {
      icon: Stethoscope,
      title: "Doctor-Led Pathophysiology Teaching",
      description:
        "Lectures led directly by Dr. Jeevanantham Mariappan and medical physicians. When you understand etiology, surgical approaches, and clinical terminology, code assignment becomes intuitive.",
      tag: "Physician Faculty",
    },
  ];

  return (
    <section className="py-20 bg-white font-inter border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-mcoa-amethyst font-montserrat">
            Hands-On Methodology
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-mcoa-midnight mt-2 font-montserrat">
            Practical Training — Beyond Rote Memorization
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-3">
            In international healthcare IT, corporate recruiters test your ability to audit complex patient charts. Here is how MCOA prepares you for the clinical realities of the job from Day 1.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className="p-7 rounded-3xl bg-mcoa-pearl/50 border border-gray-200/90 hover:border-mcoa-gold hover:bg-white hover:shadow-royal transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-mcoa-lavender/40 text-mcoa-amethyst flex items-center justify-center group-hover:bg-mcoa-midnight group-hover:text-mcoa-gold transition-colors shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white border border-gray-200 text-mcoa-midnight font-montserrat">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="font-montserrat font-bold text-lg text-mcoa-midnight mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-200/60 flex items-center space-x-2 text-xs text-mcoa-amethyst font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Integrated into all Classroom and Live Online Batches</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Simulator Highlight Box */}
        <div className="mt-12 bg-mcoa-midnight text-white rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-mcoa-gold/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-xs font-montserrat text-mcoa-gold">
                <Laptop className="w-3.5 h-3.5" />
                <span>Interactive Learning Engine</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-montserrat">
                Test-Drive the MCOA Medical Coding Simulator
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-inter">
                Experience our real-time interactive chart dissection tool, E&M complexity scoring calculators, and timed mock drills before you enroll.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 font-montserrat shrink-0">
              {/* Primary Action */}
              <button
                onClick={() =>
                  openCounselorModal("Practical Training CTA: Book Simulator Demo")
                }
                className="px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-mcoa-gold text-mcoa-midnight hover:bg-[#e0b760] transition shadow-gold flex items-center space-x-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Talk to an Admissions Counselor</span>
              </button>

              {/* Secondary Action */}
              <Link
                href="/practice"
                className="px-6 py-3.5 rounded-xl text-xs font-bold tracking-wider bg-white/10 hover:bg-white/20 border border-white/25 text-white transition flex items-center space-x-1.5"
              >
                <span>Launch Free Simulator</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

