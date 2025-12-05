import { useState } from "react";
import type { FullEvent } from "@/types/FullEvent";
import EventAutomaticTickets from "./EventAutomaticTickets";
import EventManualTickets from "./EventManualTickets";
import EventSittingMethodSelector, {
  type SeatSelectionMethod,
} from "./EventSittingMethodSelector";

export default function EventRightCol({ event }: { event: FullEvent }) {
  const [selected, setSelected] = useState<SeatSelectionMethod>("automatic");

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-2xl">1. Select your seat option</h1>
        <EventSittingMethodSelector
          selected={selected}
          setSelected={setSelected}
        />
      </div>
      {selected === "automatic" ? (
        <EventAutomaticTickets event={event} />
      ) : (
        <EventManualTickets />
      )}
    </div>
  );
}
