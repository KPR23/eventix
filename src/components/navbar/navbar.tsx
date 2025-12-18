"use client";

import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import {
  CalendarFavorite01Icon,
  Cancel01Icon,
  FavouriteIcon,
  Folder01Icon,
  Globe02Icon,
  Home07Icon,
  Menu01Icon,
  MusicNote01Icon,
  Search01Icon,
  Ticket01Icon,
  Ticket02Icon,
  Ticket03Icon,
  TicketStarIcon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import EventixLogo from "../EventixLogo";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import MobileMenu from "./mobile-menu";
import ProfileDropdown from "./profile-dropdown";

const publicLinks = [
  {
    href: "/",
    label: "Home",
    icon: Home07Icon,
  },
  {
    href: "/events",
    label: "Events",
    icon: Ticket01Icon,
  },
  {
    href: "/concerts",
    label: "Concerts",
    icon: MusicNote01Icon,
  },
  {
    href: "/categories",
    label: "Categories",
    icon: Folder01Icon,
  },
  // {
  //   href: "/contact",
  //   label: "Contact",
  // },
];

const userLinks = [
  {
    href: "/tickets",
    label: "My Tickets",
    icon: TicketStarIcon,
  },
  {
    href: "/favorites",
    label: "Favorites",
    icon: FavouriteIcon,
  },
  {
    href: "/profile",
    label: "Profile",
    icon: UserIcon,
  },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="sticky top-0 z-60 w-full">
      <nav className="relative z-20 flex h-[72px] w-full items-center justify-between gap-4 border-b bg-sidebar px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-10">
          <div>
            <Link href="/">
              <EventixLogo className="text-2xl sm:hidden" short />
            </Link>
            <Link href="/">
              <EventixLogo className="hidden sm:block" />
            </Link>
          </div>
          <ul className="mr-2 hidden gap-6 lg:flex">
            {publicLinks.map((link) => (
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
        <div className="relative mx-auto flex w-full max-w-md shrink items-center">
          <Input
            placeholder="Search event, artist or venue"
            className="h-10 w-full rounded-full border-none pl-11 placeholder:text-md"
          />
          <HugeiconsIcon
            icon={Search01Icon}
            className="-translate-y-1/2 absolute top-1/2 left-4 size-4 text-foreground"
          />
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="flex size-10 items-center justify-center rounded-full lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <HugeiconsIcon
                icon={Cancel01Icon}
                className="size-6"
                color="var(--muted-foreground)"
              />
            ) : (
              <HugeiconsIcon
                icon={Menu01Icon}
                className="size-6"
                color="var(--muted-foreground)"
              />
            )}
          </Button>
          <div className="hidden items-center gap-2 justify-self-end lg:flex">
            <SignedIn>
              {userLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex size-8 items-center justify-center rounded-full"
                >
                  <HugeiconsIcon
                    icon={link.icon}
                    className="size-6 text-muted-foreground"
                  />
                </Link>
              ))}

              <ProfileDropdown user={user} />
            </SignedIn>
            <SignedOut>
              <div className="flex items-center gap-4">
                <HugeiconsIcon
                  icon={Globe02Icon}
                  className="size-5 text-muted-foreground"
                />
                <Button
                  className="rounded-full border-none"
                  variant={"outline"}
                >
                  <Link href="/sign-in">Sign In</Link>
                </Button>
              </div>
            </SignedOut>
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            pathname={pathname}
            publicLinks={publicLinks}
            userLinks={userLinks}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
