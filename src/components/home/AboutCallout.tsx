import SectionContainer from "@/components/layout/SectionContainer";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AboutCallout() {
  return (
    <SectionContainer extraStyle="py-16 text-center">
      <div className="max-w-screen-md mx-auto">
        <div className="flex flex-col md:flex-row-reverse gap-12">
          <div className="mt-10 w-48 h-48 md:w-64 md:h-64 hidden md:block">
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-accent">
              <Image src="/images/placeholder.svg" alt="" className="object-cover" fill />
            </div>
          </div>

          <div className="flex-1 md:text-left">
            <Badge variant="secondary" className="mb-4">
              About Me
            </Badge>

            <div className="mt-10 w-48 h-48 md:w-64 md:h-64 mt-3 mb-8 block md:hidden">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-accent">
                <Image src="/images/placeholder.svg" alt="" className="object-cover" fill />
              </div>
            </div>

            <h2 className="text-4xl font-bold mb-4 tracking-tight">Chi c&apos;è dietro KTC?</h2>

            <p className="text-muted-foreground mb-6 text-justify">
              Sono uno sviluppatore con background tecnico e mente creativa. Kill The Competition è
              il mio laboratorio per sperimentare, migliorare e distinguermi.
            </p>

            <div className="flex flex-wrap gap-4 justify-start">
              <Button className="rounded-full">
                {/* <GithubLogo /> */}
                View Github
              </Button>

              <Button variant="outline" className="rounded-full">
                {/* <Download /> */}
                Download CV
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
