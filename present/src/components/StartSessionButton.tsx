"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StartSessionButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function startSession() {
    setLoading(true);

    try {
      const response = await fetch("/api/session/start", {
        method: "POST",
      });

      if (response.ok) {
        router.refresh();
      } else {
        alert("Failed to start session.");
      }
    } catch {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={startSession}
      disabled={loading}
      className="mt-4 rounded-lg bg-purple-600 px-5 py-2 font-semibold text-white transition hover:bg-purple-700 disabled:opacity-50"
    >
      {loading ? "Starting..." : "Start New Session"}
    </button>
  );
}