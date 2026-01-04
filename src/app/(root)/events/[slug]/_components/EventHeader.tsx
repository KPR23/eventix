"use client";

import {
  Calendar03Icon,
  Clock01Icon,
  FavouriteIcon,
  Link04Icon,
  Location01Icon,
  Share03Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMutation } from "convex/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { EventSaleStatusHelper } from "@/components/EventSaleStatusHelper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { SaleStatus } from "@/convex/schema";
import type { FullEvent } from "@/types/FullEvent";

export function EventHeader({ event }: { event: FullEvent }) {
  const toggleFavorite = useMutation(api.events.toggleFavorite);
  const [isCopied, setIsCopied] = useState(false);
  const imageUrl = "/OWF.webp";

  return (
    <div className="mx-4 lg:mx-0">
      <div className="flex w-full flex-col lg:flex-row lg:items-center lg:justify-between">
        <h1 className="mb-2 text-wrap font-bold font-zalando text-2xl uppercase leading-tight md:text-4xl lg:mb-0 lg:text-5xl">
          {event.title}
        </h1>

        <div className="mb-4 flex w-full items-center gap-2 sm:w-fit lg:rounded-l-full">
          <Link href={"/"} target="_blank">
            <Badge
              variant="outline"
              className="border-none bg-card px-4 py-1 font-medium text-muted-foreground text-sm lg:hidden"
            >
              {event.type}
            </Badge>
          </Link>

          <Badge
            variant="outline"
            className={`border-none px-4 py-1 font-medium text-sm lg:hidden ${
              event.saleStatus === SaleStatus.OnSale
                ? "bg-emerald-500/10 text-emerald-500"
                : event.saleStatus === SaleStatus.SoldOut
                  ? "bg-red-500/10 text-red-500"
                  : "bg-amber-500/10 text-amber-500"
            }`}
          >
            {EventSaleStatusHelper(event.saleStatus)}
          </Badge>
        </div>

        <div className="mb-4 flex w-full flex-col gap-4 lg:hidden lg:w-64">
          <div className="relative aspect-4/3 w-full sm:aspect-video sm:max-w-full">
            <Image
              src={imageUrl}
              alt={event.title}
              fill
              className="rounded-xl object-cover"
            />
          </div>
        </div>
        <div className="grid w-full grid-cols-[1fr_1px_1fr] items-center lg:flex lg:w-fit">
          <Button
            asChild
            className={`h-10 w-full items-center justify-center rounded-none rounded-l-full hover:bg-red-400 hover:text-red-900 lg:w-12 ${event.isFavorite ? "bg-red-500 text-red-950" : "bg-input/30 text-muted-foreground"}`}
            onClick={() => toggleFavorite({ eventId: event._id })}
          >
            <motion.button whileTap={{ scale: 0.9 }}>
              <motion.div
                animate={{ scale: event.isFavorite ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="flex items-center gap-2"
              >
                <HugeiconsIcon
                  icon={FavouriteIcon}
                  className="size-5"
                  fill={event.isFavorite ? "currentColor" : "none"}
                />
                <span
                  className={`text-sm lg:hidden ${event.isFavorite ? "font-semibold" : "font-medium"}`}
                >
                  {event.isFavorite ? "Saved" : "Save"}
                </span>
              </motion.div>
            </motion.button>
          </Button>
          <div className="h-full w-[0.25px] border border-input/40 lg:hidden" />
          <Button
            asChild
            className="h-10 w-full items-center justify-center rounded-none rounded-r-full border-none text-muted-foreground hover:bg-input/30 lg:w-12"
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
                    className="flex items-center gap-2"
                  >
                    <HugeiconsIcon
                      icon={Link04Icon}
                      className="hidden size-5 lg:block"
                    />
                    <HugeiconsIcon
                      icon={Share03Icon}
                      className="size-5 lg:hidden"
                    />
                    <span className="text-sm lg:hidden">
                      {isCopied ? "" : "Share"}
                    </span>
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
          className="hidden w-full sm:w-fit lg:block lg:rounded-l-full"
        >
          <Badge
            variant="outline"
            className="flex h-10 w-full items-center justify-center rounded-full font-medium text-base sm:w-fit lg:rounded-none lg:rounded-l-full lg:border-r-0 lg:px-6 lg:pr-6 lg:pl-7"
          >
            {event.type}
          </Badge>
        </Link>
        <div className="grid w-full grid-cols-[1fr_auto] items-center gap-2 lg:flex lg:w-fit lg:gap-0">
          <Badge className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-card font-medium text-base lg:w-fit lg:rounded-none lg:border lg:border-border lg:bg-transparent lg:px-6">
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

          <Badge className="flex h-10 w-fit items-center justify-center gap-2 rounded-full border-0 bg-card px-6 font-medium text-base lg:rounded-none lg:border-border lg:border-y lg:bg-transparent">
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
          className="flex h-10 w-full items-center justify-center gap-2 rounded-full font-medium text-base lg:w-fit lg:rounded-none lg:rounded-r-full lg:pr-7 lg:pl-6"
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
