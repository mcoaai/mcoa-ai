"use client";

import { useState, useEffect } from "react";
import { LEAD_STATUSES, LeadStatus } from "@/types";
import { BRANCHES_DATA } from "@/data/branches";
import { COURSES_DATA } from "@/data/courses";
import {
  Users,
  Search,
  Filter,
  Download,
  Plus,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  Edit,
  Eye,
  Loader2,
  X,
  Save,
} from "lucide-react";

export default function AdminCrmPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [branchFilter, setBranchFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Load leads
  const fetchLeads = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== "ALL") params.append("status", statusFilter);
      if (branchFilter !== "ALL") params.append("branchId", branchFilter);
      if (searchQuery.trim()) params.append("search", searchQuery.trim());

      const res = await fetch(`/api/leads?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setLeads(data.leads);
      }
    } catch (err) {
      console.error("Error fetching leads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter, branchFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLeads();
  };

  // Status Change Handler
  const handleStatusChange = async (leadId: string, newStatus: string) => {
    setUpdatingId(leadId);
    try {
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
        );
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead({ ...selectedLead, status: newStatus });
        }
      }
    } catch (err) {
      console.error("Error updating status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Note Update Handler
  const handleUpdateNotes = async (leadId: string, notes: string) => {
    setUpdatingId(leadId);
    try {
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, notes }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, notes } : l))
        );
      }
    } catch (err) {
      console.error("Error updating notes:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Export CSV via authenticated server endpoint with audit logging
  const handleExportCSV = async () => {
    try {
      const res = await fetch("/api/admin/export/leads");
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "You do not have permissions to export lead data.");
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `mcoa_leads_export_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export error:", err);
      alert("Failed to export leads.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Top Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-montserrat text-mcoa-midnight">
            Admissions CRM Pipeline
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Track inquiries, update lead progression, schedule demo sessions, and assign counselors.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition flex items-center space-x-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-mcoa-amethyst" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Stage Pills Filter Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
        <button
          onClick={() => setStatusFilter("ALL")}
          className={`px-3 py-1.5 rounded-full font-semibold transition shrink-0 ${
            statusFilter === "ALL"
              ? "bg-mcoa-midnight text-white"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-mcoa-pearl"
          }`}
        >
          All Stages ({leads.length})
        </button>
        {LEAD_STATUSES.map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1.5 rounded-full font-semibold transition shrink-0 ${
              statusFilter === st
                ? "bg-mcoa-amethyst text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-mcoa-pearl"
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search student name, phone, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:bg-white focus:ring-2 focus:ring-mcoa-amethyst transition"
          />
        </form>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="flex items-center space-x-1.5 text-gray-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Campus:</span>
          </div>
          <select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-mcoa-amethyst"
          >
            <option value="ALL">All Campuses</option>
            {BRANCHES_DATA.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-gray-500 flex flex-col items-center justify-center space-y-2">
            <Loader2 className="w-6 h-6 animate-spin text-mcoa-amethyst" />
            <span className="text-xs">Loading CRM Leads...</span>
          </div>
        ) : leads.length === 0 ? (
          <div className="py-20 text-center text-gray-500">
            <p className="text-sm font-semibold">No inquiries found matching this filter.</p>
            <p className="text-xs mt-1">Try switching stages or clearing the search query.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-inter">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Student & Contact</th>
                  <th className="py-3 px-4">Background</th>
                  <th className="py-3 px-4">Course & Campus</th>
                  <th className="py-3 px-4">Mode / Batch</th>
                  <th className="py-3 px-4">Pipeline Stage</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-mcoa-pearl/20 transition">
                    <td className="py-3.5 px-4 font-medium">
                      <div className="font-bold text-mcoa-midnight text-sm">{lead.fullName}</div>
                      <div className="text-gray-500 flex items-center space-x-2 mt-0.5">
                        <a href={`tel:${lead.phone}`} className="hover:text-mcoa-amethyst transition flex items-center space-x-1">
                          <Phone className="w-3 h-3 text-mcoa-gold" />
                          <span>{lead.phone}</span>
                        </a>
                      </div>
                      <div className="text-gray-400 text-[11px] truncate max-w-[180px]">{lead.email}</div>
                    </td>

                    <td className="py-3.5 px-4 text-gray-700">
                      <span className="bg-gray-100 px-2 py-0.5 rounded text-[11px] font-medium text-gray-800">
                        {lead.educationBackground}
                      </span>
                      <div className="text-[10px] text-gray-400 mt-1">Src: {lead.source}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-mcoa-midnight">
                        {lead.course?.title || "Advanced Medical Coding"}
                      </div>
                      <div className="text-[11px] text-mcoa-amethyst flex items-center space-x-1 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        <span>{lead.branch?.name || "Chennai Head Office"}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-gray-600">
                      <div>{lead.mode}</div>
                      <div className="text-[10px] text-gray-400 font-semibold">{lead.preferredBatch}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="relative">
                        <select
                          value={lead.status}
                          disabled={updatingId === lead.id}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-bold outline-none cursor-pointer border transition ${
                            lead.status === "New"
                              ? "bg-amber-50 text-amber-800 border-amber-200"
                              : lead.status === "Enrolled"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                              : lead.status === "Qualified" || lead.status === "Demo Scheduled"
                              ? "bg-purple-50 text-purple-800 border-purple-200"
                              : "bg-gray-50 text-gray-700 border-gray-200"
                          }`}
                        >
                          {LEAD_STATUSES.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                        {updatingId === lead.id && (
                          <Loader2 className="w-3 h-3 animate-spin text-mcoa-amethyst inline ml-1" />
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="px-2.5 py-1 rounded bg-mcoa-pearl hover:bg-mcoa-lavender/30 text-mcoa-midnight text-xs font-semibold transition"
                      >
                        Notes & Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Lead Detail & Counselor Notes Drawer */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative border border-gray-200">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-mcoa-midnight hover:bg-gray-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-mcoa-amethyst">
                CRM Lead File #{selectedLead.id.slice(-6)}
              </span>
              <h3 className="text-xl font-bold font-montserrat text-mcoa-midnight mt-0.5">
                {selectedLead.fullName}
              </h3>
              <div className="text-xs text-gray-500 mt-1 flex flex-wrap gap-x-4">
                <span>📞 {selectedLead.phone}</span>
                <span>✉️ {selectedLead.email}</span>
              </div>
            </div>

            <div className="space-y-4 text-xs font-inter">
              <div className="bg-mcoa-pearl/50 p-3 rounded-xl border border-mcoa-lavender/30 space-y-1">
                <div><strong>Qualification:</strong> {selectedLead.educationBackground}</div>
                <div><strong>Desired Program:</strong> {selectedLead.course?.title || "N/A"}</div>
                <div><strong>Preferred Campus:</strong> {selectedLead.branch?.name || "N/A"}</div>
                <div><strong>Mode & Batch:</strong> {selectedLead.mode} ({selectedLead.preferredBatch})</div>
                <div><strong>Date Inquired:</strong> {new Date(selectedLead.createdAt).toLocaleString()}</div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Change Pipeline Stage
                </label>
                <select
                  value={selectedLead.status}
                  onChange={(e) => handleStatusChange(selectedLead.id, e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs"
                >
                  {LEAD_STATUSES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Counselor Interaction Notes & Next Steps
                </label>
                <textarea
                  rows={4}
                  defaultValue={selectedLead.notes || ""}
                  id="lead-notes-input"
                  placeholder="Record call summary, candidate goals, fee discussions, demo scheduling..."
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-mcoa-amethyst"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  onClick={() => setSelectedLead(null)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const notes = (document.getElementById("lead-notes-input") as HTMLTextAreaElement).value;
                    handleUpdateNotes(selectedLead.id, notes);
                    setSelectedLead({ ...selectedLead, notes });
                  }}
                  className="px-4 py-2 rounded-lg bg-mcoa-midnight text-white hover:bg-mcoa-amethyst font-semibold flex items-center space-x-1.5"
                >
                  <Save className="w-3.5 h-3.5 text-mcoa-gold" />
                  <span>Save Notes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
