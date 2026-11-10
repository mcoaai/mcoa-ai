import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timed AAPC CPC® & AHIMA CCS® Mock Exam Simulator",
  description:
    "Prepare with realistic, timed 100-question medical coding mock exams aligned with official AAPC CPC and AHIMA CCS exam blueprints at MCOA.",
  alternates: {
    canonical: "/mock-exams",
  },
};

export default function MockExamsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

