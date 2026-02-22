import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  calls: defineTable({
    fromNumber: v.string(),
    toNumber: v.string(),
    status: v.string(),
    startedAt: v.number(),
    endedAt: v.optional(v.number()),
    threatScore: v.optional(v.number()),
    tactics: v.optional(v.array(v.string())),
  }),

  transcriptChunks: defineTable({
    callId: v.id("calls"),
    role: v.string(),
    text: v.string(),
    timestamp: v.number(),
    redacted: v.optional(v.boolean()),
  }),

  scores: defineTable({
    callId: v.id("calls"),
    score: v.number(),
    level: v.string(),
    tactics: v.array(v.string()),
    reason: v.string(),
    timestamp: v.number(),
  }),

  actions: defineTable({
    callId: v.id("calls"),
    action: v.string(),
    timestamp: v.number(),
    reason: v.optional(v.string()),
    metadata: v.optional(v.string()),
  }),

  settings: defineTable({
    key: v.string(),
    value: v.string(),
    updatedAt: v.number(),
  }),
});
