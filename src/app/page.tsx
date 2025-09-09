import LayoutContainer from "@/components/layout/LayoutContainer";

import HeroSection from "@/components/home/HeroSection";
import AboutCallout from "@/components/home/AboutCallout";
import TechStatsSection from "@/components/home/TechStatsSection";
import ProjectsPreview from "@/components/home/ProjectsPreview";
import BlogTeaser from "@/components/home/BlogTeaser";
import ContactCTA from "@/components/home/ContactCTA";

import SectionDivider from "@/components/general/SectionDivider";

export default function HomePage() {
  return (
    <LayoutContainer>
      <HeroSection extraStyle="max-h-[100svh] overflow-hidden bg-muted" fullWidth={true} />
      <SectionDivider />
      <AboutCallout />
      <SectionDivider />
      <TechStatsSection extraStyle="bg-muted" fullWidth={true} />
      <SectionDivider />
      <ProjectsPreview extraStyle="relative" />
      <SectionDivider />
      <BlogTeaser extraStyle="bg-muted" fullWidth={true} />
      <SectionDivider />
      <ContactCTA extraStyle="text-center" />
    </LayoutContainer>
  );
}
