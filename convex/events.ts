import { v } from "convex/values";
import { authenticatedMutation, authenticatedQuery } from "./lib/withUserCtx";
import { EventType, SaleStatus } from "./schema";

export const getAllEvents = authenticatedQuery({
  args: {},
  handler: (ctx) => {
    return ctx.db.query("events").collect();
  },
});

export const getEventById = authenticatedQuery({
  args: {
    eventId: v.id("events"),
  },
  handler: (ctx, args) => {
    return ctx.db.get(args.eventId);
  },
});

export const getBySlug = authenticatedQuery({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const event = await ctx.db
      .query("events")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!event) {
      return null;
    }

    const venue = await ctx.db.get(event.venue);
    const ticketTypes = await ctx.db
      .query("ticketTypes")
      .withIndex("by_event", (q) => q.eq("eventId", event._id))
      .collect();

    return {
      ...event,
      venue,
      ticketTypes,
    };
  },
});

export const createEvent = authenticatedMutation({
  args: {
    title: v.string(),
    description: v.string(),
    slug: v.string(),
    participants: v.array(v.string()),

    category: v.string(),
    type: v.union(
      v.literal(EventType.Music),
      v.literal(EventType.Comedy),
      v.literal(EventType.Sports),
    ),
    organizer: v.string(),
    venue: v.id("venues"),
    ageRestriction: v.number(),

    saleStartAt: v.number(),
    eventStartAt: v.number(),
    eventEndAt: v.number(),

    imageUrl: v.string(),
    price: v.number(),
    ticketsSold: v.number(),
    maxTicketsPerUser: v.number(),
    saleStatus: v.union(
      v.literal(SaleStatus.Upcoming),
      v.literal(SaleStatus.OnSale),
      v.literal(SaleStatus.SoldOut),
    ),

    isPublished: v.boolean(),
    externalLinks: v.array(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
    userId: v.string(),
  },
  handler: async ({ db, userId }, args) => {
    const slug = args.title.toLowerCase().replace(/\s+/g, "-");

    const eventId = await db.insert("events", {
      ...args,

      slug,
      saleStatus: SaleStatus.Upcoming,
      maxTicketsPerUser: args.maxTicketsPerUser,

      userId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return eventId;
  },
});
