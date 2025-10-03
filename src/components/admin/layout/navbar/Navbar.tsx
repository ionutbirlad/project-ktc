"use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Separator } from "@/components/ui/separator";
// import ThemeToggle from "@/components/general/ThemeToggle";

import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { SunIcon } from "lucide-react";

export default function AdminNavbar() {
  // const pathname = usePathname();

  // const links = [
  //   { href: "/", label: "Home" },
  //   { href: "/about", label: "About" },
  //   { href: "/projects", label: "Projects" },
  //   { href: "/blog", label: "Blog" },
  //   { href: "/contact", label: "Contact" },
  // ];

  return (
    // <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 group">
    //   <header
    //     className="transition-transform duration-300 ease-out group-hover:scale-[1.05]
    //       w-full max-w-[95vw] sm:max-w-[600px]
    //       rounded-full bg-background shadow-lg border px-4 py-3 backdrop-blur-md
    //       flex items-center justify-between gap-4 sm:gap-6"
    //     style={{
    //       fontSize: "clamp(0.65rem, 2vw, 0.95rem)",
    //     }}
    //   >
    //     {/* Logo */}
    //     <span className="sm:text-base font-bold tracking-tight text-muted-foreground hover:text-foreground transition whitespace-nowrap min-w-0 cursor-pointer">
    //       KTC
    //     </span>

    //     <Separator orientation="vertical" className="!h-6" />

    //     {/* Links */}
    //     <nav className="flex flex-nowrap items-center gap-2 sm:gap-4 font-medium min-w-0">
    //       {links.map((link) => (
    //         <Link key={link.href} href={link.href}>
    //           <span
    //             className={`inline-block transition-transform duration-300 ease-out hover:scale-125 whitespace-nowrap min-w-0 ${
    //               pathname === link.href
    //                 ? "text-primary font-semibold"
    //                 : "text-muted-foreground hover:text-foreground"
    //             }`}
    //           >
    //             {link.label}
    //           </span>
    //         </Link>
    //       ))}
    //     </nav>

    //     <Separator orientation="vertical" className="!h-6" />

    //     <div className="shrink-0 min-w-0">
    //       <ThemeToggle />
    //     </div>
    //   </header>
    // </div>

    <nav className="h-16 bg-muted border-b">
      <div className="h-full flex items-center justify-between max-w-(--breakpoint-xl) mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Logo />
          {/* Desktop Menu */}
          <NavMenu className="hidden md:block" />
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden sm:inline-flex">
            Sign In
          </Button>
          <Button>Sign Up</Button>
          <Button size="icon" variant="outline">
            <SunIcon />
          </Button>
          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
}
