import type { FullEvent } from "@/types/FullEvent";
import { EventLeftCol } from "./EventLeftCol";
import { EventRightCol } from "./EventRightCol";

export function EventBody({ event }: { event: FullEvent }) {
  return (
    <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1fr_auto] lg:gap-16">
      <EventLeftCol event={event} />
      <EventRightCol event={event} />
    </div>
  );
}
