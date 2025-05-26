import LayoutContainer from "@/components/layout/LayoutContainer";
import HeroSection from "@/components/home/HeroSection";
import TrustedBySection from "@/components/home/TrustedBySection";
import TechStatsSection from "@/components/home/TechStatsSection";
import ProjectsPreview from "@/components/home/ProjectsPreview";
import BlogTeaser from "@/components/home/BlogTeaser";
import AboutCallout from "@/components/home/AboutCallout";
import ContactCTA from "@/components/home/ContactCTA";

export default function HomePage() {
  return (
    <LayoutContainer>
      <HeroSection />
      <AboutCallout />
      <TechStatsSection />
      <ProjectsPreview />
      <BlogTeaser />
      <TrustedBySection />
      <ContactCTA />
    </LayoutContainer>
  );
}
