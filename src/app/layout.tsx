import { ReactNode } from "react";
import "@/styles/globals.css";
import { ThemeProvider } from "@/styles/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground flex min-h-screen flex-col font-sans">
        <ThemeProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
