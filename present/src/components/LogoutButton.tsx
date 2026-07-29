"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/logout", {
      method: "POST",
    });

    router.replace("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="mt-6 rounded-lg bg-red-600 px-6 py-2 font-semibold text-white transition hover:bg-red-700"
    >
      Logout
    </button>
  );
}