"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Video,
  Calendar,
  Clock,
  Sparkles,
  Award,
  Users,
  CheckCircle2,
  ExternalLink,
  Download,
  Share2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function WebinarsPage() {
  const [webinars, setWebinars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWebinar, setSelectedWebinar] = useState<any>(null);
  const [showRegModal, setShowRegModal] = useState(false);
  const [registeredSuccess, setRegisteredSuccess] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [education, setEducation] = useState("Life Sciences / B.Sc / M.Sc");
  const [city, setCity] = useState("Chennai");

  const loadWebinars = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/webinars");
      const json = await res.json();
      if (json.success) {
        setWebinars(json.webinars);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWebinars();
  }, []);

  const handleOpenRegister = (webinar: any) => {
    setSelectedWebinar(webinar);
    setRegisteredSuccess(null);
    setShowRegModal(true);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert("Please fill in your name, email, and phone number.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch("/api/webinars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          webinarId: selectedWebinar.id,
          name,
          email,
          phone,
          education,
          city,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setRegisteredSuccess(json);
      } else {
        alert(json.error || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting registration");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownloadCalendar = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MCOA//Medical Coding Webinars//EN
BEGIN:VEVENT
SUMMARY:${selectedWebinar?.title || "MCOA Masterclass"}
DESCRIPTION:${selectedWebinar?.description || "Medical Coding Officers Academy Live Webinar"}
DTSTART:${new Date(selectedWebinar?.date || Date.now()).toISOString().replace(/-|:|\.\d\d\d/g, "")}
LOCATION:${selectedWebinar?.meetingUrl || "Zoom"}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${selectedWebinar?.slug || "mcoa-webinar"}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[#F8F9FC] min-h-screen py-12 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 bg-mcoa-pearl px-3.5 py-1 rounded-full border border-mcoa-lavender/40 text-mcoa-amethyst text-xs font-bold font-montserrat">
            <Sparkles className="w-3.5 h-3.5 text-mcoa-gold" />
            <span>Exclusive Masterclass Series</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-mcoa-midnight font-montserrat">
            Live Medical Coding Webinars & Masterclasses
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Gain immediate competitive advantage. Learn directly from Dr. Jeevanantham Mariappan and MCOA master trainers on FY 2026 ICD-10-CM coding updates, AAPC CPC® exam blueprints, and US healthcare RCM placement opportunities.
          </p>
        </div>

        {/* Featured Keynote Banner */}
        <div className="bg-gradient-to-br from-mcoa-midnight via-[#2E205E] to-mcoa-amethyst rounded-3xl text-white p-7 sm:p-10 shadow-royal flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="bg-mcoa-gold text-mcoa-midnight font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-montserrat">
              Featured Keynote
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-montserrat leading-tight text-white">
              Demystifying 2026 ICD-10-CM & CPT Coding Changes
            </h2>
            <p className="text-xs text-white/85 leading-relaxed">
              Full walkthrough of new diagnosis codes, social determinants of health (Z55-Z65) expansion, and 2026 telehealth modifier regulations with Dr. Jeevanantham Mariappan.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/80 pt-2">
              <div className="flex items-center space-x-1.5">
                <Calendar className="w-4 h-4 text-mcoa-gold" />
                <span>Date to be announced (Next Batch Schedule)</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Clock className="w-4 h-4 text-mcoa-gold" />
                <span>10:30 AM – 12:00 PM IST</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Users className="w-4 h-4 text-mcoa-gold" />
                <span>Free Registration (500 Seats)</span>
              </div>
            </div>
          </div>

          <div className="shrink-0 text-center space-y-3">
            <button
              onClick={() => handleOpenRegister(webinars[0] || {
                id: "web-1",
                slug: "icd-10-cm-2026-updates-keynote",
                title: "Demystifying 2026 ICD-10-CM & CPT Coding Changes: Keynote by Dr. Jeevanantham",
              })}
              className="px-8 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider bg-mcoa-gold text-mcoa-midnight hover:bg-[#e0b760] transition shadow-gold transform hover:-translate-y-0.5"
            >
              Reserve Free Seat Now →
            </button>
            <div className="text-[11px] text-white/60">
              Instant Zoom Access & WhatsApp Confirmation
            </div>
          </div>
        </div>

        {/* Webinars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {webinars.map((web) => (
            <div
              key={web.id}
              className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-7 hover:border-mcoa-gold/50 hover:shadow-royal transition flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {web.isPaid ? `₹${web.priceINR}` : "100% Free Entry"}
                  </span>
                  <span className="text-[10px] font-mono text-gray-500">
                    {web._count?.registrations || 42} Registered
                  </span>
                </div>

                <h3 className="font-montserrat font-bold text-lg text-mcoa-midnight leading-snug">
                  {web.title}
                </h3>

                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                  {web.description}
                </p>

                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs text-gray-700 space-y-1">
                  <div className="font-bold text-mcoa-midnight">{web.speakerName}</div>
                  <div className="text-[11px] text-gray-500">{web.speakerTitle}</div>
                </div>

                <div className="flex items-center space-x-4 text-xs text-gray-500 font-mono pt-1">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-mcoa-amethyst" />
                    <span>{new Date(web.date).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-mcoa-gold" />
                    <span>{web.durationMinutes} Minutes</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Video className="w-3.5 h-3.5 text-blue-600" />
                    <span>{web.meetingPlatform}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] text-gray-400">
                  Certificate of Attendance Included
                </span>

                <button
                  onClick={() => handleOpenRegister(web)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-mcoa-midnight text-white hover:bg-mcoa-amethyst transition shadow-sm flex items-center space-x-1"
                >
                  <span>Register Free</span>
                  <ArrowRight className="w-3.5 h-3.5 text-mcoa-gold" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Registration Modal */}
      {showRegModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl animate-scaleIn">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-mcoa-amethyst uppercase tracking-wider font-montserrat">
                  Instant Registration Pass
                </span>
                <h3 className="font-montserrat font-bold text-base text-mcoa-midnight">
                  {selectedWebinar?.title}
                </h3>
              </div>
              <button
                onClick={() => setShowRegModal(false)}
                className="text-gray-400 hover:text-gray-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {registeredSuccess ? (
              <div className="space-y-5 text-center py-4 animate-fadeIn">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-montserrat font-bold text-lg text-mcoa-midnight">
                    Your Webinar Seat is Confirmed!
                  </h4>
                  <p className="text-xs text-gray-600 max-w-sm mx-auto">
                    We've dispatched your access pass to <strong className="text-mcoa-midnight">{email}</strong> and sent a confirmation to <strong className="text-mcoa-midnight">{phone}</strong> via WhatsApp.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 text-left text-xs space-y-2">
                  <div className="font-bold text-mcoa-midnight text-[11px] uppercase">
                    Your Live Stream Access Link:
                  </div>
                  <a
                    href={registeredSuccess.meetingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-mcoa-amethyst hover:underline break-all font-semibold flex items-center space-x-1"
                  >
                    <span>{registeredSuccess.meetingUrl}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>

                <div className="flex items-center justify-center space-x-3 pt-2">
                  <button
                    onClick={handleDownloadCalendar}
                    className="px-4 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center space-x-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Add to Calendar (.ics)</span>
                  </button>
                  <button
                    onClick={() => setShowRegModal(false)}
                    className="px-5 py-2.5 rounded-xl bg-mcoa-midnight text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-mcoa-midnight block">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Karthikeyan Selvam"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-mcoa-amethyst"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-mcoa-midnight block">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="karthik@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-mcoa-midnight block">WhatsApp Phone *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98401 23456"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-mcoa-midnight block">Educational Background</label>
                    <select
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 font-semibold"
                    >
                      <option>Life Sciences / B.Sc / M.Sc</option>
                      <option>Pharmacy (B.Pharm / M.Pharm)</option>
                      <option>Nursing (B.Sc / GNM)</option>
                      <option>Biotechnology / Microbiology</option>
                      <option>Physiotherapy (BPT)</option>
                      <option>Medical / Dental (MBBS / BDS)</option>
                      <option>Other Non-Medical Graduate</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-mcoa-midnight block">City / Preferred Campus</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Chennai, Coimbatore, etc."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowRegModal(false)}
                    className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 font-bold uppercase tracking-wider"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 rounded-xl bg-mcoa-gold text-mcoa-midnight font-bold uppercase tracking-wider hover:bg-[#e0b760] transition shadow-gold disabled:opacity-50"
                  >
                    {submitting ? "Confirming..." : "Confirm Free Registration"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
