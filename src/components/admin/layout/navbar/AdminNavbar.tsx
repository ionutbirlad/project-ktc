"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import ThemeToggle from "@/components/general/ThemeToggle";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";

export default function AdminNavbar() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="h-16 bg-muted border-b">
      <div className="h-full flex items-center justify-between max-w-(--breakpoint-xl) mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <span className="sm:text-base font-bold tracking-tight text-muted-foreground hover:text-foreground transition whitespace-nowrap min-w-0 cursor-pointer">
            KTC
          </span>
          {/* Desktop Menu */}
          <NavMenu menuItems={links} className="hidden md:block" />
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Sign Up</Button>
          </Link>

          <div className="shrink-0 min-w-0">
            <ThemeToggle />
          </div>
          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
}
