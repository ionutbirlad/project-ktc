import LayoutContainer from "@/components/layout/LayoutContainer";

import HeroSection from "@/components/home/HeroSection";
import AboutCallout from "@/components/home/AboutCallout";
import TechStatsSection from "@/components/home/TechStatsSection";
import ProjectsPreview from "@/components/home/ProjectsPreview";
import BlogTeaser from "@/components/home/BlogTeaser";
import ContactCTA from "@/components/home/ContactCTA";

export default function HomePage() {
  return (
    <LayoutContainer>
      <HeroSection extraStyle="max-h-[100svh] overflow-hidden bg-muted" fullWidth={true} />
      <AboutCallout />
      <TechStatsSection />
      <ProjectsPreview extraStyle="relative bg-muted" fullWidth={true} />
      <BlogTeaser />
      <ContactCTA extraStyle="text-center" />
    </LayoutContainer>
  );
}
