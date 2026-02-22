# intrcpt

Real-time AI call screening. intrcpt intercepts unknown callers, streams transcription, scores scam/manipulation risk, and routes, challenges, or blocks calls.

Built with **Vapi**, **Speechmatics**, **MiniMax**, **Convex**, and **Next.js**.

## Local development

```bash
cp .env.example .env.local
# Add your API keys to .env.local (optional for demo)
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use the **Calls** page to see the mock call list, open a call to run the live demo, and view post-call reports.
