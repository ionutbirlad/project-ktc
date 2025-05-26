"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import ThemeToggle from "@/components/custom/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-[95vw] sm:max-w-[600px] overflow-hidden rounded-full bg-background shadow-lg border px-4 py-3 backdrop-blur-md group">
      <div className="flex items-center gap-4 sm:gap-6 justify-between">
        {/* Logo */}
        <span className="text-sm sm:text-base font-bold tracking-tight text-muted-foreground hover:text-foreground transition whitespace-nowrap">
          KTC
        </span>

        {/* Separator */}
        <Separator orientation="vertical" className="h-6" />

        {/* Links */}
        <div className="origin-bottom scale-100 sm:scale-95 xs:scale-90 transition-transform duration-300 overflow-hidden">
          <nav className="flex flex-nowrap items-center space-x-3 sm:space-x-6 text-sm font-medium">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`inline-block text-sm sm:text-xs transition-transform duration-300 ease-out hover:scale-125 whitespace-nowrap ${
                    pathname === link.href
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Separator */}
        <Separator orientation="vertical" className="h-6" />

        {/* Theme toggle */}
        <div className="shrink-0">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
