import { useState } from "react";
import type { FullEvent } from "@/types/FullEvent";
import EventSittingMethodSelector, {
  type SeatSelectionMethod,
} from "./EventSittingMethodSelector";

export default function EventRightCol({ event }: { event: FullEvent }) {
  const [selected, setSelected] = useState<SeatSelectionMethod>("automatic");

  return (
    <div className="flex w-full flex-col gap-4">
      <h1 className="font-bold text-2xl">1. Select your seat option</h1>
      <EventSittingMethodSelector
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  );
}
