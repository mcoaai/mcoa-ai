import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  BookOpen,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  Video,
  FileText,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function StudentDashboardPage() {
  // Find sample student
  const student = await prisma.user.findFirst({
    where: { role: "Student" },
    include: {
      enrollments: {
        include: {
          course: true,
          batch: {
            include: {
              trainer: true,
              branch: true,
              sessions: {
                where: { status: "Scheduled" },
                orderBy: { sessionDate: "asc" },
                take: 1,
              },
            },
          },
        },
      },
      submissions: {
        include: { assignment: true },
      },
      attendanceRecords: true,
    },
  });

  const enrollment = student?.enrollments[0];
  const nextSession = enrollment?.batch?.sessions[0];
  const totalAttendance = student?.attendanceRecords.length || 0;

  return (
    <div className="space-y-8 font-inter">
      {/* Welcome & Progress Banner */}
      <div className="bg-gradient-to-r from-mcoa-midnight via-[#302263] to-mcoa-amethyst rounded-3xl p-6 sm:p-8 text-white shadow-royal relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-mcoa-gold/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-mcoa-gold border border-mcoa-gold/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Student Portal — Batch {enrollment?.batch?.code || "CHN-AMC-OCT26-WE"}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold font-montserrat">
              Welcome back, {student?.name || "Sneha Ramachandran"}!
            </h1>

            <p className="text-xs sm:text-sm text-white/80 max-w-xl leading-relaxed">
              Enrolled in <strong>{enrollment?.course?.title || "Advanced Medical Coding Masterclass"}</strong>. Your training is on track for the upcoming AAPC CPC® certification cycle.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center min-w-[200px] shrink-0">
            <div className="text-xs font-semibold uppercase tracking-wider text-white/70">
              Course Progress
            </div>
            <div className="text-3xl font-extrabold font-montserrat text-mcoa-gold mt-1">
              {enrollment?.progressPercent || 68}%
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 mt-2">
              <div
                className="bg-mcoa-gold h-2 rounded-full transition-all duration-500"
                style={{ width: `${enrollment?.progressPercent || 68}%` }}
              />
            </div>
            <Link
              href="/student/courses/advanced-medical-coding"
              className="mt-3 inline-flex items-center space-x-1 text-xs font-bold text-white hover:text-mcoa-gold transition"
            >
              <span>Resume Lesson</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase">Curriculum Progress</div>
            <div className="text-2xl font-bold text-mcoa-midnight font-montserrat mt-1">
              {enrollment?.progressPercent || 68}%
            </div>
            <div className="text-[11px] text-emerald-600 font-medium">3 of 6 Lessons Completed</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-mcoa-pearl text-mcoa-amethyst flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase">Live Class Attendance</div>
            <div className="text-2xl font-bold text-emerald-700 font-montserrat mt-1">100%</div>
            <div className="text-[11px] text-gray-500">2 of 2 Sessions Attended</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase">Chart Case Score</div>
            <div className="text-2xl font-bold text-mcoa-midnight font-montserrat mt-1">95 / 100</div>
            <div className="text-[11px] text-emerald-600 font-medium">Graded by Dr. Rajesh</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase">MCOA Certificate</div>
            <div className="text-2xl font-bold text-mcoa-gold font-montserrat mt-1">Ready</div>
            <div className="text-[11px] text-mcoa-amethyst font-medium">ID: MCOA-CERT-2026-0082</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-mcoa-pearl text-mcoa-gold flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 2-Column: Next Live Class & Chart Assignments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Next Live Class Session Alert */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-mcoa-amethyst font-bold text-sm">
              <Video className="w-5 h-5 text-mcoa-gold" />
              <span>Next Live Interactive Class</span>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
              Confirmed
            </span>
          </div>

          <div className="bg-mcoa-pearl/50 p-4 rounded-xl border border-mcoa-lavender/30 space-y-2">
            <h3 className="font-montserrat font-bold text-sm text-mcoa-midnight">
              {nextSession?.title || "Module 2: Circulatory, Respiratory & Endocrine Manifestations"}
            </h3>
            <div className="flex flex-wrap gap-4 text-xs text-gray-600">
              <div className="flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5 text-mcoa-amethyst" />
                <span>Saturday, Oct 18, 2026</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-mcoa-amethyst" />
                <span>10:00 AM - 01:00 PM IST</span>
              </div>
            </div>
            <p className="text-[11px] text-gray-500 pt-1">
              Trainer: <strong>Dr. Rajesh Kannan, CPC, CCS</strong> • Mode: Classroom & Live Google Meet Stream
            </p>
          </div>

          <div className="flex items-center space-x-3 pt-1">
            <a
              href="https://meet.google.com/mcoa-amc-class"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-mcoa-midnight text-white hover:bg-mcoa-amethyst transition flex items-center space-x-2 shadow-sm"
            >
              <Video className="w-3.5 h-3.5 text-mcoa-gold" />
              <span>Join Live Class (Google Meet)</span>
            </a>
            <Link
              href="/student/attendance"
              className="text-xs font-semibold text-mcoa-amethyst hover:underline"
            >
              View Full Session Timetable →
            </Link>
          </div>
        </div>

        {/* Pending Chart Assignment */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-mcoa-midnight font-bold text-sm">
              <FileText className="w-5 h-5 text-mcoa-amethyst" />
              <span>Clinical Chart Coding Assignment</span>
            </div>
            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
              Action Required
            </span>
          </div>

          <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200/70 space-y-2">
            <h3 className="font-montserrat font-bold text-sm text-amber-950">
              Case #2: Type 2 Diabetes with Diabetic Chronic Kidney Disease Stage 4
            </h3>
            <p className="text-xs text-gray-700 leading-relaxed">
              Code the diagnosis sequencing and manifestation combination codes for a complex diabetic nephropathy encounter under long-term insulin management.
            </p>
            <div className="text-[11px] text-amber-800 font-medium">
              Due Date: In 12 Days • Max Points: 100
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <Link
              href="/student/assignments"
              className="px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-mcoa-gold text-mcoa-midnight hover:bg-[#e0b760] transition shadow-gold flex items-center space-x-1.5"
            >
              <span>Submit Coding Solution</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/student/assignments"
              className="text-xs font-semibold text-gray-500 hover:text-mcoa-midnight"
            >
              View Graded Case #1 (Score: 95/100)
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Access Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/student/courses/advanced-medical-coding"
          className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-mcoa-amethyst hover:shadow-md transition flex items-start space-x-4 group"
        >
          <div className="w-10 h-10 rounded-xl bg-mcoa-pearl text-mcoa-amethyst flex items-center justify-center shrink-0 group-hover:bg-mcoa-midnight group-hover:text-mcoa-gold transition">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="font-montserrat font-bold text-sm text-mcoa-midnight">Interactive Classroom</div>
            <div className="text-xs text-gray-500 mt-0.5">Stream video lessons, read notes, and download PDFs.</div>
          </div>
        </Link>

        <Link
          href="/student/certificates"
          className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-mcoa-gold hover:shadow-md transition flex items-start space-x-4 group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-mcoa-gold flex items-center justify-center shrink-0 group-hover:bg-mcoa-midnight transition">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="font-montserrat font-bold text-sm text-mcoa-midnight">Verified Certificate</div>
            <div className="text-xs text-gray-500 mt-0.5">Download your verified credential issued by Dr. Jeevanantham.</div>
          </div>
        </Link>

        <Link
          href="/student/fees"
          className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-mcoa-amethyst hover:shadow-md transition flex items-start space-x-4 group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-mcoa-midnight group-hover:text-emerald-400 transition">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="font-montserrat font-bold text-sm text-mcoa-midnight">Fee Receipts & Invoices</div>
            <div className="text-xs text-gray-500 mt-0.5">View your course fee payment confirmation and tax invoices.</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
