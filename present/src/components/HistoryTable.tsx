"use client";

import { useMemo, useState } from "react";

type Record = {
  id: number;
  presentationOrder: number;
  topic: string | null;
  remarks: string | null;
  presentedAt: Date | string;
  status: string;
  student: {
    rollNo: number;
    name: string;
  };
};

interface HistoryTableProps {
  records: Record[];
}

export default function HistoryTable({
  records,
}: HistoryTableProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const keyword = search.toLowerCase();

    return records.filter((record) => {
      return (
        record.student.name.toLowerCase().includes(keyword) ||
        record.student.rollNo.toString().includes(keyword) ||
        (record.topic ?? "").toLowerCase().includes(keyword)
      );
    });
  }, [records, search]);

  function statusBadge(status: string) {
    switch (status) {
      case "EXCELLENT":
        return (
          <span className="rounded-full bg-green-600/20 px-3 py-1 text-green-400">
            ⭐ Excellent
          </span>
        );

      case "GOOD":
        return (
          <span className="rounded-full bg-emerald-600/20 px-3 py-1 text-emerald-400">
            🟢 Good
          </span>
        );

      case "AVERAGE":
        return (
          <span className="rounded-full bg-yellow-600/20 px-3 py-1 text-yellow-400">
            🟡 Average
          </span>
        );

      default:
        return (
          <span className="rounded-full bg-red-600/20 px-3 py-1 text-red-400">
            🔴 Needs Improvement
          </span>
        );
    }
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Search by roll number, student name or topic..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 outline-none focus:border-purple-500 md:max-w-md"
        />

        <p className="text-zinc-400">
          Total Records:{" "}
          <span className="font-semibold text-white">
            {filtered.length}
          </span>
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-zinc-800">
        <table className="min-w-full">
          <thead className="bg-zinc-900">
            <tr>
              <th className="p-4 text-left">Order</th>
              <th className="p-4 text-left">Roll No</th>
              <th className="p-4 text-left">Student</th>
              <th className="p-4 text-left">Topic</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Remarks</th>
              <th className="p-4 text-left">Presented At</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((record) => (
              <tr
                key={record.id}
                className="border-t border-zinc-800 hover:bg-zinc-900"
              >
                <td className="p-4">
                  {record.presentationOrder}
                </td>

                <td className="p-4">
                  {record.student.rollNo}
                </td>

                <td className="p-4 font-medium">
                  {record.student.name}
                </td>

                <td className="max-w-sm p-4">
                  {record.topic ? (
                    <span className="break-words text-zinc-200">
                      {record.topic}
                    </span>
                  ) : (
                    <span className="italic text-zinc-500">
                      No topic
                    </span>
                  )}
                </td>

                <td className="p-4">
                  {statusBadge(record.status)}
                </td>

                <td className="max-w-xs p-4">
                  {record.remarks || "—"}
                </td>

                <td className="whitespace-nowrap p-4">
                  {new Date(record.presentedAt).toLocaleString()}
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="p-8 text-center text-zinc-400"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}