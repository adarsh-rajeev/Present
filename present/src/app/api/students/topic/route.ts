import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest) {
  try {
    const { studentId, currentTopic } = await req.json();

    if (!studentId) {
      return NextResponse.json(
        { error: "Student ID is required." },
        { status: 400 }
      );
    }

    await prisma.student.update({
      where: {
        id: studentId,
      },
      data: {
        currentTopic,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to update topic.",
      },
      {
        status: 500,
      }
    );
  }
}