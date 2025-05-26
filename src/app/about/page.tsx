import LayoutContainer from "@/components/layout/LayoutContainer";
import AboutIntro from "@/components/about/AboutIntro";
import ExperienceTimeline from "@/components/about/ExperienceTimeline";

export default function AboutPage() {
  return (
    <LayoutContainer>
      <AboutIntro />
      <ExperienceTimeline />
    </LayoutContainer>
  );
}
