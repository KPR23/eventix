import { v } from "convex/values";
import { api } from "../_generated/api";
import type { Id } from "../_generated/dataModel";
import { mutation } from "../_generated/server";

export const createTickets = mutation({
  args: {
    eventId: v.id("events"),
    ticketRequests: v.array(
      v.object({
        ticketTypeId: v.id("ticketTypes"),
        quantity: v.number(),
      }),
    ),
  },
  handler: async (ctx, args): Promise<Id<"tickets">[]> => {
    const { selectedSeats } = await ctx.runMutation(
      api.tickets.getBestAvailableSeats.getBestAvailableSeats,
      args,
    );

    const tickets = [];
    let index = 0;

    for (const req of args.ticketRequests) {
      for (let i = 0; i < req.quantity; i++) {
        const seat = selectedSeats[index++];

        const id = await ctx.db.insert("tickets", {
          eventId: args.eventId,
          ticketTypeId: req.ticketTypeId,
          userId: "TODO",
          pricePaid: 0,
          purchasedAt: Date.now(),
          seatSector: seat.section,
          seatRow: String(seat.row),
          seatNumber: String(seat.seat),
          qrCode: "",
          isUsed: false,
        });

        tickets.push(id);
      }
    }

    return tickets;
  },
});
