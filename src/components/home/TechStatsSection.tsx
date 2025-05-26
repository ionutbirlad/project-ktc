import SectionContainer from "@/components/layout/SectionContainer";
import { Card, CardContent } from "@/components/ui/card";

export default function TechStatsSection() {
  const stats = [
    { label: "Progetti open source", value: "12" },
    { label: "Stelle GitHub", value: "580+" },
    { label: "Commits all'anno", value: "1.200+" },
  ];

  return (
    <SectionContainer extraStyle="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, i) => (
        <Card key={i}>
          <CardContent className="text-center py-8">
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-muted-foreground">{stat.label}</p>
          </CardContent>
        </Card>
      ))}
    </SectionContainer>
  );
}
