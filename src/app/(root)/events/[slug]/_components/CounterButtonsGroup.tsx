import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CounterButtonsGroup({
  value,
  onChange,
  maxTickets,
}: {
  value: number;
  onChange: (value: number) => void;
  maxTickets: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        disabled={value === 0}
        className="flex size-10 items-center justify-center border-none"
        onClick={() => onChange(value - 1)}
      >
        <Minus />
      </Button>

      <p className="w-8 text-center">{value}</p>

      <Button
        variant="outline"
        className="flex size-10 items-center justify-center border-none"
        onClick={() => onChange(value + 1)}
        disabled={value >= maxTickets}
      >
        <Plus />
      </Button>
    </div>
  );
}
