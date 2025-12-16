import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";
import { authenticatedMutation, authenticatedQuery } from "./lib/withUserCtx";
import { OrderStatus } from "./schema";

export const createOrder = authenticatedMutation({
  args: {
    eventId: v.id("events"),
    items: v.array(
      v.object({
        ticketTypeId: v.id("ticketTypes"),
        quantity: v.number(),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const event = await ctx.db.get(args.eventId);
    if (!event) {
      throw new Error("Event not found");
    }

    if (event.saleStatus !== "OnSale") {
      throw new Error("Tickets for this event are not currently on sale");
    }

    const totalRequested = args.items.reduce(
      (acc, item) => acc + item.quantity,
      0,
    );
    if (totalRequested <= 0) {
      throw new Error("You must select at least one ticket.");
    }

    const existingTickets = await ctx.db
      .query("tickets")
      .withIndex("by_user_and_event", (q) =>
        q.eq("userId", ctx.userId).eq("eventId", args.eventId),
      )
      .collect();

    const alreadyOwned = existingTickets.length;
    if (alreadyOwned + totalRequested > event.maxTicketsPerUser) {
      throw new Error("You have reached the ticket limit for this event.");
    }

    let totalAmount = 0;

    const enrichedItems: {
      ticketTypeId: Id<"ticketTypes">;
      quantity: number;
      price: number;
    }[] = [];

    for (const item of args.items) {
      if (item.quantity <= 0) continue;

      const ticketType = await ctx.db.get(item.ticketTypeId);
      if (!ticketType) {
        throw new Error("Ticket type not found");
      }

      const available = ticketType.quantity - ticketType.sold;
      if (item.quantity > available) {
        throw new Error(
          `Not enough tickets available for type ${ticketType.name}. Available: ${available}.`,
        );
      }

      const price = ticketType.price;
      enrichedItems.push({
        ticketTypeId: item.ticketTypeId,
        quantity: item.quantity,
        price,
      });

      totalAmount += price * item.quantity;
    }

    if (enrichedItems.length === 0) {
      throw new Error("No valid items in order.");
    }

    const now = Date.now();

    const orderId = await ctx.db.insert("orders", {
      eventId: args.eventId,
      userId: ctx.userId,
      items: enrichedItems,
      totalAmount,
      status: OrderStatus.PendingPayment,
      createdAt: now,
      updatedAt: now,
    });

    return { orderId, totalAmount };
  },
});

export const getOrder = authenticatedQuery({
  args: { orderId: v.id("orders") },
  handler: async (ctx, { orderId }) => {
    const order = await ctx.db.get(orderId);
    if (!order) throw new Error("Order not found");

    const items = await Promise.all(
      order.items.map(async (item) => {
        const type = await ctx.db.get(item.ticketTypeId);
        return {
          ...item,
          name: type?.name,
          ticketType: type,
        };
      }),
    );

    return { ...order, items };
  },
});
