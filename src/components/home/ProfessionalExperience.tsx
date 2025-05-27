"use client";

import SectionContainer from "@/components/layout/SectionContainer";

import { Badge } from "@/components/ui/badge";
import { Building2, Calendar } from "lucide-react";

type ExperienceItemProps = {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
};

const ExperienceItem = ({
  title,
  company,
  period,
  description,
  technologies,
}: ExperienceItemProps) => {
  return (
    <div className="relative pl-8 not-last:pb-12">
      {/* Timeline line */}
      <div className="absolute left-0 top-2.5 h-full w-[2px] bg-muted group-first:h-[calc(100%-24px)] group-first:top-6">
        <div className="absolute h-3 w-3 -left-[5px] top-0 rounded-full border-2 border-primary bg-background" />
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 size-9 bg-accent rounded-full flex items-center justify-center">
            <Building2 className="size-5 text-muted-foreground" />
          </div>
          <span className="text-lg font-semibold">{company}</span>
        </div>
        <div>
          <h3 className="text-xl font-medium">{title}</h3>
          <div className="flex items-center gap-2 mt-1 text-sm">
            <Calendar className="size-4" />
            <span>{period}</span>
          </div>
        </div>
        <p className="text-muted-foreground">{description}</p>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="rounded-full">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  const experiences = [
    {
      title: "Senior Full Stack Developer",
      company: "TechCorp Solutions",
      period: "2021 - Present",
      description:
        "Led the development of enterprise-scale web applications, mentored junior developers, and implemented best practices for code quality and performance optimization.",
      technologies: ["React", "Node.js", "TypeScript", "AWS", "MongoDB"],
    },
    {
      title: "Full Stack Developer",
      company: "Digital Innovations Inc",
      period: "2019 - 2021",
      description:
        "Developed and maintained multiple client projects, implemented responsive designs, and integrated third-party APIs for enhanced functionality.",
      technologies: ["React", "Express.js", "PostgreSQL", "Docker", "Redis"],
    },
    {
      title: "Frontend Developer",
      company: "WebTech Studios",
      period: "2018 - 2019",
      description:
        "Created responsive and interactive user interfaces, collaborated with designers, and optimized application performance.",
      technologies: ["React", "JavaScript", "SASS", "Webpack", "Jest"],
    },
  ];

  return (
    <SectionContainer id="experience" extraStyle="relative">
      <div className="max-w-screen-lg mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Experience
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">Professional Journey</h2>
          <p className="text-muted-foreground mt-2 sm:mt-4 text-lg">
            A timeline of my professional growth and key achievements
          </p>
        </div>

        <div className="relative">
          {experiences.map((experience, index) => (
            <ExperienceItem key={index} {...experience} />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};

export default Experience;
