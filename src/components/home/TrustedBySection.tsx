import SectionContainer from "@/components/layout/SectionContainer";

import { Logo01, Logo02, Logo03, Logo04, Logo05, Logo06 } from "@/components/custom/logos";

import Marquee from "react-fast-marquee";

const testimonials = [
  {
    title: "5+ anni di esperienza in ambienti produttivi",
    description:
      "Dallo sviluppo di un marketplace SPA in Vue per il settore edile, fino alla creazione e ottimizzazione di eCommerce su Shopify, ho lavorato in contesti reali con requisiti veri e utenti attivi.",
  },
  {
    title: "Codice usato da utenti reali ogni giorno",
    description:
      "Ho costruito da zero un'applicazione single-page con Vue, Vuex e Vue Router per la gestione di progetti edili e compravendita di materiali, poi ho sviluppato interfacce su misura per store Shopify in produzione.",
  },
  {
    title: "Gestione autonoma di task, deadline e comunicazione",
    description:
      "Ho lavorato con team distribuiti e metodologie agili, prendendomi carico di task end-to-end: dalla stesura di logiche complesse all'integrazione API, fino al confronto diretto con stakeholder.",
  },
  {
    title: "Collaborazione con team cross-funzionali",
    description:
      "In EdilGo ero in costante contatto con product owner e backend developer. In Underscore District ho collaborato con PM, designer e altri dev per realizzare esperienze utente concrete e performanti.",
  },
  {
    title: "Contributo a piattaforme complesse",
    description:
      "Che si trattasse di flussi multipagina gestiti via router o di componenti React dinamici ottimizzati per Shopify, ho contribuito a progetti con architetture reali, scalabili, e manutenibili.",
  },
  {
    title: "Conoscenza pratica del ciclo di vita software",
    description:
      "Ho esperienza completa: setup iniziale, versionamento Git, ambiente di sviluppo condiviso, pull request, testing e rilasci in produzione. Tutto su codebase vive.",
  },
];

type TrustedByProps = {
  extraStyle?: string;
};

export default function TrustedBy({ extraStyle }: TrustedByProps) {
  return (
    <SectionContainer fullWidth={true} extraStyle={extraStyle}>
      <div className="flex justify-center items-center">
        <div>
          <h2 className="mb-14 text-5xl md:text-6xl font-bold text-center tracking-tight text-zinc-900 dark:text-zinc-100">
            Collaborazioni, progetti, impatto
          </h2>
          <div className="max-w-screen-xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="relative mb-8 rounded-xl p-6 break-inside-avoid bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl text-zinc-900 dark:text-zinc-100">{testimonial.title}</h3>
                </div>
                <p className="mt-5 text-[17px] text-zinc-700 dark:text-zinc-300">
                  {testimonial.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Marquee gradient={false} speed={50}>
          <div className="mx-20">
            <Logo01 />
          </div>
          <div className="mx-20 bg-white p-5">
            <Logo02 />
          </div>
          <div className="mx-20 bg-white p-3">
            <Logo03 />
          </div>
          <div className="mx-20 bg-white p-2">
            <Logo04 />
          </div>
          <div className="mx-20">
            <Logo05 />
          </div>
          <div className="mx-20 bg-white p-2">
            <Logo06 />
          </div>
        </Marquee>
      </div>
    </SectionContainer>
  );
}
