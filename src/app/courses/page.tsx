import type { Metadata } from "next";
import { CoursesCatalogClient } from "@/components/courses/CoursesCatalogClient";

export const metadata: Metadata = {
  title: "Medical Coding Courses & Certification Prep (CPC®, CCS®, CRC®)",
  description:
    "Explore 11+ professional medical coding and clinical documentation courses engineered by MCOA. AAPC CPC, AHIMA CCS, CRC Risk Adjustment, and Medical Auditor programs with live hospital chart practice.",
  alternates: {
    canonical: "/courses",
  },
};

export default function CoursesPage() {
  return <CoursesCatalogClient />;
}
