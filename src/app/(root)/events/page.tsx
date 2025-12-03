"use client";

import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function EventsPage() {
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
      <h1 className="font-climate-crisis text-2xl uppercase">Popular events</h1>
      {events?.map((event) => (
        <div key={event._id}>
          {event.title}, {event.type}, {event.venue}, {event.saleStatus},
          {event.eventStartAt}, {event.eventEndAt},{event.maxTicketsPerUser},{" "}
          {event.isPublished}, {event.externalLinks},{event.createdAt},{" "}
          {event.updatedAt}, {event.userId}
        </div>
      ))}
    </div>
  );
}
