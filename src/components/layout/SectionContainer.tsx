"use client";

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  fullWidth?: boolean;
  extraStyle?: string;
  id?: string;
};

export default function SectionContainer({
  children,
  fullWidth = false,
  extraStyle = "",
  id = "",
}: Props) {
  return (
    <section
      id={id}
      className={`${fullWidth ? "mb-28 py-10" : "mx-auto w-full max-w-7xl px-6 sm:px-6 lg:px-8 mb-28 py-10"} ${extraStyle}`}
    >
      {children}
    </section>
  );
}
