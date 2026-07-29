import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";

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

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-10 text-center shadow-xl">
        <h1 className="text-4xl font-bold text-purple-500">
          Dashboard
        </h1>

        <p className="mt-4 text-zinc-400">
          Welcome, {email}
        </p>

        <LogoutButton />
        
      </div>
    </main>
  );
}