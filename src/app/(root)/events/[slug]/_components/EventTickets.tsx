import { useState } from "react";
import type { FullEvent } from "@/types/FullEvent";
import { EventAutomaticTickets } from "./EventAutomaticTickets";
import { EventManualTickets } from "./EventManualTickets";
import {
  EventSittingMethodSelector,
  type SeatSelectionMethod,
} from "./EventSittingMethodSelector";

export function EventTickets({ event }: { event: FullEvent }) {
  const [selected, setSelected] = useState<SeatSelectionMethod>("automatic");
  const [tickets, setTickets] = useState<Record<string, number>>({});

  const updateTicketCount = (ticketId: string, count: number) => {
    if (count > event.maxTicketsPerUser) return;
    setTickets((prev) => ({ ...prev, [ticketId]: count }));
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-medium text-lg">
          <span className="rounded-full bg-primary px-2 py-1 font-semibold text-primary-foreground text-xs">
            1.
          </span>{" "}
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
