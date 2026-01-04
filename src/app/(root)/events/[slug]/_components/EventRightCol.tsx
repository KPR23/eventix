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
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="flex items-center gap-3 font-semibold text-lg lg:text-xl">
          <span className="flex size-7 items-center justify-center rounded-full bg-primary/10 font-bold text-primary text-sm shadow-sm ring-1 ring-primary/20">
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
