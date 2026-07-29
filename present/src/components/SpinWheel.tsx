"use client";

import { useState } from "react";

type Student = {
  id: number;
  rollNo: number;
  name: string;
};

export default function SpinWheel() {
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState<Student | null>(null);

  async function spinWheel() {
    setLoading(true);

    try {
      const res = await fetch("/api/session/spin", {
        method: "POST",
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      setStudent(data.student);
    } catch {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">
      <h2 className="mb-8 text-center text-3xl font-bold">
        🎡 Presentation Wheel
      </h2>

      <div className="flex flex-col items-center justify-center rounded-xl bg-zinc-950 py-16">
        <div className="mb-6 text-7xl">🎡</div>

        {student ? (
          <div className="text-center">
            <p className="text-zinc-400">Selected Student</p>

            <h1 className="mt-3 text-6xl font-bold text-purple-500">
              {student.rollNo}
            </h1>

            <p className="mt-3 text-2xl font-semibold">
              {student.name}
            </p>
          </div>
        ) : (
          <p className="text-xl text-zinc-500">
            Press Spin to choose a student
          </p>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={spinWheel}
          disabled={loading}
          className="rounded-xl bg-purple-600 px-10 py-4 text-lg font-bold hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? "Selecting..." : "🎲 Spin Wheel"}
        </button>
      </div>
    </div>
  );
}