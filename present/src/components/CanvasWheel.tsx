"use client";

import { useEffect, useRef } from "react";
import {
  getSliceAngle,
  getSliceCenterAngle,
  getSliceStartAngle,
} from "@/lib/wheelMath";

interface Student {
  id: number;
  rollNo: number;
  name: string;
}

interface CanvasWheelProps {
  students: Student[];
  rotation: number;
}

export default function CanvasWheel({
  students,
  rotation,
}: CanvasWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SIZE = 600;
    const CENTER = SIZE / 2;

    const OUTER = 260;
    const INNER = 120;

    canvas.width = SIZE;
    canvas.height = SIZE;

    ctx.clearRect(0, 0, SIZE, SIZE);

    //----------------------------------
    // ROTATING WHEEL
    //----------------------------------

    ctx.save();

    ctx.translate(CENTER, CENTER);

    ctx.rotate(rotation);

    const slice = getSliceAngle(students.length);

    const colors = [
      "#7C3AED",
      "#8B5CF6",
      "#6366F1",
      "#9333EA",
    ];

    students.forEach((student, index) => {
      const start = getSliceStartAngle(index, students.length) - Math.PI / 2;
      const end = start + slice;

      //----------------------------------
      // Slice
      //----------------------------------

      ctx.beginPath();

      ctx.arc(0, 0, OUTER, start, end);

      ctx.arc(0, 0, INNER, end, start, true);

      ctx.closePath();

      ctx.fillStyle = colors[index % colors.length];
      ctx.fill();

      ctx.lineWidth = 2;
      ctx.strokeStyle = "white";
      ctx.stroke();

      //----------------------------------
      // Roll Number
      //----------------------------------

      const middle = getSliceCenterAngle(index, students.length) - Math.PI / 2;

      const radius = (OUTER + INNER) / 2;

      const x = Math.cos(middle) * radius;
      const y = Math.sin(middle) * radius;

      ctx.save();

      ctx.translate(x, y);

      ctx.rotate(middle + Math.PI / 2);

      ctx.fillStyle = "white";
      ctx.font = "bold 18px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText(student.rollNo.toString(), 0, 0);

      ctx.restore();
    });

    ctx.restore();

    //----------------------------------
    // FIXED HUB
    //----------------------------------

    ctx.beginPath();

    ctx.arc(CENTER, CENTER, INNER - 10, 0, Math.PI * 2);

    ctx.fillStyle = "#FFFFFF";
    ctx.fill();

    ctx.lineWidth = 6;
    ctx.strokeStyle = "#111827";
    ctx.stroke();

    ctx.fillStyle = "#111827";
    ctx.font = "bold 30px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText("PRESENT", CENTER, CENTER - 10);

    ctx.font = "18px Arial";

    ctx.fillText(
      `${students.length} Active`,
      CENTER,
      CENTER + 22
    );
  }, [students, rotation]);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={600}
      className="mx-auto w-full max-w-[600px]"
    />
  );
}