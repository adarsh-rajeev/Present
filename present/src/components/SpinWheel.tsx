"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import CanvasWheel from "./CanvasWheel";
import Pointer from "./Pointer";
import WinnerModal from "./WinnerModal";
import PresentationTimer from "./PresentationTimer";
import ReviewModal from "./ReviewModal";
import ReviewSuccessModal from "./ReviewSuccessModal";

import useWheelAnimation from "@/hooks/useWheelAnimation";
import { getWheelTargetRotation } from "@/lib/wheelMath";
import { type PresentationStatus } from "@/lib/presentation";

const EXTRA_TURNS = 5;

type Student = {
  id: number;
  rollNo: number;
  name: string;
  currentTopic: string | null;
  excluded?: boolean;
};

interface SpinWheelProps {
  students: Student[];
}

export default function SpinWheel({ students }: SpinWheelProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [student, setStudent] = useState<Student | null>(null);

  const [showWinner, setShowWinner] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [submittedStatus, setSubmittedStatus] =
    useState<PresentationStatus | "">("");

  // Force remounts
  const [timerKey, setTimerKey] = useState(0);
  const [reviewKey, setReviewKey] = useState(0);

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

  async function handleReviewSubmit(
    status: PresentationStatus,
    remarks: string
  ) {
    if (!student) return;

    try {
      const res = await fetch("/api/session/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: student.id,
          status,
          remarks,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to save review.");
        return;
      }

      setSubmittedStatus(status);
      setShowReview(false);
      setShowSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }  return (
    <>
      <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">
        <h2 className="mb-8 text-center text-3xl font-bold">
          🎡 Presentation Wheel
        </h2>

        <div className="flex flex-col items-center rounded-xl bg-zinc-950 py-10">
          <div className="relative">
            <Pointer />
            <CanvasWheel students={students} rotation={rotation} />
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

          setTimerKey((prev) => prev + 1);
          setShowTimer(true);
        }}
      />

      {/* Timer */}
      <PresentationTimer
        key={`timer-${timerKey}`}
        open={showTimer}
        student={student}
        onFinish={() => {
          setShowTimer(false);

          setReviewKey((prev) => prev + 1);
          setShowReview(true);
        }}
        onClose={() => {
          setShowTimer(false);

          setReviewKey((prev) => prev + 1);
          setShowReview(true);
        }}
      />

      {/* Review */}
      <ReviewModal
        key={`review-${reviewKey}`}
        open={showReview}
        student={student}
        onClose={() => setShowReview(false)}
        onSubmit={handleReviewSubmit}
      />

      {/* Success */}
      <ReviewSuccessModal
        open={showSuccess}
        student={student}
        status={submittedStatus}
        onSpinNext={() => {
          setShowSuccess(false);

          setStudent(null);

          setSubmittedStatus("");

          setShowWinner(false);
          setShowTimer(false);
          setShowReview(false);

          router.refresh();
        }}
      />
    </>
  );
}