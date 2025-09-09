import SectionContainer from "@/components/layout/SectionContainer";

type IntroductionProps = {
  extraStyle?: string;
  fullWidth?: boolean;
};

export default function Introduction({ extraStyle, fullWidth }: IntroductionProps) {
  return (
    <SectionContainer extraStyle={extraStyle} fullWidth={fullWidth}>
      <h2 className="text-3xl font-bold mb-4">Chi sono</h2>
      <p className="text-muted-foreground text-lg">
        Sono uno sviluppatore full stack con un passato tra economia e frontend. Dopo anni in
        agenzie e startup, oggi costruisco progetti su misura che uniscono estetica, performance e
        strategia.
      </p>
    </SectionContainer>
  );
}
