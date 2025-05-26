"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import ThemeToggle from "@/components/custom/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 border rounded-full bg-background shadow-lg px-6 py-3">
      <div className="flex items-center gap-6">
        <span className="text-xl font-bold tracking-tight">KTC</span>
        <nav className="space-x-6 text-sm font-medium">
          <Link
            href="/"
            className={
              pathname === "/"
                ? "text-primary-foreground font-semibold"
                : "hover:text-primary-foreground"
            }
          >
            Home
          </Link>
          <Link
            href="/about"
            className={
              pathname === "/about"
                ? "text-primary-foreground font-semibold"
                : "hover:text-primary-foreground"
            }
          >
            About
          </Link>
          <Link
            href="/projects"
            className={
              pathname === "/projects"
                ? "text-primary-foreground font-semibold"
                : "hover:text-primary-foreground"
            }
          >
            Projects
          </Link>
          <Link
            href="/blog"
            className={
              pathname === "/blog"
                ? "text-primary-foreground font-semibold"
                : "hover:text-primary-foreground"
            }
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className={
              pathname === "/blog"
                ? "text-primary-foreground font-semibold"
                : "hover:text-primary-foreground"
            }
          >
            Contact
          </Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
