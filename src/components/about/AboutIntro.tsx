"use client";

import Image from "next/image";

import SectionContainer from "@/components/layout/SectionContainer";

type AboutIntroProps = {
  extraStyle?: string;
  fullWidth?: boolean;
};

export default function AboutIntro({ extraStyle, fullWidth }: AboutIntroProps) {
  return (
    <SectionContainer extraStyle={extraStyle} fullWidth={fullWidth}>
      <div className="max-w-xl mx-auto mb-10">
        <h2 className="text-3xl font-bold mb-4">Chi sono</h2>
        <p className="text-muted-foreground text-lg">
          Sono uno sviluppatore full stack con un passato tra economia e frontend. Dopo anni in
          agenzie e startup, oggi costruisco progetti su misura che uniscono estetica, performance e
          strategia.
        </p>
      </div>

      <div className="flex justify-center">
        <div>
          CODER
          <Image
            className="block"
            src="/images/foto_cv.jpeg"
            width={500}
            height={500}
            alt="Picture of the author"
          />
        </div>
        <div>
          ENTREPENEUR
          <Image
            className="block"
            src="/images/foto_cv.jpeg"
            width={500}
            height={500}
            alt="Picture of the author"
          />
        </div>
      </div>
    </SectionContainer>
  );
}
