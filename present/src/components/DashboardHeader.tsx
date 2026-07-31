import Link from "next/link";
import LogoutButton from "./LogoutButton";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export default function DashboardHeader({
  title,
  subtitle,
}: DashboardHeaderProps) {
  return (
    <header className="border-b border-zinc-800 bg-zinc-900">
      <div className="mx-auto max-w-7xl px-8 py-5">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold text-purple-500">
              {title}
            </h1>

            {subtitle && (
              <p className="mt-1 text-sm text-zinc-400">
                {subtitle}
              </p>
            )}
          </div>

          <LogoutButton />
        </div>

        <nav className="mt-6 flex flex-wrap gap-3">

          <Link
            href="/dashboard"
            className="rounded-lg bg-zinc-800 px-5 py-2 transition hover:bg-zinc-700"
          >
            🏠 Dashboard
          </Link>

          <Link
            href="/dashboard/wheel"
            className="rounded-lg bg-zinc-800 px-5 py-2 transition hover:bg-zinc-700"
          >
            🎡 Wheel
          </Link>

          <Link
            href="/dashboard/history"
            className="rounded-lg bg-zinc-800 px-5 py-2 transition hover:bg-zinc-700"
          >
            📋 History
          </Link>

        </nav>

      </div>
    </header>
  );
}