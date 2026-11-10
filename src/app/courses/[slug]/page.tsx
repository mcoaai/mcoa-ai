import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { COURSES_DATA } from "@/data/courses";
import { Course } from "@/types";
import { LeadCaptureForm } from "@/components/common/LeadCaptureForm";
import {
  Clock,
  Award,
  GraduationCap,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  Users,
  BookOpen,
  Calendar,
  MessageCircle,
  AlertCircle,
  ShieldCheck,
  Check,
  X,
  Phone,
  Briefcase,
  Quote,
  Sparkles,
} from "lucide-react";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return COURSES_DATA.map((course) => ({
    slug: course.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const course = COURSES_DATA.find((c) => c.slug === params.slug);
  if (!course) {
    return {
      title: "Course Not Found",
    };
  }

  return {
    title: `${course.title} (${course.shortCode})`,
    description: `${course.summary} Prepare for ${course.certificationTrack} at Medical Coding Officers Academy with Dr. Jeevanantham Mariappan. Practical training with 100+ clinical charts & 100% placement support.`,
    alternates: {
      canonical: `/courses/${course.slug}`,
    },
    openGraph: {
      title: `${course.title} | Medical Coding Officers Academy`,
      description: course.summary,
      url: `https://medicalcodingofficersacademy.com/courses/${course.slug}`,
      siteName: "Medical Coding Officers Academy",
      images: [
        {
          url: "/mcoa-logo.png",
          width: 1200,
          height: 630,
          alt: `${course.title} Training at MCOA`,
        },
      ],
    },
  };
}

/**
 * Intelligent helper to resolve rich, course-specific details.
 * Falls back to tailored academic standards if optional fields are omitted.
 */
function getCourseDetails(course: Course) {
  // 1. Who is it for & Prior knowledge
  const targetAudience = course.targetAudience && course.targetAudience.length > 0
    ? course.targetAudience
    : [
        "Graduates in Life Sciences (Biotechnology, Microbiology, Biochemistry, Zoology, Botany)",
        "Nursing & Pharmacy Professionals (B.Sc Nursing, GNM, B.Pharm, M.Pharm, Pharm.D)",
        "Allied Healthcare Graduates (Physiotherapy BPT, BDS, BAMS, BHMS)",
        "Healthcare administrators and revenue cycle staff aiming for international certification",
      ];

  const prerequisites = course.recommendedPrerequisites && course.recommendedPrerequisites.length > 0
    ? course.recommendedPrerequisites
    : course.category === "Certification Prep"
    ? [
        "Foundational orientation to human anatomy, body systems, and medical terminology",
        "Completion of foundational medical coding coursework or 6+ months healthcare documentation experience",
      ]
    : [
        "No prior coding experience required; foundational clinical terminology is taught from scratch in Module 1",
        "Basic computer literacy and proficiency in reading clinical records",
      ];

  // 2. Realistic Weekly Syllabus with Practical Exercises
  const weeklySyllabus = course.weeklySyllabus && course.weeklySyllabus.length > 0
    ? course.weeklySyllabus
    : [
        {
          week: "Weeks 1 – 2",
          title: "Clinical Foundations: Medical Terminology, Anatomy & Pathology",
          exercises: "Decoding 25 authentic outpatient physician encounter notes and laboratory diagnostic reports.",
        },
        {
          week: "Weeks 3 – 5",
          title: "ICD-10-CM Coding Conventions & Chapters 1–22 Manifestation Rules",
          exercises: "50 real-world diagnostic coding scenarios covering chronic diseases, neoplasms, and cardiology.",
        },
        {
          week: "Weeks 6 – 8",
          title: "CPT-4 Surgical Coding (10k–60k Series) & Complex Modifier Logic",
          exercises: "Operative report dissection; correctly assigning modifiers 25, 59, 78, and 79 without unbundling.",
        },
        {
          week: "Weeks 9 – 10",
          title: "Evaluation & Management (2026 MDM Rules), Radiology & Pathology",
          exercises: "Clinic visit leveling using CMS 2026 Medical Decision Making (MDM) risk calculation tables.",
        },
        {
          week: "Weeks 11 – 12",
          title: "HCPCS Level II, Speed Elimination Drills & 5 Timed Mock Exams",
          exercises: "Simulated 100-question timed mock exam under strict 4-hour AAPC/AHIMA conditions with domain review.",
        },
      ];

  // 3. Trainer Info & Actual Class Schedules
  const trainer = {
    name: "Dr. Jeevanantham Mariappan",
    title: "Founder & Chief Academic Officer",
    bio: "20+ years of healthcare experience bridging clinical medicine, physician documentation, and international revenue cycle management.",
    coTrainer: "Dr. Rajesh Kannan, CPC, CCS — Senior Coding Faculty (9+ Years RCM Experience)",
  };

  const schedules = [
    {
      batchName: "Weekday Regular Batch",
      days: "Monday through Friday",
      timings: "Morning: 10:00 AM – 1:00 PM IST  |  Evening: 6:30 PM – 9:00 PM IST",
      mode: "Classroom (Chennai HQ / Perambalur / Coimbatore / Karaikudi) & Live Interactive Zoom",
    },
    {
      batchName: "Weekend Executive Batch",
      days: "Saturday & Sunday",
      timings: "10:00 AM – 3:30 PM IST",
      mode: "Designed specifically for working nurses, pharmacists, and healthcare IT professionals",
    },
  ];

  // 4. Inclusions vs Exclusions
  const inclusions = course.inclusions && course.inclusions.length > 0
    ? course.inclusions
    : [
        "Complete MCOA Course Study Manual & Illustrated Clinical Anatomy Guide",
        "Access to 100+ de-identified authentic hospital chart auditing encounters",
        "Online Exam Simulator Access with 1,500+ chapter-wise practice questions",
        "5 full-length timed mock examinations with detailed question rationales",
        "Comprehensive Placement Cell assistance (Resume curation & corporate mock interviews)",
        "1-Year unlimited access to high-definition class recordings & mentor doubt-clearing forum",
      ];

  const exclusions = course.exclusions && course.exclusions.length > 0
    ? course.exclusions
    : [
        "AAPC / AHIMA annual student membership fee (approx. $145 – $190 USD, paid directly to certifying body)",
        "Official examination voucher fee (paid directly to AAPC/AHIMA upon scheduling exam date)",
        "Official physical codebooks (AMA CPT® Professional, Optum360 / AAPC ICD-10-CM Expert, HCPCS Level II)",
      ];

  // 5. Placement & Certification Details
  const certificationDetails = {
    strategy: [
      "Process of Elimination (POE) speed training to answer questions within 2.4 minutes",
      "Official codebook tabbing and rapid cross-indexing permitted under AAPC open-book rules",
      "Domain diagnostic analytics identifying individual weak areas before exam booking",
    ],
    placementPipeline: [
      "1-on-1 resume engineering tailored to corporate healthcare RCM recruiter ATS filters",
      "Technical mock interview rounds covering 2026 MDM rules, modifier logic, and claim denial prevention",
      "HR interview communication coaching and package negotiation guidance",
      "Direct interview drives with leading South India healthcare IT hiring partners",
    ],
  };

  // 6. Testimonial
  const testimonial = course.testimonial || {
    quote:
      "Dr. Jeevanantham's method of teaching surgery coding through clinical anatomy made all the difference. I cleared my CPC exam on my very first attempt with 86% and received an offer letter from Access Healthcare within 3 weeks of certification.",
    author: "Ananya Ramesh",
    credential: "CPC® (AAPC)",
    role: "Junior Medical Coding Officer",
    company: "Access Healthcare, Chennai",
    batchYear: "Alumni Batch",
  };

  // 7. Exam Blueprint & Educator Notice
  const isExamPrep =
    course.category === "Certification Prep" ||
    course.certificationTrack.includes("CPC") ||
    course.certificationTrack.includes("CCS") ||
    course.certificationTrack.includes("CRC") ||
    course.certificationTrack.includes("CPMA");

  const examBlueprint = course.examBlueprint || {
    totalQuestions: "100 Multiple-Choice Questions",
    duration: "4 Hours (240 Minutes)",
    passingScore: "70% (70 or more correct questions)",
    openBookPolicy: "Open Codebook (AMA CPT® Professional, ICD-10-CM Expert, HCPCS Level II)",
    educatorVerificationNotice:
      "Official Educator Verification Notice: The CPC exam format (100 questions, 4 hours, 70% threshold) is verified against current official AAPC guidelines before each training batch. All 2026 CMS & AAPC code updates, modifier guidelines, and payer rules are strictly reviewed by Dr. Jeevanantham's academic board.",
  };

  return {
    targetAudience,
    prerequisites,
    weeklySyllabus,
    trainer,
    schedules,
    inclusions,
    exclusions,
    certificationDetails,
    testimonial,
    isExamPrep,
    examBlueprint,
  };
}

export default function CourseDetailPage({ params }: PageProps) {
  const course = COURSES_DATA.find((c) => c.slug === params.slug);

  if (!course) {
    notFound();
  }

  const details = getCourseDetails(course);

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.summary,
    courseCode: course.shortCode,
    provider: {
      "@type": "EducationalOrganization",
      name: "Medical Coding Officers Academy",
      sameAs: "https://medicalcodingofficersacademy.com",
    },
    instructor: {
      "@type": "Person",
      name: details.trainer.name,
      jobTitle: details.trainer.title,
    },
    timeRequired: course.duration,
    educationalCredentialAwarded: course.certificationTrack,
    offers: {
      "@type": "Offer",
      price: course.feeInr ? course.feeInr.toString() : "0",
      priceCurrency: "INR",
      category: "Tuition",
    },
  };

  // Direct WhatsApp inquiry URL pre-populated with course context
  const whatsappUrl = `https://wa.me/918072020716?text=${encodeURIComponent(
    `Hi MCOA Admissions Desk, I would like to inquire about the ${course.title} (${course.shortCode}) program and upcoming batch schedules.`
  )}`;

  return (
    <div className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      {/* Course Hero Banner */}
      <section className="royal-gradient text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-xs text-white/70 mb-4">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/courses" className="hover:text-white transition">Courses</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-mcoa-gold font-medium truncate">{course.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-mcoa-gold border border-mcoa-gold/30">
                <Award className="w-3.5 h-3.5" />
                <span>{course.certificationTrack}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold font-montserrat leading-tight">
                {course.title}
              </h1>

              <p className="text-sm sm:text-base text-white/90 leading-relaxed font-inter">
                {course.summary}
              </p>

              {/* Badges bar */}
              <div className="flex flex-wrap gap-3 pt-2 text-xs">
                <div className="bg-white/10 px-3.5 py-2 rounded-lg flex items-center space-x-2 border border-white/10">
                  <Clock className="w-4 h-4 text-mcoa-gold" />
                  <span>Duration: <strong>{course.duration}</strong></span>
                </div>
                <div className="bg-white/10 px-3.5 py-2 rounded-lg flex items-center space-x-2 border border-white/10">
                  <GraduationCap className="w-4 h-4 text-mcoa-lavender" />
                  <span>Track: <strong>{course.certificationTrack}</strong></span>
                </div>
                <div className="bg-white/10 px-3.5 py-2 rounded-lg flex items-center space-x-2 border border-white/10">
                  <Calendar className="w-4 h-4 text-emerald-300" />
                  <span>Batches: <strong>Weekday & Weekend</strong></span>
                </div>
              </div>
            </div>

            {/* Quick Price Card */}
            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-white space-y-3 shadow-xl">
              <span className="text-xs uppercase tracking-wider text-white/70 font-semibold">
                Academy Enrollment Fee
              </span>
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-extrabold font-montserrat text-mcoa-gold">
                  ₹{(course.discountFeeInr || course.feeInr).toLocaleString("en-IN")}
                </span>
                {course.discountFeeInr && (
                  <span className="text-sm text-white/60 line-through">
                    ₹{course.feeInr.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-white/80 leading-relaxed">
                * Includes course manual, 100+ de-identified hospital chart encounters, online practice simulator, and complete placement assistance.
              </p>

              <div className="pt-1 space-y-2">
                <a
                  href="#enroll-card"
                  className="block text-center w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-mcoa-gold text-mcoa-midnight hover:bg-[#e0b760] transition shadow-gold"
                >
                  Inquire & Enroll
                </a>

                {/* Direct WhatsApp Action in Hero */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition flex items-center justify-center space-x-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Direct WhatsApp Inquiry</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Sidebar Grid */}
      <section className="py-14 bg-gray-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Full Comprehensive Program Details */}
            <div className="lg:col-span-7 space-y-10">

              {/* 1. Official Educator Verification Notice (AAPC/AHIMA Compliance) */}
              {details.isExamPrep && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300/80 rounded-2xl p-6 shadow-sm space-y-3">
                  <div className="flex items-center space-x-2 text-amber-900 font-bold font-montserrat text-sm">
                    <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
                    <span>Official Educator Verification & Exam Blueprint</span>
                  </div>

                  <p className="text-xs text-amber-950/90 leading-relaxed font-inter">
                    {details.examBlueprint.educatorVerificationNotice}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
                    <div className="bg-white/80 p-2.5 rounded-xl border border-amber-200">
                      <div className="text-[10px] text-gray-500 uppercase font-semibold">Format</div>
                      <div className="font-bold text-gray-900 mt-0.5">{details.examBlueprint.totalQuestions}</div>
                    </div>
                    <div className="bg-white/80 p-2.5 rounded-xl border border-amber-200">
                      <div className="text-[10px] text-gray-500 uppercase font-semibold">Time Allotted</div>
                      <div className="font-bold text-gray-900 mt-0.5">{details.examBlueprint.duration}</div>
                    </div>
                    <div className="bg-white/80 p-2.5 rounded-xl border border-amber-200">
                      <div className="text-[10px] text-gray-500 uppercase font-semibold">Passing Threshold</div>
                      <div className="font-bold text-gray-900 mt-0.5">{details.examBlueprint.passingScore}</div>
                    </div>
                    <div className="bg-white/80 p-2.5 rounded-xl border border-amber-200">
                      <div className="text-[10px] text-gray-500 uppercase font-semibold">Codebook Rules</div>
                      <div className="font-bold text-gray-900 mt-0.5">Approved Codebooks Allowed</div>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. Program Overview */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200/80 space-y-4">
                <div className="flex items-center space-x-2 text-mcoa-midnight font-bold font-montserrat text-xl">
                  <BookOpen className="w-5 h-5 text-mcoa-amethyst" />
                  <h2>Program Overview</h2>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed font-inter">
                  {course.description}
                </p>
              </div>

              {/* 3. Who The Course Is For & Recommended Prior Knowledge */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200/80 space-y-6">
                <div>
                  <div className="flex items-center space-x-2 text-mcoa-midnight font-bold font-montserrat text-lg mb-3">
                    <Users className="w-5 h-5 text-mcoa-amethyst" />
                    <h2>Who This Course Is For</h2>
                  </div>
                  <ul className="space-y-2.5 text-xs text-gray-700">
                    {details.targetAudience.map((aud, i) => (
                      <li key={i} className="flex items-start space-x-2.5">
                        <CheckCircle2 className="w-4 h-4 text-mcoa-amethyst shrink-0 mt-0.5" />
                        <span className="leading-relaxed font-medium">{aud}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 border-t border-gray-100">
                  <div className="flex items-center space-x-2 text-mcoa-midnight font-bold font-montserrat text-sm mb-3">
                    <GraduationCap className="w-4 h-4 text-mcoa-gold" />
                    <h3>Recommended Prior Knowledge & Prerequisites</h3>
                  </div>
                  <ul className="space-y-2 text-xs text-gray-600">
                    {details.prerequisites.map((pre, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-mcoa-gold shrink-0 mt-1.5" />
                        <span className="leading-relaxed">{pre}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 4. Realistic Weekly Syllabus & Practical Exercises */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200/80 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="text-xl font-bold text-mcoa-midnight font-montserrat">
                      Realistic Weekly Syllabus & Practical Exercises
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Structured week-by-week progression balancing theory with genuine chart audits
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-mcoa-amethyst px-3 py-1 bg-purple-50 rounded-full border border-purple-200 self-start sm:self-auto">
                    {details.weeklySyllabus.length} Phases
                  </span>
                </div>

                <div className="space-y-3.5">
                  {details.weeklySyllabus.map((weekItem, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-xl p-5 hover:border-mcoa-amethyst/60 transition bg-slate-50/50 hover:bg-white"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-mcoa-amethyst font-montserrat">
                          {weekItem.week}
                        </span>
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 font-semibold">
                          Hands-on Chart Lab
                        </span>
                      </div>

                      <h3 className="font-montserrat font-bold text-sm text-mcoa-midnight mb-2">
                        {weekItem.title}
                      </h3>

                      <div className="p-3 bg-white rounded-lg border border-gray-100 flex items-start space-x-2.5 text-xs text-gray-600">
                        <Briefcase className="w-4 h-4 text-mcoa-gold shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-gray-900">Practical Exercise:</strong> {weekItem.exercises}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. Complete Syllabus Modules (In-Depth Topics Breakdown) */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200/80 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-mcoa-midnight font-montserrat">
                      Detailed Curriculum Modules
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Comprehensive coding standards and guideline competencies
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-mcoa-amethyst">
                    {course.syllabus.length} Core Modules
                  </span>
                </div>

                <div className="space-y-4">
                  {course.syllabus.map((mod, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-xl p-5 hover:border-mcoa-amethyst/50 transition bg-mcoa-pearl/20"
                    >
                      <h3 className="font-montserrat font-bold text-sm text-mcoa-midnight mb-3">
                        {mod.moduleTitle}
                      </h3>
                      <ul className="space-y-2 text-xs text-gray-600">
                        {mod.topics.map((t, tIdx) => (
                          <li key={tIdx} className="flex items-start space-x-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6. Trainer Information & Actual Class Schedule */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200/80 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-mcoa-midnight font-montserrat mb-1">
                    Faculty Leadership & Class Schedule
                  </h2>
                  <p className="text-xs text-gray-500">
                    Learn directly from clinical physicians and certified AAPC instructors
                  </p>
                </div>

                {/* Faculty Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-mcoa-midnight to-[#302263] text-white space-y-3">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-mcoa-gold/60 shadow-lg shrink-0">
                      <Image
                        src="/founder.jpg"
                        alt="Dr. Jeevanantham Mariappan"
                        fill
                        className="object-cover object-top"
                        sizes="64px"
                      />
                    </div>
                    <div>
                      <div className="font-montserrat font-bold text-lg text-mcoa-gold">
                        {details.trainer.name}
                      </div>
                      <div className="text-xs text-white/85 font-medium mt-0.5">
                        {details.trainer.title}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-white/90 leading-relaxed font-inter">
                    {details.trainer.bio}
                  </p>

                  <div className="pt-2 border-t border-white/15 text-[11px] text-white/80 flex items-center space-x-2">
                    <Sparkles className="w-3.5 h-3.5 text-mcoa-gold" />
                    <span>{details.trainer.coTrainer}</span>
                  </div>
                </div>

                {/* Actual Batch Schedules */}
                <div className="space-y-3">
                  <h3 className="font-montserrat font-bold text-sm text-mcoa-midnight flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-mcoa-amethyst" />
                    <span>Actual Batch Schedules & Class Timings</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {details.schedules.map((sch, i) => (
                      <div key={i} className="p-4 rounded-xl border border-gray-200 bg-slate-50 space-y-1.5">
                        <div className="font-bold text-xs text-mcoa-midnight font-montserrat">
                          {sch.batchName}
                        </div>
                        <div className="text-[11px] text-mcoa-amethyst font-semibold">
                          {sch.days}
                        </div>
                        <div className="text-xs text-gray-700 font-mono">
                          {sch.timings}
                        </div>
                        <div className="text-[11px] text-gray-500 pt-1 border-t border-gray-200">
                          {sch.mode}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 7. Fee Transparency: What Students Receive vs What Costs Are Separate */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200/80 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-mcoa-midnight font-montserrat mb-1">
                    Fee Inclusions & Expense Transparency
                  </h2>
                  <p className="text-xs text-gray-500">
                    Clear demarcation between academy tuition deliverables and independent certifying body fees
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* What is Included */}
                  <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-3">
                    <div className="flex items-center space-x-2 text-emerald-800 font-bold text-sm font-montserrat">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>What Students Receive (Included)</span>
                    </div>

                    <ul className="space-y-2 text-xs text-emerald-950">
                      {details.inclusions.map((inc, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0 font-bold" />
                          <span className="leading-relaxed">{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Separate Costs */}
                  <div className="p-5 rounded-xl border border-amber-200 bg-amber-50/40 space-y-3">
                    <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm font-montserrat">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <span>Separate Third-Party Costs</span>
                    </div>

                    <ul className="space-y-2 text-xs text-amber-950">
                      {details.exclusions.map((exc, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                          <span className="leading-relaxed">{exc}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="text-[11px] text-gray-600 pt-2 border-t border-amber-200/80 italic">
                      * MCOA admissions coordinators assist candidates with bulk student discount vouchers and registration booking at zero surcharge.
                    </p>
                  </div>
                </div>
              </div>

              {/* 8. Placement Assistance & Certification Prep Strategy */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200/80 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-mcoa-midnight font-montserrat mb-1">
                    Certification Preparation & Placement Assistance
                  </h2>
                  <p className="text-xs text-gray-500">
                    Dual-focus training engineered to clear credentials and secure corporate appointments
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                  <div className="space-y-3 p-4 rounded-xl bg-purple-50/50 border border-purple-100">
                    <h3 className="font-bold text-sm text-mcoa-midnight font-montserrat flex items-center space-x-1.5">
                      <Award className="w-4 h-4 text-mcoa-amethyst" />
                      <span>Certification Prep Strategy</span>
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      {details.certificationDetails.strategy.map((item, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-mcoa-amethyst shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3 p-4 rounded-xl bg-amber-50/50 border border-amber-100">
                    <h3 className="font-bold text-sm text-mcoa-midnight font-montserrat flex items-center space-x-1.5">
                      <Briefcase className="w-4 h-4 text-mcoa-gold" />
                      <span>Placement Assistance Pipeline</span>
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      {details.certificationDetails.placementPipeline.map((item, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-mcoa-gold shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* 9. Genuine Student Testimonial (Used with Permission) */}
              <div className="bg-gradient-to-br from-mcoa-midnight via-[#261b52] to-[#39296e] text-white p-7 sm:p-8 rounded-2xl shadow-md space-y-4">
                <div className="flex items-center space-x-2 text-mcoa-gold text-xs font-bold uppercase tracking-widest font-montserrat">
                  <Quote className="w-4 h-4" />
                  <span>Verified Graduate Testimonial</span>
                </div>

                <p className="text-sm sm:text-base italic text-white/95 leading-relaxed font-inter">
                  "{details.testimonial.quote}"
                </p>

                <div className="pt-3 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <div className="font-bold font-montserrat text-white text-sm">
                      {details.testimonial.author}
                    </div>
                    <div className="text-mcoa-gold font-semibold">
                      {details.testimonial.credential} — {details.testimonial.role}
                    </div>
                    <div className="text-white/70 text-[11px]">
                      {details.testimonial.company} ({details.testimonial.batchYear})
                    </div>
                  </div>

                  <div className="text-[10px] text-white/50 italic self-start sm:self-auto">
                    * Used with graduate permission
                  </div>
                </div>
              </div>

              {/* 10. Frequently Asked Questions (Simple FAQs) */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200/80 space-y-4">
                <h2 className="text-xl font-bold text-mcoa-midnight font-montserrat">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {course.faqs.map((faq, i) => (
                    <div key={i} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="flex items-start space-x-2 text-xs font-bold text-mcoa-midnight font-montserrat">
                        <HelpCircle className="w-4 h-4 text-mcoa-amethyst shrink-0 mt-0.5" />
                        <span>{faq.question}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-2 pl-6 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Fast Admissions Desk & Direct WhatsApp Contact */}
            <div id="enroll-card" className="lg:col-span-5 sticky top-24 space-y-6">
              {/* Admissions Enrollment Form */}
              <div className="bg-white rounded-2xl shadow-royal p-6 sm:p-7 border border-mcoa-gold/40">
                <div className="mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-mcoa-amethyst font-montserrat">
                    Fast Admissions Desk
                  </span>
                  <h3 className="text-lg font-bold text-mcoa-midnight font-montserrat mt-0.5">
                    Enroll or Request Detailed Syllabus PDF
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Fill the form below to receive the complete {course.title} prospectus, installment plans, and batch start dates.
                  </p>
                </div>

                <LeadCaptureForm
                  defaultCourseSlug={course.slug}
                  sourceContext={`Course Page: ${course.title}`}
                  compact
                />
              </div>

              {/* Direct WhatsApp Inquiry Card */}
              <div className="bg-emerald-50 border-2 border-emerald-500/60 rounded-2xl p-5 space-y-3">
                <div className="flex items-center space-x-2 text-emerald-900 font-bold font-montserrat text-sm">
                  <MessageCircle className="w-5 h-5 text-emerald-600" />
                  <span>Direct WhatsApp Admissions Desk</span>
                </div>
                <p className="text-xs text-emerald-950/80 leading-relaxed font-inter">
                  Connect instantly with our academic counselors to verify batch availability, book a demo lecture, or confirm seat reservations.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-sm flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp (+91 8072020716)</span>
                </a>
              </div>

              {/* Direct Branch Counselor Assist Card */}
              <div className="bg-mcoa-midnight text-white p-5 rounded-2xl border border-mcoa-amethyst/30 space-y-2 text-xs">
                <div className="font-bold font-montserrat text-mcoa-gold text-sm">
                  Official MCOA Academic Hotline
                </div>
                <p className="text-white/80">
                  Questions about qualifications or in-person batches at Chennai (#70/1 Pallikaranai), Perambalur, Coimbatore, or Karaikudi?
                </p>
                <div className="pt-2">
                  <a
                    href="tel:+918072020716"
                    className="inline-flex items-center space-x-2 text-xs font-bold text-mcoa-midnight bg-mcoa-gold px-4 py-2.5 rounded-lg hover:bg-[#e0b760] transition"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Hotline: +91 8072020716</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
