"use client";

import Spline from "@splinetool/react-spline";

export default function ComingSoon() {
  return (
    <section>
      {/* Mobile */}
      <div className="block md:hidden mobile-canvas-wrapper">
        <Spline scene="/ComingSoonMobile.splinecode" />
      </div>

      {/* Desktop */}
      <div className="hidden md:block w-full h-full fixed inset-0 flex items-center justify-center overflow-hidden bg-black">
        <Spline
          className="w-full h-full aspect-video object-cover"
          scene="/ComingSoon.splinecode"
        />
      </div>
    </section>
  );
}
