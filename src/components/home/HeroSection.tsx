"use client";

import Image from "next/image";
import Link from "next/link";

import { useTheme } from "@/styles/ThemeProvider";
import SectionContainer from "@/components/layout/SectionContainer";
import { Button } from "@/components/ui/button";
// import { AspectRatio } from "@/components/ui/aspect-ratio";

import heroPhoto from "@/assets/images/home_hero-section.webp";
import signatureBlack from "@/assets/images/signature_black.png";
import signatureWhite from "@/assets/images/signature_white.png";

type HeroSectionProps = {
  extraStyle?: string;
  fullWidth?: boolean;
};

export default function HeroSection({ extraStyle, fullWidth }: HeroSectionProps) {
  const { theme } = useTheme();

  return (
    <SectionContainer fullWidth={fullWidth} extraStyle={extraStyle}>
      {/* <AspectRatio ratio={16 / 9} className="bg-muted"> */}
      <div className="max-w-screen-sm lg:max-w-screen-xls mx-auto flex flex-col items-center lg:flex-row h-full">
        <div className="lg:w-1/2 h-full">
          <div className="h-full px-10 py-16">
            <div className="mb-2">
              {theme === "dark" ? (
                <Image
                  src={signatureWhite}
                  alt="White version of Ionut Birlad's signature"
                  className="object-contain w-25 block"
                  priority
                />
              ) : (
                <Image
                  src={signatureBlack}
                  alt="Black version of Ionut Birlad's signature"
                  className="object-contain w-25 block"
                  priority
                />
              )}
            </div>
            <h1 className="text-4xl font-bold mb-3">Project KTC</h1>
            <p className="text-muted-foreground mx-auto mb-6">
              Non il solito portfolio. È un ambiente reale dove pubblico codice, idee e risultati.
              Se ti piace la pratica, sei nel posto giusto.
            </p>
            <div>
              <Link href="/contact">
                <Button>Contattami</Button>
              </Link>
              <Link className="ml-5" href="/about">
                <Button variant="ghost">Scopri di più</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 h-full justify-center content-center">
          <Image src={heroPhoto} alt="Foto di Ionut Birlad" className="object-contain" priority />
        </div>
      </div>
      {/* </AspectRatio> */}
    </SectionContainer>
  );
}
