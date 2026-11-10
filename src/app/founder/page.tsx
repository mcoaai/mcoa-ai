import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { GraduationCap, Award, HeartPulse, Quote, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Dr. Jeevanantham Mariappan | Founder & Chief Academic Officer",
  description:
    "Meet Dr. Jeevanantham Mariappan, founder of Medical Coding Officers Academy (MCOA). Over 20+ years of healthcare experience bridging clinical medicine and international revenue cycle management.",
  alternates: {
    canonical: "/founder",
  },
};

export default function FounderPage() {
  return (
    <div className="bg-white min-h-screen py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Badge */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-mcoa-amethyst font-montserrat">
            Academy Leadership
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-mcoa-midnight mt-1 font-montserrat">
            Dr. Jeevanantham Mariappan
          </h1>
          <p className="text-sm font-semibold text-mcoa-gold mt-2 font-inter">
            Founder & Chief Executive Officer — Medical Coding Officers Academy (MCOA)
          </p>
        </div>

        {/* Founder Card Banner */}
        <div className="bg-gradient-to-r from-mcoa-midnight via-[#302263] to-mcoa-amethyst rounded-3xl p-8 sm:p-10 text-white shadow-royal mb-12 relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 flex flex-col items-center text-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-mcoa-gold shadow-xl mb-4 shrink-0">
                <Image
                  src="/founder.jpg"
                  alt="Dr. Jeevanantham Mariappan"
                  fill
                  className="object-cover object-top"
                  sizes="128px"
                />
              </div>
              <h3 className="font-montserrat font-bold text-lg text-white">Dr. Jeevanantham M.</h3>
              <p className="text-xs text-white/80">Physician & Health Informatics Director</p>
            </div>

            <div className="md:col-span-8 space-y-3 text-xs sm:text-sm text-white/90 font-inter">
              <div className="flex items-center space-x-2 text-mcoa-gold font-bold uppercase tracking-wider text-xs">
                <Award className="w-4 h-4" />
                <span>Pioneering Healthcare Education</span>
              </div>
              <p className="leading-relaxed">
                "Our students do not just study codes; they understand the pathophysiology behind every diagnosis and the surgical anatomy behind every procedure. That clinical depth makes an MCOA graduate an indispensable officer in any international healthcare company."
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs">
                <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                  20+ Years Healthcare Experience
                </div>
                <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                  4,500+ Certified Alums
                </div>
                <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                  4 Campus Networks
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Letter from the Founder */}
        <div className="bg-mcoa-pearl/50 rounded-2xl p-8 border border-mcoa-lavender/30 space-y-6 text-gray-700 text-sm leading-relaxed font-inter">
          <h2 className="text-xl font-bold text-mcoa-midnight font-montserrat">
            A Personal Message from Dr. Jeevanantham
          </h2>

          <p>
            Dear Future Medical Coding Officer,
          </p>

          <p>
            When I established the <strong>Medical Coding Officers Academy (MCOA)</strong>, my vision was driven by a glaring reality: India produces some of the most gifted and hard-working biology, nursing, pharmacy, and healthcare graduates in the world, yet so many struggle to find career growth matching their true intellectual capability.
          </p>

          <p>
            The US healthcare system is undergoing unprecedented expansion in digital health information management, revenue cycle compliance, and risk adjustment scoring. International organizations urgently require certified professionals who can accurately translate complex patient encounters into standardized medical codes.
          </p>

          <p>
            At MCOA, we removed the guesswork from medical coding training. We built our curriculum around:
          </p>

          <ul className="space-y-2 pl-4 text-xs font-medium text-gray-800">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Rigorous clinical understanding instead of rote memory</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Realistic de-identified chart auditing simulations</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>AAPC and AHIMA exam time-management mastery</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Comprehensive placement support through our extensive hiring network</span>
            </li>
          </ul>

          <p>
            Whether you choose to study at our Chennai Head Office, Perambalur, Coimbatore, Karaikudi, or via our live interactive online classroom, my faculty and I are committed to walking with you every step of the way until you hold your international certification and your appointment letter.
          </p>

          <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="font-montserrat font-bold text-mcoa-midnight">
                Dr. Jeevanantham Mariappan
              </div>
              <div className="text-xs text-gray-500">
                Founder & CEO, Medical Coding Officers Academy (MCOA)
              </div>
            </div>

            <Link
              href="/apply"
              className="px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-mcoa-gold text-mcoa-midnight hover:bg-[#e0b760] transition shadow-gold flex items-center space-x-1.5"
            >
              <span>Join Next Batch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
