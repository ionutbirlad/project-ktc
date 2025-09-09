import LayoutContainer from "@/components/layout/LayoutContainer";

import AboutIntro from "@/components/about/AboutIntro";
import ProfessionalExperience from "@/components/about/ProfessionalExperience";
import TrustedBySection from "@/components/about/TrustedBySection";
import Testimonials from "@/components/about/Testimonials";

import SectionDivider from "@/components/general/SectionDivider";

export default function AboutPage() {
  return (
    <LayoutContainer>
      <AboutIntro extraStyle="bg-muted p-0" fullWidth={true} />
      <SectionDivider />
      <ProfessionalExperience extraStyle="relative" fullWidth={true} />
      <SectionDivider />
      <TrustedBySection extraStyle="bg-muted" fullWidth={true} />
      <SectionDivider />
      <Testimonials />
    </LayoutContainer>
  );
}
