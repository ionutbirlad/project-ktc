import LayoutContainer from "@/components/layout/LayoutContainer";

import HeroSection from "@/components/home/HeroSection";
import AboutCallout from "@/components/home/AboutCallout";
import ProfessionalExperience from "@/components/home/ProfessionalExperience";
import TechStatsSection from "@/components/home/TechStatsSection";
import ProjectsPreview from "@/components/home/ProjectsPreview";
import BlogTeaser from "@/components/home/BlogTeaser";
import TrustedBySection from "@/components/home/TrustedBySection";
import ContactCTA from "@/components/home/ContactCTA";

export default function HomePage() {
  return (
    <LayoutContainer>
      <HeroSection />
      <AboutCallout />
      <ProfessionalExperience />
      <TechStatsSection />
      <ProjectsPreview />
      <BlogTeaser />
      <TrustedBySection />
      <ContactCTA />
    </LayoutContainer>
  );
}
