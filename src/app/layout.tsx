import type { Metadata } from "next";
import { Cinzel, Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import AiCounselorWidget from "@/components/ai/AiCounselorWidget";
import { LeadInquiryModal } from "@/components/common/LeadInquiryModal";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_ACADEMY_URL || "https://medicalcodingofficersacademy.com"),
  title: {
    default: "Medical Coding Officers Academy (MCOA) | CPC, CCS & Medical Coding Training",
    template: "%s | Medical Coding Officers Academy (MCOA)",
  },
  description:
    "MCOA is South India's premier academy for Advanced Medical Coding, AAPC CPC®, AHIMA CCS®, CRC®, and CPMA® preparation. Founded by Dr. Jeevanantham Mariappan. Campuses in Chennai (#70/1), Perambalur, Coimbatore, and Karaikudi (630 001).",
  keywords: [
    "Medical Coding Officers Academy",
    "MCOA",
    "CPC certification training",
    "CCS training Chennai",
    "Medical coding courses Tamil Nadu",
    "Dr Jeevanantham Mariappan",
    "Healthcare RCM placement",
    "AAPC CPC training",
    "ICD-10-CM",
    "ICD-10-PCS",
    "Risk adjustment CRC",
    "Medical billing training",
  ],
  authors: [{ name: "Dr. Jeevanantham Mariappan" }],
  creator: "Dr. Jeevanantham Mariappan",
  publisher: "Medical Coding Officers Academy",
  openGraph: {
    title: "Medical Coding Officers Academy (MCOA)",
    description: "Empowering Healthcare Professionals. Building Successful Careers.",
    url: "https://medicalcodingofficersacademy.com",
    siteName: "MCOA",
    images: [
      {
        url: "/mcoa-logo.png",
        width: 1200,
        height: 630,
        alt: "Medical Coding Officers Academy Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Medical Coding Officers Academy (MCOA)",
    description: "Empowering Healthcare Professionals. Building Successful Careers.",
    images: ["/mcoa-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": "https://medicalcodingofficersacademy.com/#organization",
      name: "Medical Coding Officers Academy",
      alternateName: "MCOA",
      url: "https://medicalcodingofficersacademy.com",
      logo: "https://medicalcodingofficersacademy.com/mcoa-logo.png",
      image: "https://medicalcodingofficersacademy.com/founder.jpg",
      description:
        "India's premier healthcare revenue cycle management and medical coding training institution founded by Dr. Jeevanantham Mariappan. Comprehensive AAPC CPC®, AHIMA CCS®, and CRC® training with 100% placement support.",
      telephone: "+91-8072020716",
      email: "medicalcodingofficers@gmail.com",
      founder: {
        "@type": "Person",
        name: "Dr. Jeevanantham Mariappan",
        jobTitle: "Founder & Chief Academic Officer",
        image: "https://medicalcodingofficersacademy.com/founder.jpg",
      },
      address: [
        {
          "@type": "PostalAddress",
          streetAddress: "#70/1, 200 Feet Radial Road, Narayanapuram Lake, Pallikaranai",
          addressLocality: "Chennai",
          addressRegion: "Tamil Nadu",
          postalCode: "600100",
          addressCountry: "IN",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "3rd Floor, Annai Hospital, VRM IAS Academy, Near Krishna Theatre",
          addressLocality: "Perambalur",
          addressRegion: "Tamil Nadu",
          postalCode: "621212",
          addressCountry: "IN",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "#17, Sangam Street, Sundarapuram",
          addressLocality: "Coimbatore",
          addressRegion: "Tamil Nadu",
          postalCode: "641024",
          addressCountry: "IN",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "#52, 5th Cross, TT Nagar, Near Corner Bakery",
          addressLocality: "Karaikudi",
          addressRegion: "Tamil Nadu",
          postalCode: "630 001",
          addressCountry: "IN",
        },
      ],
      sameAs: [
        "https://www.linkedin.com/company/medical-coding-officers-academy",
        "https://wa.me/918072020716",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://medicalcodingofficersacademy.com/#website",
      url: "https://medicalcodingofficersacademy.com",
      name: "Medical Coding Officers Academy",
      publisher: {
        "@id": "https://medicalcodingofficersacademy.com/#organization",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://medicalcodingofficersacademy.com/courses?search={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${montserrat.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-inter bg-white text-mcoa-slate antialiased">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <LeadInquiryModal />
        <AiCounselorWidget />
      </body>
    </html>
  );
}
