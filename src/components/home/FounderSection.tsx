import Link from "next/link";
import { Award, GraduationCap, CheckCircle2, ArrowRight, Quote } from "lucide-react";

export function FounderSection() {
  return (
    <section className="py-20 bg-white border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Leadership Profile Card */}
          <div className="lg:col-span-5">
            <div className="relative bg-gradient-to-br from-mcoa-midnight to-mcoa-amethyst rounded-3xl p-8 text-white shadow-royal overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-mcoa-gold/15 blur-2xl" />
              
              <div className="relative z-10 space-y-6">
                <div className="w-20 h-20 rounded-2xl bg-white/10 border border-mcoa-gold/50 flex items-center justify-center text-mcoa-gold shadow-inner">
                  <GraduationCap className="w-10 h-10" />
                </div>

                <div>
                  <span className="text-xs uppercase tracking-widest text-mcoa-gold font-bold">
                    Founder & Chief Executive Officer
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
                    <span>Mentored 4,500+ students across Tamil Nadu & South India</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-mcoa-gold shrink-0" />
                    <span>Direct recruitment partnerships with leading US Healthcare IT RCM MNCs</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/15">
                  <div className="text-[11px] text-white/70 italic">
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
              <span>Leadership Vision</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-mcoa-midnight font-montserrat leading-tight">
              A Clinically-Grounded Approach to International Coding Mastery
            </h2>

            <div className="relative pl-6 border-l-2 border-mcoa-gold space-y-3 text-gray-700 text-sm leading-relaxed font-inter">
              <Quote className="w-8 h-8 text-mcoa-gold/30 absolute -top-3 -left-3" />
              <p>
                Unlike generic computer institutes or online slide-reading tutorials, <strong>Medical Coding Officers Academy (MCOA)</strong> was established to bridge the gap between academic life sciences education and the exact clinical demands of the US healthcare industry.
              </p>
              <p>
                Every student at MCOA undergoes hands-on training with genuine de-identified medical charts, operative reports, pathology logs, and physician query protocols. We teach you not just how to memorize codes, but how to think like a certified Medical Coding Officer.
              </p>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-mcoa-pearl p-4 rounded-xl border border-mcoa-lavender/30">
                <div className="font-bold text-sm text-mcoa-midnight">Direct Expert Mentorship</div>
                <div className="text-xs text-gray-600 mt-1">
                  Weekly doubt-clearing sessions and 1-on-1 exam strategy reviews with Dr. Jeevanantham and certified AAPC/AHIMA faculty.
                </div>
              </div>

              <div className="bg-mcoa-pearl p-4 rounded-xl border border-mcoa-lavender/30">
                <div className="font-bold text-sm text-mcoa-midnight">100% Placement Assurance</div>
                <div className="text-xs text-gray-600 mt-1">
                  Dedicated placement team arranging campus drives with major healthcare IT firms in Chennai, Coimbatore, and Bengaluru.
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <Link
                href="/founder"
                className="px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider bg-mcoa-midnight text-white hover:bg-mcoa-amethyst transition flex items-center space-x-2"
              >
                <span>Read Founder Profile & Letter</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="px-5 py-3 rounded-lg text-xs font-bold text-mcoa-midnight border border-mcoa-midnight/30 hover:bg-mcoa-pearl transition"
              >
                Visit Campus Near You
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
