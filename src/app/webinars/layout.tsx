import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Medical Coding Webinars & Faculty Masterclasses",
  description:
    "Join live interactive masterclasses on ICD-10-CM guidelines, CPT coding changes, and US healthcare RCM placement strategies with Dr. Jeevanantham Mariappan.",
  alternates: {
    canonical: "/webinars",
  },
};

export default function WebinarsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

