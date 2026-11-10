import type { Metadata } from "next";
import { BRANCHES_DATA } from "@/data/branches";
import { LeadCaptureForm } from "@/components/common/LeadCaptureForm";
import { MapPin, Phone, Mail, Clock, MessageSquare, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Campuses & Contact Information | Chennai, Perambalur, Coimbatore, Karaikudi",
  description:
    "Visit MCOA's 4 physical campuses across Tamil Nadu or speak directly with an admissions counselor. Contact Chennai HQ (#70/1), Perambalur, Coimbatore, or Karaikudi (PIN 630 001). Hotline: +91 8072020716.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="bg-mcoa-pearl/30 min-h-screen py-14 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-mcoa-amethyst font-montserrat">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-mcoa-midnight mt-1 font-montserrat">
            Campuses & Contact Information
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Have questions about admissions, fees, batch schedules, or branch counseling? Reach out directly to our central admissions desk or visit your nearest branch.
          </p>
        </div>

        {/* Central Helpline Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/80 flex items-start space-x-4">
            <div className="w-12 h-12 rounded-xl bg-mcoa-pearl text-mcoa-amethyst flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6 text-mcoa-gold" />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Direct Hotline</div>
              <a href="tel:+918072020716" className="text-base font-bold text-mcoa-midnight hover:text-mcoa-amethyst transition block mt-0.5">
                +91 8072020716
              </a>
              <div className="text-[11px] text-gray-500 mt-1">Mon - Sun (8:00 AM - 8:30 PM IST)</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/80 flex items-start space-x-4">
            <div className="w-12 h-12 rounded-xl bg-mcoa-pearl text-mcoa-amethyst flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6 text-mcoa-amethyst" />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Email Admissions</div>
              <a href="mailto:medicalcodingofficers@gmail.com" className="text-sm font-bold text-mcoa-midnight hover:text-mcoa-amethyst transition block mt-0.5 truncate">
                medicalcodingofficers@gmail.com
              </a>
              <div className="text-[11px] text-gray-500 mt-1">Official Response within 4 hours</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/80 flex items-start space-x-4">
            <div className="w-12 h-12 rounded-xl bg-mcoa-pearl text-mcoa-amethyst flex items-center justify-center shrink-0">
              <MessageSquare className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">WhatsApp Desk</div>
              <a
                href="https://wa.me/918072020716?text=Hi%20MCOA%20Admissions%20Team"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-emerald-700 hover:text-emerald-800 transition block mt-0.5"
              >
                Instant Chat (+91 8072020716)
              </a>
              <div className="text-[11px] text-gray-500 mt-1">Receive syllabus & fee details instantly</div>
            </div>
          </div>
        </div>

        {/* 2-Column: Form & Branch Directory */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Inquiry Form */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-mcoa-gold/40">
            <h3 className="font-montserrat font-bold text-xl text-mcoa-midnight mb-1">
              Send an Admission Inquiry
            </h3>
            <p className="text-xs text-gray-600 mb-6">
              Our academic counselors will evaluate your profile and contact you with available batch schedules.
            </p>
            <LeadCaptureForm sourceContext="Contact Page Form" compact />
          </div>

          {/* Detailed Branch Cards */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-montserrat font-bold text-xl text-mcoa-midnight">
              Campus Locations & Addresses
            </h3>

            <div className="space-y-4">
              {BRANCHES_DATA.map((branch) => (
                <div
                  key={branch.id}
                  className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-mcoa-amethyst shrink-0" />
                      <h4 className="font-montserrat font-bold text-base text-mcoa-midnight">
                        {branch.name}
                      </h4>
                    </div>
                    {branch.isHeadOffice && (
                      <span className="bg-mcoa-midnight text-mcoa-gold text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                        Headquarters
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-700 pl-7 leading-relaxed">
                    {branch.address}, {branch.city}, {branch.state} — <strong>PIN: {branch.postalCode}</strong>
                  </p>

                  <div className="pl-7 pt-1 flex flex-wrap gap-4 text-xs">
                    <a href={`tel:${branch.phone}`} className="text-mcoa-midnight font-medium hover:text-mcoa-amethyst transition">
                      📞 {branch.phone}
                    </a>
                    <a href={`mailto:${branch.email}`} className="text-mcoa-midnight font-medium hover:text-mcoa-amethyst transition">
                      ✉️ {branch.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
