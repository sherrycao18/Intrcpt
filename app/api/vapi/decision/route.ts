import { intentAgent, riskAgent, routingAgent } from "@/lib/agents";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      callId,
      fromNumber,
      transcript,
      lastUserMessage,
    } = body as {
      callId?: string;
      fromNumber?: string;
      transcript?: string;
      lastUserMessage?: string;
    };

    const text = typeof transcript === "string" ? transcript : String(transcript ?? "");
    const risk = riskAgent(text);
    const intent = intentAgent(text);
    const routing = routingAgent({
      threat: risk.score,
      category: intent.category,
    });

    const log = {
      threat: risk.score,
      tactics: risk.tactics,
      reason: risk.reason,
    };

    return NextResponse.json({
      action: routing.action,
      nextLine: routing.nextLine,
      blockMessage:
        routing.action === "block"
          ? "This call has been blocked by intrcpt due to detected scam indicators."
          : undefined,
      transferDestination: undefined,
      log,
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
