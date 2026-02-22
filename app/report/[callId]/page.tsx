"use client";

import { summaryAgent } from "@/lib/agents";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReportPage() {
  const params = useParams();
  const callId = params.callId as string;
  const [summary, setSummary] = useState<{
    summary: string;
    finalThreat: number;
    tactics: string[];
  } | null>(null);

  useEffect(() => {
    const stored = typeof window !== "undefined"
      ? localStorage.getItem(`intrcpt-transcript-${callId}`)
      : null;
    const text =
      stored ??
      "Hi, this is Officer Martinez from the IRS. You have unpaid taxes and we need to resolve this immediately. Your account will be suspended within 24 hours if you don't act now. You need to pay the balance using gift cards or bitcoin right away.";
    const result = summaryAgent(text);
    setSummary(result);
  }, [callId]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100">
      <nav className="border-b border-zinc-800 px-6 py-4">
        <Link href="/calls" className="text-xl font-bold tracking-tight">
          intrcpt
        </Link>
      </nav>

      <main className="mx-auto max-w-2xl px-6 py-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Call Report: {callId}
        </h1>
        <p className="mt-1 text-sm text-zinc-500">Post-call summary</p>

        {summary ? (
          <div className="mt-6 space-y-6">
            <section className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
              <h2 className="text-sm font-medium text-zinc-400">Summary</h2>
              <p className="mt-2 text-sm text-zinc-300">{summary.summary}</p>
            </section>

            <section className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
              <h2 className="text-sm font-medium text-zinc-400">
                Final Threat Score
              </h2>
              <p
                className={`mt-2 text-2xl font-bold ${
                  summary.finalThreat >= 70
                    ? "text-red-400"
                    : summary.finalThreat >= 50
                      ? "text-amber-400"
                      : "text-emerald-400"
                }`}
              >
                {summary.finalThreat}
              </p>
            </section>

            {summary.tactics.length > 0 && (
              <section className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                <h2 className="text-sm font-medium text-zinc-400">
                  Detected Tactics
                </h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {summary.tactics.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-red-500/20 px-2 py-1 text-sm text-red-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        ) : (
          <div className="mt-8 text-zinc-500">Loading report…</div>
        )}

        <Link
          href={`/live/${callId}`}
          className="mt-8 inline-block text-sm text-zinc-500 hover:text-zinc-300"
        >
          ← Back to live view
        </Link>
      </main>
    </div>
  );
}
