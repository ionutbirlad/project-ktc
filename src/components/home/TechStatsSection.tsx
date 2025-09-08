import SectionContainer from "@/components/layout/SectionContainer";
// import { Card, CardContent } from "@/components/ui/card";
import TreemapChart from "@/components/custom/TreemapChart";

type TechStatsSectionProps = {
  extraStyle?: string;
};

export default function TechStatsSection({ extraStyle }: TechStatsSectionProps) {
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

  const chartData = {
    name: "Skills",
    children: [
      {
        name: "Tech Stack",
        children: [
          {
            name: "Frontend",
            children: [
              {
                name: "HTML",
                value: 8,
              },
              {
                name: "CSS",
                value: 8,
              },
              {
                name: "Tailwind CSS",
                value: 10,
              },
              {
                name: "Sass / SCSS",
                value: 6,
              },
              {
                name: "JavaScript",
                value: 12,
              },
              {
                name: "TypeScript",
                value: 10,
              },
              {
                name: "Vue.js",
                value: 9,
              },
              {
                name: "React.js",
                value: 13,
              },
              {
                name: "Web Components",
                value: 5,
              },
              {
                name: "React Native",
                value: 4,
              },
            ],
          },
          {
            name: "Backend",
            children: [
              {
                name: "Node.js",
                value: 10,
              },
              {
                name: "Express.js",
                value: 8,
              },
              {
                name: "RESTful APIs",
                value: 9,
              },
              {
                name: "GraphQL",
                value: 6,
              },
              {
                name: "OAuth2",
                value: 5,
              },
              {
                name: "Supabase",
                value: 7,
              },
            ],
          },
          {
            name: "Templating & eCommerce",
            children: [
              {
                name: "Liquid",
                value: 6,
              },
              {
                name: "Shopify",
                value: 11,
              },
            ],
          },
          {
            name: "Database",
            children: [
              {
                name: "PostgreSQL",
                value: 6,
              },
              {
                name: "MongoDB",
                value: 7,
              },
              {
                name: "MySQL",
                value: 5,
              },
            ],
          },
          {
            name: "DevOps",
            children: [
              {
                name: "Git",
                value: 12,
              },
              {
                name: "GitHub",
                value: 12,
              },
              {
                name: "GitHub Actions",
                value: 9,
              },
              {
                name: "Docker",
                value: 8,
              },
            ],
          },
        ],
      },
      {
        name: "Tools & Methods",
        children: [
          {
            name: "Build Tools",
            children: [
              {
                name: "Vite",
                value: 6,
              },
            ],
          },
          {
            name: "Linters & Formatters",
            children: [
              {
                name: "ESLint",
                value: 7,
              },
              {
                name: "Prettier",
                value: 7,
              },
            ],
          },
          {
            name: "Design & UX",
            children: [
              {
                name: "Figma",
                value: 6,
              },
            ],
          },
          {
            name: "Debug & API",
            children: [
              {
                name: "Postman",
                value: 6,
              },
            ],
          },
          {
            name: "Project Management",
            children: [
              {
                name: "Scrum",
                value: 5,
              },
              {
                name: "Kanban",
                value: 5,
              },
            ],
          },
          {
            name: "Paradigms",
            children: [
              {
                name: "OOP",
                value: 7,
              },
            ],
          },
        ],
      },
      {
        name: "Testing",
        children: [
          {
            name: "Jest",
            value: 7,
          },
          {
            name: "Cypress",
            value: 6,
          },
          {
            name: "Playwright",
            value: 5,
          },
          {
            name: "Lighthouse",
            value: 4,
          },
        ],
      },
      {
        name: "Soft Skills",
        children: [
          {
            name: "Problem Solving",
            value: 10,
          },
          {
            name: "Teamwork",
            value: 9,
          },
          {
            name: "Communication",
            value: 9,
          },
          {
            name: "Adaptability",
            value: 8,
          },
          {
            name: "Critical Thinking",
            value: 8,
          },
          {
            name: "Creativity & Innovation",
            value: 7,
          },
          {
            name: "Attention to Detail",
            value: 8,
          },
          {
            name: "Resilience",
            value: 7,
          },
        ],
      },
    ],
  };

  return (
    <SectionContainer extraStyle={extraStyle}>
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

      <div className="mt-16 sm:mt-24">
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
          Panoramica delle Competenze Tecniche
        </h3>
        <TreemapChart chartData={chartData} />
      </div>
    </SectionContainer>
  );
}
