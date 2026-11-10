'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ShieldCheck, ArrowRight, AlertCircle, CheckCircle2, User, KeyRound, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }

      setSuccessMsg(`Welcome back, ${data.user.name}! Redirecting to ${data.user.role} portal...`);
      setTimeout(() => {
        router.push(data.redirectTo || '/admin');
      }, 800);
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const selectDemoAccount = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#211747]/5 via-purple-50/50 to-amber-50/30 flex items-center justify-center p-4 py-12 font-inter">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border border-slate-200 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Image
              src="/mcoa-logo.png"
              alt="MCOA Logo"
              width={220}
              height={60}
              className="object-contain h-12 w-auto"
            />
          </div>
          <h1 className="text-xl font-bold font-montserrat text-[#211747] mt-3">
            Unified Academy Authentication
          </h1>
          <p className="text-xs text-slate-500">
            Secure single sign-on for Students, Faculty, Admissions & Executive Leadership
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-start gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-start gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Official Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@medicalcodingofficersacademy.com"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 outline-none focus:bg-white focus:border-[#50458F] focus:ring-2 focus:ring-[#50458F]/20 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 outline-none focus:bg-white focus:border-[#50458F] focus:ring-2 focus:ring-[#50458F]/20 transition"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <label className="flex items-center space-x-1.5 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded text-[#50458F]" />
              <span>Remember 7 days</span>
            </label>
            <span className="text-[#50458F] hover:underline cursor-pointer">
              Forgot password?
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#211747] to-[#50458F] text-[#D8AC55] hover:text-white transition shadow-lg flex items-center justify-center space-x-2 border border-[#D8AC55]/30 disabled:opacity-50"
          >
            {loading ? (
              <span>Authenticating Session...</span>
            ) : (
              <>
                <span>Sign In to Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* 1-Click Role Accounts (Isolated to Staging / Evaluator Environments) */}
        {process.env.NEXT_PUBLIC_ENABLE_DEMO_ACCOUNTS === 'true' && (
          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Staging Demo Accounts
              </span>
              <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                Staging Sandbox
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => selectDemoAccount('dr.jeeva@medicalcodingofficersacademy.com', 'admin123')}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-[#D8AC55] bg-slate-50 hover:bg-purple-50/50 text-left transition"
              >
                <div className="font-bold text-[#211747] text-[11px] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#D8AC55]" /> Dr. Jeevanantham
                </div>
                <div className="text-[10px] text-slate-500">Super Admin</div>
              </button>

              <button
                type="button"
                onClick={() => selectDemoAccount('admissions@medicalcodingofficersacademy.com', 'counselor123')}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-[#50458F] bg-slate-50 hover:bg-purple-50/50 text-left transition"
              >
                <div className="font-bold text-[#211747] text-[11px] flex items-center gap-1">
                  <User className="w-3 h-3 text-[#50458F]" /> Kavitha Sundaram
                </div>
                <div className="text-[10px] text-slate-500">Admissions Counselor</div>
              </button>

              <button
                type="button"
                onClick={() => selectDemoAccount('trainer.rajesh@medicalcodingofficersacademy.com', 'trainer123')}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-[#50458F] bg-slate-50 hover:bg-purple-50/50 text-left transition"
              >
                <div className="font-bold text-[#211747] text-[11px] flex items-center gap-1">
                  <User className="w-3 h-3 text-emerald-600" /> Dr. Rajesh Kannan
                </div>
                <div className="text-[10px] text-slate-500">Certified CPC Trainer</div>
              </button>

              <button
                type="button"
                onClick={() => selectDemoAccount('sneha.student@example.com', 'student123')}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-[#D8AC55] bg-slate-50 hover:bg-purple-50/50 text-left transition"
              >
                <div className="font-bold text-[#211747] text-[11px] flex items-center gap-1">
                  <User className="w-3 h-3 text-blue-600" /> Sneha Ramachandran
                </div>
                <div className="text-[10px] text-slate-500">Enrolled Student</div>
              </button>
            </div>
          </div>
        )}

        <div className="text-center pt-1">
          <Link href="/" className="text-xs text-[#50458F] hover:text-[#211747] hover:underline font-semibold">
            ← Return to Public Academy Website
          </Link>
        </div>
      </div>
    </div>
  );
}
