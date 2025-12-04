import type { FullEvent } from "@/types/FullEvent";
import EventLeftCol from "./EventLeftCol";
import EventRightCol from "./EventRightCol";

export default function EventBody({ event }: { event: FullEvent }) {
  return (
    <div className="grid-[1fr_auto] mt-8 flex gap-12">
      <EventLeftCol event={event} />
      <EventRightCol event={event} />
    </div>
  );
}
