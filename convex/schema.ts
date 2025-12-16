import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export enum EventType {
  Music = "Music",
  Comedy = "Comedy",
  Sports = "Sports",
}

export enum SaleStatus {
  Upcoming = "Upcoming",
  OnSale = "OnSale",
  SoldOut = "SoldOut",
}

export enum OrderStatus {
  PendingPayment = "PendingPayment",
  Paid = "Paid",
  Canceled = "Canceled",
}

export enum TicketType {
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
    maxTicketsPerUser: v.number(),
    isFavorite: v.boolean(),
    saleStatus: v.union(
      v.literal(SaleStatus.Upcoming),
      v.literal(SaleStatus.OnSale),
      v.literal(SaleStatus.SoldOut),
    ),

    isPublished: v.boolean(),
    externalLinks: v.array(v.string()),
    parentEventId: v.optional(v.id("events")),
    createdAt: v.number(),
    updatedAt: v.number(),
    userId: v.string(),
  })
    .index("by_slug", ["slug"])
    .index("by_venue", ["venue"])
    .index("by_user", ["userId"])
    .index("by_type", ["type"])
    .index("by_parent", ["parentEventId"])
    .index("by_eventStartAt", ["eventStartAt"])
    .index("by_saleStatus", ["saleStatus"])
    .index("by_type_and_status", ["type", "saleStatus", "eventStartAt"])
    .index("by_published", ["isPublished", "eventStartAt"]),

  venues: defineTable({
    name: v.string(),
    address: v.string(),
    city: v.string(),
    country: v.string(),
    capacity: v.number(),
    imageUrl: v.string(),
  })
    .index("by_name", ["name"])
    .index("by_city", ["city"]),

  ticketTypes: defineTable({
    eventId: v.id("events"),

    name: v.union(
      v.literal(TicketType.Standard),
      v.literal(TicketType.VIP),
      v.literal(TicketType.EarlyEntrance),
    ),
    description: v.string(),
    price: v.number(),
    quantity: v.number(),
    sold: v.number(),

    createdAt: v.number(),
  })
    .index("by_event", ["eventId"])
    .index("by_event_and_name", ["eventId", "name"]),

  tickets: defineTable({
    eventId: v.id("events"),
    ticketTypeId: v.id("ticketTypes"),

    userId: v.string(),
    pricePaid: v.number(),
    purchasedAt: v.number(),

    qrCode: v.string(),
    isUsed: v.boolean(),
    usedAt: v.optional(v.number()),
  })
    .index("by_event", ["eventId"])
    .index("by_user", ["userId"])
    .index("by_ticketType", ["ticketTypeId"])
    .index("by_qrCode", ["qrCode"])
    .index("by_user_and_event", ["userId", "eventId"]),

  orders: defineTable({
    eventId: v.id("events"),
    userId: v.string(),

    items: v.array(
      v.object({
        ticketTypeId: v.id("ticketTypes"),
        quantity: v.number(),
        price: v.number(),
      }),
    ),

    totalAmount: v.number(),
    status: v.union(
      v.literal(OrderStatus.PendingPayment),
      v.literal(OrderStatus.Paid),
      v.literal(OrderStatus.Canceled),
    ),

    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_event", ["eventId"])
    .index("by_status", ["status"]),
});
