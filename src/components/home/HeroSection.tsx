"use client";

import SectionContainer from "@/components/layout/SectionContainer";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import Image from "next/image";
import heroPhoto from "@/assets/images/home_hero-section.webp";

type HeroSectionProps = {
  extraStyle?: string;
  fullWidth?: boolean;
};

export default function HeroSection({ extraStyle, fullWidth }: HeroSectionProps) {
  return (
    <SectionContainer fullWidth={fullWidth} extraStyle={extraStyle}>
      <AspectRatio ratio={16 / 9} className="bg-muted">
        <div className="max-w-screen-xl mx-auto flex h-full">
          <div className="w-1/2 h-full bg-red-500">
            <div className="h-full content-center py-16 text-center">
              <h1 className="text-4xl font-bold mb-4">Kill The Competition</h1>
              <p className="text-muted-foreground max-w-xl mx-auto mb-6">
                Un progetto tecnico per distinguersi. Creato per sviluppatori, makers e visionari.
              </p>
              <Button>Scopri di più</Button>
            </div>
          </div>
          <div className="w-1/2 h-full bg-orange-500 justify-center content-center">
            <Image src={heroPhoto} alt="Foto di Ionut Birlad" className="object-contain" priority />
          </div>
        </div>
      </AspectRatio>
    </SectionContainer>
  );
}
