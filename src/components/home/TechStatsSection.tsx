import SectionContainer from "@/components/layout/SectionContainer";
// import { Card, CardContent } from "@/components/ui/card";

export default function TechStatsSection() {
  const stats = [
    { label: "🍴 Total Forks", value: "45" },
    { label: "📁 Public Repositories", value: "24" },
    { label: "⏱️ Contributions this year", value: "1,250+" },
    { label: "🧑‍💻 Coding streak", value: "24 giorni" },
    { label: "📆 Contributions in last 7 days", value: "31" },
    { label: "🕐 Total Hours Coded", value: "~500h" },
    { label: "🔁 Pull requests merged", value: "67" },
    { label: "🐛 Issues closed", value: "33" },
  ];

  return (
    <SectionContainer>
      <div className="flex items-center justify-center">
        <div className="w-full">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            The perfect starting point for any project
          </h2>
          <p className="mt-6 text-lg max-w-2xl text-foreground/70">
            The world&apos;s most advanced UI kit for Figma. Meticulously crafted with 100% Auto
            Layout 5.0, variables, smart variants, and WCAG accessibility.
          </p>
          <div className="mt-16 sm:mt-24 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-16 justify-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <span className="text-5xl md:text-6xl font-bold text-primary-foreground">
                  {stat.value}
                </span>
                <p className="mt-6 font-semibold text-xl">{stat.label}</p>
                <p className="mt-2 text-[17px] text-muted-foreground">
                  Super smart global color, typography and effects styles + variables!
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
