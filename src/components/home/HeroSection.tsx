"use client";

import SectionContainer from "@/components/layout/SectionContainer";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function HeroSection() {
  return (
    <SectionContainer fullWidth={true} extraStyle="max-h-[100svh] overflow-hidden bg-muted">
      <AspectRatio ratio={16 / 9} className="bg-muted">
        <div className="h-full content-center py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Kill The Competition</h1>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            Un progetto tecnico per distinguersi. Creato per sviluppatori, makers e visionari.
          </p>
          <Button>Scopri di più</Button>
        </div>
      </AspectRatio>
    </SectionContainer>
  );
}
