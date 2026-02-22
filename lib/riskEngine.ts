import type { RiskResult } from "@/types";

const TACTIC_PATTERNS: Array<{ pattern: RegExp; tactic: string; score: number }> =
  [
    {
      pattern: /\b(irs|tax|federal|sheriff|police|warrant|arrest)\b/i,
      tactic: "authority",
      score: 25,
    },
    {
      pattern:
        /\b(urgent|immediately|right now|within minutes|expire|suspended)\b/i,
      tactic: "urgency",
      score: 20,
    },
    {
      pattern:
        /\b(gift card|bitcoin|crypto|wire transfer|venmo|zelle|paypal)\b/i,
      tactic: "payment_request",
      score: 35,
    },
    {
      pattern:
        /\b(don't tell|keep secret|confidential|between us|trust me)\b/i,
      tactic: "secrecy",
      score: 30,
    },
    {
      pattern: /\b(social security|ssn|account number|routing)\b/i,
      tactic: "credential_request",
      score: 40,
    },
    {
      pattern: /\b(verify|confirm|update your account|suspended)\b/i,
      tactic: "account_verification",
      score: 25,
    },
  ];

export function computeRisk(transcript: string): RiskResult {
  const tactics: string[] = [];
  let totalScore = 0;

  for (const { pattern, tactic, score } of TACTIC_PATTERNS) {
    if (pattern.test(transcript)) {
      if (!tactics.includes(tactic)) {
        tactics.push(tactic);
        totalScore += score;
      }
    }
  }

  const cappedScore = Math.min(100, totalScore);
  let level: RiskResult["level"] = "low";
  if (cappedScore >= 70) level = "critical";
  else if (cappedScore >= 50) level = "high";
  else if (cappedScore >= 25) level = "medium";

  const reason =
    tactics.length > 0
      ? `Detected: ${tactics.join(", ")}`
      : "No high-risk patterns detected";

  return {
    score: cappedScore,
    level,
    tactics,
    reason,
    confidence: tactics.length > 0 ? 0.85 : 0.6,
  };
}
