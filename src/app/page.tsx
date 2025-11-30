"use client";

import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

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
      Authenticated content
      {events?.map((event) => (
        <div key={event._id}>{event.title}</div>
      ))}
    </div>
  );
}
