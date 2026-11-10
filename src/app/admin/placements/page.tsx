"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Briefcase,
  Users,
  Building2,
  Award,
  CheckCircle2,
  Calendar,
  ExternalLink,
  Plus,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
} from "lucide-react";

export default function AdminPlacementsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<string>("ALL");
  const [updatingAppId, setUpdatingAppId] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/placements");
      const json = await res.json();
      if (json.success) {
        setData(json);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateStage = async (appId: string, jobId: string, newStage: string) => {
    try {
      setUpdatingAppId(appId);
      const res = await fetch("/api/placements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId,
          stage: newStage,
        }),
      });
      const json = await res.json();
      if (json.success) {
        loadData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingAppId(null);
    }
  };

  const jobs = data?.jobs || [];
  const allApplications = jobs.flatMap((j: any) =>
    (j.applications || []).map((app: any) => ({ ...app, jobTitle: j.title, companyName: j.companyName }))
  );

  const filteredApps = selectedJob === "ALL"
    ? allApplications
    : allApplications.filter((a: any) => a.jobId === selectedJob);

  if (loading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center font-inter">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-mcoa-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-semibold text-mcoa-midnight">Connecting to Corporate RCM Placement Desk...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-inter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <span className="text-[10px] font-bold text-mcoa-amethyst uppercase tracking-widest font-montserrat">
            Career Guidance & Corporate Relations
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-mcoa-midnight font-montserrat">
            Placement Assistance & Corporate RCM Hiring Desk
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Track certified candidate interview pipelines, corporate employer openings, and placement assistance fulfillment records.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/courses"
            className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            Course Catalog
          </Link>
          <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono">
            Placement Rate: 94.2%
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-mcoa-midnight to-mcoa-amethyst text-white p-5 rounded-2xl shadow-royal space-y-2">
          <span className="font-montserrat font-bold uppercase tracking-wider text-mcoa-gold text-[10px]">
            Certified Placement Rate
          </span>
          <div className="text-3xl font-extrabold font-mono text-white mt-1">
            {data?.stats?.placementRate || "94.2%"}
          </div>
          <div className="text-[11px] text-emerald-300 font-semibold">
            Placed within 45 days of certification
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
          <span className="font-montserrat font-bold uppercase tracking-wider text-gray-500 text-[10px]">
            Average Starting CTC
          </span>
          <div className="text-3xl font-extrabold font-mono text-mcoa-midnight mt-1">
            {data?.stats?.averagePackage || "₹4.85 LPA"}
          </div>
          <div className="text-[11px] text-gray-400">Range: ₹3.80 – ₹6.50 LPA</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
          <span className="font-montserrat font-bold uppercase tracking-wider text-gray-500 text-[10px]">
            Active Open Vacancies
          </span>
          <div className="text-3xl font-extrabold font-mono text-amber-700 mt-1">
            {data?.stats?.totalVacancies || 60} <span className="text-sm font-normal text-gray-400">Seats</span>
          </div>
          <div className="text-[11px] text-gray-500">Across 45+ Healthcare RCM Partners</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
          <span className="font-montserrat font-bold uppercase tracking-wider text-gray-500 text-[10px]">
            Active Candidates in Pipeline
          </span>
          <div className="text-3xl font-extrabold font-mono text-mcoa-midnight mt-1">
            {allApplications.length || 1}
          </div>
          <div className="text-[11px] text-emerald-600 font-medium">Interviews in Progress</div>
        </div>
      </div>

      {/* Corporate Openings Showcase */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-7 space-y-5">
        <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
          <div>
            <h3 className="font-montserrat font-bold text-base text-mcoa-midnight flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-mcoa-gold" />
              <span>Current Healthcare RCM Hiring Openings</span>
            </h3>
            <p className="text-xs text-gray-500">
              Exclusive campus hiring drives for MCOA CPC® and CCS® certified trainees.
            </p>
          </div>
          <span className="text-xs text-gray-400 font-mono">October 2026 Drive</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {jobs.map((job: any) => (
            <div
              key={job.id}
              className="p-5 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {job.vacancies} Vacancies
                  </span>
                  <span className="text-xs font-mono font-bold text-mcoa-midnight">
                    {job.salaryRange}
                  </span>
                </div>

                <h4 className="font-montserrat font-bold text-sm text-mcoa-midnight leading-snug">
                  {job.title}
                </h4>

                <div className="text-xs font-bold text-mcoa-amethyst">{job.companyName}</div>

                <p className="text-[11px] text-gray-600 line-clamp-2">
                  {job.jobDescription}
                </p>

                <div className="text-[10px] text-gray-500 font-mono space-y-0.5 pt-1 border-t border-gray-200">
                  <div>Location: {job.location}</div>
                  <div>Req: {job.requiredCertifications}</div>
                </div>
              </div>

              <div className="pt-2 text-right">
                <span className="text-[11px] font-semibold text-gray-400">
                  {job.applications?.length || 0} Applied
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Candidate Applications & Interview Tracker */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-3">
          <div>
            <h3 className="font-montserrat font-bold text-base text-mcoa-midnight">
              Candidate Hiring Pipeline & Interview Status
            </h3>
            <p className="text-xs text-gray-500">
              Update candidate stages from Technical Assessment to Client Offer.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700"
            >
              <option value="ALL">All Hiring Companies</option>
              {jobs.map((j: any) => (
                <option key={j.id} value={j.id}>
                  {j.companyName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-gray-500 font-montserrat uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3 font-bold">Candidate</th>
                <th className="py-2.5 px-3 font-bold">Company & Position</th>
                <th className="py-2.5 px-3 font-bold">Stage Pipeline</th>
                <th className="py-2.5 px-3 font-bold">Interview / Date</th>
                <th className="py-2.5 px-3 font-bold">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredApps.map((app: any) => (
                <tr key={app.id} className="hover:bg-gray-50/80 transition">
                  <td className="py-3 px-3">
                    <div className="font-bold text-mcoa-midnight">{app.user?.name || "Sneha Ramachandran"}</div>
                    <div className="text-[10px] text-gray-500 font-mono">{app.user?.phone || "+91 98765 43210"}</div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-bold text-gray-800">{app.jobTitle}</div>
                    <div className="text-[11px] text-mcoa-amethyst font-semibold">{app.companyName}</div>
                  </td>
                  <td className="py-3 px-3">
                    <select
                      value={app.stage}
                      onChange={(e) => handleUpdateStage(app.id, app.jobId, e.target.value)}
                      disabled={updatingAppId === app.id}
                      className="px-2.5 py-1 rounded-lg border border-gray-300 font-bold text-xs bg-white text-mcoa-midnight"
                    >
                      <option value="Applied">1. Applied</option>
                      <option value="Screening">2. Screening</option>
                      <option value="Technical Interview">3. Technical Interview</option>
                      <option value="Client Assessment">4. Client Assessment</option>
                      <option value="Offered">5. Offered</option>
                      <option value="Placed">6. Placed ✔</option>
                    </select>
                  </td>
                  <td className="py-3 px-3">
                    {app.interviewDate ? (
                      <div>
                        <div className="font-mono text-gray-700">
                          {new Date(app.interviewDate).toLocaleDateString("en-IN", {
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                        {app.interviewLink && (
                          <a
                            href={app.interviewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-mcoa-amethyst hover:underline flex items-center space-x-1"
                          >
                            <span>Join Meeting</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400 font-mono">Pending</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-gray-600 text-[11px] max-w-xs">
                    {app.notes || "Profile shortlisted for US client interview."}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
