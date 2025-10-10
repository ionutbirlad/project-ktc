import SectionContainer from "@/components/layout/SectionContainer";
// import { Card, CardContent } from "@/components/ui/card";
import TreemapChart from "@/components/general/TreemapChart";

type TechStatsSectionProps = {
  extraStyle?: string;
  fullWidth?: boolean;
};

type RepoStats = {
  fetchedAt: Date;
  repo: string;
  stats: { label: string; value: number; description: string }[];
  chartDataTechnologies: object[];
};

export default async function TechStatsSection({ extraStyle, fullWidth }: TechStatsSectionProps) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/github-stats?owner=ionutbirlad&name=project-ktc&weighted=1`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) return <p>Errore nel caricamento delle statistiche.</p>;

  const ktcData: RepoStats = await res.json();

  return (
    <SectionContainer extraStyle={extraStyle} fullWidth={fullWidth}>
      <div className="max-w-screen-sm lg:max-w-screen-xl mx-auto px-10">
        <div className="w-full">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            The perfect starting point for any project
          </h2>
          <p className="mt-6 text-lg max-w-2xl text-foreground/70">
            The world&apos;s most advanced UI kit for Figma. Meticulously crafted with 100% Auto
            Layout 5.0, variables, smart variants, and WCAG accessibility.
          </p>
          <div className="mt-16 sm:mt-24 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-16 justify-center">
            {/* {ktcData.repo}
            {new Date(ktcData.fetchedAt).toLocaleDateString("it-IT")} */}
            {ktcData.stats.map((stat, index) => (
              <div key={index}>
                <span className="text-5xl md:text-6xl font-bold text-primary-foreground">
                  {stat.value}
                </span>
                <p className="mt-6 font-semibold text-xl">{stat.label}</p>
                <p className="mt-2 text-[17px] text-muted-foreground">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto mt-16 sm:mt-24">
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
          Panoramica delle Competenze Tecniche
        </h3>
        <TreemapChart chartData={ktcData.chartDataTechnologies} />
      </div>
    </SectionContainer>
  );
}
