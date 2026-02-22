import { NextResponse } from "next/server";

/**
 * Demo script that escalates: authority -> urgency -> payment request -> secrecy
 */
const DEMO_SCRIPT = [
  { role: "caller" as const, text: "Hi, this is Officer Martinez from the IRS." },
  {
    role: "caller" as const,
    text: "You have unpaid taxes and we need to resolve this immediately.",
  },
  {
    role: "caller" as const,
    text: "Your account will be suspended within 24 hours if you don't act now.",
  },
  {
    role: "caller" as const,
    text: "You need to pay the balance using gift cards or bitcoin right away.",
  },
  {
    role: "caller" as const,
    text: "Don't tell anyone about this call. Keep it between us for your protection.",
  },
  {
    role: "caller" as const,
    text: "I need your social security number and bank routing number to process the payment.",
  },
];

export async function GET() {
  return NextResponse.json(DEMO_SCRIPT);
}
