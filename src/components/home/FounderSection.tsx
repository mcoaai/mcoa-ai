"use client";

import Link from "next/link";
import Image from "next/image";
import { Award, CheckCircle2, ArrowRight, Quote, Sparkles } from "lucide-react";
import { openCounselorModal } from "@/components/common/LeadInquiryModal";

export function FounderSection() {
  return (
    <section className="py-20 bg-white border-t border-b border-gray-100 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Leadership Profile Card */}
          <div className="lg:col-span-5">
            <div className="relative bg-gradient-to-br from-mcoa-midnight to-mcoa-amethyst rounded-3xl p-8 text-white shadow-royal overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-mcoa-gold/15 blur-2xl" />

              <div className="relative z-10 space-y-6">
                <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-mcoa-gold/60 shadow-lg shrink-0">
                  <Image
                    src="/founder.jpg"
                    alt="Dr. Jeevanantham Mariappan"
                    fill
                    className="object-cover object-top"
                    sizes="112px"
                    priority
                  />
                </div>

                <div>
                  <span className="text-xs uppercase tracking-widest text-mcoa-gold font-bold font-montserrat">
                    Founder & Chief Academic Officer
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-montserrat mt-1">
                    Dr. Jeevanantham Mariappan
                  </h3>
                  <p className="text-xs text-white/80 mt-1 font-inter">
                    Medical Professional, Revenue Cycle Strategist & Academy Director
                  </p>
                </div>

                <div className="space-y-3 pt-2 text-xs text-white/90">
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-mcoa-gold shrink-0" />
                    <span>Over 20+ years of healthcare experience & clinical education</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-mcoa-gold shrink-0" />
                    <span>Direct personal mentorship on difficult clinical chart scenarios</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-mcoa-gold shrink-0" />
                    <span>Recruitment relationships with top US healthcare IT RCM MNCs</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/15">
                  <div className="text-[11px] text-white/75 italic leading-relaxed">
                    "Our mission is simple: To provide healthcare graduates with the highest caliber international certification training, guaranteed interview skills, and life-changing career placements."
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Founder's Vision & Why MCOA Method Works */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-mcoa-amethyst font-montserrat">
              <Award className="w-4 h-4" />
              <span>Founder's Clinical Vision</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-mcoa-midnight font-montserrat leading-tight">
              A Clinically-Grounded Approach to International Coding Mastery
            </h2>

            <div className="relative pl-6 border-l-2 border-mcoa-gold space-y-3 text-gray-700 text-sm leading-relaxed">
              <Quote className="w-8 h-8 text-mcoa-gold/30 absolute -top-3 -left-3" />
              <p>
                Unlike generic computer institutes or online slide-reading tutorials,{" "}
                <strong>Medical Coding Officers Academy (MCOA)</strong> was established to bridge the gap between academic life sciences education and the exact clinical demands of the US healthcare industry.
              </p>
              <p>
                Every student at MCOA undergoes hands-on training with genuine de-identified medical charts, operative reports, pathology logs, and physician query protocols. We teach you not just how to memorize codes, but how to think like a certified Medical Coding Officer.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4 font-montserrat">
              {/* Primary Action */}
              <button
                onClick={() =>
                  openCounselorModal("Founder Section: Talk to Counselor")
                }
                className="px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-mcoa-gold text-mcoa-midnight hover:bg-[#e0b760] transition shadow-gold flex items-center space-x-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Talk to an Admissions Counselor</span>
              </button>

              {/* Secondary Action */}
              <Link
                href="/founder"
                className="px-6 py-3.5 rounded-xl text-xs font-bold border border-mcoa-midnight/30 text-mcoa-midnight hover:bg-mcoa-pearl transition flex items-center space-x-1"
              >
                <span>Read Dr. Jeevanantham's Full Bio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
