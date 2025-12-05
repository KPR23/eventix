import { Card, CardTitle } from "@/components/ui/card";
import type { FullEvent } from "@/types/FullEvent";

export default function EventAutomaticTickets({ event }: { event: FullEvent }) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold text-2xl">2. Select the number of tickets</h1>
      <Card className="rounded-lg border-none p-6">
        {event.tickets?.map((ticket) => (
          <div key={ticket._id}>{ticket.ticketTypeId}</div>
        ))}
      </Card>
    </div>
  );
}
