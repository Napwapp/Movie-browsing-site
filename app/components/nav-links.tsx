import { Home, Info, HeartHandshake } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: Info },
    { name: "Credits", href: "/credits", icon: HeartHandshake },
];
export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-gray-800 transition-colors",
              {
                "nav-active": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="h-5 w-5" />
            <span className="hidden sm:inline">{link.name}</span>
          </Link>
        );
      })}
    </>
  );
}