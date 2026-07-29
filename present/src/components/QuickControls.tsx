"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function QuickControls() {
  const [rollNo, setRollNo] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function updateStudent(excluded: boolean) {
    if (!rollNo) {
      alert("Enter a roll number.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/students/exclude", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rollNo: Number(rollNo),
          excluded,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      router.refresh();
      setRollNo("");
    } catch {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mb-8 rounded-xl bg-zinc-900 p-6">
      <h2 className="mb-4 text-xl font-bold">Quick Controls</h2>

      <div className="flex flex-wrap items-center gap-3">
        <input
          type="number"
          placeholder="Enter Roll No"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white outline-none focus:border-purple-500"
        />

        <button
          onClick={() => updateStudent(true)}
          disabled={loading}
          className="rounded-lg bg-red-600 px-4 py-2 font-semibold hover:bg-red-700"
        >
          Exclude
        </button>

        <button
          onClick={() => updateStudent(false)}
          disabled={loading}
          className="rounded-lg bg-green-600 px-4 py-2 font-semibold hover:bg-green-700"
        >
          Include
        </button>
      </div>
    </div>
  );
}