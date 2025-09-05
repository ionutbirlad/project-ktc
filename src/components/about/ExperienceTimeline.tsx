"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const experiences = [
  {
    year: "2020–2021",
    title: "Boolean Careers",
    description: "Corso intensivo di sviluppo web full stack.",
  },
  {
    year: "2021–2024",
    title: "Underscore District",
    description: "Frontend dev su progetti Shopify e Next.js.",
  },
  {
    year: "2024–oggi",
    title: "Founder @ Bustí",
    description: "Costruisco un e-commerce da zero. Creatività, sviluppo e strategia.",
  },
];

export default function ExperienceTimeline() {
  return (
    <section className="space-y-8">
      {experiences.map((item, i) => (
        <motion.div
          key={i}
          className="relative"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          viewport={{ once: true }}
        >
          <Card className="border-l-4 border-primary pl-6">
            <CardContent className="py-4">
              <p className="text-sm text-muted-foreground mb-1">{item.year}</p>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-sm mt-1">{item.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </section>
  );
}
