import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

import DashboardHeader from "@/components/DashboardHeader";
import SpinWheel from "@/components/SpinWheel";
import QuickControls from "@/components/QuickControls";
import ExcludedStudents from "@/components/ExcludedStudents";

export default async function WheelPage() {
  const session = await prisma.presentationSession.findFirst({
    where: {
      endedAt: null,
    },
  });

  if (!session) {
    redirect("/dashboard");
  }

  const students = await prisma.student.findMany({
    where: {
      excluded: false,
    },
    orderBy: {
      rollNo: "asc",
    },
  });

  const excludedStudents = await prisma.student.findMany({
    where: {
      excluded: true,
    },
    orderBy: {
      rollNo: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <DashboardHeader
        title="Presentation Wheel"
        subtitle={`Session #${session.sessionNumber}`}
      />

      <section className="mx-auto max-w-7xl p-8">
        <QuickControls />

        <ExcludedStudents students={excludedStudents} />

        <SpinWheel students={students} />
      </section>
    </main>
  );
}