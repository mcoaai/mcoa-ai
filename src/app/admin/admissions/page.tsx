"use client";

import { useState, useEffect } from "react";
import {
  GraduationCap,
  CheckCircle2,
  Users,
  Award,
  Search,
  Loader2,
  Building2,
  Sparkles,
} from "lucide-react";

export default function AdminAdmissionsPage() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrollingId, setEnrollingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/leads");
      const data = await res.json();
      if (data.success) {
        // Show leads ready for enrollment (Qualified, Counseling Scheduled, Demo Scheduled, or New)
        setCandidates(data.leads);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleEnroll = async (lead: any) => {
    setEnrollingId(lead.id);
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/admin/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId: lead.id,
          courseId: lead.courseId,
          totalFee: lead.course?.discountFeeInr || lead.course?.feeInr || 9500,
          paidFee: lead.course?.discountFeeInr || lead.course?.feeInr || 9500,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMessage(`Success! Student ID ${data.studentIdNumber} assigned to ${lead.fullName}.`);
        fetchCandidates();
      } else {
        alert(data.error || "Failed to enroll student.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setEnrollingId(null);
    }
  };

  return (
    <div className="space-y-6 font-inter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-mcoa-amethyst font-montserrat">
            Admissions Desk
          </span>
          <h1 className="text-2xl font-bold font-montserrat text-mcoa-midnight mt-0.5">
            Student Enrollment & ID Generation
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Review qualified candidates, approve admissions, and issue official MCOA student credentials.
          </p>
        </div>
      </div>

      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-4 rounded-xl flex items-center space-x-2 animate-fadeIn text-xs font-semibold">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Candidates Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center flex flex-col items-center justify-center space-y-2">
            <Loader2 className="w-6 h-6 animate-spin text-mcoa-amethyst" />
            <span className="text-xs text-gray-500">Loading Candidates...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-inter">
              <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Candidate & Phone</th>
                  <th className="py-3.5 px-4">Education</th>
                  <th className="py-3.5 px-4">Desired Course</th>
                  <th className="py-3.5 px-4">Campus</th>
                  <th className="py-3.5 px-4">Current Stage</th>
                  <th className="py-3.5 px-4 text-right">Admissions Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {candidates.map((cand) => (
                  <tr key={cand.id} className="hover:bg-gray-50/80">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-mcoa-midnight">{cand.fullName}</div>
                      <div className="text-[10px] text-gray-400">{cand.phone}</div>
                    </td>

                    <td className="py-3.5 px-4 text-gray-600">
                      {cand.educationBackground}
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-mcoa-amethyst">
                      {cand.course?.title || "Advanced Medical Coding"}
                    </td>

                    <td className="py-3.5 px-4 text-gray-500">
                      {cand.branch?.name || "Chennai Head Office"}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          cand.status === "Enrolled"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-mcoa-pearl text-mcoa-amethyst"
                        }`}
                      >
                        {cand.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      {cand.status === "Enrolled" ? (
                        <span className="text-xs text-emerald-700 font-bold flex items-center justify-end space-x-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Student ID Issued</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => handleEnroll(cand)}
                          disabled={enrollingId === cand.id}
                          className="px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-mcoa-gold text-mcoa-midnight hover:bg-[#e0b760] transition shadow-sm disabled:opacity-50 flex items-center space-x-1 inline-flex"
                        >
                          {enrollingId === cand.id ? (
                            <>
                              <Loader2 className="w-3 h-3 animate-spin" />
                              <span>Enrolling...</span>
                            </>
                          ) : (
                            <>
                              <GraduationCap className="w-3.5 h-3.5" />
                              <span>Approve & Issue ID</span>
                            </>
                          )}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
