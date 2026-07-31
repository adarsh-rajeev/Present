"use client";

import { useState } from "react";
import {
  PRESENTATION_STATUS,
  PRESENTATION_STATUS_LABELS,
  type PresentationStatus,
} from "@/lib/presentation";

type Student = {
  id: number;
  rollNo: number;
  name: string;
};

interface ReviewModalProps {
  open: boolean;
  student: Student | null;
  onSubmit: (
    status: PresentationStatus,
    remarks: string
  ) => void;
  onClose: () => void;
}

export default function ReviewModal({
  open,
  student,
  onSubmit,
  onClose,
}: ReviewModalProps) {
  const [status, setStatus] = useState<PresentationStatus | null>(null);
  const [remarks, setRemarks] = useState("");

  if (!open || !student) return null;

  function handleSubmit() {
    if (!status) {
      alert("Please select a presentation status.");
      return;
    }

    onSubmit(status, remarks.trim());

    // Reset for next presentation
    setStatus(null);
    setRemarks("");
  }

  function handleClose() {
    setStatus(null);
    setRemarks("");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <div className="w-full max-w-xl rounded-2xl bg-zinc-900 p-8 shadow-2xl">

        <h2 className="text-center text-3xl font-bold">
          Presentation Complete
        </h2>

        <div className="mt-8 text-center">
          <p className="text-zinc-400">Roll No.</p>

          <h1 className="text-5xl font-bold text-purple-400">
            {student.rollNo}
          </h1>

          <p className="mt-3 text-2xl font-semibold">
            {student.name}
          </p>
        </div>

        <div className="mt-10">
          <h3 className="mb-4 text-lg font-semibold">
            Presentation Status
          </h3>

          <div className="space-y-3">
            {PRESENTATION_STATUS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setStatus(item)}
                className={`w-full rounded-lg border px-5 py-3 text-left transition ${
                  status === item
                    ? "border-purple-500 bg-purple-600 text-white"
                    : "border-zinc-700 bg-zinc-800 hover:bg-zinc-700"
                }`}
              >
                {PRESENTATION_STATUS_LABELS[item]}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <label className="mb-2 block text-lg font-semibold">
            Remarks (Optional)
          </label>

          <textarea
            rows={4}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Enter remarks..."
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 outline-none focus:border-purple-500"
          />
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg bg-zinc-700 px-6 py-3 hover:bg-zinc-600"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-lg bg-purple-600 px-6 py-3 font-semibold hover:bg-purple-700"
          >
            Submit Review
          </button>
        </div>

      </div>
    </div>
  );
}