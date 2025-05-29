import { ReactNode } from "react";
import "@/styles/globals.css";
import { ThemeProvider } from "@/styles/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import ComingSoon from "@/components/custom/ComingSoon";

export default function RootLayout({ children }: { children: ReactNode }) {
  const MAINTENANCE_MODE = true;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground flex min-h-screen flex-col font-sans">
        {MAINTENANCE_MODE ? (
          <ComingSoon />
        ) : (
          <ThemeProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </ThemeProvider>
        )}
      </body>
    </html>
  );
}
