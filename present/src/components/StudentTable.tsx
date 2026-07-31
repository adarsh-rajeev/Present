"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import EditTopicModal from "./EditTopicModal";

type Student = {
  id: number;
  rollNo: number;
  name: string;
  excluded: boolean;
  currentTopic: string | null;
};

type StudentTableProps = {
  students: Student[];
};

export default function StudentTable({
  students,
}: StudentTableProps) {
  const router = useRouter();

  const [selectedStudent, setSelectedStudent] =
    useState<Student | null>(null);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-zinc-700 text-left">
              <th className="p-3">Roll No</th>
              <th className="p-3">Name</th>
              <th className="p-3">Status</th>
              <th className="p-3">Topic</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr
                key={student.id}
                className="border-b border-zinc-800 transition hover:bg-zinc-800"
              >
                <td className="p-3">{student.rollNo}</td>

                <td className="p-3 font-medium">
                  {student.name}
                </td>

                <td className="p-3">
                  {student.excluded ? (
                    <span className="font-medium text-red-400">
                      Excluded
                    </span>
                  ) : (
                    <span className="font-medium text-yellow-400">
                      Available
                    </span>
                  )}
                </td>

                <td className="p-3">
                  {student.currentTopic ? (
                    <span className="text-zinc-200">
                      {student.currentTopic}
                    </span>
                  ) : (
                    <span className="italic text-zinc-500">
                      No topic assigned
                    </span>
                  )}
                </td>

                <td className="p-3 text-center">
                  <button
                    onClick={() => setSelectedStudent(student)}
                    className="rounded-lg bg-purple-600 px-3 py-1 text-sm font-medium transition hover:bg-purple-700"
                  >
                    ✏️ Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedStudent && (
        <EditTopicModal
          studentId={selectedStudent.id}
          studentName={selectedStudent.name}
          currentTopic={selectedStudent.currentTopic}
          onClose={() => setSelectedStudent(null)}
          onSaved={() => {
            setSelectedStudent(null);
            router.refresh();
          }}
        />
      )}
    </>
  );
}