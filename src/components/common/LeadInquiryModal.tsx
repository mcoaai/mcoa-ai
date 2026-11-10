"use client";

import { useState, useEffect } from "react";
import { X, Sparkles, Phone, MessageCircle } from "lucide-react";
import { LeadCaptureForm } from "@/components/common/LeadCaptureForm";

/**
 * Global helper to open the admissions counselor modal from any button/link on the site.
 */
export function openCounselorModal(customSubject?: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("open-counselor-modal", {
        detail: { subject: customSubject || "Admissions Counseling Inquiry" },
      })
    );
  }
}

export function LeadInquiryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [inquirySubject, setInquirySubject] = useState<string>("Admissions Counseling Inquiry");

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ subject?: string }>;
      if (customEvent.detail?.subject) {
        setInquirySubject(customEvent.detail.subject);
      }
      setIsOpen(true);
    };

    window.addEventListener("open-counselor-modal", handleOpen);
    return () => window.removeEventListener("open-counselor-modal", handleOpen);
  }, []);

  return (
    <>
      {/* Floating CTA Trigger Pill on bottom right */}
      <button
        onClick={() => {
          setInquirySubject("Floating CTA - Talk to Counselor");
          setIsOpen(true);
        }}
        className="fixed bottom-6 right-6 z-40 bg-mcoa-gold hover:bg-[#e0b760] text-mcoa-midnight font-bold text-xs uppercase tracking-wider px-4 py-3 rounded-full shadow-gold flex items-center space-x-2 transition transform hover:scale-105"
        aria-label="Talk to an Admissions Counselor"
      >
        <Sparkles className="w-4 h-4 text-mcoa-midnight" />
        <span className="hidden sm:inline">Talk to an Admissions Counselor</span>
        <span className="sm:hidden">Talk to Counselor</span>
      </button>

      {/* Modal Backdrop & Dialog */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-6 sm:p-7 shadow-2xl relative border-2 border-mcoa-gold/50">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-mcoa-midnight hover:bg-gray-100 transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-mcoa-amethyst font-montserrat">
                Medical Coding Officers Academy (MCOA)
              </span>
              <h3 className="text-xl font-bold text-mcoa-midnight font-montserrat mt-1">
                Talk to an Admissions Counselor
              </h3>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Connect directly with Dr. Jeevanantham's academic counseling desk. Get personalized degree eligibility evaluation, syllabus brochures, fee structures, and batch schedules.
              </p>
            </div>

            {/* Quick Contact Bar */}
            <div className="mb-4 p-3 bg-mcoa-pearl rounded-xl flex items-center justify-between text-xs font-semibold text-mcoa-midnight">
              <a
                href="tel:+918072020716"
                className="flex items-center space-x-1.5 text-mcoa-midnight hover:text-mcoa-amethyst transition"
              >
                <Phone className="w-3.5 h-3.5 text-mcoa-gold" />
                <span>+91 8072020716</span>
              </a>
              <span className="text-gray-300">|</span>
              <a
                href="https://wa.me/918072020716?text=Hi%20MCOA%20Counselor%2C%20I%20would%20like%20to%20know%20more%20about%20Medical%20Coding%20Courses"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 text-emerald-700 hover:text-emerald-800 transition"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Desk</span>
              </a>
            </div>

            <LeadCaptureForm
              compact
              sourceContext={inquirySubject}
              onSuccess={() => {
                setTimeout(() => setIsOpen(false), 3000);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
