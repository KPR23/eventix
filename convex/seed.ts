// convex/seed.ts
import { mutation } from "./_generated/server";
import { EventType, SaleStatus, TicketType } from "./schema";

export const seedData = mutation({
  args: {},
  handler: async (ctx) => {
    // Clear existing data (optional)
    const existingEvents = await ctx.db.query("events").collect();
    for (const event of existingEvents) {
      await ctx.db.delete(event._id);
    }

    const existingVenues = await ctx.db.query("venues").collect();
    for (const venue of existingVenues) {
      await ctx.db.delete(venue._id);
    }

    // Create venues
    const arenaId = await ctx.db.insert("venues", {
      name: "National Stadium",
      address: "123 Stadium Road",
      city: "Warsaw",
      country: "Poland",
      capacity: 50000,
      imageUrl: "https://picsum.photos/800/600?random=1",
    });

    const theaterId = await ctx.db.insert("venues", {
      name: "Comedy Club Downtown",
      address: "456 Laugh Street",
      city: "Krakow",
      country: "Poland",
      capacity: 500,
      imageUrl: "https://picsum.photos/800/600?random=2",
    });

    const concertHallId = await ctx.db.insert("venues", {
      name: "Music Hall Elite",
      address: "789 Melody Avenue",
      city: "Gdansk",
      country: "Poland",
      capacity: 2000,
      imageUrl: "https://picsum.photos/800/600?random=3",
    });

    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;

    // Create events
    const event1 = await ctx.db.insert("events", {
      title: "Rock Festival 2025",
      description:
        "The biggest rock festival of the year featuring top bands from around the world.",
      slug: "rock-festival-2025",
      participants: ["Metallica", "Foo Fighters", "Green Day", "The Killers"],
      type: EventType.Music,
      organizer: "Rock Events Inc.",
      venue: arenaId,
      ageRestriction: 18,
      isFavorite: false,
      saleStartAt: now - 7 * dayMs,
      eventStartAt: now + 30 * dayMs,
      eventEndAt: now + 33 * dayMs,
      imageUrl: "https://picsum.photos/1200/800?random=10",
      maxTicketsPerUser: 4,
      saleStatus: SaleStatus.OnSale,
      isPublished: true,
      externalLinks: [
        "https://facebook.com/rockfest",
        "https://instagram.com/rockfest",
      ],
      createdAt: now - 14 * dayMs,
      updatedAt: now,
      userId: "user_123",
    });

    const event2 = await ctx.db.insert("events", {
      title: "Stand-Up Comedy Night",
      description: "An evening of laughter with the best comedians in Poland.",
      slug: "comedy-night-march",
      participants: ["John Doe", "Jane Smith", "Mike Johnson"],
      type: EventType.Comedy,
      organizer: "Laugh Factory",
      venue: theaterId,
      ageRestriction: 16,
      isFavorite: false,
      saleStartAt: now + 2 * dayMs,
      eventStartAt: now + 15 * dayMs,
      eventEndAt: now + 15 * dayMs + 3 * 60 * 60 * 1000,
      imageUrl: "https://picsum.photos/1200/800?random=11",
      maxTicketsPerUser: 6,
      saleStatus: SaleStatus.Upcoming,
      isPublished: true,
      externalLinks: ["https://twitter.com/comedynight"],
      createdAt: now - 5 * dayMs,
      updatedAt: now,
      userId: "user_123",
    });

    const event3 = await ctx.db.insert("events", {
      title: "Classical Orchestra Evening",
      description:
        "A beautiful evening of classical music performed by the National Orchestra.",
      slug: "classical-orchestra-2025",
      participants: ["National Orchestra", "Conductor: Maria Kowalska"],
      type: EventType.Music,
      isFavorite: false,
      organizer: "Classical Music Society",
      venue: concertHallId,
      ageRestriction: 0,
      saleStartAt: now - 30 * dayMs,
      eventStartAt: now + 7 * dayMs,
      eventEndAt: now + 7 * dayMs + 2 * 60 * 60 * 1000,
      imageUrl: "https://picsum.photos/1200/800?random=12",
      maxTicketsPerUser: 8,
      saleStatus: SaleStatus.SoldOut,
      isPublished: true,
      externalLinks: [],
      createdAt: now - 60 * dayMs,
      updatedAt: now,
      userId: "user_456",
    });

    const event4 = await ctx.db.insert("events", {
      title: "Football Championship Final",
      description: "The ultimate showdown for the national championship.",
      slug: "football-final-2025",
      participants: ["Team A", "Team B"],
      type: EventType.Sports,
      isFavorite: true,
      organizer: "National Football League",
      venue: arenaId,
      ageRestriction: 0,
      saleStartAt: now - 14 * dayMs,
      eventStartAt: now + 45 * dayMs,
      eventEndAt: now + 45 * dayMs + 2 * 60 * 60 * 1000,
      imageUrl: "https://picsum.photos/1200/800?random=13",
      maxTicketsPerUser: 10,
      saleStatus: SaleStatus.OnSale,
      isPublished: true,
      externalLinks: ["https://nfl.pl"],
      createdAt: now - 20 * dayMs,
      updatedAt: now,
      userId: "user_789",
    });

    // Create ticket types for event 1
    await ctx.db.insert("ticketTypes", {
      eventId: event1,
      name: TicketType.Standard,
      price: 199,
      quantity: 30000,
      sold: 15000,
      createdAt: now - 14 * dayMs,
    });

    await ctx.db.insert("ticketTypes", {
      eventId: event1,
      name: TicketType.VIP,
      price: 599,
      quantity: 500,
      sold: 320,
      createdAt: now - 14 * dayMs,
    });

    await ctx.db.insert("ticketTypes", {
      eventId: event1,
      name: TicketType.EarlyEntrance,
      price: 299,
      quantity: 1000,
      sold: 850,
      createdAt: now - 14 * dayMs,
    });

    // Create ticket types for event 2
    await ctx.db.insert("ticketTypes", {
      eventId: event2,
      name: TicketType.Standard,
      price: 79,
      quantity: 400,
      sold: 0,
      createdAt: now - 5 * dayMs,
    });

    await ctx.db.insert("ticketTypes", {
      eventId: event2,
      name: TicketType.VIP,
      price: 199,
      quantity: 50,
      sold: 0,
      createdAt: now - 5 * dayMs,
    });

    // Create ticket types for event 3
    await ctx.db.insert("ticketTypes", {
      eventId: event3,
      name: TicketType.Standard,
      price: 120,
      quantity: 1500,
      sold: 1500,
      createdAt: now - 60 * dayMs,
    });

    await ctx.db.insert("ticketTypes", {
      eventId: event3,
      name: TicketType.VIP,
      price: 350,
      quantity: 100,
      sold: 100,
      createdAt: now - 60 * dayMs,
    });

    // Create ticket types for event 4
    await ctx.db.insert("ticketTypes", {
      eventId: event4,
      name: TicketType.Standard,
      price: 150,
      quantity: 40000,
      sold: 22000,
      createdAt: now - 20 * dayMs,
    });

    await ctx.db.insert("ticketTypes", {
      eventId: event4,
      name: TicketType.VIP,
      price: 499,
      quantity: 200,
      sold: 180,
      createdAt: now - 20 * dayMs,
    });

    return { success: true, message: "Database seeded successfully!" };
  },
});
