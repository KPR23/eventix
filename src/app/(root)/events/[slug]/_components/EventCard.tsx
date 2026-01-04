import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { FullEvent } from "@/types/FullEvent";

export function EventCard({ event }: { event: FullEvent }) {
  const date = new Date(event.eventStartAt);

  const day = date.toLocaleDateString("en-GB", { day: "numeric" });
  const dayName = date.toLocaleDateString("en-GB", { weekday: "short" });
  const month = date.toLocaleDateString("en-GB", { month: "short" });
  const time = date.toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <Card className="flex h-fit w-full flex-row items-center gap-4 rounded-md p-4">
      <CardHeader className="flex size-14 min-w-14 flex-col items-center justify-center gap-0.5 rounded-sm bg-muted p-2">
        <span className="text-sm uppercase leading-none">{month}</span>
        <span className="font-medium text-lg leading-none">{day}</span>
      </CardHeader>

      <CardContent className="w-full p-0">
        <div className="flex w-full justify-between">
          <div>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              {dayName}
              <span>·</span>
              {time}
            </div>
            <div className="font-medium text-md">
              {event.venue.city}, {event.venue.name}
            </div>
          </div>

          <div className="flex items-center">
            <Button className="flex size-8 items-center justify-center gap-2 rounded-sm lg:w-fit">
              <span className="hidden lg:block">Find Tickets</span>
              <ChevronRight className="" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
