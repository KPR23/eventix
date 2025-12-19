import Image from "next/image";
import type { FullEvent } from "@/types/FullEvent";

export function EventLeftCol({ event }: { event: FullEvent }) {
  const imageUrl = "/OWF.webp";
  return (
    <div className="flex min-w-80 max-w-80 flex-col gap-4">
      <div className="relative flex aspect-3/4 flex-col gap-4">
        <Image
          src={imageUrl}
          alt={event.title}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-xl"
        />
      </div>
      <p className="text-muted-foreground text-sm">{event.description}</p>
    </div>
  );
}
