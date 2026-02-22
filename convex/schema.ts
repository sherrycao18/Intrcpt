import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  calls: defineTable({
    id: defineTable.id,
    fromNumber: defineTable.string,
    toNumber: defineTable.string,
    status: defineTable.string,
    startedAt: defineTable.number,
    endedAt: defineTable.optional(defineTable.number),
    threatScore: defineTable.optional(defineTable.number),
    tactics: defineTable.optional(defineTable.array(defineTable.string)),
  }),

  transcriptChunks: defineTable({
    callId: defineTable.id,
    role: defineTable.string,
    text: defineTable.string,
    timestamp: defineTable.number,
    redacted: defineTable.optional(defineTable.boolean),
  }),

  scores: defineTable({
    callId: defineTable.id,
    score: defineTable.number,
    level: defineTable.string,
    tactics: defineTable.array(defineTable.string),
    reason: defineTable.string,
    timestamp: defineTable.number,
  }),

  actions: defineTable({
    callId: defineTable.id,
    action: defineTable.string,
    timestamp: defineTable.number,
    reason: defineTable.optional(defineTable.string),
    metadata: defineTable.optional(defineTable.string),
  }),

  settings: defineTable({
    key: defineTable.string,
    value: defineTable.string,
    updatedAt: defineTable.number,
  }),
});
