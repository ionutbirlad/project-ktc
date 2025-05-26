"use client";

import { useState } from "react";
import { projects } from "@/lib/projects";
import ProjectsFilter from "./ProjectsFilter";
import ProjectCard from "../custom/ProjectCard";

export default function ProjectsList() {
  const [stackFilter, setStackFilter] = useState("All");

  const filtered = projects.filter((p) =>
    stackFilter === "All" ? true : p.tech.includes(stackFilter)
  );

  return (
    <section>
      <h2 className="text-3xl font-bold text-center mb-6">Progetti reali</h2>
      <ProjectsFilter onFilter={setStackFilter} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
