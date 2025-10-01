import { ReactNode } from "react";
import "@/styles/globals.css";
import { ThemeProvider } from "@/styles/ThemeProvider";

import ComingSoon from "@/components/general/ComingSoon";

export default function RootLayout({ children }: { children: ReactNode }) {
  const maintenance = process.env.MAINTENANCE_MODE === "on";

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground flex min-h-screen flex-col font-sans">
        {maintenance ? (
          <ComingSoon />
        ) : (
          <ThemeProvider>
            <main className="flex-grow">{children}</main>
          </ThemeProvider>
        )}
      </body>
    </html>
  );
}
