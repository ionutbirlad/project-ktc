"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import SectionContainer from "@/components/layout/SectionContainer";

import { Download, ArrowRight, Linkedin, Github } from "lucide-react";

type AboutIntroProps = {
  extraStyle?: string;
  fullWidth?: boolean;
};

export default function AboutIntro({ extraStyle, fullWidth }: AboutIntroProps) {
  return (
    <SectionContainer extraStyle={extraStyle} fullWidth={fullWidth}>
      <div className="max-w-xl mx-auto mb-10">
        {/* <h2 className="text-3xl font-bold mb-4">Chi sono</h2>
        <p className="text-muted-foreground text-lg">
          Sono uno sviluppatore full stack con un passato tra economia e frontend. Dopo anni in
          agenzie e startup, oggi costruisco progetti su misura che uniscono estetica, performance e
          strategia.
        </p> */}

        <div className="my-10 flex scroll-mt-96 flex-col items-center gap-5 text-center sm:mt-28">
          <div>
            <Link href="#contact" className="flex items-center gap-3 rounded border px-3 py-1">
              <span className="relative flex size-2">
                <span className="absolute flex size-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative flex size-2 rounded-full bg-green-400"></span>
              </span>
              <span className="font-mono text-sm">Available for work!</span>
            </Link>
          </div>
          <div className="font-heading max-w-3xl text-4xl font-extrabold md:text-5xl">
            Hi I&#39;m a{" "}
            <span className="bg-gradient-to-r from-rose-700 to-pink-600 bg-clip-text text-transparent">
              Frontend
            </span>{" "}
            developer creating modern web apps.
          </div>
          <div className="text-muted-foreground max-w-xl">
            A frontend developer based in the Poland. I&#39;m passionate about building modern web
            applications using Next.js, React, and Tailwind CSS.
          </div>
          <div className="flex flex-row gap-2">
            <Button asChild size="lg">
              <Link href="#contact">
                Get in touch <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="hidden sm:flex" asChild>
              <a href="/michalskolak.pdf" download>
                Download CV <Download className="ml-2 size-4" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link
                href="https://www.linkedin.com/in/micha%C5%82-skolak-06905524b"
                aria-label="Linkedin"
                target="_blank"
              >
                <Linkedin className="size-5" />
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link href="https://github.com/Skolaczk" aria-label="Github" target="_blank">
                <Github className="size-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div>
          CODER
          <Image
            className="block"
            src="/images/foto_cv.jpeg"
            width={500}
            height={500}
            alt="Picture of the author"
          />
        </div>
        <div>
          ENTREPENEUR
          <Image
            className="block"
            src="/images/foto_cv.jpeg"
            width={500}
            height={500}
            alt="Picture of the author"
          />
        </div>
      </div>
    </SectionContainer>
  );
}
