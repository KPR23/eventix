import { v } from "convex/values";
import { query } from "../_generated/server";

export const fetchSoldSeats = query({
  args: { eventId: v.id("events") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("tickets")
      .withIndex("by_event", (q) => q.eq("eventId", args.eventId))
      .collect();
  },
});
