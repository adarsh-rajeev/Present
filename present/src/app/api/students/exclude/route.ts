import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET -> Return all excluded students
export async function GET() {
  try {
    const students = await prisma.student.findMany({
      where: {
        excluded: true,
      },
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
        message: "Failed to fetch excluded students.",
      },
      {
        status: 500,
      }
    );
  }
}

// POST -> Exclude / Include a student
export async function POST(req: NextRequest) {
  try {
    const { rollNo, excluded } = await req.json();

    const student = await prisma.student.findUnique({
      where: {
        rollNo: Number(rollNo),
      },
    });

    if (!student) {
      return NextResponse.json(
        {
          success: false,
          message: "Student not found.",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.student.update({
      where: {
        rollNo: Number(rollNo),
      },
      data: {
        excluded,
      },
    });

    return NextResponse.json({
      success: true,
      message: excluded
        ? "Student excluded successfully."
        : "Student included successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}