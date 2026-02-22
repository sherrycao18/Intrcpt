import { computeRisk } from "@/lib/riskEngine";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { transcript } = body as { transcript?: string };
    if (typeof transcript !== "string") {
      return NextResponse.json(
        { error: "transcript must be a string" },
        { status: 400 }
      );
    }
    const result = computeRisk(transcript);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
