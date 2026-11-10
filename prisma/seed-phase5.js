const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Phase 5 data: Knowledge Base, Landing Pages, Blog Posts, and AI Transcripts...');

  // 1. Verified AI Knowledge Base Items
  const knowledgeData = [
    {
      title: 'MCOA Academy Overview, Founder Credentials & Campuses',
      category: 'courses',
      keywords: 'about, mcoa, founder, jeevanantham, campuses, chennai, perambalur, coimbatore, karaikudi, contact, phone, location',
      content: 'Medical Coding Officers Academy (MCOA) is India\'s premier healthcare revenue cycle management and medical coding training institution founded by Dr. Jeevanantham Mariappan. MCOA operates 4 physical campuses: Chennai Head Office (#70/1 200 Feet Radial Road, Narayanapuram Lake, Pallikaranai, Chennai - 600100), Perambalur (3rd Floor, Annai Hospital, VRM IAS Academy, Near Krishna Theatre, Perambalur - 621212), Coimbatore (#17 Sangam Street, Sundarapuram - 641024), and Karaikudi (#52 5th Cross TT Nagar - 630 001). Central admissions hotline and WhatsApp: +91 8072020716. Official email: medicalcodingofficers@gmail.com.',
      source: 'MCOA Official Academy Charter & Campus Directory'
    },
    {
      title: 'Eligibility Requirements for Medical Coding & Career Pathways',
      category: 'fees_admissions',
      keywords: 'eligibility, qualifications, who can apply, nursing, pharmacy, life sciences, bsc, biotechnology, microbiology, physiotherapy, freshers',
      content: 'Graduates and post-graduates from Life Sciences, Nursing (B.Sc / GNM), Pharmacy (B.Pharm / D.Pharm), Physiotherapy (BPT), Dental (BDS), Biotechnology, Microbiology, Biochemistry, Biomedical Engineering, Allied Health Sciences, and general degree holders with basic anatomy knowledge are eligible. Freshers receive intensive anatomy and medical terminology bootcamps prior to advanced clinical coding.',
      source: 'MCOA Academic Admissions Guidelines 2026'
    },
    {
      title: 'Course Offerings, Tuition Fee Schedules & Installment Plans',
      category: 'courses',
      keywords: 'courses, fees, installments, cost, cpc, ccs, advanced coding, payment schedule, duration',
      content: 'Our flagship 4-Month Advanced Medical Coding & AAPC CPC Preparation Program is priced at ₹45,000 (inclusive of 18% GST). To ensure accessibility, MCOA provides a flexible 3-installment plan: Installment 1 (Down Payment upon admission): ₹15,000; Installment 2 (30 days post-joining): ₹15,000; Installment 3 (60 days post-joining): ₹15,000. All payments are securely processed via Razorpay with instant official GST tax invoices.',
      source: 'MCOA Board of Governors Fee Structure 2026'
    },
    {
      title: '2026 ICD-10-CM Guideline Updates — Diabetes Mellitus Sequencing',
      category: 'guidelines',
      keywords: 'icd10, guidelines, diabetes, e11, sequencing, secondary diabetes, hypoglycemia, insulin, chronic kidney disease',
      content: 'Under ICD-10-CM guidelines, category E11 represents Type 2 diabetes mellitus. Sequencing rules mandate that diabetes with manifestations (such as diabetic CKD, diabetic retinopathy, or diabetic neuropathy) must code the specific combination code first (e.g., E11.22 for Type 2 diabetes mellitus with diabetic chronic kidney disease), followed by the specific manifestation code (e.g., N18.30 for CKD stage 3). When insulin is routinely used, secondary code Z79.4 is assigned unless the code itself specifies insulin use.',
      source: 'Official CMS/CDC ICD-10-CM Coding Guidelines FY 2026, Section I.C.4'
    },
    {
      title: 'E&M Guidelines 2024–2026: Medical Decision Making (MDM) Rules',
      category: 'guidelines',
      keywords: 'e&m, mdm, medical decision making, 99213, 99214, 99215, 99203, 99204, 2 of 3 elements, outpatient coding',
      content: 'Evaluation and Management (E&M) office visits (99202–99205 for new patients and 99212–99215 for established patients) are scored by MDM level or total physician time on the date of encounter. MDM requires 2 out of 3 elements to meet or exceed a level: 1) Number and Complexity of Problems Addressed, 2) Amount and/or Complexity of Data Reviewed and Analyzed, and 3) Risk of Complications and/or Morbidity or Mortality of Patient Management.',
      source: 'AMA CPT Evaluation and Management Services Guidelines 2024-2026'
    },
    {
      title: 'Inpatient MS-DRG Logic, CC/MCC Optimization & POA Indicators',
      category: 'guidelines',
      keywords: 'drg, ms-drg, cc, mcc, inpatient, hospital coding, present on admission, poa, principal diagnosis',
      content: 'Medicare Severity Diagnosis Related Groups (MS-DRGs) categorize inpatient hospital admissions based on the Principal Diagnosis, Major Diagnostic Category (MDC), significant surgical procedures, and secondary complications/comorbidities. Complications are classified into Non-CC, CC (Complication/Comorbidity), and MCC (Major Complication/Comorbidity). POA indicators (Y, N, U, W, 1) determine whether a condition is exempt or qualifies as a hospital-acquired condition.',
      source: 'CMS Inpatient Prospective Payment System (IPPS) Manual'
    },
    {
      title: '100% Placement Assistance & Corporate RCM Hiring Partners',
      category: 'career_rcm',
      keywords: 'placements, jobs, salary, package, hiring partners, omega, access healthcare, episource, interview',
      content: 'MCOA provides dedicated career placement assistance to every certified graduate. Our corporate recruitment partners include Omega Healthcare Management Services, Access Healthcare, Episource, Cognizant RCM, and AGS Health. Certified CPC freshers typically receive starting packages ranging from ₹3.50 LPA to ₹5.20 LPA with performance incentives, medical insurance, and fast-track team lead career progressions.',
      source: 'MCOA Placement & Corporate Relations Cell'
    }
  ];

  for (const item of knowledgeData) {
    const existing = await prisma.aiKnowledgeItem.findFirst({
      where: { title: item.title }
    });
    if (!existing) {
      await prisma.aiKnowledgeItem.create({ data: item });
    }
  }
  console.log(`✓ Seeded ${knowledgeData.length} verified AI knowledge items.`);

  // 2. High-Converting Landing Pages
  const landingPagesData = [
    {
      slug: 'cpc-bootcamp-2026',
      title: 'AAPC CPC Exam Preparation Bootcamp 2026 | Medical Coding Officers Academy',
      metaDescription: 'Join MCOA 90-Day Intensive AAPC CPC Exam Bootcamp in Chennai, Perambalur, Coimbatore & Online. 98.4% First-Attempt Pass Rate. 100% Placement Support.',
      templateType: 'cpc_bootcamp',
      status: 'Published',
      heroBadge: 'Batch Commencing Monday — Only 8 Seats Remaining',
      heroHeadline: 'Crack the AAPC CPC Exam on Your 1st Attempt with India’s Highest Rated Academy',
      heroSubheadline: 'Comprehensive 90-day rigorous preparation led by Dr. Jeevanantham Mariappan. Master 10,000+ real chart questions, 2-of-3 E&M calculators, and guaranteed corporate placement assistance.',
      ctaText: 'Claim Free Seat & Download 2026 Syllabus',
      targetBranch: 'All Campuses & Live Online',
      viewsCount: 1420,
      leadsCount: 184,
      sectionsJson: JSON.stringify({
        highlights: [
          'Live interactive training with Dr. Jeevanantham Mariappan & AAPC-approved instructors',
          'Access to MCOA proprietary 2026 Medical Coding Practice Simulator & Case Workspace',
          '3 full-length 100-question timed CPC Mock Exams with domain-level diagnostic scoring',
          'Corporate hiring interviews with Omega Healthcare, Access Healthcare, and Episource',
          '3-installment fee flexibility with zero interest and official GST invoices'
        ],
        curriculumPreview: [
          { module: 'Module 1', title: 'Anatomy, Terminology, ICD-10-CM Guidelines & Neoplasm Coding' },
          { module: 'Module 2', title: 'CPT Coding: Integumentary, Musculoskeletal, Respiratory & Cardiology' },
          { module: 'Module 3', title: 'E&M 2026 MDM Leveling, Anesthesia Time Calculations & Radiology' },
          { module: 'Module 4', title: 'Pathology, Medicine Section, HCPCS Level II & Modifier Scenarios' },
          { module: 'Module 5', title: 'Compliance, HIPAA Rules, Medical Necessity & Final AAPC CPC Drills' }
        ],
        stats: [
          { label: 'First-Attempt Pass Rate', value: '98.4%' },
          { label: 'Graduates Placed in Top RCMs', value: '2,500+' },
          { label: 'Average Certified Fresher CTC', value: '₹4.5 LPA' },
          { label: 'Campus & Online Centers', value: '4 Hubs' }
        ],
        testimonials: [
          {
            name: 'Kavitha Sundar',
            role: 'CPC Certified | Medical Coder at Omega Healthcare',
            comment: 'Dr. Jeevanantham\'s guidance and the MCOA practice simulator gave me the confidence to pass CPC with 88% on my first try. Within 3 weeks of passing, MCOA scheduled my interview with Omega!',
            rating: 5
          },
          {
            name: 'Arun Prakash, B.Pharm',
            role: 'CPC-A | Associate Coder at Access Healthcare',
            comment: 'Coming from a pharmacy background, I was worried about procedural coding. MCOA\'s hands-on chart case studies and 2-of-3 E&M calculator made everything crystal clear.',
            rating: 5
          }
        ],
        faq: [
          {
            q: 'Is prior medical background mandatory to join?',
            a: 'No. Candidates with Life Sciences, Nursing, Pharmacy, Allied Health, or general degrees can enroll. We include an intensive Foundation in Anatomy & Medical Terminology at no extra cost.'
          },
          {
            q: 'Can I pay fees in installments?',
            a: 'Yes, our ₹45,000 fee can be paid in 3 equal monthly installments of ₹15,000 each via Razorpay.'
          },
          {
            q: 'Do you offer online classes for working professionals?',
            a: 'Yes, we offer both weekday and weekend evening online live batches via Zoom and Google Meet with recorded backups.'
          }
        ]
      })
    },
    {
      slug: 'chennai-walkin-admissions',
      title: 'Walk-in Admissions & Free Chart Coding Demo — Chennai Pallikaranai Hub',
      metaDescription: 'Visit MCOA Chennai Head Office for on-spot counselor evaluation, career guidance, and free live chart coding demo session.',
      templateType: 'admissions_walkin',
      status: 'Published',
      heroBadge: 'Chennai Campus Open House — Radial Road Pallikaranai',
      heroHeadline: 'Transform Your Healthcare Degree into a Global Medical Coding Career',
      heroSubheadline: 'Visit our flagship Chennai campus near A2B Hotel, Narayanapuram Lake. Meet senior faculty, preview our digital coding simulators, and secure early-bird scholarship seats.',
      ctaText: 'Register for Campus Walk-in Pass',
      targetBranch: 'Chennai Head Office',
      viewsCount: 890,
      leadsCount: 112,
      sectionsJson: JSON.stringify({
        highlights: [
          'Convenient location on 200 Feet Radial Road, Pallikaranai, Chennai',
          'Free 1-on-1 career consultation with certified CPC/CCS instructors',
          'Hands-on interactive demo on real clinical inpatient & outpatient chart coding',
          'On-the-spot admissions spot discount of ₹3,000 for walk-in attendees'
        ],
        stats: [
          { label: 'Chennai Students Trained', value: '1,200+' },
          { label: 'Walk-in Admissions Conversion', value: '85%' },
          { label: 'Partner Hospitals & RCMs', value: '18+' }
        ]
      })
    },
    {
      slug: 'inpatient-drg-specialization',
      title: 'Inpatient MS-DRG & ICD-10-PCS Hospital Coding Master Program',
      metaDescription: 'Advanced inpatient hospital coding training covering MS-DRG grouper logic, CC/MCC identification, and ICD-10-PCS procedural root operations.',
      templateType: 'corporate_placement',
      status: 'Published',
      heroBadge: 'Advanced Hospital Coding — AHIMA CCS Track',
      heroHeadline: 'Master Inpatient Facility Coding, MS-DRGs & ICD-10-PCS Root Operations',
      heroSubheadline: 'Elevate your earnings to ₹6.0+ LPA. Specialized advanced certification for inpatient hospital coder roles with high demand across US and UAE healthcare systems.',
      ctaText: 'Enroll in Inpatient Program',
      targetBranch: 'Live Online & Hybrid',
      viewsCount: 640,
      leadsCount: 78,
      sectionsJson: JSON.stringify({
        highlights: [
          'Detailed instruction on 31 ICD-10-PCS root operations with surgical anatomy',
          'Real-time practice with the MCOA Inpatient MS-DRG Grouper simulator',
          'Present on Admission (POA) guidelines and Hospital-Acquired Condition (HAC) rules',
          'Direct referral to senior inpatient coding teams at Episource and AGS Health'
        ],
        stats: [
          { label: 'Inpatient Coding CTC Avg', value: '₹5.5 - 7.5 LPA' },
          { label: 'Case Studies Solved', value: '250+ Charts' },
          { label: 'CCS Exam Readiness', value: '96.2%' }
        ]
      })
    }
  ];

  for (const page of landingPagesData) {
    const existing = await prisma.landingPage.findUnique({
      where: { slug: page.slug }
    });
    if (!existing) {
      await prisma.landingPage.create({ data: page });
    }
  }
  console.log(`✓ Seeded ${landingPagesData.length} dynamic landing pages.`);

  // 3. Authoritative Healthcare RCM Blog Posts
  const blogPostsData = [
    {
      slug: 'top-10-icd10cm-2026-guideline-changes',
      title: 'Top 10 ICD-10-CM Guideline Changes for FY 2026 Every Coder Must Know',
      excerpt: 'CMS and CDC have released the 2026 ICD-10-CM Official Guidelines for Coding and Reporting. Here is Dr. Jeevanantham Mariappan\'s detailed breakdown of key updates.',
      category: 'Coding Updates',
      readTime: '6 min read',
      tags: 'ICD-10-CM, Guidelines, FY 2026, Clinical Coding, Dr. Jeevanantham, Inpatient, Outpatient',
      coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=60',
      content: `## Executive Overview of FY 2026 Guidelines

The Centers for Medicare & Medicaid Services (CMS) and the National Center for Health Statistics (NCHS) have unveiled the fiscal year 2026 updates for ICD-10-CM. As healthcare reimbursement transitions deeper into value-based models and hierarchical condition categories (HCCs), precision in diagnostic documentation has never been more vital.

### 1. Enhanced Specificity in Social Determinants of Health (SDoH)
Categories Z55–Z65 have expanded guidance. Code assignment may now be based on medical record documentation from any clinician involved in the care of the patient (e.g., social workers, community health workers, case managers), not strictly the attending physician.

### 2. Sepsis and Severe Sepsis Hierarchy
Guideline Section I.C.1 has clarified the sequencing between underlying systemic infection, sepsis (A41.9), and acute organ dysfunction. If severe sepsis is present on admission, the underlying systemic infection must be sequenced first, followed by R65.20 or R65.21, followed by the specific acute organ failures.

### 3. Diabetes Mellitus (Category E11) Complication Specificity
When a patient has both diabetes and chronic kidney disease, an assumed causal relationship exists. Coders must sequence the diabetic nephropathy code first (e.g., E11.22), followed by the CKD stage code (e.g., N18.30 for stage 3). If the patient is on long-term insulin, Z79.4 is appended as a secondary code.

### 4. Neoplasm Coding and Follow-up Surgeries
When an encounter is solely for the administration of chemotherapy, immunotherapy, or radiation therapy, the appropriate Z51.- code must be sequenced as the principal/first-listed diagnosis, followed by the active malignancy code.

### 5. Summary Recommendation for AAPC CPC Candidates
The 2026 CPC examination directly tests these updated guideline nuances. At MCOA, every student is trained using the exact official CMS guidelines to eliminate ambiguity and guarantee examination mastery.`
    },
    {
      slug: 'how-to-crack-aapc-cpc-exam-first-attempt',
      title: 'Proven Blueprint to Clear the AAPC CPC Exam on Your First Attempt',
      excerpt: 'Passing the CPC exam requires speed, tactical manual annotation, and deep guideline comprehension. Discover the MCOA 5-pillar study blueprint.',
      category: 'Exam Prep',
      readTime: '8 min read',
      tags: 'AAPC, CPC Exam, Certification, Medical Coding Strategy, Dr. Jeevanantham',
      coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60',
      content: `## The AAPC CPC Examination Architecture

The Certified Professional Coder (CPC®) credential issued by AAPC is the gold standard in outpatient healthcare reimbursement. The exam consists of 100 multiple-choice questions administered over a 4-hour window, requiring a minimum passing score of 70%.

### Pillar 1: Master the Guidelines Before You Code
Over 60% of incorrect answers on the CPC exam occur not because the coder cannot look up a code, but because they neglected an instructional note (such as *Code First*, *Use Additional Code*, or *Excludes1*). Memorizing the 4 general coding guidelines and 21 chapter-specific guidelines is non-negotiable.

### Pillar 2: Strategic Book Tabbing & Annotation
AAPC permits handwritten notes and guidelines annotations in official AMA CPT®, ICD-10-CM, and HCPCS Level II codebooks. Organize tabs by anatomical system and highlight guideline exceptions.

### Pillar 3: Process of Elimination (POE)
On the CPC exam, time is your scarcest resource (averaging 2.4 minutes per question). Compare the 4 multiple-choice options first to identify differential modifiers or key code distinctions before reading the entire clinical vignette.

### Pillar 4: E&M 2-of-3 Leveling Mastery
Evaluation and Management represents 10% of the entire exam blueprint. Understand that office visits require 2 out of 3 MDM elements:
1. Number and Complexity of Problems
2. Amount of Data Analyzed
3. Risk of Complications

### Pillar 5: Take at Least 3 Full-Length Timed Mocks
At MCOA, our students complete 3 timed mock exams under real testing conditions. This builds mental stamina and eliminates exam anxiety.`
    },
    {
      slug: 'medical-coding-career-scope-india-2026',
      title: 'Why Medical Coding is India’s Hottest Healthcare Career in 2026: Salaries & Scope',
      excerpt: 'Explore why US healthcare revenue cycle outsourcing to India is expanding exponentially and how fresh life sciences graduates are securing high-paying roles.',
      category: 'Career Pathways',
      readTime: '5 min read',
      tags: 'Medical Coding Career, Salaries, India Healthcare BPO, RCM, Freshers, Omega, Access Healthcare',
      coverImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=60',
      content: `## The Booming Healthcare Revenue Cycle Industry in India

India has cemented its position as the premier global hub for US healthcare Revenue Cycle Management (RCM). With over 150,000 active medical coders and billing specialists, Indian technology and clinical operations power the revenue cycles of major American hospital networks and physician groups.

### Why the US Relies on Indian Medical Coders
1. **Clinical Talent Pool**: India produces hundreds of thousands of high-caliber graduates in Life Sciences, Pharmacy, Nursing, and Allied Health Sciences each year.
2. **Standardized Quality**: Certified coders (AAPC CPC, AHIMA CCS) adhere to rigorous HIPAA compliance and maintain 95%+ audit accuracy.
3. **Time Zone Synergies**: Overnight processing allows US healthcare systems to submit claims within 24 hours of patient discharge.

### Salary Progression & Career Milestones
- **Trainee / Junior Coder (0–1 Year)**: ₹3.00 LPA – ₹4.20 LPA
- **CPC Certified Coder (1–3 Years)**: ₹4.50 LPA – ₹6.50 LPA
- **Senior Coder / Quality Auditor (3–5 Years)**: ₹6.80 LPA – ₹9.50 LPA
- **Team Lead / Coding Manager (5+ Years)**: ₹10.00 LPA – ₹16.00 LPA+

### How MCOA Accelerates Your Placement
Through our direct corporate alliances with Omega Healthcare, Access Healthcare, Episource, and AGS Health, MCOA students bypass generic HR queues with direct technical interview shortlists upon certification.`
    }
  ];

  for (const post of blogPostsData) {
    const existing = await prisma.blogPost.findUnique({
      where: { slug: post.slug }
    });
    if (!existing) {
      await prisma.blogPost.create({ data: post });
    }
  }
  console.log(`✓ Seeded ${blogPostsData.length} authoritative blog posts.`);

  // 4. Sample AI Conversations for Auditing and Verification
  const sampleConversations = [
    {
      sessionId: 'sess_demo_student_01',
      role: 'user',
      content: 'Can you explain the difference between CPT modifier 25 and modifier 59?',
      category: 'tutor',
      userEmail: 'sneha.ramachandran@example.com'
    },
    {
      sessionId: 'sess_demo_student_01',
      role: 'assistant',
      content: 'Modifier 25 is appended to an Evaluation and Management (E&M) service (e.g., 99213) to indicate that a significant, separately identifiable E&M service was performed by the same physician on the same day as a minor procedure. In contrast, Modifier 59 is appended to a non-E&M procedural CPT code to indicate a distinct, independent procedural service (different session, different site/organ system, or separate incision).',
      category: 'tutor',
      citations: JSON.stringify(['AMA CPT Coding Guidelines Appendix A: Modifiers', 'CMS NCCI Manual Chapter 1 General Correct Coding Policies'])
    },
    {
      sessionId: 'sess_demo_lead_02',
      role: 'user',
      content: 'I finished B.Sc Nursing. What is the fee for the CPC course in Chennai campus, and can I get a counselor to call me at 9876543210?',
      category: 'counselor',
      userPhone: '9876543210'
    },
    {
      sessionId: 'sess_demo_lead_02',
      role: 'assistant',
      content: 'Hello! Congratulations on your B.Sc Nursing degree — your clinical and anatomy background will give you a tremendous advantage in medical coding! The MCOA 4-Month Advanced Medical Coding & AAPC CPC Preparation Program is ₹45,000 (inclusive of 18% GST), payable in 3 easy monthly installments of ₹15,000 each. Our Chennai Head Office is at #70/1 200 Feet Radial Road, Pallikaranai. I have notified our senior admissions counselor to call you directly at 9876543210 today!',
      category: 'counselor',
      userPhone: '9876543210',
      escalatedToHuman: true,
      citations: JSON.stringify(['MCOA Admissions Handbook 2026', 'Chennai Campus Admissions Directory'])
    }
  ];

  for (const conv of sampleConversations) {
    await prisma.aiConversation.create({ data: conv });
  }
  console.log(`✓ Seeded ${sampleConversations.length} sample AI conversation logs.`);

  console.log('✅ Phase 5 Database Seeding Completed Successfully!');
}

main()
  .catch((e) => {
    console.error('Error during Phase 5 seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
