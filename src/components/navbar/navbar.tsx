"use client";

import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import {
  Cancel01Icon,
  FavouriteIcon,
  Globe02Icon,
  Menu01Icon,
  Search01Icon,
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
  },
  {
    href: "/events",
    label: "Events",
  },
  {
    href: "/concerts",
    label: "Concerts",
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
    <div className="sticky top-0 z-60 w-full transition-all duration-300">
      <nav className="relative z-20 flex h-[72px] w-full items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-xl sm:px-6 lg:px-10">
        <div className="flex items-center gap-10">
          <div className="flex items-center">
            <Link
              href="/"
              className="transition-transform duration-200 active:scale-95"
            >
              <EventixLogo className="text-2xl sm:hidden" short />
              <EventixLogo className="hidden sm:block" />
            </Link>
          </div>
          <ul className="mr-2 hidden items-center gap-6 lg:flex">
            {publicLinks.map((link) => (
              <li key={link.href} className="relative">
                <Link
                  className={`group relative py-2 font-medium transition-colors duration-200 ${
                    pathname === link.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  href={link.href}
                >
                  {link.label}
                  <span
                    className={`absolute top-8 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full ${pathname === link.href ? "w-full" : ""}`}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="group 2xl:-translate-x-20 relative flex-1 items-center px-1 sm:mx-auto sm:max-w-md lg:px-0">
          <Input
            placeholder="Search events, artists or venues..."
            className="h-11 w-full rounded-full border-none bg-muted/40 pl-11 shadow-sm ring-offset-background transition-all placeholder:items-center placeholder:font-medium placeholder:text-muted-foreground/60 focus-visible:bg-muted/60 focus-visible:ring-2 focus-visible:ring-primary/20"
          />
          <HugeiconsIcon
            icon={Search01Icon}
            className="-translate-y-1/2 absolute top-1/2 left-4 size-5 text-muted-foreground transition-colors group-focus-within:text-primary"
          />
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="flex size-11 items-center justify-center rounded-full transition-all active:scale-90 lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <HugeiconsIcon
                icon={Cancel01Icon}
                className="size-6 text-foreground"
              />
            ) : (
              <HugeiconsIcon
                icon={Menu01Icon}
                className="size-6 text-foreground"
              />
            )}
          </Button>

          <div className="hidden items-center gap-3 justify-self-end lg:flex">
            <SignedIn>
              {userLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex size-10 items-center justify-center rounded-full transition-all hover:bg-muted active:scale-95"
                >
                  <HugeiconsIcon
                    icon={link.icon}
                    className={`size-6 transition-colors ${pathname === link.href ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                  />
                </Link>
              ))}

              <ProfileDropdown user={user} />
            </SignedIn>
            <SignedOut>
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-muted-foreground hover:text-foreground"
                >
                  <HugeiconsIcon icon={Globe02Icon} className="size-5" />
                </Button>
                <Button
                  className="hover:-translate-y-px rounded-full px-6 font-bold shadow-lg shadow-primary/20 transition-all active:translate-y-0 active:scale-95"
                  asChild
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
