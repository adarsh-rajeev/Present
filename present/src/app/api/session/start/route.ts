import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const lastSession = await prisma.presentationSession.findFirst({
      orderBy: {
        sessionNumber: "desc",
      },
    });

    const nextSessionNumber = lastSession
      ? lastSession.sessionNumber + 1
      : 1;

    const session = await prisma.presentationSession.create({
      data: {
        sessionNumber: nextSessionNumber,
      },
    });

    return NextResponse.json({
      success: true,
      session,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to start session.",
      },
      {
        status: 500,
      }
    );
  }
}