import type { FullEvent } from "@/types/FullEvent";
import { EventLeftCol } from "./EventLeftCol";
import { EventRightCol } from "./EventRightCol";

export function EventBody({ event }: { event: FullEvent }) {
  return (
    <div className="mx-4 flex flex-col gap-12 lg:mx-0 lg:grid lg:grid-cols-[1fr_auto] lg:gap-12">
      <EventLeftCol event={event} />
      <EventRightCol event={event} />
    </div>
  );
}
