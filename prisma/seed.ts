// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.course.deleteMany({});
  await prisma.savedCollege.deleteMany({});
  await prisma.college.deleteMany({});
  await prisma.user.deleteMany({});

  const hashedPassword = await bcrypt.hash("password123", 10);
  await prisma.user.create({
    data: {
      name: "Interviewer Reviewer",
      email: "reviewer@company.com",
      password: hashedPassword,
    },
  });

  const collegesData = [
    {
      name: "Indian Institute of Technology, Bombay",
      location: "Powai, Mumbai",
      type: "Public",
      fees: 220000,
      overallRating: 4.8,
      nirfRank: 3,
      description: "Recognized universally for its elite engineering research, innovation ecosystems, and exceptional technical placement records.",
      highestPackage: "1.2 CPA",
      averagePackage: "21.8 LPA",
      topRecruiters: ["Google", "Microsoft", "Qualcomm", "Sony"],
      courses: [
        { name: "Computer Science & Engineering", duration: "4 Years", fees: 220000, cutoffRank: 67 },
        { name: "Electrical Engineering", duration: "4 Years", fees: 220000, cutoffRank: 340 }
      ]
    },
    {
      name: "BITS Pilani",
      location: "Pilani, Rajasthan",
      type: "Private",
      fees: 390000,
      overallRating: 4.6,
      nirfRank: 25,
      description: "A premier private institute known for its 'No Reservation' meritocracy policy and a world-renowned alumni network.",
      highestPackage: "60 LPA",
      averagePackage: "18.2 LPA",
      topRecruiters: ["Apple", "Uber", "Goldman Sachs", "Amazon"],
      courses: [
        { name: "Computer Science", duration: "4 Years", fees: 390000, cutoffRank: 320 },
        { name: "Electronics & Communication", duration: "4 Years", fees: 390000, cutoffRank: 640 }
      ]
    },
    {
      name: "Delhi Technological University",
      location: "Rohini, Delhi",
      type: "Public",
      fees: 190000,
      overallRating: 4.4,
      nirfRank: 29,
      description: "Formerly known as Delhi College of Engineering, DTU offers magnificent industry presence and local startup incubation infrastructure.",
      highestPackage: "82 LPA",
      averagePackage: "15.1 LPA",
      topRecruiters: ["Adobe", "Samsung", "McKinsey", "Paytm"],
      courses: [
        { name: "Software Engineering", duration: "4 Years", fees: 190000, cutoffRank: 2400 },
        { name: "Mechanical Engineering", duration: "4 Years", fees: 190000, cutoffRank: 11000 }
      ]
    },
    {
      name: "Indian Institute of Technology, Delhi",
      location: "Hauz Khas, Delhi",
      type: "Public",
      fees: 225000,
      overallRating: 4.9,
      nirfRank: 2,
      description: "A world-class destination for technical engineering and technology fields located right in the heart of the national capital.",
      highestPackage: "1.4 CPA",
      averagePackage: "22.5 LPA",
      topRecruiters: ["Jane Street", "Optiver", "Rubrik", "Cohesity"],
      courses: [
        { name: "Computer Science & Engineering", duration: "4 Years", fees: 225000, cutoffRank: 115 },
        { name: "Mathematics & Computing", duration: "4 Years", fees: 225000, cutoffRank: 310 }
      ]
    },
    {
      name: "National Institute of Technology, Trichy",
      location: "Tiruchirappalli, Tamil Nadu",
      type: "Public",
      fees: 145000,
      overallRating: 4.5,
      nirfRank: 9,
      description: "Consistently ranked as the number one NIT in India, boasting unparalleled infrastructure and academic legacy.",
      highestPackage: "52 LPA",
      averagePackage: "12.8 LPA",
      topRecruiters: ["Texas Instruments", "Morgan Stanley", "Nvidia", "ITC"],
      courses: [
        { name: "Computer Science & Engineering", duration: "4 Years", fees: 145000, cutoffRank: 710 },
        { name: "Electronics & Communication", duration: "4 Years", fees: 145000, cutoffRank: 2100 }
      ]
    },
    {
      name: "Vellore Institute of Technology",
      location: "Vellore, Tamil Nadu",
      type: "Private",
      fees: 198000,
      overallRating: 4.1,
      nirfRank: 11,
      description: "A massive, ultra-modern private university campus widely known for international technical societies and diverse specializations.",
      highestPackage: "44 LPA",
      averagePackage: "8.5 LPA",
      topRecruiters: ["Cognizant", "TCS", "Wipro", "Infosys"],
      courses: [
        { name: "Computer Science & Engineering", duration: "4 Years", fees: 198000, cutoffRank: 8000 },
        { name: "Information Technology", duration: "4 Years", fees: 198000, cutoffRank: 14000 }
      ]
    },
    {
      name: "College of Engineering, Pune",
      location: "Shivajinagar, Pune",
      type: "Public",
      fees: 135000,
      overallRating: 4.3,
      nirfRank: 73,
      description: "One of the oldest engineering colleges in Asia, carrying enormous regional prestige and strong manufacturing tie-ins.",
      highestPackage: "36 LPA",
      averagePackage: "10.2 LPA",
      topRecruiters: ["Tata Motors", "Bajaj Auto", "Siemens", "Mastercard"],
      courses: [
        { name: "Computer Engineering", duration: "4 Years", fees: 135000, cutoffRank: 4500 },
        { name: "Mechanical Engineering", duration: "4 Years", fees: 135000, cutoffRank: 18000 }
      ]
    },
    {
      name: "RV College of Engineering",
      location: "Mysore Road, Bengaluru",
      type: "Private",
      fees: 250000,
      overallRating: 4.2,
      nirfRank: 96,
      description: "The preferred private institution choice in Bengaluru, offering access to India's booming IT hub and core ecosystem companies.",
      highestPackage: "48 LPA",
      averagePackage: "11.4 LPA",
      topRecruiters: ["Cisco", "Intel", "HP", "Akamai"],
      courses: [
        { name: "Computer Science & Engineering", duration: "4 Years", fees: 250000, cutoffRank: 250 },
        { name: "Information Science & Engineering", duration: "4 Years", fees: 250000, cutoffRank: 510 }
      ]
    },
    {
      name: "Netaji Subhas University of Technology",
      location: "Dwarka, Delhi",
      type: "Public",
      fees: 210000,
      overallRating: 4.2,
      nirfRank: 60,
      description: "A state university of Delhi famous for producing world-class tech founders and holding premium campus placement options.",
      highestPackage: "64 LPA",
      averagePackage: "14.5 LPA",
      topRecruiters: ["Salesforce", "Atlassian", "Sprinklr", "De Shaw"],
      courses: [
        { name: "Computer Science & Engineering", duration: "4 Years", fees: 210000, cutoffRank: 3200 },
        { name: "Instrumentation & Control", duration: "4 Years", fees: 210000, cutoffRank: 22000 }
      ]
    }
  ];

  for (const college of collegesData) {
    await prisma.college.create({
      data: {
        name: college.name,
        location: college.location,
        type: college.type,
        fees: college.fees,
        overallRating: college.overallRating,
        nirfRank: college.nirfRank,
        description: college.description,
        highestPackage: college.highestPackage,
        averagePackage: college.averagePackage,
        topRecruiters: college.topRecruiters,
        courses: {
          create: college.courses
        }
      }
    });
  }

  console.log("🚀 Database scaled successfully with 9 additional high-fidelity records!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });