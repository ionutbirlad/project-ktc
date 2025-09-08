import LayoutContainer from "@/components/layout/LayoutContainer";

import AboutIntro from "@/components/about/AboutIntro";
import ProfessionalExperience from "@/components/home/ProfessionalExperience";

export default function AboutPage() {
  return (
    <LayoutContainer>
      <AboutIntro />
      <ProfessionalExperience extraStyle="relative bg-muted" />
    </LayoutContainer>
  );
}
