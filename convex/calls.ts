import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("calls").order("desc").take(50);
  },
});

export const get = query({
  args: { id: v.id("calls") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

export const create = mutation({
  args: {
    fromNumber: v.string(),
    toNumber: v.string(),
    status: v.string(),
    startedAt: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("calls", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("calls"),
    status: v.optional(v.string()),
    endedAt: v.optional(v.number()),
    threatScore: v.optional(v.number()),
    tactics: v.optional(v.array(v.string())),
  },
  handler: async (ctx, { id, ...updates }) => {
    await ctx.db.patch(id, updates);
    return id;
  },
});
