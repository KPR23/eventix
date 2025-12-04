import {
  Armchair,
  Bot,
  MapPinCheckInside,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { FullEvent } from "@/types/FullEvent";

export default function EventCard({ event }: { event: FullEvent }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="grid max-h-80 w-full grid-cols-2 gap-4">
      <Button
        className={`flex h-full w-full flex-col items-center justify-center gap-4 rounded-xl border-none bg-input/30 py-10 text-foreground ${selected === "automatic" ? "bg-primary text-orange-950" : ""}`}
        onClick={() => setSelected("automatic")}
      >
        <Bot className="size-12" />
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-bold">Automatic seat selection</h1>
          <p
            className={`text-sm ${selected === "automatic" ? "text-orange-950" : "text-muted-foreground"}`}
          >
            Pick a price and we’ll choose the best seats
          </p>
        </div>
      </Button>
      <Button
        className={`flex h-full w-full flex-col items-center justify-center gap-4 rounded-xl border-none bg-input/30 py-10 text-foreground ${selected === "venue" ? "bg-primary text-primary-foreground!" : ""}`}
        onClick={() => setSelected("venue")}
      >
        <MapPinCheckInside className="size-12" />
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-bold">Venue plan</h1>
          <p
            className={`text-sm ${selected === "venue" ? "text-primary-foreground" : "text-muted-foreground"}`}
          >
            View the map and choose seats yourself
          </p>
        </div>
      </Button>
    </div>
  );
}
