import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const students = await prisma.student.findMany({
      orderBy: {
        rollNo: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      students,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch students.",
      },
      {
        status: 500,
      }
    );
  }
}