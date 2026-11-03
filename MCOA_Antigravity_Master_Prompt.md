# MCOA — Antigravity Master Development Prompt

> **Project:** Medical Coding Officers Academy (MCOA)  
> **Goal:** Build a premium, production-ready academy website and integrated CRM, LMS, coding practice, and administration platform, deployed on Vercel.  
> **How to use:** Paste this specification into Google Antigravity, attach the approved MCOA logo, and ask the agent to implement the project phase by phase.

## 1. Your role and development standards

Act as a principal full-stack software architect, senior Next.js engineer, UX/UI designer, database architect, LMS specialist, medical coding education product designer, DevOps engineer, and security engineer.

Build a maintainable, modular **working application**, not a static mockup. Use real database-backed workflows, server-side authorization, input validation, tests, documentation, and deployment instructions. Do not fake payments, messages, coding results, student records, or integrations. When a third-party service is not configured, show a clear **Not configured** state and instructions.

Before coding, inspect the repository, propose an architecture, route map, permission matrix, database model, phased milestones, and acceptance tests. Implement each phase, test it, and ask for review before moving to the next major phase or making destructive changes.

## 2. Brand identity

- **Brand:** Medical Coding Officers Academy (MCOA)
- **Positioning:** Premium medical coding training, healthcare education, international certification preparation, career guidance, and placement assistance.
- **Website:** https://medicalcodingofficersacademy.com
- **Email:** medicalcodingofficers@gmail.com
- **Phone / WhatsApp:** +91 8072020716
- **Founder & CEO:** Dr. Jeevanantham Mariappan
- **Logo:** Use the supplied, approved MCOA logo as the canonical asset. Do not recreate or modify it without approval. Provide responsive logo placement and light/dark variants when supplied.

### Brand colors

| Token | Color | HEX |
|---|---|---|
| Primary | Midnight Royal Purple | `#211747` |
| Secondary | Royal Amethyst | `#50458F` |
| Highlight | Signature Lavender | `#9B85D3` |
| Premium accent | Champagne Gold | `#D8AC55` |
| Light surface | Pearl Lavender | `#F6F3FC` |
| Background | Pure White | `#FFFFFF` |
| Body text | Deep Slate | `#333044` |

Use **Cinzel** for selective premium editorial titles, **Montserrat** for headings/navigation/buttons, and **Inter** for body text, forms, and dashboards. Prioritize readable typography, spacious layouts, excellent contrast, understated motion, polished tables, and an exclusive yet accessible visual identity. Avoid clutter and excessive gradients.

### Branches and contact

Display branch details in the website and make all details editable in admin settings. Verify address spellings and postal codes before publishing.

- **Head Office — Chennai:** #70/1, 200 Feet Radial Road (Thoraipakkam to Pallavaram), Near A2B Hotel, Narayanapuram Lake, Pallikaranai, Chennai - 600100.
- **Perambalur:** 3rd Floor, Annai Hospital, VRM IAS Academy, Near Krishna Theatre, Perambalur, Tamil Nadu - 621212.
- **Coimbatore:** #17 Sangam Street, Sundarapuram Post, Coimbatore - 641024.
- **Karaikudi:** #52, 5th Cross, TT Nagar, Near Corner Bakery, Karaikudi - 600001.

Provide branch maps, inquiry routing, and branch-specific reporting.

## 3. Recommended technology stack

- **Frontend / backend:** Next.js App Router, TypeScript, React
- **UI:** Tailwind CSS, shadcn/ui, Lucide icons
- **Forms / validation:** React Hook Form + Zod
- **Database:** Managed PostgreSQL compatible with Vercel
- **ORM:** Prisma with migrations
- **Authentication:** Auth.js or a maintained equivalent; MFA for privileged users
- **Tables / analytics:** TanStack Table, Recharts
- **Files:** Secure object storage with signed URLs
- **Payments:** Razorpay with server-side orders and verified webhooks
- **Messaging:** Official WhatsApp Business Platform through an approved provider; transactional email provider
- **Classes:** Zoom or Google Meet integration, optionally an approved streaming provider
- **AI:** Server-side configurable LLM provider with retrieval over approved content
- **Hosting:** Vercel; staging and production environments
- **Jobs:** Durable background queue for reminders, webhook processing, and reports

Keep the application modular. Use environment variables and never commit secrets. Protect all sensitive reads and writes with **server-side role-based access control (RBAC)**.

## 4. Roles and portals

Implement these roles with a documented permission matrix:

1. Super Admin
2. Branch Admin
3. Admissions Counselor
4. Academic Coordinator
5. Trainer / Instructor
6. Student
7. Placement Officer
8. Finance Officer
9. Content Manager

Support multiple roles per account where authorized. Use role-aware navigation, branch scoping, audit logs, and least-privilege access.

## 5. Public website and marketing

Create responsive, SEO-friendly pages:

- Home, About, Founder Profile, Why MCOA
- Course Catalog and Individual Course Pages
- Certification Preparation, Career Pathways, Training Modes
- Upcoming Batches, Webinars, Events, Free Demo / Counseling
- Student Success Stories, Placement Assistance, Alumni
- Blog / Resources, Coding Practice Preview
- Branch Locations, Contact, FAQ
- Apply Now, Student Login
- Privacy Policy, Terms, Refund Policy, Disclaimers

Each course page must support editable title, summary, eligibility, outcomes, syllabus, duration, fees, discounts, trainer, batch schedules, FAQs, CTA, brochure download, and SEO metadata. Do not invent fees, pass rates, placement guarantees, employers, or testimonials.

### Courses

Advanced Medical Coding; CPC; CCS; CRC; CPMA; ICD-10-CM; CPT; HCPCS Level II; ICD-10-PCS; IP-DRG / MS-DRG; HCC Risk Adjustment; E&M; ED Coding; Surgery; Anesthesia; Radiology; Pathology and Laboratory; Medicine; ASC; Denial Management; Medical Billing Fundamentals; and additional specialty programs configurable in admin.

### Interactive brochure

Offer professionally styled downloadable PDF syllabi for Advanced Medical Coding, CPC, CCS, CRC, and CPMA. Include curriculum, eligibility, certification track, schedules, training mode, and truthful placement assistance information. Store and version PDFs through the CMS.

## 6. CRM and lead management

Build a complete database-backed CRM:

- Capture leads from public forms, course pages, webinars, landing pages, QR campaigns, manual entry, and approved integrations.
- Store lead source, campaign, UTM parameters, education, desired course, branch, mode, preferred batch, counselor, consent, and notes.
- Education categories: medical, dental, nursing, pharmacy, physiotherapy, occupational therapy, allied healthcare, biotechnology, microbiology, biomedical engineering, life sciences, and beginner.
- Stages: New → Contacted → Qualified → Counseling Scheduled → Demo Scheduled → Follow-up → Interested → Applied → Enrolled, plus Lost.
- Counselor assignment, follow-up tasks, reminders, call outcomes, lead history, tagging, duplicate detection, CSV import/export, filters, and bulk actions.
- Dashboards for funnel conversion, lead source, response time, branch, course, counselor performance, and campaign attribution.
- Consent management, unsubscribe / opt-out controls, and role-limited lead access.

## 7. Admissions, batches, and finance

Build application review, enrollment approval, document upload, student ID generation, batch assignment, fee plans, installment schedules, discounts, invoices, receipts, balances, refunds, and finance reporting.

Batch/cohort scheduling must support weekday, weekend, online, offline, hybrid, multiple branches, trainers, session calendars, capacity limits, attendance, and rescheduling.

Integrate **Razorpay** with secure server-side order creation, signature verification, idempotent webhook processing, reconciliation, refunds, and audit trails. Support INR, UPI/cards/net banking subject to gateway availability. Never store card data. Default timezone: **Asia/Kolkata**.

## 8. Advanced student dashboard and LMS

### Student portal

Show enrolled courses, progress, upcoming classes, recorded lessons, assignments, attendance, coding practice, mock exams, weekly analytics, certificates, fees, receipts, announcements, instructor feedback, placement support, support tickets, and account preferences.

### LMS capabilities

- Course → module → lesson hierarchy
- Video, PDFs, reading materials, quizzes, assignments, and discussions
- Progress tracking, bookmarks, personal notes, prerequisites, and drip scheduling
- Trainer grading, feedback, student submissions, and completion certificates
- Protected files, signed access URLs, access expiry, and version control
- Instructor authoring, course duplication, lesson management, and analytics
- Clear mobile-first experience on phones, tablets, and desktops

## 9. Digital coding references and manuals

Create a version-aware, searchable reference interface for:

- ICD-10-CM by fiscal year
- CPT, including **2026 only with appropriate AMA licensing**
- HCPCS Level II by year
- ICD-10-PCS by fiscal year
- MS-DRG references by applicable version

Support search, code hierarchy, effective dates, bookmarks, annotations, attribution, and cross-references where permitted.

**Licensing rule:** Do not scrape, bundle, redistribute, or expose proprietary CPT, AAPC, or AHIMA content without permission. Use only public government sources, properly licensed content, or academy-owned materials with documented rights. Display source and version information and clearly distinguish educational tools from authoritative billing/coding references.

## 10. Medical coding practice simulator

Create instructor-authored, original synthetic or properly de-identified case scenarios for:

- ICD-10-CM diagnosis coding, sequencing, guidelines
- CPT procedure coding and modifiers
- HCPCS Level II
- ICD-10-PCS
- E&M chart review and code-level selection
- DRG grouping concepts and CC/MCC reasoning
- HCC / risk adjustment
- Audit findings, documentation queries, compliance, medical necessity
- Anesthesia, Surgery, Radiology, Lab/Pathology, Medicine, ED, ASC

Features: difficulty levels, timer (optional), structured answers, code selection, student rationale, instructor-approved answer keys, feedback, references, saved attempts, review flags, analytics, case authoring, bulk import, and case versioning.

Do not invent authoritative coding results. AI-generated rationales must be instructor-reviewed before being published as answer keys.

### E&M calculator

Implement a versioned educational E&M calculator with setting-specific rules, MDM elements, applicable time-based selection, step-by-step reasoning, and official reference citations. Clearly label educational use and distinguish outpatient, inpatient, ED, and other settings. Do not use invented rules.

### DRG practice simulator

Accept principal diagnosis, secondary diagnoses, procedures, POA indicators, discharge details, and other required grouping inputs. Show an official DRG only when using an appropriately licensed or validated version-specific grouper. Otherwise offer clearly labeled instructor-authored **training cases**, not fabricated official groupings.

## 11. AAPC / AHIMA-style mock exam engine

Build **original** CPC, CCS, CRC, and CPMA preparation assessments aligned with publicly documented competency areas, without copying protected official exam questions.

- Timed MCQs and case studies
- Configurable blueprints, question counts, weights, and limits
- Autosave, flag-for-review, attempt history, resume rules
- Question randomization and exam integrity controls
- Detailed explanations, domain-level scoring, weak-area analysis
- Instructor review, item analysis, question versioning, CSV import/export
- Score breakdowns and student readiness dashboards

Do not advertise exams as official or identical to current certification examinations unless verified and authorized.

## 12. Weekly performance analytics

Provide student and trainer dashboards tracking accuracy, attempts, trends, course completion, attendance, assignments, and intervention needs by domain:

E&M, Anesthesia, Surgery, Radiology, Pathology & Laboratory, Medicine, ICD-10-CM, HCPCS, ICD-10-PCS, DRG, HCC, Compliance, and Auditing.

Use transparent internal readiness thresholds. Do not promise examination outcomes.

## 13. Live classes, webinars, and events

- Schedule Zoom / Google Meet sessions with trainer and batch assignment
- Public webinar pages, registration, free/paid events, and checkout
- Email/WhatsApp confirmations and reminders where consented
- Access-controlled join links, attendance, recordings, feedback
- Certificates, webinar lead conversion reporting, and event analytics
- Calendar integration and Asia/Kolkata scheduling

Do not attempt to run a video conferencing server inside Vercel serverless functions.

## 14. WhatsApp Business automation

Use official approved APIs and consent-based templates for welcome messages, lead acknowledgment, counseling reminders, batch schedules, fee reminders, classes, webinars, and certification deadline notices. Include editable approved templates, delivery status, message logs, retries, opt-out, and audit history. No unsolicited bulk messaging.

## 15. Landing page builder and CMS

Build a secure template-driven no-code landing page builder for CPC, CCS, Advanced Medical Coding, webinars, free demos, branch admissions, placement awareness, and offers.

Allow editing of hero sections, images, benefits, syllabus, FAQ, testimonials (verified), CTAs, inquiry forms, metadata, UTM tracking, and draft/publish states. Use safe structured components rather than arbitrary executable scripts. Provide SEO tools, blog CMS, navigation/footer editor, global settings, and asset management.

## 16. AI agent

Create a guarded, consent-aware AI assistant for:

- Course recommendations and eligibility questions
- Admissions FAQs, branch details, available batches
- Student learning assistance and coding concept explanations
- Mock exam rationale exploration using approved references
- Lead qualification and human counselor handoff
- Authorized admin report summaries

Use retrieval over verified academy data and legally usable coding references. Prevent cross-user data exposure. Never invent fees, schedules, placements, exam results, coding rules, or official claims. Provide knowledge-base management, escalation, logging, usage limits, and clear AI disclosures.

## 17. Placement and alumni management

Support career profiles, resumes, interview training, employer contacts, job listings, applications, interview schedules, placement status, alumni follow-up, and consent-controlled success stories. Make all placement and exam achievement claims verifiable. Do not imply guaranteed employment.

## 18. Admin dashboard

Create overview widgets and detailed screens for:

- CRM and conversion funnel
- Applications, enrollments, students
- Courses, batches, trainers, attendance
- LMS engagement and exam performance
- Revenue, invoices, installments, outstanding payments
- Branch comparison and staff performance
- Webinars, live classes, notifications
- Placements, campaigns, landing pages
- WhatsApp/email automation, AI usage
- CMS, roles, audit logs, system settings, reports

## 19. Data model

Create normalized PostgreSQL tables for users, roles, permissions, branches, courses, modules, lessons, assets, batches, enrollments, attendance, leads, follow-ups, applications, fees, payments, installments, invoices, refunds, questions, assessments, attempts, answers, coding cases, code-reference metadata, live sessions, webinars, certificates, placements, campaigns, messages, notifications, AI conversations, audit events, and global settings.

Provide an ERD, Prisma schema, indexes, constraints, transactions, migrations, synthetic demo data, and backup/restore procedures. Do not use real patient information or real student personal information in sample data.

## 20. UX, accessibility, and security

- Mobile-first responsive design for 360px phones, tablets, laptops, and desktop screens
- WCAG 2.2 AA target, keyboard accessibility, semantic HTML, adequate contrast
- Responsive tables, compact navigation, loading/empty/error states
- MFA for privileged roles; secure sessions; server-side RBAC
- Zod validation, output encoding, rate limiting, secure cookies/headers
- Upload validation, signed media URLs, CSRF protection where applicable
- Payment webhook verification and replay-safe processing
- Audit logs, backups, disaster recovery, retention/deletion workflows
- Indian DPDP privacy considerations and documented consent practices
- No real patient PHI without explicit authorization and a compliant architecture

## 21. SEO, performance, and monitoring

Use metadata, structured data where appropriate, canonical URLs, sitemap, robots.txt, optimized images, caching, Core Web Vitals monitoring, error reporting, structured logging, and meaningful analytics. Keep private dashboard routes excluded from indexing.

## 22. Suggested URL structure

| Route | Purpose |
|---|---|
| `/` | Homepage |
| `/courses` | Course catalog |
| `/courses/[slug]` | Course details |
| `/apply` | Admissions |
| `/webinars` | Webinar catalog |
| `/contact` | Contact and branches |
| `/student` | Student LMS dashboard |
| `/trainer` | Instructor dashboard |
| `/admin` | Admin portal |
| `/crm` | Lead management |
| `/practice` | Coding practice |
| `/mock-exams` | Exam preparation |

Use protected nested routes and permission checks for sensitive portals.

## 23. Vercel deployment

- Configure Git-based deployment to Vercel
- Provide `.env.example` with placeholders only
- Managed PostgreSQL, secure storage, and background job infrastructure
- Development, staging, and production environments
- Database migration workflow and safe rollbacks
- CI for linting, type-checking, unit/integration/e2e tests
- Domain setup for `medicalcodingofficersacademy.com` after approval
- Monitoring, backups, recovery documentation, and secret rotation
- Never commit live credentials or deploy unreviewed destructive changes

## 24. Testing and acceptance criteria

Use strict TypeScript, ESLint, formatting, unit tests, integration tests, and Playwright end-to-end tests.

Test at minimum:

1. Public lead capture and CRM assignment
2. Secure login, role permissions, and cross-branch access restrictions
3. Enrollment, batch assignment, and student portal access
4. LMS progress and protected content access
5. Exam timing, autosave, grading, and analytics
6. Coding case submissions and instructor answer review
7. Razorpay signature verification, idempotent webhooks, and reconciliation
8. Webinar registration and access control
9. Messaging consent, opt-out, and failed-delivery handling
10. Responsive layouts, keyboard accessibility, and error states

No phase is complete without working flows, automated tests, setup documentation, and a reviewable staging deployment.

## 25. Implementation roadmap

### Phase 1 — Foundation, website, and CRM

Brand system, premium homepage, public pages, course catalog, CMS, PostgreSQL schema, authentication, roles, inquiry forms, CRM, initial admin dashboard, SEO, and Vercel staging deployment.

### Phase 2 — Admissions and LMS

Enrollment, batch management, trainer portal, student portal, lessons, recordings, assignments, attendance, progress tracking, certificates, and secure content access.

### Phase 3 — Coding practice and mock exams

Original question bank, mock exams, student analytics, synthetic coding cases, licensed/public reference access, validated E&M calculator, and educational DRG simulator.

### Phase 4 — Payments and academy automation

Razorpay, installment management, invoices, live class scheduling, webinars, official WhatsApp integration, notifications, and placement tracking.

### Phase 5 — AI, landing pages, and optimization

AI counselor and tutor, landing page builder, advanced reporting, performance tuning, accessibility review, security hardening, and production readiness.

## 26. Start now — Antigravity execution instruction

**First**, inspect the existing repository and produce:

1. Architecture and dependency plan
2. Route map and role-based user journeys
3. Database ERD and initial Prisma schema
4. Permission matrix
5. Brand design tokens and component inventory
6. Integration prerequisites and credentials checklist
7. Phased delivery plan with acceptance criteria

**Then implement Phase 1**, beginning with the design system, premium responsive homepage, public course catalog, database-backed inquiry form, authentication, CRM, and working admin dashboard. Add tests and prepare a Vercel staging deployment. Ask for approval before any destructive database operation or production cutover.

**Critical:** Do not claim a feature works until it has been implemented and tested. Clearly report incomplete integrations and licensing dependencies.
