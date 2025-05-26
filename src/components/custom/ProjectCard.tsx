import { Card, CardContent } from "@/components/ui/card";

type Project = {
  title: string;
  description: string;
  year: number;
  tech: string[];
  url: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="py-6 px-4">
        <div className="flex justify-between mb-1">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <span className="text-sm text-muted-foreground">{project.year}</span>
        </div>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 text-sm">
          {project.tech.map((tech) => (
            <span key={tech} className="bg-muted text-muted-foreground px-2 py-0.5 rounded-md">
              {tech}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
