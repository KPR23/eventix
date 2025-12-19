import { Add01Icon, Remove01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";

export function CounterButtonsGroup({
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
        <HugeiconsIcon icon={Remove01Icon} />
      </Button>

      <p className="w-8 text-center">{value}</p>

      <Button
        variant="outline"
        className="flex size-10 items-center justify-center border-none"
        onClick={() => onChange(value + 1)}
        disabled={value >= maxTickets}
      >
        <HugeiconsIcon icon={Add01Icon} />
      </Button>
    </div>
  );
}
