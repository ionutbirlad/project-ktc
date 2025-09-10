"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const stacks = ["All", "Next.js", "Shopify", "Vue.js", "Tailwind"];

type ProjectsFilterProps = {
  onFilter: (stack: string) => void;
};

export default function ProjectsFilter({ onFilter }: ProjectsFilterProps) {
  const [selected, setSelected] = useState("All");

  return (
    <div className="flex gap-2 flex-wrap justify-center mb-8">
      {stacks.map((stack) => (
        <Button
          key={stack}
          variant={selected === stack ? "default" : "outline"}
          onClick={() => {
            setSelected(stack);
            onFilter(stack);
          }}
        >
          {stack}
        </Button>
      ))}
    </div>
  );
}
