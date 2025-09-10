import SectionContainer from "@/components/layout/SectionContainer";
import { Icons } from "@/components/icons/Icons";

type IntroductionProps = {
  extraStyle?: string;
  fullWidth?: boolean;
};

const skills = [
  { icon: <Icons.html className="size-12" /> },
  { icon: <Icons.css className="size-12" /> },
  { icon: <Icons.sass className="size-12" /> },
  { icon: <Icons.tailwind className="size-12" /> },
  { icon: <Icons.javascript className="size-12" /> },
  { icon: <Icons.typescript className="size-12" /> },
  { icon: <Icons.react className="size-12" /> },
  { icon: <Icons.redux className="size-12" /> },
  { icon: <Icons.nextjs className="size-12" /> },
  { icon: <Icons.nestjs className="size-12" /> },
  { icon: <Icons.prisma className="size-12" /> },
  { icon: <Icons.docker className="size-12" /> },
];

export default function Introduction({ extraStyle, fullWidth }: IntroductionProps) {
  return (
    <SectionContainer extraStyle={extraStyle} fullWidth={fullWidth}>
      <div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Chi sono</h2>
          <p className="text-muted-foreground text-lg">
            Sono uno sviluppatore full stack con un passato tra economia e frontend. Dopo anni in
            agenzie e startup, oggi costruisco progetti su misura che uniscono estetica, performance
            e strategia.
          </p>
        </div>

        <div className="flex justify-between align-center mt-10">
          {skills.map(({ icon }, index) => (
            <div key={index}>{icon}</div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
