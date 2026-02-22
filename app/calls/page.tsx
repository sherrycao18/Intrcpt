"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Call {
  id: string;
  fromNumber: string;
  status: string;
  startedAt: string;
  threatScore?: number;
  tactics?: string[];
}

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function statusBadge(status: string) {
  const classes: Record<string, string> = {
    active: "bg-emerald-500/20 text-emerald-400",
    ended: "bg-zinc-500/20 text-zinc-400",
    blocked: "bg-red-500/20 text-red-400",
    ringing: "bg-amber-500/20 text-amber-400",
  };
  return (
    <span
      className={`rounded px-2 py-0.5 text-xs font-medium ${
        classes[status] ?? "bg-zinc-500/20 text-zinc-400"
      }`}
    >
      {status}
    </span>
  );
}

export default function CallsPage() {
  const [calls, setCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/calls")
      .then((r) => r.json())
      .then(setCalls)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100">
      <nav className="border-b border-zinc-800 px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          intrcpt
        </Link>
      </nav>
      <main className="mx-auto max-w-2xl px-6 py-8">
        <h1 className="text-2xl font-semibold tracking-tight">Calls</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Real-time call screening and scam detection
        </p>

        {loading ? (
          <div className="mt-8 text-zinc-500">Loading calls…</div>
        ) : (
          <ul className="mt-6 space-y-3">
            {calls.map((call) => (
              <li
                key={call.id}
                className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 transition hover:border-zinc-700"
              >
                <Link href={`/live/${call.id}`} className="block">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm">{call.fromNumber}</span>
                    {statusBadge(call.status)}
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-xs text-zinc-500">
                    <span>{formatTime(call.startedAt)}</span>
                    {call.threatScore != null && (
                      <>
                        <span>•</span>
                        <span
                          className={
                            call.threatScore >= 50
                              ? "text-red-400"
                              : "text-zinc-400"
                          }
                        >
                          Threat: {call.threatScore}
                        </span>
                      </>
                    )}
                    {call.tactics != null && call.tactics.length > 0 && (
                      <>
                        <span>•</span>
                        <span className="text-zinc-500">
                          {call.tactics.join(", ")}
                        </span>
                      </>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
