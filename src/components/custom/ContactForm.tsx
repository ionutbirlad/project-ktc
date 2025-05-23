"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Nome</label>
        <input type="text" required className="w-full border rounded-xl px-4 py-2 bg-background" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input type="email" required className="w-full border rounded-xl px-4 py-2 bg-background" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Messaggio</label>
        <textarea
          required
          rows={5}
          className="w-full border rounded-xl px-4 py-2 bg-background"
        ></textarea>
      </div>

      <Button type="submit" size="lg">
        Invia messaggio
      </Button>

      {submitted && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-green-600 font-medium"
        >
          ✅ Messaggio inviato (simulato)!
        </motion.p>
      )}
    </motion.form>
  );
}
