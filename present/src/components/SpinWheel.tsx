"use client";

import { useState } from "react";
import CanvasWheel from "./CanvasWheel";
import Pointer from "./Pointer";
import WinnerModal from "./WinnerModal";
import PresentationTimer from "./PresentationTimer";
import useWheelAnimation from "@/hooks/useWheelAnimation";
import { getWheelTargetRotation } from "@/lib/wheelMath";

const EXTRA_TURNS = 5;

type Student = {
  id: number;
  rollNo: number;
  name: string;
  excluded?: boolean;
};

interface SpinWheelProps {
  students: Student[];
}

export default function SpinWheel({ students }: SpinWheelProps) {
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState<Student | null>(null);

  const [showWinner, setShowWinner] = useState(false);

  const [showTimer, setShowTimer] = useState(false);

  // Force PresentationTimer to remount for every new presentation
  const [timerKey, setTimerKey] = useState(0);

  const { rotation, spinTo } = useWheelAnimation();

  async function spinWheel() {
    if (loading) return;

    setLoading(true);
    setStudent(null);
    setShowWinner(false);

    try {
      const res = await fetch("/api/session/spin", {
        method: "POST",
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message);
        setLoading(false);
        return;
      }

      // Find the winner in the wheel
      const winnerIndex = students.findIndex(
        (s) => s.id === data.student.id
      );

      if (winnerIndex === -1) {
        alert("Winner not found in wheel.");
        setLoading(false);
        return;
      }

      const finalRotation = getWheelTargetRotation(
        rotation,
        winnerIndex,
        students.length,
        EXTRA_TURNS
      );

      spinTo(finalRotation, 5000, () => {
        setStudent(data.student);
        setShowWinner(true);
        setLoading(false);
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <>
      <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">
        <h2 className="mb-8 text-center text-3xl font-bold">
          🎡 Presentation Wheel
        </h2>

        <div className="flex flex-col items-center rounded-xl bg-zinc-950 py-10">
          <div className="relative">
            <Pointer />
            <CanvasWheel
              students={students}
              rotation={rotation}
            />
          </div>

          <p className="mt-8 text-lg text-zinc-500">
            {loading
              ? "🎡 Spinning..."
              : "Press Spin Wheel to choose a student"}
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={spinWheel}
            disabled={loading}
            className="rounded-xl bg-purple-600 px-10 py-4 text-lg font-bold transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "🎡 Spinning..." : "🎲 Spin Wheel"}
          </button>
        </div>
      </div>

      {/* Winner Modal */}
      <WinnerModal
        open={showWinner}
        student={student}
        onClose={() => setShowWinner(false)}
        onStart={() => {
          setShowWinner(false);

          // Create a brand new timer every presentation
          setTimerKey((prev) => prev + 1);

          setShowTimer(true);
        }}
      />

      {/* Presentation Timer */}
      <PresentationTimer
        key={timerKey}
        open={showTimer}
        student={student}
        onFinish={() => {
          setShowTimer(false);

          // Next step:
          // Open Review Modal
          alert("Presentation Finished!");
        }}
        onClose={() => {
          setShowTimer(false);
        }}
      />
    </>
  );
}