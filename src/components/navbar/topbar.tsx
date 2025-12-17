import { InformationCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

const links = [
  {
    href: "/sell",
    label: "Sell",
  },
  {
    href: "/help",
    label: "Help",
  },
  {
    href: "/about",
    label: "About",
  },
];

export default function Topbar() {
  const content = "The Weeknd at PGE Narodowy was sold out";

  return (
    <div className="flex w-full justify-center bg-secondary px-4 py-2 font-medium text-muted-foreground md:text-sm lg:grid lg:grid-cols-[1fr_auto_1fr]">
      <div className="hidden lg:block"></div>
      <div className="flex items-center gap-2">
        <HugeiconsIcon
          icon={InformationCircleIcon}
          className="size-5 min-w-5 md:size-4 md:min-w-4"
          strokeWidth={2}
        />
        <p className="block">{content}</p>
      </div>
      <ul className="hidden list-none gap-4 justify-self-end px-10 lg:flex">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
