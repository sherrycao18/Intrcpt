import { NextResponse } from "next/server";

const MOCK_CALLS = [
  {
    id: "call-1",
    fromNumber: "+1 (555) 123-4567",
    toNumber: "+1 (555) 987-6543",
    status: "ended" as const,
    startedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    endedAt: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
    threatScore: 75,
    tactics: ["authority", "urgency", "payment_request"],
  },
  {
    id: "call-2",
    fromNumber: "+1 (555) 234-5678",
    toNumber: "+1 (555) 987-6543",
    status: "active" as const,
    startedAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    threatScore: 15,
    tactics: [],
  },
  {
    id: "call-3",
    fromNumber: "+1 (555) 345-6789",
    toNumber: "+1 (555) 987-6543",
    status: "blocked" as const,
    startedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    endedAt: new Date(Date.now() - 10 * 60 * 1000 + 30000).toISOString(),
    threatScore: 90,
    tactics: ["authority", "urgency", "payment_request", "secrecy"],
  },
];

export async function GET() {
  return NextResponse.json(MOCK_CALLS);
}
