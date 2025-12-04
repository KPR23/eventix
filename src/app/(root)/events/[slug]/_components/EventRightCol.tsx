import type { FullEvent } from "@/types/FullEvent";
import EventCard from "./EventCard";

export default function EventRightCol({ event }: { event: FullEvent }) {
  return (
    <div className="flex w-full flex-col gap-4">
      <h1 className="font-bold text-2xl">
        {event.children.length > 0 ? "Events" : "Tickets"}
      </h1>
      <EventCard event={event} />
    </div>
  );
}
