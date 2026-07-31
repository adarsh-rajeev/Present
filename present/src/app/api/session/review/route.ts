import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { studentId, status, remarks } = body;

    if (!studentId || !status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find the active session
    const session = await prisma.presentationSession.findFirst({
      where: {
        endedAt: null,
      },
      orderBy: {
        startedAt: "desc",
      },
    });

    if (!session) {
      return NextResponse.json(
        { error: "No active presentation session" },
        { status: 404 }
      );
    }

    // Fetch the student's current topic
    const student = await prisma.student.findUnique({
      where: {
        id: studentId,
      },
      select: {
        currentTopic: true,
      },
    });

    if (!student) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    // Find the next presentation order
    const count = await prisma.presentationRecord.count({
      where: {
        sessionId: session.id,
      },
    });

    // Save presentation record
    const record = await prisma.presentationRecord.create({
      data: {
        sessionId: session.id,
        studentId,
        presentationOrder: count + 1,

        // Save topic snapshot
        topic: student.currentTopic,

        status,
        remarks,
      },
    });

    // Remove student from future spins
    await prisma.student.update({
      where: {
        id: studentId,
      },
      data: {
        excluded: true,
      },
    });

    return NextResponse.json(record);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to save review" },
      { status: 500 }
    );
  }
}