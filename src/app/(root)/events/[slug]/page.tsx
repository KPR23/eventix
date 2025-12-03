"use client";

import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import { notFound } from "next/navigation";
import { use } from "react";
import type { FullEvent } from "@/types/FullEvent";
import { api } from "../../../../../convex/_generated/api";
import EventHeader from "./_components/EventHeader";

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
    <div className="container mx-auto px-4">
      <EventHeader event={fullEvent} />
    </div>
  );
}
