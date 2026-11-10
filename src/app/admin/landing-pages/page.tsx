'use client';

import React, { useState, useEffect } from 'react';
import { Layout, Plus, Eye, CheckCircle, ExternalLink, Sparkles, TrendingUp, Users, Search, Edit3, Globe } from 'lucide-react';
import Link from 'next/link';

interface LandingPageItem {
  id: string;
  slug: string;
  title: string;
  metaDescription: string;
  templateType: string;
  status: string;
  heroBadge: string;
  heroHeadline: string;
  heroSubheadline: string;
  ctaText: string;
  targetBranch?: string;
  viewsCount: number;
  leadsCount: number;
  createdAt: string;
}

export default function AdminLandingPages() {
  const [pages, setPages] = useState<LandingPageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    slug: '',
    title: '',
    metaDescription: '',
    templateType: 'cpc_bootcamp',
    status: 'Published',
    heroBadge: 'Exclusive Admissions 2026',
    heroHeadline: '',
    heroSubheadline: '',
    ctaText: 'Claim Free Seat & Syllabus',
    targetBranch: 'Chennai Head Office'
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const res = await fetch('/api/landing-pages');
      const data = await res.json();
      if (data.success) {
        setPages(data.pages);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/landing-pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          sectionsJson: {
            highlights: [
              'Interactive classroom & live online sessions with Dr. Jeevanantham Mariappan',
              'Access to MCOA Digital Reference Manual & Coding Practice Simulator',
              '100% Corporate Placement Support with Omega Healthcare and Access Healthcare'
            ],
            stats: [
              { label: 'Exam Pass Rate', value: '98%' },
              { label: 'Average Fresher CTC', value: '₹4.5 LPA' }
            ]
          }
        })
      });
      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        fetchPages();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredPages = pages.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-cinzel text-2xl font-bold text-[#211747]">Landing Page Builder & CMS</h1>
            <span className="bg-[#D8AC55]/20 text-[#211747] text-xs font-bold px-2.5 py-0.5 rounded-full border border-[#D8AC55]/30">
              High-Conversion PPC Hub
            </span>
          </div>
          <p className="text-slate-500 text-sm mt-1">
            Build, publish, and track campaign landing pages for AAPC CPC bootcamps, branch admissions, and corporate drives.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-[#211747] text-[#D8AC55] hover:bg-[#50458F] px-4 py-2.5 rounded-xl font-montserrat font-bold text-xs shadow-md transition-all border border-[#D8AC55]/30"
        >
          <Plus className="w-4 h-4" /> Create New Landing Page
        </button>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase">Active Landing Pages</div>
            <div className="text-2xl font-bold font-montserrat text-[#211747] mt-1">{pages.length}</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-[#50458F]">
            <Globe className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase">Total Page Impressions</div>
            <div className="text-2xl font-bold font-montserrat text-[#50458F] mt-1">
              {pages.reduce((acc, p) => acc + p.viewsCount, 0).toLocaleString()}
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <Eye className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase">Total Leads Captured</div>
            <div className="text-2xl font-bold font-montserrat text-emerald-600 mt-1">
              {pages.reduce((acc, p) => acc + p.leadsCount, 0).toLocaleString()}
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-200">
        <Search className="w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search landing pages by title or slug..."
          className="flex-1 text-sm bg-transparent border-none focus:outline-none text-slate-800"
        />
      </div>

      {/* Pages Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase font-montserrat font-bold text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-4 px-6">Landing Page & Headline</th>
                <th className="py-4 px-6">Template & Branch</th>
                <th className="py-4 px-6">Traffic & Leads</th>
                <th className="py-4 px-6">Conversion</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-400">Loading landing pages...</td>
                </tr>
              ) : filteredPages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-400">No landing pages match your search.</td>
                </tr>
              ) : (
                filteredPages.map((lp) => {
                  const convRate = lp.viewsCount > 0 ? ((lp.leadsCount / lp.viewsCount) * 100).toFixed(1) : '0';
                  return (
                    <tr key={lp.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-montserrat font-bold text-[#211747] text-sm">{lp.title}</div>
                        <div className="text-xs text-slate-400 font-mono mt-0.5">/lp/{lp.slug}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-block bg-purple-50 text-[#50458F] text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-purple-200">
                          {lp.templateType}
                        </span>
                        <div className="text-xs text-slate-500 mt-1">{lp.targetBranch || 'All Hubs'}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-xs font-semibold text-slate-800">
                          {lp.viewsCount} views • <span className="text-emerald-600">{lp.leadsCount} leads</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5 font-bold text-sm text-[#211747]">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{convRate}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          lp.status === 'Published'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          <CheckCircle className="w-3 h-3" /> {lp.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Link
                          href={`/lp/${lp.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#50458F] hover:text-[#211747] bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-lg transition-colors border border-purple-200"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Preview Live
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Landing Page Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-cinzel text-xl font-bold text-[#211747]">Create New Landing Page</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">URL Slug (e.g. cpc-chennai-2026)</label>
                  <input
                    type="text"
                    required
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800"
                    placeholder="cpc-crash-course"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Template Preset</label>
                  <select
                    value={form.templateType}
                    onChange={(e) => setForm({ ...form, templateType: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800"
                  >
                    <option value="cpc_bootcamp">CPC Exam Bootcamp</option>
                    <option value="admissions_walkin">Branch Walk-in Open House</option>
                    <option value="corporate_placement">Corporate Placement Specialization</option>
                    <option value="masterclass_event">Free Masterclass Event</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Page Title Tag</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800"
                  placeholder="AAPC CPC Certification Bootcamp 2026 | MCOA"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Hero Main Headline</label>
                <input
                  type="text"
                  required
                  value={form.heroHeadline}
                  onChange={(e) => setForm({ ...form, heroHeadline: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800"
                  placeholder="Master Outpatient Coding & Clear AAPC CPC in 90 Days"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Hero Subheadline</label>
                <textarea
                  rows={2}
                  value={form.heroSubheadline}
                  onChange={(e) => setForm({ ...form, heroSubheadline: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800"
                  placeholder="Join our upcoming batch in Chennai or live online with dedicated placement assistance."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Target Campus</label>
                  <select
                    value={form.targetBranch}
                    onChange={(e) => setForm({ ...form, targetBranch: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800"
                  >
                    <option value="Chennai Head Office">Chennai Head Office</option>
                    <option value="Perambalur Campus">Perambalur Campus</option>
                    <option value="Coimbatore Campus">Coimbatore Campus</option>
                    <option value="Karaikudi Campus">Karaikudi Campus</option>
                    <option value="Live Online Interactive">Live Online Interactive</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">CTA Button Text</label>
                  <input
                    type="text"
                    value={form.ctaText}
                    onChange={(e) => setForm({ ...form, ctaText: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-[#211747] text-[#D8AC55] font-bold rounded-lg hover:bg-[#50458F] disabled:opacity-50"
                >
                  {submitting ? 'Publishing...' : 'Publish Landing Page'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
