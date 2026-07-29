import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";
import StudentTable from "@/components/StudentTable";
import { prisma } from "@/lib/prisma";
import StartSessionButton from "@/components/StartSessionButton";
import Link from "next/link";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session) {
    redirect("/");
  }

  const payload = await verifySession(session.value);

  if (!payload) {
    redirect("/");
  }

  const emailValue = (payload as { email?: unknown }).email;
  const email = typeof emailValue === "string" ? emailValue : "Unknown";

  const students = await prisma.student.findMany({
    orderBy: {
      rollNo: "asc",
    },
  });

  const activeSession = await prisma.presentationSession.findFirst({
    where: {
      endedAt: null,
    },
  });

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
          <div>
            <h1 className="text-3xl font-bold text-purple-500">Present</h1>
            <p className="text-sm text-zinc-400">
              Classroom Presentation Manager
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm text-zinc-400">Logged in as</p>
            <p className="font-semibold">{email}</p>

            <div className="mt-3">
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard */}
      <section className="mx-auto max-w-7xl p-8">
        <h2 className="mb-6 text-2xl font-bold">Dashboard</h2>

        {/* Active Session */}
        <div className="mb-6 rounded-xl border border-purple-700 bg-purple-900/30 p-5">
          {activeSession ? (
            <>
              <h2 className="text-xl font-bold">
                🟢 Active Session #{activeSession.sessionNumber}
              </h2>
            
              <p className="mt-2 text-zinc-300">
                Started at {new Date(activeSession.startedAt).toLocaleString()}
              </p>

              <Link
                href="/dashboard/wheel"
                className="mt-4 inline-block rounded-lg bg-purple-600 px-5 py-2 font-semibold hover:bg-purple-700"
              >
                Open Presentation Wheel
              </Link>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold text-yellow-400">
                ⚠ No Active Presentation Session
              </h2>

              <p className="mt-2 text-zinc-300">
                Click the button below to start a new presentation session.
              </p>

              <StartSessionButton />
            </>
          )}
        </div>

        {/* Statistics */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl bg-zinc-900 p-6">
            <p className="text-sm text-zinc-400">Students</p>
            <h3 className="mt-2 text-4xl font-bold">{students.length}</h3>
          </div>

          <div className="rounded-xl bg-zinc-900 p-6">
            <p className="text-sm text-zinc-400">Presented</p>
            <h3 className="mt-2 text-4xl font-bold">0</h3>
          </div>

          <div className="rounded-xl bg-zinc-900 p-6">
            <p className="text-sm text-zinc-400">Remaining</p>
            <h3 className="mt-2 text-4xl font-bold">{students.length}</h3>
          </div>

          <div className="rounded-xl bg-zinc-900 p-6">
            <p className="text-sm text-zinc-400">Excluded</p>
            <h3 className="mt-2 text-4xl font-bold">
              {students.filter((student) => student.excluded).length}
            </h3>
          </div>
        </div>

        {/* Students */}
        <div className="mt-10 rounded-xl bg-zinc-900 p-6">
          <h2 className="mb-6 text-xl font-bold">Students</h2>

          <StudentTable students={students} />
        </div>
      </section>
    </main>
  );
}
