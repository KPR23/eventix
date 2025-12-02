"use client";

import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function DatePicker() {
  const [range, setRange] = useState<DateRange | undefined>(undefined);

  return (
    <div className="w-full max-w-32 space-y-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="dates"
            className="w-full justify-between rounded-none rounded-l-full font-normal"
          >
            {range?.from && range?.to
              ? range?.from === range?.to
                ? range?.from.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                  })
                : `${range.from.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                  })} - ${range.to.toLocaleDateString("en-US", {
                    day: "numeric",
                  })}`
              : "Date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="range"
            selected={range}
            onSelect={(range) => {
              setRange(range);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
