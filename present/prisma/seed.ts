import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const students = [
  { rollNo: 1, name: "AANS THOMAS" },
  { rollNo: 2, name: "ABHISHEK A" },
  { rollNo: 3, name: "ADARSH R" },
  { rollNo: 4, name: "ADHITHYAN ANILKUMAR" },
  { rollNo: 5, name: "ADWAITH RATHEESH" },
  { rollNo: 6, name: "ALAN TOM JAMES" },
  { rollNo: 7, name: "ALEENA DENNY" },
  { rollNo: 8, name: "ALEN MATHEW" },
  { rollNo: 9, name: "ALMAZ ELSA SAJI" },
  { rollNo: 10, name: "ALOSHY ANTONY" },
  { rollNo: 11, name: "AMAL BINOY" },
  { rollNo: 12, name: "AMAL JEES GEORGE" },
  { rollNo: 13, name: "ANJANA SHIJI" },
  { rollNo: 14, name: "ANTO BOBAN" },
  { rollNo: 15, name: "ANWIN RAJU GEORGE" },
  { rollNo: 16, name: "ARAVIND ANOJ" },
  { rollNo: 17, name: "AREENA MARIYA SAJI" },
  { rollNo: 18, name: "ARUN P GEORGEKUTTY" },
  { rollNo: 19, name: "BEN ABY GEORGE" },
  { rollNo: 20, name: "BEN SIJO" },
  { rollNo: 21, name: "BINTO BENNY" },
  { rollNo: 22, name: "BREJITH R MATHEW" },
  { rollNo: 23, name: "DEYON MATHEW" },
  { rollNo: 24, name: "ELIZABETH JOBY" },
  { rollNo: 25, name: "FEBIN JOSE PHILIP" },
  { rollNo: 26, name: "FINA SHAJU" },
  { rollNo: 27, name: "FREYA PARVEEN MARIKAR" },
  { rollNo: 28, name: "GEO GIJI" },
  { rollNo: 29, name: "HANAN FATHIMA NS" },
  { rollNo: 30, name: "HARIKRISHNA A J" },
  { rollNo: 31, name: "HARIKRISHNAN M" },
  { rollNo: 32, name: "JACKSON THOMAS" },
  { rollNo: 33, name: "JAKE JOHN" },
  { rollNo: 34, name: "JISSON JAISON" },
  { rollNo: 35, name: "JOEL TOM VARGHESE" },
  { rollNo: 36, name: "JOSHUA JOMON" },
  { rollNo: 37, name: "JOYAL REJI" },
  { rollNo: 38, name: "LEO LENY JOHN" },
  { rollNo: 39, name: "LIYA REJI" },
  { rollNo: 40, name: "MIDHUN JOSE" },
  { rollNo: 41, name: "MIDHUN MATHEW" },
  { rollNo: 42, name: "MILAN ABHILASH" },
  { rollNo: 43, name: "NIDHIN S M" },
  { rollNo: 44, name: "NIMAL SEBASTIAN JOSEPH" },
  { rollNo: 45, name: "NORWIN FATHIMA" },
  { rollNo: 46, name: "NOYAL JOSE BIJOY" },
  { rollNo: 47, name: "P VAISHNAV" },
  { rollNo: 48, name: "PRINCY ELIN MATHEW" },
  { rollNo: 49, name: "RON N PRADEESH" },
  { rollNo: 50, name: "ROSE BRIJIT ABEY" },
  { rollNo: 51, name: "SABARINATH S" },
  { rollNo: 52, name: "SANIYA MARY J" },
  { rollNo: 53, name: "SHONE ABRAHAM" },
  { rollNo: 54, name: "TONY THOMAS" },
  { rollNo: 55, name: "VINEK VINOD" },
];

async function main() {
  const hashedPassword = await bcrypt.hash("teacher123", 10);

  await prisma.teacher.upsert({
    where: {
      email: "teacher@present.com",
    },
    update: {},
    create: {
      email: "teacher@present.com",
      password: hashedPassword,
    },
  });

  for (const student of students) {
    await prisma.student.upsert({
      where: {
        rollNo: student.rollNo,
      },
      update: {
        name: student.name,
        excluded: false,
      },
      create: {
        rollNo: student.rollNo,
        name: student.name,
        excluded: false,
      },
    });
  }

  console.log("✅ Database seeded successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });