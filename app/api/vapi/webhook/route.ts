import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    // Stub: log webhook payload (in production would persist to Convex)
    console.log("[Vapi Webhook]", JSON.stringify(payload).slice(0, 500));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
