import { SignedIn, SignedOut } from "@clerk/nextjs";
import {
  FavouriteIcon,
  Globe02Icon,
  TicketStarIcon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function MobileMenu({
  publicLinks,
  userLinks,
  pathname,
  onClose,
}: {
  publicLinks: { href: string; label: string }[];
  userLinks: { href: string; label: string; icon: IconSvgElement }[];
  pathname: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-x-0 top-[112px] bottom-0 z-50 flex max-w-screen flex-col bg-background/95 backdrop-blur-xl lg:hidden"
    >
      <div className="flex w-full flex-col p-4">
        {publicLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className={`flex items-center gap-4 rounded-md px-4 py-3 font-medium text-lg transition-colors active:bg-muted ${
              pathname === link.href
                ? "bg-muted text-primary"
                : "text-foreground/80"
            }`}
          >
            {link.label}
          </Link>
        ))}

        <div className="my-4 h-px bg-border" />

        <SignedIn>
          <div className="flex flex-col">
            {userLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`flex items-center gap-4 rounded-md px-4 py-3 font-medium text-lg transition-colors active:bg-muted ${
                  pathname === link.href
                    ? "bg-muted text-primary"
                    : "text-foreground/80"
                }`}
              >
                <HugeiconsIcon icon={link.icon} className="size-6" />
                {link.label}
              </Link>
            ))}
          </div>
        </SignedIn>

        <SignedOut>
          <div className="flex flex-col gap-4 p-4">
            <Link
              href="/sign-in"
              onClick={onClose}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 font-semibold text-primary-foreground"
            >
              Sign In
            </Link>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <HugeiconsIcon icon={Globe02Icon} className="size-5" />
              <span className="font-medium text-sm">English</span>
            </div>
          </div>
        </SignedOut>
      </div>
    </motion.div>
  );
}
