import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100">
      <nav className="border-b border-zinc-800 px-6 py-4">
        <span className="text-xl font-bold tracking-tight">intrcpt</span>
      </nav>
      <main className="mx-auto max-w-2xl px-6 py-24">
        <h1 className="text-3xl font-bold tracking-tight">
          Real-time AI call screening
        </h1>
        <p className="mt-4 text-lg text-zinc-400">
          Intercept unknown callers. Stream transcription. Score scam risk.
          Route, challenge, or block.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/calls"
            className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-500"
          >
            Calls
          </Link>
          <Link
            href="/settings"
            className="rounded-lg border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-300 hover:border-zinc-600"
          >
            Settings
          </Link>
        </div>
      </main>
    </div>
  );
}
