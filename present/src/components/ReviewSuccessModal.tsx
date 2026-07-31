"use client";

import { useRouter } from "next/navigation";

type Student = {
  id: number;
  rollNo: number;
  name: string;
};

interface ReviewSuccessModalProps {
  open: boolean;
  student: Student | null;
  status: string;
  onSpinNext: () => void;
}

export default function ReviewSuccessModal({
  open,
  student,
  status,
  onSpinNext,
}: ReviewSuccessModalProps) {
  const router = useRouter();

  if (!open || !student) return null;

  function getStatusColor() {
    switch (status) {
      case "EXCELLENT":
        return "text-green-400";
      case "GOOD":
        return "text-emerald-400";
      case "AVERAGE":
        return "text-yellow-400";
      default:
        return "text-red-400";
    }
  }

  function getStatusLabel() {
    switch (status) {
      case "EXCELLENT":
        return "⭐ Excellent";
      case "GOOD":
        return "🟢 Good";
      case "AVERAGE":
        return "🟡 Average";
      default:
        return "🔴 Needs Improvement";
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-green-600 bg-zinc-900 p-8 shadow-2xl">

        <div className="text-center">

          <div className="text-6xl">
            ✅
          </div>

          <h2 className="mt-4 text-3xl font-bold">
            Review Submitted
          </h2>

          <p className="mt-2 text-zinc-400">
            The presentation has been saved successfully.
          </p>

          <div className="mt-8 rounded-xl bg-zinc-800 p-5 text-left">

            <p className="text-sm text-zinc-400">
              Student
            </p>

            <p className="mt-1 text-xl font-semibold">
              {student.name}
            </p>

            <p className="text-zinc-400">
              Roll No. {student.rollNo}
            </p>

            <div className="mt-5">

              <p className="text-sm text-zinc-400">
                Status
              </p>

              <p className={`mt-1 text-lg font-semibold ${getStatusColor()}`}>
                {getStatusLabel()}
              </p>

            </div>

          </div>

          <div className="mt-8 space-y-3">

            <button
              onClick={onSpinNext}
              className="w-full rounded-xl bg-purple-600 py-3 text-lg font-semibold transition hover:bg-purple-700"
            >
              🎲 Spin Next Student
            </button>

            <button
              onClick={() => router.push("/dashboard")}
              className="w-full rounded-xl border border-zinc-700 py-3 text-lg font-semibold transition hover:bg-zinc-800"
            >
              🏠 Return to Dashboard
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}