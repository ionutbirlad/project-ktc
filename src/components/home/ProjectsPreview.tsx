import SectionContainer from "@/components/layout/SectionContainer";
import { Card, CardContent } from "@/components/ui/card";

export default function ProjectsPreview() {
  const projects = [
    { title: "KTC Analyzer", desc: "Dashboard tecnica con filtri stack." },
    { title: "Hook Factory", desc: "Generatore di hook virali." },
    { title: "Portfolio Engine", desc: "Motore modulare per profili dev." },
  ];

  return (
    <SectionContainer>
      <h2 className="text-2xl font-semibold mb-6">Progetti in evidenza</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {projects.map((p, i) => (
          <Card key={i}>
            <CardContent className="py-6">
              <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
              <p className="text-muted-foreground">{p.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionContainer>
  );
}
