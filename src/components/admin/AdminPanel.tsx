"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ContentEditor from "./ContentEditor";

type ContentItem = {
  id: number;
  title: string;
  description: string;
};

export default function AdminPanel() {
  const [items, setItems] = useState<ContentItem[]>([
    { id: 1, title: "Progetto A", description: "Descrizione A" },
    { id: 2, title: "Progetto B", description: "Descrizione B" },
  ]);

  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);

  const handleSave = (updated: ContentItem) => {
    setItems((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    setEditingItem(null);
  };

  const handleDelete = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {items.map((item) =>
        editingItem?.id === item.id ? (
          <ContentEditor
            key={item.id}
            initial={item}
            onSave={handleSave}
            onCancel={() => setEditingItem(null)}
          />
        ) : (
          <div key={item.id} className="p-4 border rounded-xl flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditingItem(item)}
                className="text-blue-600 hover:underline"
              >
                Modifica
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-600 hover:underline"
              >
                Elimina
              </button>
            </div>
          </div>
        )
      )}
    </motion.div>
  );
}
