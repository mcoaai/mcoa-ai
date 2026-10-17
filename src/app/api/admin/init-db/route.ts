import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const courseCount = await prisma.course.count();
    const branchCount = await prisma.branch.count();
    const kbCount = await prisma.aiKnowledgeItem.count();

    // If branches are missing, populate core branches
    if (branchCount === 0) {
      await prisma.branch.createMany({
        data: [
          {
            id: "chennai-hq",
            name: "Chennai Head Office",
            code: "CHN-HQ",
            address: "#80/1, 200 Feet Radial Road, Narayanapuram Lake, Pallikaranai",
            city: "Chennai",
            state: "Tamil Nadu",
            postalCode: "600100",
            phone: "+91 8072020716",
            email: "medicalcodingofficers@gmail.com",
            isHeadOffice: true,
          },
          {
            id: "perambalur",
            name: "Perambalur Regional Campus",
            code: "PBL-01",
            address: "3rd Floor, Annai Hospital, VRM IAS Academy",
            city: "Perambalur",
            state: "Tamil Nadu",
            postalCode: "621212",
            phone: "+91 8072020716",
            email: "medicalcodingofficers@gmail.com",
            isHeadOffice: false,
          },
          {
            id: "coimbatore",
            name: "Coimbatore Innovation Hub",
            code: "CBE-01",
            address: "#17 Sangam Street, Sundarapuram Post",
            city: "Coimbatore",
            state: "Tamil Nadu",
            postalCode: "641024",
            phone: "+91 8072020716",
            email: "medicalcodingofficers@gmail.com",
            isHeadOffice: false,
          },
          {
            id: "karaikudi",
            name: "Karaikudi Learning Centre",
            code: "KKD-01",
            address: "#52, 5th Cross, TT Nagar",
            city: "Karaikudi",
            state: "Tamil Nadu",
            postalCode: "600001",
            phone: "+91 8072020716",
            email: "medicalcodingofficers@gmail.com",
            isHeadOffice: false,
          },
        ]
      });
    }

    // If courses are missing, populate flagship courses
    if (courseCount === 0) {
      await prisma.course.createMany({
        data: [
          {
            slug: "advanced-medical-coding",
            title: "Advanced Medical Coding Masterclass (CPC® + CCS®)",
            shortCode: "AMC-MASTER",
            category: "Medical Coding",
            summary: "Comprehensive healthcare revenue cycle training covering ICD-10-CM, CPT, HCPCS, E&M leveling, and inpatient MS-DRGs.",
            description: "The Advanced Medical Coding Masterclass at MCOA is an intensive curriculum engineered by Dr. Jeevanantham Mariappan. Built for life sciences, pharmacy, nursing, and healthcare graduates.",
            duration: "16 Weeks (180 Hours)",
            feeInr: 45000,
            discountFeeInr: 42000,
            certificationTrack: "AAPC CPC & AHIMA CCS",
            trainingModes: JSON.stringify(["Classroom", "Live Interactive Online", "Hybrid Flex"]),
            eligibility: JSON.stringify(["Life Sciences", "Nursing", "Pharmacy", "Allied Health"]),
            syllabus: JSON.stringify(["ICD-10-CM", "CPT-4 Surgery", "E&M 2026 MDM rules", "ICD-10-PCS", "MS-DRGs"]),
            faqs: JSON.stringify([]),
            isFeatured: true,
            isPublished: true
          },
          {
            slug: "cpc-certification-prep",
            title: "AAPC CPC® Fast-Track Certification Bootcamp",
            shortCode: "CPC-FAST",
            category: "Certification Prep",
            summary: "Intensive 90-day exam preparation with 3 full-length timed mock exams and process-of-elimination test mastery.",
            description: "Dedicated preparation for the AAPC Certified Professional Coder examination.",
            duration: "12 Weeks (120 Hours)",
            feeInr: 35000,
            discountFeeInr: 32000,
            certificationTrack: "AAPC CPC®",
            trainingModes: JSON.stringify(["Live Online & Classroom"]),
            eligibility: JSON.stringify(["Medical Coding Basics or Healthcare Degree"]),
            syllabus: JSON.stringify(["AAPC exam blueprint", "CPT sections", "HCPCS Level II", "HIPAA rules"]),
            faqs: JSON.stringify([]),
            isFeatured: true,
            isPublished: true
          },
          {
            slug: "ccs-certification-prep",
            title: "AHIMA CCS® Inpatient Hospital Coding Program",
            shortCode: "CCS-HOSP",
            category: "Certification Prep",
            summary: "Advanced inpatient hospital facility coding covering ICD-10-PCS root operations, MS-DRG grouping, and POA guidelines.",
            description: "Advanced inpatient hospital facility coding covering root operations and grouper logic.",
            duration: "12 Weeks (120 Hours)",
            feeInr: 38000,
            discountFeeInr: 35000,
            certificationTrack: "AHIMA CCS®",
            trainingModes: JSON.stringify(["Live Online"]),
            eligibility: JSON.stringify(["CPC Certified or Inpatient Coding Aspirants"]),
            syllabus: JSON.stringify(["IPPS system", "MS-DRG grouper logic", "ICD-10-PCS"]),
            faqs: JSON.stringify([]),
            isFeatured: false,
            isPublished: true
          }
        ]
      });
    }

    // If AI Knowledge base is empty, populate core facts
    if (kbCount === 0) {
      await prisma.aiKnowledgeItem.createMany({
        data: [
          {
            title: 'MCOA Academy Overview & Campuses',
            category: 'courses',
            keywords: 'about, mcoa, founder, jeevanantham, campuses, chennai, perambalur, coimbatore, karaikudi, contact, phone',
            content: 'Medical Coding Officers Academy (MCOA) is India\'s leading healthcare revenue cycle training institution founded by Dr. Jeevanantham Mariappan. Campuses in Chennai (#80/1 200 Feet Radial Road, Pallikaranai), Perambalur, Coimbatore, and Karaikudi. Admissions Hotline: +91 8072020716.',
            source: 'MCOA Official Directory 2026'
          },
          {
            title: 'Tuition Fees & 3-Installment Schedule',
            category: 'courses',
            keywords: 'fees, cost, installments, price, payment schedule, duration',
            content: 'Our flagship 4-Month Advanced Medical Coding & AAPC CPC Preparation Program is priced at ₹45,000 (inclusive of 18% GST). MCOA offers a flexible 3-installment plan: Installment 1 (Down Payment upon admission): ₹15,000; Installment 2 (Month 1): ₹15,000; Installment 3 (Month 2): ₹15,000.',
            source: 'MCOA Board of Governors Fee Structure 2026'
          },
          {
            title: '100% Placement Assistance & Hiring Partners',
            category: 'career_rcm',
            keywords: 'placements, jobs, salary, package, omega, access healthcare, episource',
            content: 'MCOA provides dedicated placement support with corporate RCM partners including Omega Healthcare, Access Healthcare, Episource, and AGS Health. Certified CPC freshers typically receive starting packages ranging from ₹3.50 LPA to ₹5.20 LPA.',
            source: 'MCOA Corporate Placement Cell'
          }
        ]
      });
    }

    return NextResponse.json({
      success: true,
      status: 'Database active and initialized',
      stats: {
        branches: await prisma.branch.count(),
        courses: await prisma.course.count(),
        knowledgeItems: await prisma.aiKnowledgeItem.count()
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Database init error', details: error.message }, { status: 500 });
  }
}
