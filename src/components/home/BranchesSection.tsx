"use client";

import Link from "next/link";
import { BRANCHES_DATA } from "@/data/branches";
import { MapPin, Phone, Mail, ArrowUpRight, Sparkles, Navigation } from "lucide-react";
import { openCounselorModal } from "@/components/common/LeadInquiryModal";

export function BranchesSection() {
  return (
    <section className="py-20 bg-mcoa-pearl/40 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-mcoa-amethyst font-montserrat">
            Contact & Campus Network
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-mcoa-midnight mt-2 font-montserrat">
            Visit Our Campuses Across Tamil Nadu
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Walk into any of our state-of-the-art training centers for in-person counseling, physical classroom training, and lab chart access.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BRANCHES_DATA.map((branch) => (
            <div
              key={branch.id}
              className={`bg-white rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                branch.isHeadOffice
                  ? "border-mcoa-gold shadow-gold relative ring-2 ring-mcoa-gold/20"
                  : "border-gray-200/90 hover:border-mcoa-amethyst hover:shadow-md"
              }`}
            >
              <div>
                {branch.isHeadOffice && (
                  <div className="inline-block bg-mcoa-midnight text-mcoa-gold text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-3 border border-mcoa-gold/40 font-montserrat">
                    Academy Headquarters
                  </div>
                )}

                <div className="flex items-start justify-between">
                  <h3 className="font-montserrat font-bold text-base text-mcoa-midnight">
                    {branch.name}
                  </h3>
                  <MapPin
                    className={`w-5 h-5 shrink-0 ${
                      branch.isHeadOffice ? "text-mcoa-gold" : "text-mcoa-amethyst"
                    }`}
                  />
                </div>

                <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                  {branch.address}
                </p>

                <div className="mt-2 text-[11px] font-semibold text-mcoa-amethyst">
                  PIN: {branch.postalCode}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 space-y-2.5 text-xs">
                <a
                  href={`tel:${branch.phone}`}
                  className="flex items-center space-x-2 text-gray-700 hover:text-mcoa-amethyst transition"
                >
                  <Phone className="w-3.5 h-3.5 text-mcoa-gold" />
                  <span>{branch.phone}</span>
                </a>

                <a
                  href={`mailto:${branch.email}`}
                  className="flex items-center space-x-2 text-gray-700 hover:text-mcoa-amethyst transition truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-mcoa-gold" />
                  <span className="truncate">{branch.email}</span>
                </a>

                <div className="pt-2 flex items-center justify-between font-montserrat">
                  <Link
                    href={`/contact?branch=${branch.id}`}
                    className="inline-flex items-center space-x-1 text-xs font-bold text-mcoa-midnight hover:text-mcoa-amethyst transition"
                  >
                    <span>Campus Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() =>
                      openCounselorModal(`Campus Visit: ${branch.name}`)
                    }
                    className="text-[11px] font-bold text-mcoa-amethyst hover:underline"
                  >
                    Book Visit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Consistent 2-Action CTA Footer */}
        <div className="mt-14 p-8 bg-white rounded-3xl border border-mcoa-gold/40 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-montserrat font-bold text-lg text-mcoa-midnight">
              Prefer In-Person Academic Counseling?
            </h4>
            <p className="text-xs text-gray-600">
              Speak directly with an admissions counselor today or visit our Chennai, Perambalur, Coimbatore, or Karaikudi campus.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-montserrat shrink-0">
            {/* Primary Action */}
            <button
              onClick={() => openCounselorModal("Campus Footer: Talk to Counselor")}
              className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-mcoa-gold text-mcoa-midnight hover:bg-[#e0b760] transition shadow-gold flex items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Talk to an Admissions Counselor</span>
            </button>

            {/* Secondary Action */}
            <Link
              href="/courses"
              className="px-5 py-3 rounded-xl text-xs font-bold border border-mcoa-midnight/30 text-mcoa-midnight hover:bg-mcoa-pearl transition"
            >
              Explore Courses
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
