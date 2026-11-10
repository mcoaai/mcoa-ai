import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Notice & Data Protection Policy",
  description:
    "Official Privacy Policy of Medical Coding Officers Academy (MCOA). Understand how your admission inquiries, student records, and personal information are protected.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen py-16 font-inter text-mcoa-slate">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 bg-mcoa-pearl px-3.5 py-1 rounded-full border border-mcoa-lavender/40 text-mcoa-amethyst text-xs font-bold font-montserrat">
            <ShieldCheck className="w-4 h-4 text-mcoa-gold" />
            <span>MCOA Governance & Trust</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-mcoa-midnight font-montserrat">
            Privacy Notice & Data Protection Policy
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Last Updated: November 10, 2026 | Effective for all MCOA Campuses & Online Portals
          </p>
        </div>

        {/* Core Notice Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-mcoa-pearl/50 border border-mcoa-gold/40 space-y-3">
          <div className="flex items-center space-x-2 text-mcoa-midnight font-bold font-montserrat text-base">
            <Lock className="w-5 h-5 text-mcoa-gold" />
            <span>Commitment to Student & Inquirer Privacy</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            Medical Coding Officers Academy (MCOA), founded by Dr. Jeevanantham Mariappan, is committed to safeguarding the privacy and confidentiality of students, applicants, and website visitors. We collect only the data necessary to provide truthful academic counseling, verify degree qualifications, deliver educational courseware, and assist with corporate placement.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8 text-sm leading-relaxed text-gray-700">
          {/* 1. Information We Collect */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-montserrat text-mcoa-midnight">
              1. Information We Collect
            </h2>
            <p>When you submit an admission inquiry or register for an academy service, we collect:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-gray-600">
              <li><strong>Contact Information:</strong> Full name, email address, and mobile/WhatsApp number.</li>
              <li><strong>Academic Background:</strong> Degree, major, and graduation year (used strictly to assess eligibility for AAPC CPC® or AHIMA CCS® credential tracks).</li>
              <li><strong>Campus & Training Preferences:</strong> Preferred campus (Chennai, Perambalur, Coimbatore, Karaikudi, or Live Online) and batch schedules.</li>
              <li><strong>Student LMS Records:</strong> Enrolled course modules, assignment submissions, practice exam scores, and attendance logs.</li>
            </ul>
          </section>

          {/* 2. How We Use Your Data */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-montserrat text-mcoa-midnight">
              2. How Your Information Is Used
            </h2>
            <p>Your personal information is used exclusively for legitimate educational purposes:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100 flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>One-on-one academic counseling and degree eligibility evaluation.</span>
              </div>
              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100 flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Sending course brochures, weekly syllabi, and fee schedules via your preferred channel.</span>
              </div>
              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100 flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Issuing LMS login credentials and mock exam access.</span>
              </div>
              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100 flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Placement assistance, resume curation, and interview scheduling with hiring partners.</span>
              </div>
            </div>
          </section>

          {/* 3. Communication Preferences & Opt-Out */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-montserrat text-mcoa-midnight">
              3. Communication Preferences & Consent
            </h2>
            <p>
              We honor your chosen contact method (WhatsApp, Phone Call, or Email). We strictly do not engage in cold unsolicited calls or third-party telemarketing. You may withdraw consent or update your preferences at any time by replying <strong>STOP</strong> on WhatsApp or emailing{" "}
              <a href="mailto:medicalcodingofficers@gmail.com" className="text-mcoa-amethyst font-semibold underline">
                medicalcodingofficers@gmail.com
              </a>.
            </p>
          </section>

          {/* 4. No Third-Party Data Selling */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-montserrat text-mcoa-midnight">
              4. Zero Third-Party Data Sharing or Commercialization
            </h2>
            <p>
              MCOA has a zero-tolerance policy against selling, renting, or trading student contact data to external advertisers, financial brokers, or third-party marketing agencies. Candidate resumes are shared exclusively with confirmed healthcare IT employers (such as Omega, Access, AGS, Optum) strictly with your prior explicit consent for scheduled interviews.
            </p>
          </section>

          {/* 5. Data Security & Storage Controls */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-montserrat text-mcoa-midnight">
              5. Technical Security & Storage Controls
            </h2>
            <p>
              All website communications use modern TLS 1.3 encryption. Internal staff databases implement deny-by-default role-based access control (RBAC), multi-factor authentication (MFA), salted cryptographic password hashing (PBKDF2), and branch-level isolation to prevent unauthorized data access.
            </p>
          </section>

          {/* 6. Grievance & Data Removal Officer */}
          <section className="space-y-3 border-t border-gray-200 pt-6">
            <h2 className="text-xl font-bold font-montserrat text-mcoa-midnight">
              6. Grievance Officer & Data Removal Requests
            </h2>
            <p>
              To request a copy of your stored records, correct inaccurate details, or request full deletion of your contact information, please contact our Grievance Desk:
            </p>
            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-2 text-xs">
              <div className="font-bold text-mcoa-midnight">
                Academic Directorate & Data Grievance Desk
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-mcoa-amethyst" />
                <span>#70/1, 200 Feet Radial Road, Narayanapuram Lake, Pallikaranai, Chennai - 600100</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-mcoa-gold" />
                <span>+91 8072020716</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-mcoa-gold" />
                <span>medicalcodingofficers@gmail.com</span>
              </div>
            </div>
          </section>
        </div>

        {/* Back Link */}
        <div className="text-center pt-6 border-t border-gray-100">
          <Link
            href="/"
            className="text-xs font-bold text-mcoa-amethyst hover:text-mcoa-midnight underline font-montserrat"
          >
            ← Return to MCOA Academy Home
          </Link>
        </div>
      </div>
    </div>
  );
}

