import { Cancel01Icon, ShoppingBagAddIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";
import EventixLogo from "@/components/EventixLogo";
import {
  AlertDialog,
  AlertDialogAction,
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
  const [orderId, setOrderId] = useState<Id<"orders"> | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const createOrder = useMutation(api.orders.createOrder);
  const order = useQuery(api.orders.getOrder, orderId ? { orderId } : "skip");

  const totalTickets = Object.values(tickets).reduce(
    (acc, curr) => acc + curr,
    0,
  );

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      const items = Object.entries(tickets)
        .filter(([, quantity]) => quantity > 0)
        .map(([ticketTypeId, quantity]) => ({
          ticketTypeId: ticketTypeId as Id<"ticketTypes">,
          quantity,
        }));

      if (items.length === 0) {
        toast.error("Wybierz przynajmniej jeden bilet.");
        return;
      }

      const res = await createOrder({
        eventId: event._id,
        items,
      });

      setOrderId(res.orderId);
      setIsDialogOpen(true);
    } catch (error) {
      toast.error("Failed to fetch seats");
      console.error(error);
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
                <div className="mr-8 flex w-full items-center gap-6">
                  <CardTitle>{ticketType.name}</CardTitle>
                  <div className="flex w-full items-center justify-between text-sm">
                    <p className="text-muted-foreground">
                      {ticketType.description}
                    </p>
                    <span className="font-semibold">${ticketType.price}</span>
                  </div>
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
            {isLoading ? "Adding to cart..." : "Add to cart"}
          </Button>
          <AlertDialogContent className="rounded-md border-none bg-card p-0">
            <AlertDialogHeader className="flex items-center justify-between gap-0">
              <div className="my-3 grid w-full grid-cols-[1fr_auto_1fr] items-center justify-center px-4">
                <div></div>

                <div className="flex items-center justify-center gap-2 font-bold font-zalando text-md text-muted-foreground uppercase">
                  <EventixLogo
                    fontSize="text-md"
                    className="relative bottom-[0.6px]"
                  />{" "}
                  order
                </div>

                <Button
                  variant="ghost"
                  className="flex h-6 w-6 items-center justify-center justify-self-end rounded-full"
                  onClick={() => setIsDialogOpen(false)}
                >
                  <HugeiconsIcon icon={Cancel01Icon} />
                </Button>
              </div>
              <div className="mb-4 grid w-full grid-cols-2 border-y bg-secondary px-4">
                <AlertDialogTitle className="flex items-center justify-center border-r py-4 pr-4 font-semibold text-muted-foreground text-sm">
                  {event.title}
                </AlertDialogTitle>
                <div className="flex items-center justify-center py-4 pl-4 font-semibold text-muted-foreground text-sm">
                  {new Date(event.eventStartAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
              <div className="flex w-full flex-col gap-4 px-6">
                {order?.items.map((item) => (
                  <div
                    key={item.ticketTypeId}
                    className="flex justify-between text-sm"
                  >
                    <p className="font-medium">
                      {item.quantity > 1 ? `${item.quantity}x ` : ""}
                      {item.name}
                    </p>
                    <p className="font-semibold">${item.price}</p>
                  </div>
                ))}

                <div className="mt-4 flex items-center justify-between border-t pt-4">
                  <p className="font-semibold text-base">Total</p>
                  <p className="font-bold text-lg">${order?.totalAmount}</p>
                </div>
              </div>
            </AlertDialogHeader>
            <AlertDialogFooter className="p-6 pt-0">
              <AlertDialogAction className="flex w-full items-center justify-center bg-primary py-6 font-bold text-md text-primary-foreground">
                Buy tickets
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
