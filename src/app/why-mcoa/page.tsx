import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Award, Laptop, Users, ShieldCheck, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Why Choose MCOA | Doctor-Led Training & 100% Placement Support",
  description:
    "Discover why life sciences, pharmacy, and nursing graduates choose Medical Coding Officers Academy. Real hospital charts, 94%+ pass rate, 4 physical campuses, and doctor-led faculty.",
  alternates: {
    canonical: "/why-mcoa",
  },
};

export default function WhyMcoaPage() {
  const comparisons = [
    {
      feature: "Clinical Guidance",
      mcoa: "Doctor-led instruction by Dr. Jeevanantham with deep pathophysiology explanation",
      others: "General IT trainers reading slides without clinical context",
    },
    {
      feature: "Coding Practice",
      mcoa: "100+ de-identified authentic synthetic inpatient & outpatient clinical charts",
      others: "Theoretical multiple choice questions only",
    },
    {
      feature: "First-Attempt Pass Rate",
      mcoa: "Verified 94%+ first-attempt clearance for AAPC CPC® and AHIMA CCS®",
      others: "Unverified claims or high re-take rates",
    },
    {
      feature: "Campus Infrastructure",
      mcoa: "4 full-scale physical learning centers (Chennai, Perambalur, Coimbatore, Karaikudi) + Live Online",
      others: "Online-only webinars without local lab or faculty interaction",
    },
    {
      feature: "Placement Support",
      mcoa: "100% placement assistance, resume optimization, and scheduled MNC campus drives",
      others: "Placement assistance not included or restricted to job board forwarding",
    },
  ];

  return (
    <div className="bg-white min-h-screen py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-mcoa-amethyst font-montserrat">
            The MCOA Difference
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-mcoa-midnight mt-1 font-montserrat">
            Why Choose MCOA For Your Career?
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-3 font-inter">
            A comprehensive breakdown of how our medically-grounded pedagogy sets you apart in the global healthcare information industry.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-16">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-inter">
              <thead className="bg-mcoa-midnight text-white text-xs uppercase tracking-wider font-montserrat">
                <tr>
                  <th className="py-4 px-6 w-1/4">Key Training Area</th>
                  <th className="py-4 px-6 w-3/8 text-mcoa-gold font-bold">MCOA Academy Standard</th>
                  <th className="py-4 px-6 w-3/8 text-white/70">Typical Computer / Generic Institutes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {comparisons.map((c, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-mcoa-pearl/30"}>
                    <td className="py-4 px-6 font-bold text-mcoa-midnight">{c.feature}</td>
                    <td className="py-4 px-6 text-gray-800 font-medium">
                      <div className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{c.mcoa}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-500">{c.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Strip */}
        <div className="royal-gradient text-white rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-royal space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-montserrat">
            Ready to Start Your Career in Medical Coding?
          </h2>
          <p className="text-xs sm:text-sm text-white/80 max-w-xl mx-auto font-inter">
            Join the next batch in Chennai, Perambalur, Coimbatore, Karaikudi, or attend online from anywhere.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              href="/apply"
              className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-mcoa-gold text-mcoa-midnight hover:bg-[#e0b760] transition shadow-gold"
            >
              Apply For Next Batch
            </Link>
            <a
              href="tel:+918072020716"
              className="px-6 py-3 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 border border-white/20 text-white transition"
            >
              Call Admissions: +91 8072020716
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
