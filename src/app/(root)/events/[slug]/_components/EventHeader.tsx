import type { FullEvent } from "@/types/FullEvent";

export default function EventHeader({ event }: { event: FullEvent }) {
  return (
    <div>
      <h1 className="font-bold font-zalando text-6xl uppercase">
        {event.title}
      </h1>
      <p className="text-muted-foreground">{event.description}</p>
    </div>
  );
}
