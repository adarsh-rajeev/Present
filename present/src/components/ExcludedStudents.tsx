"use client";

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
    <div className="mb-8 rounded-xl bg-zinc-900 p-6">
      <h2 className="mb-4 text-xl font-bold">
        Excluded Students
      </h2>

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
                className="rounded-lg bg-green-600 px-4 py-2 font-semibold hover:bg-green-700"
              >
                Include
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}