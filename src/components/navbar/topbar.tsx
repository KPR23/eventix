import { CircleAlert } from "lucide-react";
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
  return (
    <div className="grid h-8 w-full grid-cols-3 items-center bg-black px-10 text-sm">
      <div />
      <div className="flex items-center gap-1 justify-self-center text-muted-foreground">
        <CircleAlert className="size-4" /> The Weeknd at PGE Narodowy was sold
        out
      </div>
      <ul className="flex list-none gap-4 justify-self-end">
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
