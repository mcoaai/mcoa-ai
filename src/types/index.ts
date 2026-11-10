export type CourseCategory = 
  | "Certification Prep"
  | "Medical Coding"
  | "Specialty Coding"
  | "Billing & Compliance";

export interface Course {
  id: string;
  slug: string;
  title: string;
  shortCode: string;
  category: CourseCategory;
  summary: string;
  description: string;
  duration: string;
  feeInr: number;
  discountFeeInr?: number;
  certificationTrack: string;
  trainingModes: string[];
  eligibility: string[];
  syllabus: {
    moduleTitle: string;
    topics: string[];
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  isFeatured?: boolean;
  targetAudience?: string[];
  recommendedPrerequisites?: string[];
  weeklySyllabus?: {
    week: string;
    title: string;
    exercises: string;
  }[];
  inclusions?: string[];
  exclusions?: string[];
  examBlueprint?: {
    totalQuestions: string;
    duration: string;
    passingScore: string;
    openBookPolicy: string;
    educatorVerificationNotice: string;
  };
  testimonial?: {
    quote: string;
    author: string;
    credential: string;
    role: string;
    company: string;
    batchYear: string;
  };
}

export interface Branch {
  id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  email: string;
  isHeadOffice?: boolean;
  landmark?: string;
  mapsUrl?: string;
}

export type LeadStatus =
  | "New"
  | "Contacted"
  | "Qualified"
  | "Counseling Scheduled"
  | "Demo Scheduled"
  | "Follow-up"
  | "Interested"
  | "Applied"
  | "Enrolled"
  | "Lost";

export const LEAD_STATUSES: LeadStatus[] = [
  "New",
  "Contacted",
  "Qualified",
  "Counseling Scheduled",
  "Demo Scheduled",
  "Follow-up",
  "Interested",
  "Applied",
  "Enrolled",
  "Lost",
];

export const EDUCATION_BACKGROUNDS = [
  "Medical (MBBS, BAMS, BHMS)",
  "Dental (BDS, MDS)",
  "Nursing (B.Sc, Post Basic, GNM)",
  "Pharmacy (B.Pharm, M.Pharm, Pharm.D)",
  "Physiotherapy (BPT, MPT)",
  "Occupational Therapy",
  "Allied Health Sciences (MLT, Radiology, Cardiac Care)",
  "Biotechnology & Bioinformatics",
  "Microbiology & Biochemistry",
  "Biomedical Engineering",
  "Life Sciences (Botany, Zoology, Genetics)",
  "Non-Medical / Career Transition",
] as const;

export type EducationBackground = typeof EDUCATION_BACKGROUNDS[number];

export interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  educationBackground: string;
  mode: string;
  preferredBatch: string;
  status: LeadStatus;
  source: string;
  notes?: string | null;
  courseId?: string | null;
  courseTitle?: string | null;
  branchId?: string | null;
  branchName?: string | null;
  assignedCounselorId?: string | null;
  assignedCounselorName?: string | null;
  createdAt: string | Date;
  updatedAt?: string | Date;
}
