import LayoutContainer from "@/components/layout/LayoutContainer";
import AboutIntro from "@/components/sections/AboutIntro";
import ExperienceTimeline from "@/components/sections/ExperienceTimeline";

export default function AboutPage() {
  return (
    <LayoutContainer>
      <AboutIntro />
      <ExperienceTimeline />
    </LayoutContainer>
  );
}
