'use client';

import { ReactNode } from "react";
import PageTransition from "@/components/layout/PageTransition";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function LayoutContainer({ children }: Props) {
  return (
    <PageTransition>
      {children}
    </PageTransition>
  );
}
