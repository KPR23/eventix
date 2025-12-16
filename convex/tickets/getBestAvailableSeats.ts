import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const getBestAvailableSeats = mutation({
  args: {
    eventId: v.id("events"),
    ticketRequests: v.array(
      v.object({
        ticketTypeId: v.id("ticketTypes"),
        quantity: v.number(),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const event = await ctx.db.get(args.eventId);
    if (!event) throw new Error("Event not found.");

    const venue = await ctx.db.get(event.venue);
    if (!venue) throw new Error("Venue not found.");

    const sold = await ctx.db
      .query("tickets")
      .withIndex("by_event", (q) => q.eq("eventId", args.eventId))
      .collect();

    const taken = new Set(
      sold.map((s) => `${s.seatSector}:${s.seatRow}:${s.seatNumber}`),
    );

    const allSeats = [];
    for (const section of venue.sections) {
      for (let row = 1; row <= section.rows; row++) {
        for (let seat = 1; seat <= section.seatsPerRow; seat++) {
          allSeats.push({
            section: section.name,
            priority: section.priority,
            row,
            seat,
            seatsPerRow: section.seatsPerRow,
            centerDist: Math.abs(seat - (section.seatsPerRow + 1) / 2),
          });
        }
      }
    }

    const available = allSeats.filter(
      (s) => !taken.has(`${s.section}:${s.row}:${s.seat}`),
    );

    available.sort((a, b) => {
      if (a.priority !== b.priority) return a.priority - b.priority;
      if (a.row !== b.row) return a.row - b.row;
      return a.centerDist - b.centerDist;
    });

    const totalRequested = args.ticketRequests.reduce(
      (acc, t) => acc + t.quantity,
      0,
    );

    const selected = available.slice(0, totalRequested);
    if (selected.length < totalRequested)
      throw new Error("Not enough seats available.");

    return { selectedSeats: selected };
  },
});
