import LayoutContainer from "@/components/layout/LayoutContainer";

import AboutIntro from "@/components/about/AboutIntro";
import ProfessionalExperience from "@/components/about/ProfessionalExperience";
import TrustedBySection from "@/components/about/TrustedBySection";
import Testimonials from "@/components/about/Testimonials";

export default function AboutPage() {
  return (
    <LayoutContainer>
      <AboutIntro extraStyle="bg-muted p-0" fullWidth={true} />
      <ProfessionalExperience extraStyle="relative" fullWidth={true} />
      <TrustedBySection extraStyle="bg-muted" fullWidth={true} />
      <Testimonials />
    </LayoutContainer>
  );
}
