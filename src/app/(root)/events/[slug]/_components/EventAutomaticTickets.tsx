import { Card, CardContent, CardTitle } from "@/components/ui/card";
import type { FullEvent } from "@/types/FullEvent";
import CounterButtonsGroup from "./CounterButtonsGroup";

export default function EventAutomaticTickets({
  event,
  tickets,
  setTickets,
}: {
  event: FullEvent;
  tickets: Record<string, number>;
  setTickets: (ticketId: string, count: number) => void;
}) {
  const totalTickets = Object.values(tickets).reduce(
    (acc, curr) => acc + curr,
    0,
  );

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold text-xl">2. Select the number of tickets</h1>
      {event.ticketTypes?.length === 0 ? (
        // TODO: Fix UI
        <p className="text-center text-red-500">
          No ticket types found for this event.
        </p>
      ) : (
        event.ticketTypes.map((ticketType) => {
          const currentCount = tickets[ticketType._id] || 0;
          const remainingTickets = event.maxTicketsPerUser - totalTickets;
          const maxForThisType = currentCount + remainingTickets;

          return (
            <Card className="rounded-md border-none p-6" key={ticketType._id}>
              <CardContent className="flex items-center justify-between">
                <CardTitle>{ticketType.name}</CardTitle>
                <CounterButtonsGroup
                  value={currentCount}
                  onChange={(val) => setTickets(ticketType._id, val)}
                  maxTickets={maxForThisType}
                />
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
}
