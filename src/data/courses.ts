import { Course } from "@/types";

export const COURSES_DATA: Course[] = [
  {
    id: "advanced-medical-coding",
    slug: "advanced-medical-coding",
    title: "Advanced Medical Coding Masterclass",
    shortCode: "AMC-MASTER",
    category: "Medical Coding",
    summary: "Our flagship comprehensive program covering Medical Terminology, Anatomy & Physiology, ICD-10-CM, CPT, and HCPCS Level II with real-world chart auditing.",
    description: "The Advanced Medical Coding Masterclass at MCOA is an intensive, career-transforming curriculum engineered by Dr. Jeevanantham Mariappan. Built for life sciences, pharmacy, nursing, and healthcare graduates, this program bridges clinical knowledge with international revenue cycle standards. Students practice on simulated medical charts, master cross-specialty coding guidelines, and graduate interview-ready with 100% placement support.",
    duration: "3 Months",
    feeInr: 15000,
    discountFeeInr: 9500,
    certificationTrack: "AAPC CPC / AHIMA Ready",
    trainingModes: ["Classroom (Chennai / Perambalur / Coimbatore / Karaikudi)", "Live Interactive Online", "Hybrid Flex"],
    eligibility: [
      "Graduates & Postgraduates in Life Sciences, Biotechnology, Microbiology, Biochemistry, Nursing, Pharmacy, Physiotherapy, BDS, BAMS, BHMS, or Allied Health.",
      "Graduates from other disciplines with strong clinical orientation seeking international healthcare IT careers."
    ],
    syllabus: [
      {
        moduleTitle: "Module 1: Clinical Foundations & Medical Terminology",
        topics: [
          "Prefixes, suffixes, combining forms and anatomical directional terminology",
          "Comprehensive body systems: Musculoskeletal, Cardiovascular, Respiratory, Digestive, Nervous, and Endocrine",
          "Pathophysiology, disease progression, diagnostic labs, and clinical pharmacotherapy"
        ]
      },
      {
        moduleTitle: "Module 2: ICD-10-CM Diagnosis Coding Mastery",
        topics: [
          "Official Guidelines for Coding and Reporting (OGCR) deep-dive",
          "Chapters 1 through 22 coding conventions, sequencing rules, and combination codes",
          "Infectious diseases, Neoplasms, Diabetes manifestations, Circulatory diseases, and External causes"
        ]
      },
      {
        moduleTitle: "Module 3: CPT & HCPCS Level II Procedural Coding",
        topics: [
          "Format, symbols, unlisted procedures, and modifier logic (Modifiers 25, 59, 51, 78, 79, etc.)",
          "Integumentary, Musculoskeletal, and Cardiovascular procedural chart review",
          "HCPCS Level II national codes, durable medical equipment (DME), and injectable drugs (J-codes)"
        ]
      },
      {
        moduleTitle: "Module 4: Practical Chart Review & Placement Prep",
        topics: [
          "100+ de-identified authentic inpatient and outpatient medical charts",
          "Revenue cycle management, claim denial prevention, and compliance audits",
          "Resume building, technical mock interviews, and placement drives with leading MNC healthcare IT firms"
        ]
      }
    ],
    faqs: [
      {
        question: "Is prior coding experience required for this course?",
        answer: "No. The course begins from fundamental medical terminology and anatomy, making it perfect for both fresh life science graduates and healthcare professionals looking to transition."
      },
      {
        question: "What certification will I be eligible to take after this course?",
        answer: "You will be thoroughly prepared to challenge the AAPC CPC (Certified Professional Coder) or AHIMA CCS examinations with top confidence."
      },
      {
        question: "Is placement assistance included?",
        answer: "Yes, MCOA provides dedicated placement support including resume curation, mock interview rounds with Dr. Jeevanantham's team, and interview schedules with our 40+ healthcare IT hiring partners."
      }
    ],
    isFeatured: true
  },
  {
    id: "cpc-certification-prep",
    slug: "cpc-certification-prep",
    title: "CPC® (Certified Professional Coder) Exam Prep",
    shortCode: "CPC-PREP",
    category: "Certification Prep",
    summary: "Dedicated AAPC CPC® exam training designed to clear the certification in your first attempt with time management drills and 1,500+ practice questions.",
    description: "The AAPC Certified Professional Coder (CPC) credential is the gold standard in outpatient medical coding worldwide. MCOA's targeted preparation course provides deep-focus speed drills, guideline cross-indexing, code elimination techniques, and five full-length mock examinations modeled strictly on AAPC testing competencies.",
    duration: "3 Months",
    feeInr: 25000,
    discountFeeInr: 14500,
    certificationTrack: "AAPC CPC® Credential",
    trainingModes: ["Live Online Weekend & Evening", "Classroom Intensive"],
    eligibility: [
      "Completed foundational training in ICD-10-CM and CPT coding, or working coders seeking certification advancement.",
      "Life sciences / medical graduates with basic coding background."
    ],
    syllabus: [
      {
        moduleTitle: "Module 1: AAPC Exam Blueprint & Time Strategies",
        topics: [
          "100-question 4-hour exam structure and scoring breakdown",
          "Rapid indexing techniques for ICD-10-CM and CPT codebooks",
          "Process of elimination and guideline citation under timed pressure"
        ]
      },
      {
        moduleTitle: "Module 2: 10,000 to 60,000 Series Surgical Coding Drills",
        topics: [
          "Integumentary, Musculoskeletal, Respiratory, Cardiovascular, and Digestive surgeries",
          "Hemic, Lymphatic, Mediastinum, Endocrine, and Nervous system operative reports",
          "Eye, Ocular Adnexa, Auditory system, and complex modifier applications"
        ]
      },
      {
        moduleTitle: "Module 3: Evaluation & Management, Anesthesia & Radiology",
        topics: [
          "MDM grid vs Time-based E&M code selection",
          "Anesthesia base units, physical status modifiers, and qualifying circumstances",
          "Diagnostic radiology, interventional procedures, ultrasound, and radiation oncology"
        ]
      },
      {
        moduleTitle: "Module 4: 5 Full-Length Mock Exams & Performance Review",
        topics: [
          "AAPC-aligned simulated mock examinations with comprehensive post-test rationales",
          "Individual domain weakness diagnostics and focused remediation",
          "Final examination day checklist and administrative assistance"
        ]
      }
    ],
    faqs: [
      {
        question: "What is MCOA's track record for CPC exam passing?",
        answer: "MCOA students maintain a verified first-attempt pass rate exceeding 94% through our rigorous diagnostic mock system."
      },
      {
        question: "Does MCOA provide guidance on registering for the official AAPC exam?",
        answer: "Yes, our admissions coordinators assist candidates with AAPC membership, exam voucher booking, and remote or in-person testing center scheduling."
      }
    ],
    isFeatured: true
  },
  {
    id: "ccs-certification-prep",
    slug: "ccs-certification-prep",
    title: "CCS® (Certified Coding Specialist) Inpatient Prep",
    shortCode: "CCS-INPATIENT",
    category: "Certification Prep",
    summary: "Advanced AHIMA CCS® certification program focusing on ICD-10-PCS hospital inpatient procedure coding, POA indicators, and MS-DRG grouping.",
    description: "The Certified Coding Specialist (CCS) credential from AHIMA demonstrates mastery in hospital inpatient coding. This intensive course teaches students the complex root operation tables of ICD-10-PCS, inpatient principal diagnosis sequencing, Present on Admission (POA) guidelines, and Medicare Severity Diagnosis Related Groups (MS-DRG).",
    duration: "3 Months",
    feeInr: 25000,
    discountFeeInr: 14500,
    certificationTrack: "AHIMA CCS® Credential",
    trainingModes: ["Live Online", "Classroom Weekend"],
    eligibility: [
      "Prior knowledge of ICD-10-CM diagnosis coding.",
      "Working outpatient coders looking to step up into high-paying hospital inpatient positions."
    ],
    syllabus: [
      {
        moduleTitle: "Module 1: ICD-10-PCS System Architecture",
        topics: [
          "7-character alphanumeric structure and 31 Medical/Surgical root operations",
          "Body system definitions, approach techniques, and device/qualifier values",
          "Obstetrics, Placement, Administration, Measurement, and Extracorporeal procedures"
        ]
      },
      {
        moduleTitle: "Module 2: Inpatient Sequencing & POA Guidelines",
        topics: [
          "Uniform Hospital Discharge Data Set (UHDDS) principal diagnosis rules",
          "Secondary diagnoses, Comorbidities (CC), and Major Comorbidities (MCC)",
          "Present on Admission (POA) exempt lists and hospital acquired conditions (HAC)"
        ]
      },
      {
        moduleTitle: "Module 3: MS-DRG Grouping & Reimbursement",
        topics: [
          "Major Diagnostic Categories (MDCs), surgical vs medical DRGs",
          "Case Mix Index (CMI) impact and physician documentation queries (CDI)"
        ]
      }
    ],
    faqs: [
      {
        question: "Why should I pursue CCS after CPC?",
        answer: "CCS qualifies you for inpatient hospital medical records departments, which typically offer higher compensation tiers and global remote opportunities in US healthcare systems."
      }
    ],
    isFeatured: true
  },
  {
    id: "crc-risk-adjustment",
    slug: "crc-risk-adjustment",
    title: "CRC® (Certified Risk Adjustment Coder)",
    shortCode: "CRC-RISK",
    category: "Specialty Coding",
    summary: "Master Hierarchical Condition Categories (HCC), Medicare Advantage risk score modeling, and chronic condition documentation compliance.",
    description: "Risk Adjustment coding is one of the fastest growing sectors in international healthcare billing. MCOA's CRC course instructs students on CMS-HCC risk adjustment methodology, RAF scores, annual recapture of chronic illnesses, and quality audits.",
    duration: "2.5 Months",
    feeInr: 20000,
    discountFeeInr: 14500,
    certificationTrack: "AAPC CRC® Credential",
    trainingModes: ["Live Online Interactive", "Hybrid"],
    eligibility: [
      "Life science graduates, CPC certified coders, or healthcare data analysts."
    ],
    syllabus: [
      {
        moduleTitle: "Module 1: Risk Adjustment Models & Fundamentals",
        topics: [
          "CMS-HCC Model versions, HHS-HCC commercial model, and RxHCC",
          "Demographic factors, disease interactions, and Risk Adjustment Factor (RAF) calculation",
          "MEAT criteria (Monitor, Evaluate, Assess, Treat) for chronic illness documentation"
        ]
      },
      {
        moduleTitle: "Module 2: High-Yield Chronic Disease Coding",
        topics: [
          "Diabetes with complications, Chronic Kidney Disease (CKD) stages, Congestive Heart Failure",
          "COPD, Vascular diseases, Malignancies, and Behavioral health conditions",
          "Retrospective vs Prospective chart reviews and RADV audit compliance"
        ]
      }
    ],
    faqs: [
      {
        question: "Is CRC suitable for work-from-home jobs?",
        answer: "Yes, Risk Adjustment coders are among the highest in demand for remote and offshore US healthcare IT projects."
      }
    ],
    isFeatured: true
  },
  {
    id: "cpma-medical-auditor",
    slug: "cpma-medical-auditor",
    title: "CPMA® (Certified Professional Medical Auditor)",
    shortCode: "CPMA-AUDIT",
    category: "Specialty Coding",
    summary: "Elevate your career into healthcare auditing, fraud prevention, OIG compliance plans, and statistical sampling of medical records.",
    description: "Designed for experienced medical coders, clinical document specialists, and healthcare administrators looking to lead audit teams. Learn how to perform baseline audits, calculate risk ratings, communicate audit findings to physicians, and implement formal compliance programs.",
    duration: "3 Months",
    feeInr: 25000,
    discountFeeInr: 15500,
    certificationTrack: "AAPC CPMA® Credential",
    trainingModes: ["Live Online Weekend"],
    eligibility: [
      "Minimum 1-2 years coding experience or CPC/CCS credential holder."
    ],
    syllabus: [
      {
        moduleTitle: "Module 1: Medical Record Auditing Standards",
        topics: [
          "OIG Compliance Guidance, False Claims Act, Anti-Kickback Statute, and Stark Law",
          "Statistical sampling techniques, sample size determination, and error rate formulas",
          "Audit scope: Prospective, concurrent, and retrospective reviews"
        ]
      },
      {
        moduleTitle: "Module 2: Physician Documentation & Reporting",
        topics: [
          "E&M audit worksheets, MDM analysis, and 1995/1997 vs 2021/2023 guideline benchmarking",
          "Writing actionable executive audit summaries and communicating with clinical providers"
        ]
      }
    ],
    faqs: [
      {
        question: "Who typically employs CPMAs?",
        answer: "Hospitals, large physician group practices, payer organizations, healthcare consulting firms, and federal auditing contractors."
      }
    ],
    isFeatured: false
  },
  {
    id: "evaluation-and-management-mastery",
    slug: "evaluation-and-management-mastery",
    title: "E&M (Evaluation & Management) Specialty Mastery",
    shortCode: "EM-SPECIALTY",
    category: "Specialty Coding",
    summary: "Master outpatient office visits, inpatient admissions, emergency department charts, and consultation coding under current AMA/CMS guidelines.",
    description: "Deep dive into the 2021 & 2023 AMA/CMS Evaluation and Management revisions. Learn to calculate Medical Decision Making (Number & Complexity of Problems, Amount/Complexity of Data, Risk of Morbidity) with precision, as well as time-based code allocation across various clinical settings.",
    duration: "4 Weeks",
    feeInr: 12000,
    discountFeeInr: 9500,
    certificationTrack: "Specialty Practice Certificate",
    trainingModes: ["Live Online Interactive"],
    eligibility: [
      "Working coders or medical graduates with foundational CPT knowledge."
    ],
    syllabus: [
      {
        moduleTitle: "Module 1: Medical Decision Making (MDM) Framework",
        topics: [
          "Problem complexity: acute uncomplicated, chronic illnesses with exacerbation, life-threatening conditions",
          "Data complexity: review of external records, independent interpretation, discussion with external providers",
          "Risk categorization: prescription drug management, decision for surgery, drug monitoring"
        ]
      },
      {
        moduleTitle: "Module 2: Setting-Specific E&M Coding",
        topics: [
          "Office & Other Outpatient Services (99202–99215)",
          "Hospital Inpatient & Observation Care (99221–99239)",
          "Emergency Department Services (99281–99285) & Consultations"
        ]
      }
    ],
    faqs: [
      {
        question: "Does this include the latest 2023/2024 E&M guideline updates?",
        answer: "Yes, the syllabus is 100% updated to incorporate all harmonized AMA/CMS inpatient and outpatient E&M guidelines."
      }
    ],
    isFeatured: false
  },
  {
    id: "medical-billing-fundamentals",
    slug: "medical-billing-fundamentals",
    title: "US Medical Billing & Denial Management",
    shortCode: "BILLING-RCM",
    category: "Billing & Compliance",
    summary: "End-to-end revenue cycle management from patient eligibility, charge entry, claim submission (CMS-1500 / UB-04), to AR follow-up and appeals.",
    description: "Equips students with comprehensive operational expertise in US healthcare reimbursement. Master EDI 837 claims, 835 remittance advice, clearinghouse workflows, coordination of benefits, CARC/RARC denial reason code resolution, and payer appeals.",
    duration: "2.5 Months",
    feeInr: 16000,
    discountFeeInr: 12500,
    certificationTrack: "MCOA RCM Professional Certificate",
    trainingModes: ["Classroom", "Live Online"],
    eligibility: [
      "Graduates of any discipline seeking rapid entry into US healthcare revenue cycle operations."
    ],
    syllabus: [
      {
        moduleTitle: "Module 1: Revenue Cycle Overview & Claim Types",
        topics: [
          "US health insurance types: Medicare, Medicaid, Commercial (BCBS, Aetna, Cigna, UHC), and Tricare",
          "CMS-1500 professional claim form and UB-04 institutional claim form fields",
          "Patient demographics, insurance verification, and prior authorization requirements"
        ]
      },
      {
        moduleTitle: "Module 2: Denial Management & Accounts Receivable (AR)",
        topics: [
          "Standard Claim Adjustment Reason Codes (CARC) and Remittance Advice Remark Codes (RARC)",
          "Resolving timely filing, medical necessity, and bundling denials (NCCI edits)",
          "Effective telephonic and portal AR follow-up with US payers and writing winning appeal letters"
        ]
      }
    ],
    faqs: [
      {
        question: "Is this course suitable for non-science graduates?",
        answer: "Yes! Medical billing is an operational process that welcomes graduates from commerce, arts, science, and computer backgrounds."
      }
    ],
    isFeatured: false
  },
  {
    id: "ambulatory-surgery-center-coding",
    slug: "ambulatory-surgery-center-coding",
    title: "Ambulatory Surgery Center Coding",
    shortCode: "ASC-CODING",
    category: "Specialty Coding",
    summary: "Specialized training in outpatient facility coding, CMS ASC payment indicators, CPT modifiers, and operative report analysis for same-day surgical centers.",
    description: "Master the complexities of ambulatory surgical center (ASC) coding and reimbursement. This focused course covers CMS ASC payment groups, packaging rules, revenue codes, modifier usage (such as 73, 74, 50, and 59), and real operative reports across endoscopy, orthopedics, ophthalmology, and pain management.",
    duration: "1 Month",
    feeInr: 12000,
    discountFeeInr: 9500,
    certificationTrack: "AAPC CASCC™ / Specialty Ready",
    trainingModes: ["Live Online Interactive", "Classroom Intensive", "Self-Paced Hybrid"],
    eligibility: [
      "Certified coders (CPC, CCS), life sciences graduates, or outpatient billing specialists."
    ],
    syllabus: [
      {
        moduleTitle: "Module 1: ASC Payment System & CMS Guidelines",
        topics: [
          "ASC-covered procedures list, payment indicators, and device-intensive calculations",
          "Packaging rules for implants, drugs, and surgical supplies",
          "Special modifier logic: 73 & 74 (discontinued procedures), 50, 52, 59, and RT/LT"
        ]
      },
      {
        moduleTitle: "Module 2: High-Volume Surgical Specialty Chart Review",
        topics: [
          "Ophthalmology: Cataract extraction, vitrectomy, and premium IOL billing",
          "Orthopedics & Pain: Knee/shoulder arthroscopy, epidural steroid injections, radiofrequency ablation",
          "Gastroenterology: Screening vs diagnostic colonoscopy, biopsy vs snare polypectomy"
        ]
      }
    ],
    faqs: [
      {
        question: "Is ASC coding different from hospital inpatient coding?",
        answer: "Yes, ASC facility coding relies on CPT and HCPCS Level II codes under outpatient prospective payment rules rather than ICD-10-PCS or MS-DRGs."
      },
      {
        question: "What certification does this prepare for?",
        answer: "This program prepares you thoroughly for the AAPC Certified Ambulatory Surgical Center Coder (CASCC™) credential."
      }
    ],
    isFeatured: false
  },
  {
    id: "hierarchical-condition-category-coding",
    slug: "hierarchical-condition-category-coding",
    title: "Hierarchical Condition Category (HCC) Coding",
    shortCode: "HCC-CODING",
    category: "Specialty Coding",
    summary: "Master CMS-HCC and HHS-HCC risk adjustment models, Risk Adjustment Factor (RAF) scoring, MEAT documentation criteria, and RADV audit compliance.",
    description: "Designed to equip medical coders with high-demand risk adjustment expertise for US Medicare Advantage and ACA health plans. Learn diagnostic coding for complex chronic illnesses, annual disease recapture protocols, retrospective/prospective chart auditing, and Risk Adjustment Data Validation (RADV) audits.",
    duration: "2 Months",
    feeInr: 12500,
    discountFeeInr: 9500,
    certificationTrack: "AAPC CRC® / Risk Adjustment Pro",
    trainingModes: ["Live Interactive Online", "Classroom Weekend", "Hybrid Flex"],
    eligibility: [
      "Life sciences, pharmacy, nursing graduates, CPC certified coders, or healthcare data analysts."
    ],
    syllabus: [
      {
        moduleTitle: "Module 1: Risk Adjustment Models & RAF Scoring",
        topics: [
          "CMS-HCC Model evolution: V24 vs V28 category comparisons and payment weights",
          "Demographic factors, Medicaid dual-eligibility, and disease interaction calculations",
          "Retrospective vs prospective chart review workflows and suspect condition algorithms"
        ]
      },
      {
        moduleTitle: "Module 2: Clinical Chronic Conditions & MEAT Documentation",
        topics: [
          "Diabetes mellitus with multiple manifestations, secondary diabetes, and insulin use",
          "Chronic Kidney Disease (CKD) stages, ESRD, and hypertensive heart/kidney combinations",
          "COPD, Congestive Heart Failure, Vascular diseases, and Morbid Obesity (BMI guidelines)",
          "MEAT criteria (Monitor, Evaluate, Assess, Treat) for diagnostic compliance"
        ]
      },
      {
        moduleTitle: "Module 3: RADV Audits & Provider Documentation Improvement",
        topics: [
          "CMS RADV (Risk Adjustment Data Validation) audit methodologies and sample selection",
          "Effective physician query writing without leading the provider",
          "Annual wellness visit (AWV) chronic condition recapture workflows"
        ]
      }
    ],
    faqs: [
      {
        question: "Are remote work opportunities available for HCC coders?",
        answer: "Yes, HCC risk adjustment coders are among the most sought-after professionals for offshore and work-from-home US healthcare projects."
      },
      {
        question: "How does HCC coding differ from standard CPC outpatient coding?",
        answer: "HCC focuses on diagnostic ICD-10-CM coding reflecting disease burden and severity to establish patient risk scores rather than procedural fee-for-service."
      }
    ],
    isFeatured: false
  },
  {
    id: "home-health-coding",
    slug: "home-health-coding",
    title: "Home Health Coding",
    shortCode: "HHC-CODING",
    category: "Specialty Coding",
    summary: "Master home health diagnosis coding under the Patient-Driven Groupings Model (PDGM), OASIS-E assessment item matching, and plan of care compliance.",
    description: "Home health is one of the fastest growing sectors in US healthcare delivery. This specialized curriculum teaches diagnostic sequencing under CMS Patient-Driven Groupings Model (PDGM), OASIS-E clinical item guidance, primary diagnosis assignment, comorbidity adjustments, and skilled nursing chart reviews.",
    duration: "1.5 Months",
    feeInr: 15000,
    discountFeeInr: 12500,
    certificationTrack: "BCHH-C / OASIS-E Ready",
    trainingModes: ["Live Online Interactive", "Self-Paced Hybrid"],
    eligibility: [
      "Coders with basic ICD-10-CM knowledge, nurses, physical therapists, or life sciences graduates."
    ],
    syllabus: [
      {
        moduleTitle: "Module 1: PDGM Framework & Clinical Groupings",
        topics: [
          "Patient-Driven Groupings Model (PDGM) structure: 432 possible case-mix groups",
          "Admission source and timing (Early vs Late, Community vs Institutional)",
          "Primary diagnosis clinical categories: Musculoskeletal, Neuro, Wounds, Complex Nursing"
        ]
      },
      {
        moduleTitle: "Module 2: OASIS-E Clinical Guidance & Comorbidity Adjusters",
        topics: [
          "OASIS-E items review: M1021, M1023, M1028 (Active Diagnoses)",
          "Low and High comorbidity adjustment tiers and secondary diagnosis optimization",
          "Sequencing rules for surgical aftercare, surgical wounds, pressure ulcers, and stasis ulcers"
        ]
      },
      {
        moduleTitle: "Module 3: Plan of Care (CMS-485) & Quality Audits",
        topics: [
          "CMS Form 485 alignment with clinical documentation and physician orders",
          "Face-to-face encounter compliance and medical necessity validation",
          "ADR (Additional Documentation Request) denial defense and quality metric scoring"
        ]
      }
    ],
    faqs: [
      {
        question: "Does this course cover the latest OASIS-E guidelines?",
        answer: "Yes, the curriculum is 100% compliant with current CMS OASIS-E guidelines and PDGM reimbursement updates."
      },
      {
        question: "Which certifications align with this training?",
        answer: "This program prepares you for the BCHH-C (Board Certified Home Health Coder) and HCS-D (Home Care Coding Specialist - Diagnosis) credentials."
      }
    ],
    isFeatured: false
  },
  {
    id: "general-surgery-coding",
    slug: "general-surgery-coding",
    title: "General Surgery Coding Training",
    shortCode: "GEN-SURG",
    category: "Specialty Coding",
    summary: "Intensive operative report dissection across abdominal, endocrine, colorectal, breast, and laparoscopic procedures with advanced modifier application.",
    description: "Advanced procedural coding for high-complexity general surgery cases. Learn how to extract procedural components from complex operative notes, distinguish unlisted surgeries, identify unbundled services using NCCI edits, and apply surgical modifiers (50, 51, 58, 59, 78, 79, 62, 80) accurately.",
    duration: "1.5 Months",
    feeInr: 15000,
    discountFeeInr: 12500,
    certificationTrack: "AAPC CGSC™ / Surgery Specialty Ready",
    trainingModes: ["Live Online Interactive", "Classroom Weekend", "Hybrid Flex"],
    eligibility: [
      "Certified medical coders (CPC, CCS, CCA), medical transcriptionists, or life science graduates with CPT background."
    ],
    syllabus: [
      {
        moduleTitle: "Module 1: Abdominal Wall, Hernia & Laparoscopic Coding",
        topics: [
          "Inguinal, femoral, umbilical, ventral, and incisional hernia repair coding conventions",
          "Mesh implantation rules and initial vs recurrent hernia complexity",
          "Laparoscopic to open conversion coding and diagnostic vs surgical endoscopy bundling rules"
        ]
      },
      {
        moduleTitle: "Module 2: Digestive, Colorectal & Endocrine Surgery",
        topics: [
          "Cholecystectomy, intraoperative cholangiography, and common bile duct exploration",
          "Partial/total colectomies, ostomy creation, and proctectomy operative reviews",
          "Thyroidectomy (lobectomy vs total), neck dissection, and parathyroid surgery",
          "Mastectomy types (simple, modified radical, skin-sparing) and sentinel lymph node biopsy"
        ]
      },
      {
        moduleTitle: "Module 3: NCCI Edits, Global Surgical Packages & Operative Reports",
        topics: [
          "National Correct Coding Initiative (NCCI) PTP edits and modifier indicators 0, 1, 9",
          "Global surgery package rules: 0-day, 10-day, and 90-day postoperative periods",
          "Surgical modifiers: 58 (staged), 78 (unplanned return to OR), 79 (unrelated), 62 (co-surgeons)",
          "50+ authentic de-identified operative notes analysis and coding drills"
        ]
      }
    ],
    faqs: [
      {
        question: "Does this course prepare for the AAPC CGSC certification?",
        answer: "Yes, the training is aligned with the AAPC Certified General Surgery Coder (CGSC™) exam content and competencies."
      },
      {
        question: "Will I practice on real surgeon operative reports?",
        answer: "Yes, students review and code over 50 authentic, de-identified general surgery operative records."
      }
    ],
    isFeatured: false
  }
];
