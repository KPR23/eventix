"use client";

import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function Home() {
  return (
    <>
      <Authenticated>
        <UserButton />
        <Content />
      </Authenticated>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
    </>
  );
}

function Content() {
  const events = useQuery(api.events.getAllEvents);
  return (
    <div>
      {events?.map((event) => (
        <div key={event._id}>
          {event.title}, {event.type}, {event.venue}, {event.saleStatus},
          {event.eventStartAt}, {event.eventEndAt}, {event.ticketsSold},
          {event.maxTicketsPerUser}, {event.isPublished}, {event.externalLinks},
          {event.createdAt}, {event.updatedAt}, {event.userId}
        </div>
      ))}
    </div>
  );
}
