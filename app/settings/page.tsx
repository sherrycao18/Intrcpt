"use client";

import Link from "next/link";
import { useState } from "react";

export default function SettingsPage() {
  const [storeTranscripts, setStoreTranscripts] = useState(true);
  const [redactPII, setRedactPII] = useState(true);
  const [retentionHours, setRetentionHours] = useState(168); // 7 days

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100">
      <nav className="border-b border-zinc-800 px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          intrcpt
        </Link>
      </nav>

      <main className="mx-auto max-w-2xl px-6 py-8">
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Privacy and call handling preferences
        </p>

        <div className="mt-8 space-y-6">
          <section className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-medium text-zinc-200">Store transcripts</h2>
                <p className="text-sm text-zinc-500">
                  Save call transcripts for reports and review
                </p>
              </div>
              <button
                onClick={() => setStoreTranscripts(!storeTranscripts)}
                className={`h-6 w-11 rounded-full transition ${
                  storeTranscripts ? "bg-emerald-600" : "bg-zinc-700"
                }`}
              >
                <span
                  className={`block h-5 w-5 translate-y-0.5 rounded-full bg-white shadow transition ${
                    storeTranscripts ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </section>

          <section className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-medium text-zinc-200">Redact PII</h2>
                <p className="text-sm text-zinc-500">
                  Mask SSNs, emails, and card numbers in stored data
                </p>
              </div>
              <button
                onClick={() => setRedactPII(!redactPII)}
                className={`h-6 w-11 rounded-full transition ${
                  redactPII ? "bg-emerald-600" : "bg-zinc-700"
                }`}
              >
                <span
                  className={`block h-5 w-5 translate-y-0.5 rounded-full bg-white shadow transition ${
                    redactPII ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </section>

          <section className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <div>
              <h2 className="font-medium text-zinc-200">Retention (hours)</h2>
              <p className="text-sm text-zinc-500">
                How long to keep call data before auto-deletion
              </p>
              <input
                type="number"
                value={retentionHours}
                onChange={(e) =>
                  setRetentionHours(Math.max(0, parseInt(e.target.value, 10) || 0))
                }
                className="mt-2 w-24 rounded border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-200 outline-none focus:border-zinc-600"
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
