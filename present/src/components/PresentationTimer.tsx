"use client";

import { useEffect, useState } from "react";

const DEFAULT_DURATION = 120; // 2 minutes

type Student = {
  id: number;
  rollNo: number;
  name: string;
};

interface PresentationTimerProps {
  open: boolean;
  student: Student | null;
  onFinish: () => void;
  onClose: () => void;
}

export default function PresentationTimer({
  open,
  student,
  onFinish,
  onClose,
}: PresentationTimerProps) {
  const [timeLeft, setTimeLeft] = useState(DEFAULT_DURATION);
  const [isRunning, setIsRunning] = useState(true);


  // Countdown
  useEffect(() => {
    if (!open || !isRunning) return;

    if (timeLeft <= 0) {
      onFinish();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, isRunning, open, onFinish]);

  if (!open || !student) return null;

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <div className="w-full max-w-2xl rounded-2xl bg-zinc-900 p-10 text-center shadow-2xl">

        <h2 className="text-3xl font-bold text-white">
          Presentation In Progress
        </h2>

        <p className="mt-8 text-lg text-zinc-400">
          Roll No.
        </p>

        <h1 className="text-6xl font-bold text-purple-400">
          {student.rollNo}
        </h1>

        <h2 className="mt-4 text-3xl font-semibold text-white">
          {student.name}
        </h2>

        <div className="mt-12">
          <h1 className="font-mono text-8xl font-bold text-white">
            {minutes}:{seconds}
          </h1>
        </div>

        <div className="mt-12 flex justify-center gap-6">

          <button
            onClick={() => setIsRunning((prev) => !prev)}
            className="rounded-lg bg-yellow-500 px-8 py-3 font-semibold text-black hover:bg-yellow-400"
          >
            {isRunning ? "Pause" : "Resume"}
          </button>

          <button
            onClick={onClose}
            className="rounded-lg bg-red-600 px-8 py-3 font-semibold text-white hover:bg-red-500"
          >
            End Presentation
          </button>

        </div>

      </div>
    </div>
  );
}