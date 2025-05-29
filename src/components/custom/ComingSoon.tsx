"use client";

import Spline from "@splinetool/react-spline";

export default function ComingSoon() {
  return (
    <section className="w-screen h-[calc(100vw*9/16)] max-h-screen overflow-hidden">
      <Spline scene="/ComingSoon.splinecode" />
    </section>
  );
}
