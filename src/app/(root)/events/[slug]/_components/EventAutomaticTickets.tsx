import { Button } from "@/components/ui/button";
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
            <Card className="rounded-md border-none p-4" key={ticketType._id}>
              <CardContent className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <CardTitle>{ticketType.name}</CardTitle>
                  <p className="text-muted-foreground text-sm">
                    {ticketType.description}
                  </p>
                </div>
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
      <div className="mt-4 flex justify-end gap-4">
        <Button className="h-12 border-none px-6" variant="outline">
          Cancel
        </Button>
        <Button
          className="flex h-12 items-center gap-2 px-6 font-semibold"
          disabled={totalTickets <= 0}
        >
          Proceed to checkout
          {/* {totalTickets === 0 ? "" : `(${totalTickets})`} */}
        </Button>
      </div>
    </div>
  );
}
