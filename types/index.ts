export type CallStatus =
  | "ringing"
  | "active"
  | "challenged"
  | "blocked"
  | "transferred"
  | "ended";

export interface Call {
  id: string;
  fromNumber: string;
  toNumber: string;
  status: CallStatus;
  startedAt: string;
  endedAt?: string;
  threatScore?: number;
  tactics?: string[];
}

export interface TranscriptChunk {
  id: string;
  callId: string;
  role: "caller" | "agent";
  text: string;
  timestamp: string;
  redacted?: boolean;
}

export interface RiskResult {
  score: number;
  level: "low" | "medium" | "high" | "critical";
  tactics: string[];
  reason: string;
  confidence: number;
}

export interface ActionLog {
  id: string;
  callId: string;
  action: "approve" | "block" | "challenge" | "transfer";
  timestamp: string;
  reason?: string;
  metadata?: Record<string, unknown>;
}
