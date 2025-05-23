import LayoutContainer from "@/components/layout/LayoutContainer";
import ContactForm from "@/components/custom/ContactForm";

export default function ContactPage() {
  return (
    <LayoutContainer>
      <section className="max-w-3xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-4">Contattaci</h1>
        <p className="text-muted-foreground mb-10">
          Hai domande, collaborazioni o proposte? Scrivici, ti risponderemo il prima possibile.
        </p>

        <ContactForm />
      </section>
    </LayoutContainer>
  );
}
