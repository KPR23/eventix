import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

enum Type {
  Music = "Music",
  Comedy = "Comedy",
  Sports = "Sports",
}

enum SaleStatus {
  Upcoming = "Upcoming",
  OnSale = "OnSale",
  SoldOut = "SoldOut",
}

enum TicketType {
  Standard = "Standard",
  VIP = "VIP",
  EarlyEntrance = "EarlyEntrance",
}

export default defineSchema({
  events: defineTable({
    title: v.string(),
    description: v.string(),
    slug: v.string(),
    participants: v.array(v.string()),

    category: v.string(),
    type: v.union(
      v.literal(Type.Music),
      v.literal(Type.Comedy),
      v.literal(Type.Sports),
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
  })
    .index("by_venue", ["venue"])
    .index("by_user", ["userId"])
    .index("by_category", ["category"])
    .index("by_eventStartAt", ["eventStartAt"]),

  venues: defineTable({
    name: v.string(),
    address: v.string(),
    capacity: v.number(),
    imageUrl: v.string(),
  }).index("by_name", ["name"]),

  ticketTypes: defineTable({
    eventId: v.id("events"),

    name: v.union(
      v.literal(TicketType.Standard),
      v.literal(TicketType.VIP),
      v.literal(TicketType.EarlyEntrance),
    ),
    price: v.number(),
    quantity: v.number(),
    sold: v.number(),

    createdAt: v.number(),
  }).index("by_event", ["eventId"]),

  tickets: defineTable({
    eventId: v.id("events"),
    ticketTypeId: v.id("ticketTypes"),

    userId: v.string(),
    pricePaid: v.number(),
    purchasedAt: v.number(),
  })
    .index("by_event", ["eventId"])
    .index("by_user", ["userId"])
    .index("by_ticketType", ["ticketTypeId"]),
});
