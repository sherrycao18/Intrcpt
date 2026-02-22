"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface TranscriptLine {
  role: string;
  text: string;
}

interface RiskResult {
  score: number;
  level: string;
  tactics: string[];
  reason: string;
}

export default function LiveCallPage() {
  const params = useParams();
  const callId = params.callId as string;
  const [transcript, setTranscript] = useState<TranscriptLine[]>([]);
  const [risk, setRisk] = useState<RiskResult | null>(null);
  const [demoRunning, setDemoRunning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const runRiskCheck = useCallback(async (text: string) => {
    const res = await fetch("/api/risk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript: text }),
    });
    const data = await res.json();
    setRisk(data);
  }, []);

  const startDemo = useCallback(async () => {
    setDemoRunning(true);
    setTranscript([]);
    setRisk(null);
    setCurrentIndex(0);
    const res = await fetch("/api/demo/transcript");
    const lines: TranscriptLine[] = await res.json();
    let accumulated = "";
    for (let i = 0; i < lines.length; i++) {
      await new Promise((r) => setTimeout(r, 2000));
      const next = lines[i];
      setTranscript((prev) => [...prev, next]);
      accumulated = [...lines.slice(0, i + 1)]
        .map((l) => l.text)
        .join(" ");
      await runRiskCheck(accumulated);
      setCurrentIndex(i + 1);
    }
    setDemoRunning(false);
  }, [runRiskCheck]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100">
      <nav className="border-b border-zinc-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/calls" className="text-xl font-bold tracking-tight">
            intrcpt
          </Link>
          <Link
            href={`/report/${callId}`}
            className="text-sm text-zinc-500 hover:text-zinc-300"
          >
            Report
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight">
            Live: {callId}
          </h1>
          <button
            onClick={startDemo}
            disabled={demoRunning}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-50"
          >
            {demoRunning ? "Playing…" : "Start Demo"}
          </button>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <section className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <h2 className="text-sm font-medium text-zinc-400">Transcript</h2>
            <div className="mt-3 max-h-64 overflow-y-auto space-y-2">
              {transcript.length === 0 ? (
                <p className="text-sm text-zinc-600">
                  Start the demo to see the transcript.
                </p>
              ) : (
                transcript.map((line, i) => (
                  <div
                    key={i}
                    className={`text-sm ${
                      line.role === "caller"
                        ? "text-amber-400"
                        : "text-zinc-300"
                    }`}
                  >
                    <span className="font-medium">{line.role}:</span> {line.text}
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <h2 className="text-sm font-medium text-zinc-400">Threat</h2>
            {risk ? (
              <div className="mt-3 space-y-3">
                <div className="flex items-baseline gap-2">
                  <span
                    className={`text-2xl font-bold ${
                      risk.score >= 70
                        ? "text-red-400"
                        : risk.score >= 50
                          ? "text-amber-400"
                          : "text-emerald-400"
                    }`}
                  >
                    {risk.score}
                  </span>
                  <span className="text-xs text-zinc-500">{risk.level}</span>
                </div>
                {risk.tactics.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {risk.tactics.map((t) => (
                      <span
                        key={t}
                        className="rounded bg-red-500/20 px-2 py-0.5 text-xs text-red-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-xs text-zinc-500">{risk.reason}</p>
              </div>
            ) : (
              <p className="mt-3 text-sm text-zinc-600">
                Run the demo to see threat scoring.
              </p>
            )}
          </section>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            className="rounded-lg border border-emerald-600 bg-emerald-600/20 px-4 py-2 text-sm font-medium text-emerald-400 hover:bg-emerald-600/30"
            disabled
          >
            Approve
          </button>
          <button
            className="rounded-lg border border-red-600 bg-red-600/20 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-600/30"
            disabled
          >
            Block
          </button>
        </div>
      </main>
    </div>
  );
}
