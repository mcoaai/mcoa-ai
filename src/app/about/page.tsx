import type { Metadata } from "next";
import Link from "next/link";
import { Award, GraduationCap, ShieldCheck, HeartPulse, Building2, CheckCircle2 } from "lucide-react";
import { BRANCHES_DATA } from "@/data/branches";

export const metadata: Metadata = {
  title: "About MCOA | Medical Coding Officers Academy Mission & Values",
  description:
    "Learn about Medical Coding Officers Academy, founded by Dr. Jeevanantham Mariappan. Empowering healthcare and life sciences graduates into certified revenue cycle officers with campuses in Chennai (#70/1), Perambalur, Coimbatore, and Karaikudi (630 001).",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="royal-gradient text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-mcoa-gold font-montserrat">
            Our Mission & Legacy
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-montserrat mt-2">
            About Medical Coding Officers Academy
          </h1>
          <p className="text-sm sm:text-base text-white/90 mt-4 leading-relaxed font-inter">
            Founded by <strong>Dr. Jeevanantham Mariappan</strong>, MCOA is dedicated to empowering healthcare, nursing, pharmacy, and life sciences graduates with international medical coding credentials and guaranteed career pathways.
          </p>
        </div>
      </section>

      {/* Philosophy & Foundation */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-mcoa-amethyst font-montserrat">
                Transforming Healthcare Careers
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-mcoa-midnight font-montserrat leading-tight">
                Bridging Medical Science with Global Healthcare IT
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed font-inter">
                Across India, tens of thousands of dedicated students graduate each year in life sciences, biotechnology, nursing, pharmacy, physiotherapy, and allied healthcare. While their clinical knowledge is deep, the domestic hospital job market often fails to offer the compensation or global growth they deserve.
              </p>
              <p className="text-sm text-gray-700 leading-relaxed font-inter">
                <strong>Medical Coding Officers Academy</strong> was born out of Dr. Jeevanantham’s passionate conviction that healthcare graduates can achieve extraordinary global careers in the US healthcare revenue cycle management (RCM) sector. With certified training in AAPC CPC®, AHIMA CCS®, and risk adjustment coding, our students enter multinational healthcare IT corporations as officers with competitive salaries and remote flexibility.
              </p>

              <div className="pt-2 space-y-2 text-xs text-gray-800">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Strict adherence to AAPC and AHIMA official testing guidelines</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Interactive coding lab simulators for ICD-10-CM, CPT, and ICD-10-PCS</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Placement assistance with leading healthcare MNCs in South India</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-mcoa-pearl rounded-3xl p-8 border border-mcoa-lavender/30 space-y-6">
              <h3 className="font-montserrat font-bold text-xl text-mcoa-midnight">
                The 4 Pillars of MCOA Excellence
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <HeartPulse className="w-6 h-6 text-mcoa-amethyst mb-2" />
                  <div className="font-bold text-mcoa-midnight mb-1">Clinical Authenticity</div>
                  <div className="text-gray-600">Rooted in genuine medical pathology, surgery notes, and clinical decision-making.</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <Award className="w-6 h-6 text-mcoa-gold mb-2" />
                  <div className="font-bold text-mcoa-midnight mb-1">94%+ Exam Pass Rate</div>
                  <div className="text-gray-600">Structured timed mock exams ensuring top confidence for AAPC CPC® and AHIMA CCS®.</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <Building2 className="w-6 h-6 text-mcoa-amethyst mb-2" />
                  <div className="font-bold text-mcoa-midnight mb-1">4 Physical Campuses</div>
                  <div className="text-gray-600">Full classroom infrastructure in Chennai, Perambalur, Coimbatore, and Karaikudi.</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <GraduationCap className="w-6 h-6 text-mcoa-gold mb-2" />
                  <div className="font-bold text-mcoa-midnight mb-1">Lifetime Career Support</div>
                  <div className="text-gray-600">Alumni network, continuing education units (CEU) guidance, and senior role upgrades.</div>
                </div>
              </div>

              <div className="pt-2 text-center">
                <Link
                  href="/founder"
                  className="inline-flex items-center space-x-2 text-xs font-bold text-mcoa-midnight hover:text-mcoa-amethyst underline"
                >
                  <span>Learn more about Founder Dr. Jeevanantham Mariappan →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Branch Network Summary */}
      <section className="py-16 bg-mcoa-pearl/40 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mb-10">
          <h2 className="text-2xl font-bold text-mcoa-midnight font-montserrat">
            Regional Campus Presence
          </h2>
          <p className="text-xs text-gray-600 mt-2">
            MCOA maintains active physical training centers with modern IT computer labs across Tamil Nadu.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          {BRANCHES_DATA.map((b) => (
            <div key={b.id} className="bg-white p-5 rounded-xl border border-gray-200">
              <div className="font-bold text-mcoa-midnight text-sm mb-1">{b.name}</div>
              <div className="text-gray-600 mb-2">{b.address}</div>
              <div className="text-mcoa-amethyst font-semibold">{b.phone}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
