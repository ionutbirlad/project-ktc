"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const stats = [
  { label: "⭐ Starred Repos", value: "132" },
  { label: "📦 Projects", value: "8" },
  { label: "🕒 Commits", value: "4,250+" },
];

export default function GitHubStats() {
  return (
    <motion.section
      className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {stats.map((stat, i) => (
        <Card key={i} className="text-center py-6 shadow-sm">
          <CardContent>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-muted-foreground">{stat.label}</p>
          </CardContent>
        </Card>
      ))}
    </motion.section>
  );
}
