"use client";

import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import {
  FavouriteIcon,
  Globe02Icon,
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
    <nav className="mb-8 flex min-h-18 w-full items-center justify-between border-foreground-muted border-b px-10 md:grid md:grid-cols-[1fr_1fr_1fr]">
      <div className="flex items-center gap-10 justify-self-start">
        <Link href="/">
          <EventixLogo />
        </Link>
        <ul className="hidden gap-6 md:flex md:justify-self-center">
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
      <div className="relative flex w-full max-w-sm items-center justify-self-center">
        <Input
          placeholder="Search event, artist or venue"
          className="h-10 rounded-full border-none pl-11 placeholder:text-md"
        />
        <HugeiconsIcon
          icon={Search01Icon}
          className="-translate-y-1/2 absolute top-1/2 left-4 size-4 text-foreground"
        />
      </div>
      <div className="hidden items-center justify-end gap-4 md:flex md:justify-self-end">
        <SignedIn>
          <HugeiconsIcon
            icon={TicketStarIcon}
            className="size-5 text-muted-foreground"
          />
          <HugeiconsIcon
            icon={FavouriteIcon}
            className="size-5 text-muted-foreground"
          />
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
