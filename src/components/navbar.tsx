import Link from "next/link";

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
    href: "/tickets",
    label: "My tickets",
  },
  {
    href: "/contact",
    label: "Contact",
  },
  {
    href: "/sign-in",
    label: "Sign In",
  },
];

export default function Navbar() {
  return (
    <nav className="mb-10 flex min-h-18 w-full items-center justify-between border-gray-200 border-b px-8">
      <Link className="font-bold text-xl uppercase" href="/">
        Eventix
      </Link>
      <ul className="flex gap-4">
        {links.map((link) => (
          <li key={link.href}>
            <Link className="text-sm" href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
