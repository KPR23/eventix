import {
  AiSearch02Icon,
  CursorCircleSelection02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type SeatSelectionMethod = "automatic" | "venue";

export default function EventSittingMethodSelector({
  selected,
  setSelected,
}: {
  selected: SeatSelectionMethod;
  setSelected: (selected: SeatSelectionMethod) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid max-h-80 w-full grid-cols-1 gap-4 xl:grid-cols-2">
        <Button
          variant="outline"
          className={cn(
            "flex h-fit min-w-fit flex-col items-start gap-1 border-none p-6",
            selected === "automatic" && "bg-primary/10!",
          )}
          onClick={() => setSelected("automatic")}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex w-full items-center justify-start gap-4 text-left">
              <HugeiconsIcon
                icon={AiSearch02Icon}
                className={`size-7 ${selected === "automatic" && "text-primary"}`}
              />
              <div className="flex flex-col">
                <h2 className="font-bold text-base">
                  Automatic seat selection
                </h2>
                <p className="text-muted-foreground text-sm">{`Pick a price and we’ll choose the best seats`}</p>
              </div>
            </div>
            <div
              className={cn(
                "size-5 rounded-full border border-muted",
                selected === "automatic" && "border-5 border-primary",
              )}
            />
          </div>
        </Button>

        <Button
          variant="outline"
          className={cn(
            "flex h-fit flex-col items-start gap-1 border-none p-6",
            selected === "venue" && "bg-primary/10!",
          )}
          onClick={() => setSelected("venue")}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex w-full items-center justify-start gap-4 text-left">
              <HugeiconsIcon
                icon={CursorCircleSelection02Icon}
                className={`size-7 ${selected === "venue" && "text-primary"}`}
              />
              <div className="flex flex-col">
                <h2 className="font-bold text-base">Venue plan</h2>
                <p className="text-muted-foreground text-sm">{`View the map and choose seats yourself`}</p>
              </div>
            </div>
            <div
              className={cn(
                "size-5 rounded-full border border-muted",
                selected === "venue" && "border-5 border-primary",
              )}
            />
          </div>
        </Button>
      </div>
    </div>
  );
}
