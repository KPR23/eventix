import type { FullEvent } from "@/types/FullEvent";
import EventLeftCol from "./EventLeftCol";
import EventRightCol from "./EventRightCol";

export default function EventBody({ event }: { event: FullEvent }) {
  return (
    <div className="mt-8 grid grid-cols-[1fr_auto] gap-12">
      <EventLeftCol event={event} />
      <EventRightCol event={event} />
    </div>
  );
}
