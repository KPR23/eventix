"use client";

import { SignInButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import Link from "next/link";
import { api } from "@/convex/_generated/api";

export default function EventsPage() {
  return (
    <>
      <Authenticated>
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
      <h1 className="font-bold font-zalando text-2xl uppercase">
        Popular events
      </h1>
      {events?.map((event) => (
        <Link
          key={event._id}
          href={`/events/${event.slug}`}
          className="flex items-center gap-2"
        >
          {event.title}
        </Link>
      ))}
    </div>
  );
}
