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

export default defineSchema({
  events: defineTable({
    title: v.string(),
    description: v.string(),
    category: v.string(),
    type: v.union(
      v.literal(Type.Music),
      v.literal(Type.Comedy),
      v.literal(Type.Sports),
    ),
    organizer: v.string(),
    venue: v.id("venues"),

    saleStartAt: v.number(),
    eventStartAt: v.number(),
    eventEndAt: v.number(),

    imageUrl: v.string(),
    price: v.number(),
    ticketsSold: v.number(),
    saleStatus: v.union(
      v.literal(SaleStatus.Upcoming),
      v.literal(SaleStatus.OnSale),
      v.literal(SaleStatus.SoldOut),
    ),

    isPublished: v.boolean(),
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
});
