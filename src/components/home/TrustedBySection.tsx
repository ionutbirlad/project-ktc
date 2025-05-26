import SectionContainer from "@/components/layout/SectionContainer";

export default function TrustedBySection() {
  return (
    <SectionContainer extraStyle="text-center">
      <h2 className="text-xl font-semibold mb-4">Usato o ispirato da</h2>
      <div className="flex flex-wrap justify-center gap-6 text-muted-foreground">
        <span>GitHub</span>
        <span>Vercel</span>
        <span>Tailwind</span>
        <span>Open Source Devs</span>
      </div>
    </SectionContainer>
  );
}
