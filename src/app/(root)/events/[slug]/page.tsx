"use client";

import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import { notFound } from "next/navigation";
import { use } from "react";
import { api } from "@/convex/_generated/api";
import type { FullEvent } from "@/types/FullEvent";
import { EventBody } from "./_components/EventBody";
import { EventHeader } from "./_components/EventHeader";

export default function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const event = useQuery(api.events.getBySlug, { slug });

  if (event === undefined) return <Loader2 />;
  if (event === null) notFound();

  const fullEvent = event as FullEvent;

  return (
    <div className="container mx-auto">
      <EventHeader event={fullEvent} />
      {/* <EventBody event={fullEvent} /> */}
    </div>
  );
}
