import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { WhoMcoaHelps } from "@/components/home/WhoMcoaHelps";
import { CoursesShowcase } from "@/components/home/CoursesShowcase";
import { PracticalTraining } from "@/components/home/PracticalTraining";
import { VerifiedProof } from "@/components/home/VerifiedProof";
import { FounderSection } from "@/components/home/FounderSection";
import { BranchesSection } from "@/components/home/BranchesSection";

export const metadata: Metadata = {
  title: "Medical Coding Officers Academy (MCOA) | CPC, CCS & Medical Coding Training",
  description:
    "South India's premier medical coding training academy founded by Dr. Jeevanantham Mariappan. Master AAPC CPC®, AHIMA CCS® and healthcare RCM with 100% placement support in Chennai (#70/1), Perambalur, Coimbatore, and Karaikudi (630 001).",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero: Core Value Proposition & Primary/Secondary CTAs */}
      <Hero />

      {/* 2. Who MCOA Helps: Life Sciences, Pharmacy, Nursing & Allied Grads */}
      <WhoMcoaHelps />

      {/* 3. Course Choices: International Certifications & Career Tracks */}
      <CoursesShowcase />

      {/* 4. Practical Training: Real Hospital Charts, E&M Calculator & Exam Drills */}
      <PracticalTraining />

      {/* 5. Verified Proof: 40+ Hiring Partners, Authentic Reviews & Outcomes */}
      <VerifiedProof />

      {/* 6. Founder Profile: Dr. Jeevanantham Mariappan's Clinical Leadership */}
      <FounderSection />

      {/* 7. Contact & Campus Network: Chennai, Perambalur, Coimbatore, Karaikudi */}
      <BranchesSection />
    </>
  );
}
