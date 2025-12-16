import { ShoppingBagAddIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMutation } from "convex/react";
import { useState } from "react";
import EventixLogo from "@/components/EventixLogo";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import type { FullEvent } from "@/types/FullEvent";
import { api } from "../../../../../../convex/_generated/api";
import type { Id } from "../../../../../../convex/_generated/dataModel";
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
  const getBestAvailableSeats = useMutation(
    api.tickets.getBestAvailableSeats.getBestAvailableSeats,
  );

  const totalTickets = Object.values(tickets).reduce(
    (acc, curr) => acc + curr,
    0,
  );

  const [allocatedSeats, setAllocatedSeats] = useState<
    {
      section: string;
      row: number;
      seat: number;
    }[]
  >([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      const { selectedSeats } = await getBestAvailableSeats({
        eventId: event._id,
        ticketRequests: Object.entries(tickets).map(
          ([ticketTypeId, count]) => ({
            ticketTypeId: ticketTypeId as Id<"ticketTypes">,
            quantity: count,
          }),
        ),
      });
      setAllocatedSeats(selectedSeats);
      setIsDialogOpen(true);
    } catch (error) {
      console.error("Failed to fetch seats:", error);
      // TODO: Handle error nicely
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-medium text-lg">2. Select the number of tickets</h1>
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
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Button
            className="flex h-12 cursor-pointer items-center gap-2 rounded-md bg-primary px-6 font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
            disabled={totalTickets <= 0 || isLoading}
            onClick={handleAddToCart}
          >
            <HugeiconsIcon
              icon={ShoppingBagAddIcon}
              className="size-5"
              strokeWidth={2}
            />
            {isLoading ? "Loading..." : "Add to cart"}
          </Button>
          <AlertDialogContent className="overflow-hidden border-none bg-card p-0">
            <AlertDialogHeader className="flex items-center justify-between">
              <div className="mb-2 flex w-full items-center justify-center bg-primary py-1">
                <EventixLogo
                  className="justify-self-center text-white"
                  fontSize="text-md"
                />
              </div>
              <div className="flex w-full flex-col px-6">
                <AlertDialogTitle>Tickets</AlertDialogTitle>

                <div className="flex flex-col gap-2">
                  {(() => {
                    let seatIndex = 0;
                    return event.ticketTypes.map((type) => {
                      const count = tickets[type._id] || 0;
                      if (count === 0) return null;

                      const seatsForType = allocatedSeats.slice(
                        seatIndex,
                        seatIndex + count,
                      );
                      seatIndex += count;

                      return (
                        <div key={type._id} className="flex flex-col gap-1">
                          <Card className="border-none bg-muted/50">
                            <CardContent className="flex items-center justify-between p-3 text-sm">
                              <span className="font-medium">{type.name}</span>
                              <span className="font-semibold">{count}</span>
                            </CardContent>
                          </Card>
                          {seatsForType.length > 0 && (
                            <div className="pl-4 text-muted-foreground text-xs">
                              {seatsForType.map((seat) => (
                                <div
                                  key={`${seat.section}-${seat.row}-${seat.seat}`}
                                  className="flex gap-2"
                                >
                                  <span>
                                    Section: {seat.section}, Row: {seat.row},
                                    Seat: {seat.seat}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    });
                  })()}
                  <div className="mt-2 flex items-center justify-between border-t pt-2">
                    <p className="font-semibold text-muted-foreground text-sm">
                      Total
                    </p>
                    <p className="font-semibold">{totalTickets}</p>
                  </div>
                </div>
              </div>
            </AlertDialogHeader>
            <AlertDialogFooter className="p-6 pt-0">
              <AlertDialogCancel
                className="border-none"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction className="bg-primary text-primary-foreground">
                Buy tickets
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
