import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    // Get active session
    const session = await prisma.presentationSession.findFirst({
      where: {
        endedAt: null,
      },
    });

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "No active session.",
        },
        { status: 400 }
      );
    }

    // Students already presented
    const presented = await prisma.presentationRecord.findMany({
      where: {
        sessionId: session.id,
      },
      select: {
        studentId: true,
      },
    });

    const presentedIds = presented.map((p) => p.studentId);

    // Available students
    const availableStudents = await prisma.student.findMany({
      where: {
        excluded: false,
        id: {
          notIn: presentedIds,
        },
      },
    });

    if (availableStudents.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No students remaining.",
        },
        { status: 400 }
      );
    }

    // Pick random student
    const randomStudent =
      availableStudents[
        Math.floor(Math.random() * availableStudents.length)
      ];

    return NextResponse.json({
      success: true,
      student: randomStudent,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}