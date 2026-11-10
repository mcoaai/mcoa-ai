"use client";

import { useState } from "react";
import Link from "next/link";
import { COURSES_DATA } from "@/data/courses";
import { CourseCategory } from "@/types";
import { Clock, Award, GraduationCap, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { openCounselorModal } from "@/components/common/LeadInquiryModal";

const CATEGORIES: ("All" | CourseCategory)[] = [
  "All",
  "Certification Prep",
  "Medical Coding",
  "Specialty Coding",
  "Billing & Compliance",
];

export function CoursesShowcase() {
  const [activeCategory, setActiveCategory] = useState<"All" | CourseCategory>("All");

  const filteredCourses =
    activeCategory === "All"
      ? COURSES_DATA
      : COURSES_DATA.filter((c) => c.category === activeCategory);

  return (
    <section id="courses" className="py-20 bg-mcoa-pearl/50 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-mcoa-amethyst font-montserrat">
            Course Choices
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-mcoa-midnight mt-2 font-montserrat">
            International Certification & Career Programs
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-3">
            Engineered strictly for life sciences and healthcare graduates. Every course combines theoretical guidelines, real hospital chart auditing, and AAPC / AHIMA mock examinations.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                  activeCategory === cat
                    ? "bg-mcoa-midnight text-white shadow-md font-bold"
                    : "bg-white text-mcoa-slate border border-gray-200 hover:border-mcoa-amethyst hover:text-mcoa-amethyst"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl border border-gray-200/90 hover:border-mcoa-gold/60 shadow-sm hover:shadow-royal transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Header & Badge */}
              <div className="p-6 sm:p-7">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-mcoa-pearl text-mcoa-amethyst border border-mcoa-lavender/30 font-montserrat">
                    {course.category}
                  </span>
                  <span className="text-[11px] font-semibold text-mcoa-gold flex items-center space-x-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>{course.certificationTrack}</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-mcoa-midnight font-montserrat group-hover:text-mcoa-amethyst transition leading-snug">
                  {course.title}
                </h3>

                <p className="text-xs text-gray-600 mt-2.5 line-clamp-3 leading-relaxed">
                  {course.summary}
                </p>

                {/* Key Course Attributes */}
                <div className="mt-5 space-y-2 border-t border-b border-gray-100 py-3.5 text-xs text-gray-700">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-mcoa-amethyst shrink-0" />
                    <span>
                      <strong className="text-mcoa-midnight">Duration:</strong> {course.duration}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="w-4 h-4 text-mcoa-gold shrink-0" />
                    <span>
                      <strong className="text-mcoa-midnight">Target:</strong> {course.certificationTrack}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      <strong className="text-mcoa-midnight">Mode:</strong> Classroom & Live Online Flex
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer CTAs (Consistent Actions) */}
              <div className="p-6 sm:p-7 pt-0 space-y-2 font-montserrat">
                {/* Primary Action */}
                <button
                  onClick={() =>
                    openCounselorModal(`Course Inquiry: ${course.title}`)
                  }
                  className="w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-mcoa-gold text-mcoa-midnight hover:bg-[#e0b760] transition shadow-sm flex items-center justify-center space-x-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Talk to an Admissions Counselor</span>
                </button>

                {/* Secondary Action */}
                <Link
                  href={`/courses/${course.slug}`}
                  className="w-full py-2 rounded-xl text-xs font-bold text-mcoa-midnight hover:text-mcoa-amethyst border border-gray-200 hover:border-mcoa-amethyst/40 text-center flex items-center justify-center space-x-1 transition"
                >
                  <span>Explore Course Details & Syllabus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation CTA */}
        <div className="text-center mt-12">
          <Link
            href="/courses"
            className="inline-flex items-center space-x-2 text-sm font-bold text-mcoa-amethyst hover:text-mcoa-midnight underline font-montserrat"
          >
            <span>Explore All 11+ Specialized Programs & Syllabi</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
