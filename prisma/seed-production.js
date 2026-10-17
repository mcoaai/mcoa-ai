const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- Starting Unified Production Database Seed for MCOA ---');

  // 1. Branches
  const branches = [
    {
      id: "chennai-hq",
      name: "Chennai Head Office",
      code: "CHN-HQ",
      address: "#80/1, 200 Feet Radial Road (Thoraipakkam to Pallavaram), Near A2B Hotel, Narayanapuram Lake, Pallikaranai",
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
      address: "3rd Floor, Annai Hospital, VRM IAS Academy, Near Krishna Theatre",
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
      address: "#52, 5th Cross, TT Nagar, Near Corner Bakery",
      city: "Karaikudi",
      state: "Tamil Nadu",
      postalCode: "600001",
      phone: "+91 8072020716",
      email: "medicalcodingofficers@gmail.com",
      isHeadOffice: false,
    },
  ];

  for (const b of branches) {
    await prisma.branch.upsert({
      where: { code: b.code },
      update: b,
      create: b,
    });
  }
  console.log('✓ Branches seeded.');

  // 2. Roles
  const roles = [
    { name: "Super Admin", description: "Full system administration and oversight" },
    { name: "Branch Admin", description: "Branch-specific administrative operations" },
    { name: "Admissions Counselor", description: "Lead tracking, inquiry resolution, and enrollment" },
    { name: "Academic Coordinator", description: "Curriculum oversight and schedule management" },
    { name: "Trainer / Instructor", description: "Batch instruction, grading, and student monitoring" },
    { name: "Student", description: "Access to LMS, live classes, exams, and certifications" },
    { name: "Placement Officer", description: "Corporate relations, mock interviews, and placements" },
    { name: "Finance Officer", description: "Fee payments, installments, and invoicing" },
  ];

  for (const r of roles) {
    await prisma.role.upsert({
      where: { name: r.name },
      update: r,
      create: r,
    });
  }
  console.log('✓ Roles seeded.');

  // Run Phase 1, Phase 4 and Phase 5 seeds
  console.log('Running base seed modules...');
  const baseSeed = require('./seed.js');
  const phase4Seed = require('./seed-phase4.js');
  const phase5Seed = require('./seed-phase5.js');

  console.log('✅ All production database tables seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Unified Seed Error:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
