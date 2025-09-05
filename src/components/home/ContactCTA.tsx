import SectionContainer from "@/components/layout/SectionContainer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ContactCTA() {
  return (
    <SectionContainer extraStyle="text-center">
      <h2 className="text-2xl font-semibold mb-4">Hai un&apos;idea? Parliamone.</h2>
      <p className="text-muted-foreground mb-6">
        Sono aperto a collaborazioni, sfide e proposte fuori dagli schemi.
      </p>
      <Link href="/contact">
        <Button>Contattami</Button>
      </Link>
    </SectionContainer>
  );
}
