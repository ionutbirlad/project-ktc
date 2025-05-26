"use client";

import { ReactNode } from "react";
import PageTransition from "@/components/layout/PageTransition";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function LayoutContainer({ children }: Props) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <PageTransition>{children}</PageTransition>
    </div>
  );
}
