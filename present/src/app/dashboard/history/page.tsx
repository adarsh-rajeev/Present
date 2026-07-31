import { prisma } from "@/lib/prisma";
import DashboardHeader from "@/components/DashboardHeader";
import HistoryTable from "@/components/HistoryTable";

export default async function HistoryPage() {
  const session = await prisma.presentationSession.findFirst({
    where: {
      endedAt: null,
    },
  });

  if (!session) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white">
        <DashboardHeader
          title="Presentation History"
          subtitle="No Active Session"
        />

        <section className="mx-auto max-w-7xl p-8">
          <div className="rounded-xl bg-zinc-900 p-6">
            No active session.
          </div>
        </section>
      </main>
    );
  }

  const records = await prisma.presentationRecord.findMany({
    where: {
      sessionId: session.id,
    },
    include: {
      student: true,
    },
    orderBy: {
      presentationOrder: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <DashboardHeader
        title="Presentation History"
        subtitle={`Session #${session.sessionNumber}`}
      />

      <section className="mx-auto max-w-7xl p-8">
        <HistoryTable records={records} />
      </section>
    </main>
  );
}