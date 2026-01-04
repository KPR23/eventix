import { useState } from "react";
import type { FullEvent } from "@/types/FullEvent";
import { EventAutomaticTickets } from "./EventAutomaticTickets";
import { EventManualTickets } from "./EventManualTickets";
import {
  EventSittingMethodSelector,
  type SeatSelectionMethod,
} from "./EventSittingMethodSelector";

export function EventRightCol({ event }: { event: FullEvent }) {
  const [selected, setSelected] = useState<SeatSelectionMethod>("automatic");
  const [tickets, setTickets] = useState<Record<string, number>>({});

  const updateTicketCount = (ticketId: string, count: number) => {
    if (count > event.maxTicketsPerUser) return;
    setTickets((prev) => ({ ...prev, [ticketId]: count }));
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="flex items-center gap-2 font-semibold text-md lg:text-lg">
          <span className="flex size-6 items-center justify-center rounded-full bg-primary/20 font-bold text-primary text-sm">
            1
          </span>
          Choose your seating option
        </h1>
        <EventSittingMethodSelector
          selected={selected}
          setSelected={setSelected}
        />
      </div>
      {selected === "automatic" ? (
        <EventAutomaticTickets
          event={event}
          tickets={tickets}
          setTickets={updateTicketCount}
        />
      ) : (
        <EventManualTickets />
      )}
    </div>
  );
}
