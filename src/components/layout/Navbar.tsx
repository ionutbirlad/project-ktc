"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="w-full bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <span className="text-xl font-bold tracking-tight">KTC</span>
        <nav className="space-x-6 text-sm font-medium">
          <Link
            href="/"
            className={pathname === "/" ? "text-orange-600 font-semibold" : "hover:text-orange-600"}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={
              pathname === "/about" ? "text-orange-600 font-semibold" : "hover:text-orange-600"
            }
          >
            About
          </Link>
          <Link
            href="/projects"
            className={
              pathname === "/projects" ? "text-orange-600 font-semibold" : "hover:text-orange-600"
            }
          >
            Projects
          </Link>
          <Link
            href="/blog"
            className={
              pathname === "/blog" ? "text-orange-600 font-semibold" : "hover:text-orange-600"
            }
          >
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
}
