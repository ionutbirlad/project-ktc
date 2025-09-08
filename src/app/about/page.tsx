import LayoutContainer from "@/components/layout/LayoutContainer";

import AboutIntro from "@/components/about/AboutIntro";
import ProfessionalExperience from "@/components/home/ProfessionalExperience";
import TrustedBySection from "@/components/home/TrustedBySection";

export default function AboutPage() {
  return (
    <LayoutContainer>
      <AboutIntro extraStyle="bg-muted" />
      <ProfessionalExperience extraStyle="relative" />
      <TrustedBySection extraStyle="bg-muted" />
    </LayoutContainer>
  );
}
