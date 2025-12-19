"use client";

import {
  Calendar03Icon,
  Clock01Icon,
  FavouriteIcon,
  Link04Icon,
  Location01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMutation } from "convex/react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import type { FullEvent } from "@/types/FullEvent";

export function EventHeader({ event }: { event: FullEvent }) {
  const toggleFavorite = useMutation(api.events.toggleFavorite);
  const [isCopied, setIsCopied] = useState(false);

  return (
    <div className="mx-4">
      <div className="flex w-full flex-col items-start gap-2 lg:flex-row lg:justify-between">
        <h1 className="font-bold font-zalando text-3xl uppercase md:text-4xl lg:text-5xl">
          {event.title}
        </h1>

        <div className="grid w-full grid-cols-[auto_1px_auto] items-center lg:flex lg:w-fit">
          <Button
            asChild
            className={`h-12 w-full items-center justify-center rounded-none rounded-l-full hover:bg-red-400 hover:text-red-900 lg:w-12 ${event.isFavorite ? "bg-red-500 text-red-950" : "bg-input/30 text-muted-foreground"}`}
            onClick={() => toggleFavorite({ eventId: event._id })}
          >
            <motion.button whileTap={{ scale: 0.9 }}>
              <motion.div
                animate={{ scale: event.isFavorite ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <HugeiconsIcon
                  icon={FavouriteIcon}
                  className="size-5"
                  fill={event.isFavorite ? "currentColor" : "none"}
                />
              </motion.div>
            </motion.button>
          </Button>
          <div className="h-full w-[0.25px] border border-input/40 lg:hidden" />
          <Button
            asChild
            className="h-12 w-full items-center justify-center rounded-none rounded-r-full border-none text-muted-foreground hover:bg-input/30 lg:w-12"
            variant={"outline"}
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setIsCopied(true);
              setTimeout(() => setIsCopied(false), 3000);
            }}
          >
            <motion.button whileTap={{ scale: 0.9 }}>
              <AnimatePresence mode="wait" initial={false}>
                {isCopied ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    <HugeiconsIcon
                      icon={Tick02Icon}
                      className="size-5 text-green-500"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="share"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <HugeiconsIcon icon={Link04Icon} className="size-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </Button>
        </div>
      </div>

      <div className="col-span-2 mt-4 flex w-full flex-wrap items-center gap-2 lg:flex-nowrap lg:gap-0">
        <Link
          href={"/"}
          target="_blank"
          className="w-full sm:w-fit lg:rounded-l-full"
        >
          <Badge
            variant="outline"
            className="flex h-10 w-full items-center justify-center rounded-full font-medium text-base sm:w-fit lg:rounded-none lg:rounded-l-full lg:border-r-0 lg:px-6 lg:pr-6 lg:pl-7"
          >
            {event.type}
          </Badge>
        </Link>

        <div className="grid w-full grid-cols-[1fr_auto] items-center gap-2 lg:flex lg:w-fit lg:gap-0">
          <Badge
            variant="outline"
            className="flex h-10 w-full items-center justify-center gap-2 rounded-full font-medium text-base sm:w-fit lg:rounded-none lg:px-6"
          >
            <HugeiconsIcon
              icon={Calendar03Icon}
              className="size-4 text-muted-foreground"
            />
            <span className="text-muted-foreground">
              {new Date(event.eventStartAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </Badge>

          <Badge
            variant="outline"
            className="flex h-10 w-full items-center justify-center gap-2 rounded-full px-8 font-medium text-base sm:w-fit lg:rounded-none lg:border-x-0 lg:px-6"
          >
            <HugeiconsIcon
              icon={Clock01Icon}
              className="size-4 text-muted-foreground"
            />
            <span className="text-muted-foreground">
              {new Date(event.eventStartAt).toLocaleTimeString("en-GB", {
                hour: "numeric",
                minute: "numeric",
              })}
            </span>
          </Badge>
        </div>
        <Badge
          variant="outline"
          className="flex h-10 w-full items-center justify-center gap-2 rounded-full font-medium text-base sm:w-fit lg:rounded-none lg:rounded-r-full lg:pr-7 lg:pl-6"
        >
          <HugeiconsIcon
            icon={Location01Icon}
            className="size-4 text-muted-foreground"
          />
          <span className="text-muted-foreground">{`${event.venue.name}, ${event.venue.city}`}</span>
        </Badge>
      </div>
    </div>
  );
}
