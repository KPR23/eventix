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
import type { FullEvent } from "@/types/FullEvent";
import { api } from "../../../../../../convex/_generated/api";

export default function EventHeader({ event }: { event: FullEvent }) {
  const toggleFavorite = useMutation(api.events.toggleFavorite);
  const [isCopied, setIsCopied] = useState(false);

  return (
    <div className="flex gap-4 md:grid md:grid-cols-[1fr_auto]">
      <h1 className="font-bold font-zalando text-5xl uppercase">
        {event.title}
      </h1>

      <div className="flex items-center justify-self-end">
        <Button
          asChild
          className={`h-12 w-12 rounded-none rounded-l-full hover:bg-red-400 hover:text-red-900 ${event.isFavorite ? "bg-red-500 text-red-950" : "bg-input/30 text-muted-foreground"}`}
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
        <Button
          asChild
          className="h-12 w-12 items-center justify-end rounded-none rounded-r-full border-none text-muted-foreground hover:bg-input/30"
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

      <div className="flex items-center">
        <Link
          href={"/"}
          target="_blank"
          className="rounded-l-full hover:bg-input/30"
        >
          <Badge
            variant="outline"
            className="flex h-10 items-center gap-2 rounded-none rounded-l-full px-6 font-medium text-base"
          >
            {event.type}
          </Badge>
        </Link>

        <Badge
          variant="outline"
          className="flex h-10 items-center gap-2 rounded-none border-x-0 px-6 font-medium text-base"
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
          className="flex h-10 items-center gap-2 rounded-none border-r-0 px-6 font-medium text-base"
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

        <Badge
          variant="outline"
          className="flex h-10 items-center gap-2 rounded-none rounded-r-full px-6 font-medium text-base"
        >
          <HugeiconsIcon
            icon={Location01Icon}
            className="size-4 text-muted-foreground"
          />
          <span className="text-muted-foreground">{event.venue.city}</span>
        </Badge>
      </div>
    </div>
  );
}
