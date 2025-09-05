"use client";

import { motion } from "framer-motion";

export default function AboutIntro() {
  return (
    <motion.section
      className="max-w-3xl mx-auto text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold mb-4">Chi sono</h2>
      <p className="text-muted-foreground text-lg">
        Sono uno sviluppatore full stack con un passato tra economia e frontend. Dopo anni in
        agenzie e startup, oggi costruisco progetti su misura che uniscono estetica, performance e
        strategia.
      </p>
    </motion.section>
  );
}
