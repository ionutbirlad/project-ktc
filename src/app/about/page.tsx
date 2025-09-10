import LayoutContainer from "@/components/layout/LayoutContainer";

import AboutIntro from "@/components/about/AboutIntro";
import Introduction from "@/components/about/Introduction";
import ProfessionalExperience from "@/components/about/ProfessionalExperience";
import TrustedBySection from "@/components/about/TrustedBySection";
import Testimonials from "@/components/about/Testimonials";
import ContactCTA from "@/components/general/ContactCTA";

import SectionDivider from "@/components/general/SectionDivider";

export default function AboutPage() {
  return (
    <LayoutContainer>
      <AboutIntro extraStyle="bg-muted p-0" fullWidth={true} />
      <SectionDivider />
      <Introduction extraStyle="text-center" />
      <SectionDivider />
      <ProfessionalExperience extraStyle="relative" fullWidth={true} />
      <SectionDivider />
      <TrustedBySection extraStyle="bg-muted" fullWidth={true} />
      <SectionDivider />
      <Testimonials />
      <ContactCTA extraStyle="text-center" />
    </LayoutContainer>
  );
}
