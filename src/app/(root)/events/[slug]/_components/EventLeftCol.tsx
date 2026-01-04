import Image from "next/image";
import type { FullEvent } from "@/types/FullEvent";

export function EventLeftCol({ event }: { event: FullEvent }) {
  const imageUrl = "/OWF.webp";
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="relative flex hidden aspect-3/4 flex-col gap-4 lg:block">
        <Image
          src={imageUrl}
          alt={event.title}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-xl"
        />
      </div>
      <p className="hidden text-muted-foreground text-sm lg:block">
        {event.description}
      </p>
    </div>
  );
}
