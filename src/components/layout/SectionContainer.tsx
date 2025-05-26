"use client";

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  fullWidth?: boolean;
  extraStyle?: string;
};

export default function SectionContainer({ children, fullWidth = false, extraStyle = "" }: Props) {
  return (
    <section
      className={`${fullWidth ? "my-20" : "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 my-20"} ${extraStyle}`}
    >
      {children}
    </section>
  );
}
