import LayoutContainer from "@/components/layout/LayoutContainer";

import HeroSection from "@/components/home/HeroSection";
import AboutCallout from "@/components/home/AboutCallout";
import TechStatsSection from "@/components/home/TechStatsSection";
import ProjectsPreview from "@/components/home/ProjectsPreview";
import BlogTeaser from "@/components/home/BlogTeaser";
import ContactCTA from "@/components/general/ContactCTA";

import SectionDivider from "@/components/general/SectionDivider";

export default function HomePage() {
  return (
    <LayoutContainer>
      <HeroSection extraStyle="bg-muted lg:py-20" fullWidth={true} />
      <SectionDivider />
      <AboutCallout extraStyle="bg-muted" fullWidth={true} />
      <SectionDivider />
      <TechStatsSection extraStyle="bg-muted" fullWidth={true} />
      <SectionDivider />
      <ProjectsPreview extraStyle="relative bg-muted" fullWidth={true} />
      <SectionDivider />
      <BlogTeaser extraStyle="bg-muted" fullWidth={true} />
      <SectionDivider />
      <ContactCTA extraStyle="bg-muted text-center" fullWidth={true} />
    </LayoutContainer>
  );
}
