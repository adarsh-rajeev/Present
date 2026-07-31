"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Student = {
  id: number;
  rollNo: number;
  name: string;
  excluded: boolean;
};

type ExcludedStudentsProps = {
  students: Student[];
};

export default function ExcludedStudents({
  students,
}: ExcludedStudentsProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  async function includeStudent(rollNo: number) {
    try {
      const response = await fetch("/api/students/exclude", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rollNo,
          excluded: false,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      router.refresh();
    } catch {
      alert("Something went wrong.");
    }
  }

  return (
    <div className="mb-8 overflow-hidden rounded-xl bg-zinc-900">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-6 text-left transition hover:bg-zinc-800"
      >
        <div>
          <h2 className="text-xl font-bold">
            Excluded Students
          </h2>

          <p className="mt-1 text-sm text-zinc-400">
            {students.length} excluded
          </p>
        </div>

        <span
          className={`text-2xl transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      <div
        className={`transition-all duration-300 ${
          open ? "max-h-[600px] p-6 pt-0" : "max-h-0"
        } overflow-hidden`}
      >
        {students.length === 0 ? (
          <p className="text-zinc-400">
            No excluded students.
          </p>
        ) : (
          <div className="space-y-3">
            {students.map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between rounded-lg bg-zinc-800 p-4"
              >
                <div>
                  <p className="font-semibold">
                    Roll {student.rollNo}
                  </p>

                  <p className="text-zinc-400">
                    {student.name}
                  </p>
                </div>

                <button
                  onClick={() => includeStudent(student.rollNo)}
                  className="rounded-lg bg-green-600 px-4 py-2 font-semibold transition hover:bg-green-700"
                >
                  Include
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}