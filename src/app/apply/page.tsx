import { LeadCaptureForm } from "@/components/common/LeadCaptureForm";
import { ShieldCheck, Award, GraduationCap, CheckCircle2 } from "lucide-react";

export default function ApplyPage() {
  return (
    <div className="bg-mcoa-pearl/30 min-h-screen py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-mcoa-amethyst font-montserrat">
            Admissions Desk 2026
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-mcoa-midnight mt-1 font-montserrat">
            Apply For Academy Enrollment
          </h1>
          <p className="text-sm text-gray-600 mt-2 font-inter">
            Begin your journey toward international healthcare certification. Submit your application below for priority batch seat reservation.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-royal p-8 sm:p-10 border border-mcoa-gold/40">
          <div className="mb-6 pb-6 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-xs font-semibold text-mcoa-midnight">
              <ShieldCheck className="w-5 h-5 text-mcoa-gold shrink-0" />
              <span>Official MCOA Admissions Application</span>
            </div>
            <div className="text-xs text-gray-500">
              Need assistance? Call: <a href="tel:+918072020716" className="text-mcoa-amethyst font-bold">+91 8072020716</a>
            </div>
          </div>

          <LeadCaptureForm sourceContext="Official Apply Page" />
        </div>

        {/* Value badges below */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 text-xs text-gray-600">
          <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center space-x-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Zero obligation free counseling with senior faculty</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center space-x-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Installment fee payment plans available</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center space-x-2.5">
            <CheckCircle2 className="w-5 h-4 text-emerald-600 shrink-0" />
            <span>Placement assistance included</span>
          </div>
        </div>
      </div>
    </div>
  );
}
