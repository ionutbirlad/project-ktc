import SectionContainer from "@/components/layout/SectionContainer";

export default function AboutCallout() {
  return (
    <SectionContainer extraStyle="py-16 text-center">
      <h2 className="text-2xl font-semibold mb-4">Chi c&apos;è dietro KTC?</h2>
      <p className="max-w-2xl mx-auto text-muted-foreground">
        Sono uno sviluppatore con background tecnico e mente creativa. Kill The Competition è il mio
        laboratorio per sperimentare, migliorare e distinguermi.
      </p>
    </SectionContainer>
  );
}
