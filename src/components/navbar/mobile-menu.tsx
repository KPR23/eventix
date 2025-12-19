import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Globe02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { motion } from "framer-motion";
import Link from "next/link";

const containerVariants: any = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
    },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

export function MobileMenu({
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
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute top-full right-0 left-0 z-10 flex h-[calc(100svh-100%)] w-screen flex-col overflow-y-auto bg-background/95 backdrop-blur-xl lg:hidden"
    >
      <div className="flex w-full flex-col p-4 pb-10">
        <div className="px-4 py-2">
          <p className="font-bold text-[10px] text-muted-foreground/60 uppercase tracking-widest">
            Main Menu
          </p>
        </div>

        {publicLinks.map((link) => (
          <motion.div key={link.href} variants={itemVariants}>
            <Link
              href={link.href}
              onClick={onClose}
              className={`flex items-center gap-4 rounded-xl px-4 py-3 font-semibold text-md transition-all active:scale-[0.98] ${
                pathname === link.href
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/80 active:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          </motion.div>
        ))}

        <SignedIn>
          <div className="my-6 px-4">
            <div className="h-px w-full bg-border/50" />
          </div>
          <div className="px-4 py-2">
            <p className="font-bold text-[10px] text-muted-foreground/60 uppercase tracking-widest">
              Your Account
            </p>
          </div>
          <div className="mb-6 flex flex-col">
            {userLinks.map((link) => (
              <motion.div key={link.href} variants={itemVariants}>
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={`flex items-center gap-4 rounded-xl px-4 py-3 font-semibold text-md transition-all active:scale-[0.98] ${
                    pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/80 active:bg-muted"
                  }`}
                >
                  <HugeiconsIcon
                    icon={link.icon}
                    className={`size-6 ${pathname === link.href ? "text-primary" : "text-muted-foreground"}`}
                  />
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </SignedIn>

        <SignedOut>
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 px-2 py-4"
          >
            <Link
              href="/sign-in"
              onClick={onClose}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-4 font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-transform active:scale-[0.98]"
            >
              Sign In
            </Link>
          </motion.div>
        </SignedOut>

        <div className="h-px w-full bg-border/50" />

        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-col gap-6 px-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <p className="font-medium text-muted-foreground text-xs">
                Need help?
              </p>
              <Link
                href="/contact"
                onClick={onClose}
                className="font-bold text-foreground transition-colors hover:text-primary"
              >
                Contact our support
              </Link>
            </div>

            <div className="flex items-center gap-2 rounded-full border bg-muted/30 px-4 py-2 text-muted-foreground">
              <HugeiconsIcon icon={Globe02Icon} className="size-4" />
              <span className="font-bold text-xs uppercase tracking-wider">
                English
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <p className="font-bold text-[10px] text-muted-foreground/40 uppercase tracking-[0.2em]">
              © 2026 EVENTIX - KPR's Lab
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
