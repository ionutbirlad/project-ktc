"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <motion.section
      className="text-center py-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-5xl font-bold mb-4 tracking-tight">Kill the Competition</h1>
      <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-6">
        Un progetto per sviluppatori ambiziosi: performance, design e strategia in un solo colpo.
      </p>
      <Button size="lg" asChild>
        <Link href="/projects">Scopri i progetti</Link>
      </Button>
    </motion.section>
  );
}
