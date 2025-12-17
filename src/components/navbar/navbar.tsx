"use client";

import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import {
  FavouriteIcon,
  Globe02Icon,
  Menu01Icon,
  Search01Icon,
  TicketStarIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import EventixLogo from "../EventixLogo";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ProfileDropdown from "./profile-dropdown";

const links = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/events",
    label: "Events",
  },
  {
    href: "/festivals",
    label: "Festivals",
  },
  {
    href: "/categories",
    label: "Categories",
  },
  // {
  //   href: "/contact",
  //   label: "Contact",
  // },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <nav className="mb-8 box-border grid min-h-18 grid-cols-[auto_1fr_auto] items-center gap-4 border-foreground-muted border-b bg-card px-4 sm:px-6 lg:px-10">
      <div className="lg:flex lg:gap-10">
        <div>
          <Link href="/">
            <EventixLogo className="text-2xl sm:hidden" short />
          </Link>
          <Link href="/">
            <EventixLogo className="hidden sm:block" />
          </Link>
        </div>
        <ul className="mr-2 hidden gap-6 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                className={`font-semibold capitalize hover:text-primary ${pathname === link.href ? "text-foreground" : "text-muted-foreground"}`}
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mx-auto flex w-full max-w-xl shrink items-center">
        <Input
          placeholder="Search event, artist or venue"
          className="h-10 w-full rounded-full border-none pl-11 placeholder:text-md"
        />
        <HugeiconsIcon
          icon={Search01Icon}
          className="-translate-y-1/2 absolute top-1/2 left-4 size-4 text-foreground"
        />
      </div>

      <HugeiconsIcon
        icon={Menu01Icon}
        className="size-6 min-w-6 lg:hidden"
        color="var(--muted-foreground)"
      />

      <div className="hidden items-center gap-2 justify-self-end lg:flex">
        <SignedIn>
          <Button
            variant="ghost"
            className="flex size-8 items-center justify-center rounded-full"
          >
            <HugeiconsIcon
              icon={TicketStarIcon}
              className="size-5 text-muted-foreground"
            />
          </Button>
          <Button
            variant="ghost"
            className="flex size-8 items-center justify-center rounded-full"
          >
            <HugeiconsIcon
              icon={FavouriteIcon}
              className="size-5 text-muted-foreground"
            />
          </Button>
          <ProfileDropdown user={user} />
        </SignedIn>
        <SignedOut>
          <div className="flex items-center gap-4">
            <HugeiconsIcon
              icon={Globe02Icon}
              className="size-5 text-muted-foreground"
            />
            <Button className="rounded-full border-none" variant={"outline"}>
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </div>
        </SignedOut>
      </div>
    </nav>
  );
}
