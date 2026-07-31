"use client";

import { useState } from "react";

interface Props {
  studentId: number;
  studentName: string;
  currentTopic: string | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function EditTopicModal({
  studentId,
  studentName,
  currentTopic,
  onClose,
  onSaved,
}: Props) {
  const [topic, setTopic] = useState(currentTopic ?? "");
  const [loading, setLoading] = useState(false);

  async function saveTopic() {
    setLoading(true);

    const res = await fetch("/api/students/topic", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentId,
        currentTopic: topic,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Failed to save topic.");
      return;
    }

    onSaved();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-lg rounded-xl bg-zinc-900 p-6">

        <h2 className="text-2xl font-bold">
          Edit Presentation Topic
        </h2>

        <p className="mt-4 text-zinc-400">
          {studentName}
        </p>

        <textarea
          rows={4}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="mt-4 w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 outline-none focus:border-purple-500"
          placeholder="Enter presentation topic..."
        />

        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-lg bg-zinc-700 px-4 py-2 hover:bg-zinc-600"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={saveTopic}
            className="rounded-lg bg-purple-600 px-4 py-2 hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>

        </div>
      </div>
    </div>
  );
}