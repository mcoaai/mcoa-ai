import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medical Coding Practice Simulator | Realistic Hospital Charts & E&M",
  description:
    "Practice medical coding on 100+ simulated hospital encounter charts, operative reports, and 2-of-3 E&M medical decision-making calculators at MCOA.",
  alternates: {
    canonical: "/practice",
  },
};

export default function PracticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

