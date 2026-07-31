"use client";

type Student = {
  id: number;
  rollNo: number;
  name: string;
  currentTopic: string | null;
};

interface WinnerModalProps {
  open: boolean;
  student: Student | null;
  onClose: () => void;
  onStart: () => void;
}

export default function WinnerModal({
  open,
  student,
  onClose,
  onStart,
}: WinnerModalProps) {
  if (!open || !student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-[450px] rounded-3xl border border-purple-600 bg-zinc-900 p-8 shadow-2xl">
        <div className="text-center">
          <div className="text-6xl">🏆</div>

          <h2 className="mt-4 text-3xl font-bold">
            Presentation Selected
          </h2>

          <p className="mt-8 text-zinc-400">
            Roll Number
          </p>

          <h1 className="text-7xl font-black text-purple-500">
            {student.rollNo}
          </h1>

          <p className="mt-4 text-2xl font-semibold">
            {student.name}
          </p>

          {/* Presentation Topic */}
          <div className="mt-8 rounded-xl border border-purple-700 bg-purple-950/30 p-4 text-left">
            <p className="text-sm font-medium uppercase tracking-wide text-purple-300">
              📚 Presentation Topic
            </p>

            <p className="mt-2 text-lg font-medium text-white">
              {student.currentTopic?.trim()
                ? student.currentTopic
                : "No topic assigned"}
            </p>
          </div>

          <div className="mt-10 flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-zinc-700 py-3 transition hover:bg-zinc-800"
            >
              Close
            </button>

            <button
              onClick={onStart}
              className="flex-1 rounded-xl bg-purple-600 py-3 font-bold transition hover:bg-purple-700"
            >
              Start Presentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}