import { computeRisk } from "@/lib/riskEngine";
import type { RiskResult } from "@/types";

export interface IntentResult {
  category: string;
  intent: string;
}

export function intentAgent(windowText: string): IntentResult {
  const lower = windowText.toLowerCase();
  if (/\b(irs|tax|refund)\b/.test(lower))
    return { category: "tax", intent: "refund_scam" };
  if (/\b(bank|account|verify)\b/.test(lower))
    return { category: "finance", intent: "account_takeover" };
  if (/\b(warrant|arrest|bond)\b/.test(lower))
    return { category: "legal", intent: "impersonation" };
  if (/\b(grandma|grandchild|emergency)\b/.test(lower))
    return { category: "family", intent: "grandparent" };
  return { category: "unknown", intent: "unknown" };
}

export function riskAgent(windowText: string): RiskResult {
  return computeRisk(windowText);
}

export interface RoutingInput {
  threat: number;
  category: string;
}

export interface RoutingResult {
  action: "approve" | "block" | "challenge" | "transfer";
  nextLine: string;
  requiresUserApproval: boolean;
}

export function routingAgent({ threat, category }: RoutingInput): RoutingResult {
  if (threat >= 70)
    return {
      action: "block",
      nextLine: "This call has been blocked due to high scam risk.",
      requiresUserApproval: false,
    };
  if (threat >= 50)
    return {
      action: "challenge",
      nextLine: "Please state your full name and the purpose of this call.",
      requiresUserApproval: true,
    };
  if (threat >= 25 && category !== "unknown")
    return {
      action: "challenge",
      nextLine: "Can you confirm you're calling from a known business?",
      requiresUserApproval: true,
    };
  return {
    action: "approve",
    nextLine: "",
    requiresUserApproval: false,
  };
}

export interface SummaryResult {
  summary: string;
  finalThreat: number;
  tactics: string[];
}

export function summaryAgent(fullText: string): SummaryResult {
  const risk = computeRisk(fullText);
  const lines = fullText.split(/[.!?]+/).filter(Boolean).length;
  const summary = `Call transcript contains ${lines} utterances. ${risk.reason}`;
  return {
    summary,
    finalThreat: risk.score,
    tactics: risk.tactics,
  };
}
