"use client";

import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Kill The Competition</h1>
      <p className="text-muted-foreground max-w-xl mx-auto mb-6">
        Un progetto tecnico per distinguersi. Creato per sviluppatori, makers e visionari.
      </p>
      <Button>Scopri di più</Button>
    </section>
  );
}
