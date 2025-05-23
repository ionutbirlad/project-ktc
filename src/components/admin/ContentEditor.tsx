"use client";

import { useState } from "react";

type Props = {
  initial: {
    id: number;
    title: string;
    description: string;
  };
  onSave: (item: Props["initial"]) => void;
  onCancel: () => void;
};

export default function ContentEditor({ initial, onSave, onCancel }: Props) {
  const [title, setTitle] = useState(initial.title);
  const [description, setDescription] = useState(initial.description);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({ id: initial.id, title, description });
      }}
      className="p-4 border rounded-xl space-y-4 bg-muted"
    >
      <div>
        <label className="text-sm font-medium">Titolo</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Descrizione</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="text-muted-foreground">
          Annulla
        </button>
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
          Salva
        </button>
      </div>
    </form>
  );
}
