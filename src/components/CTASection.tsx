import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";

export const CTASection = () => {
  const scrollToContact = () => {
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-gradient-teal text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-heading text-4xl md:text-5xl mb-6">
          Bereit für Veränderung?
        </h2>
        <p className="text-xl mb-10 max-w-3xl mx-auto italic leading-relaxed">
          Kontaktieren Sie mich für ein kostenloses Erstgespräch. Gemeinsam schauen wir, 
          wie ich Sie unterstützen kann.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={scrollToContact}
            size="lg"
            className="bg-white text-primary hover:bg-white/90 font-semibold px-8"
          >
            Termin vereinbaren <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8"
          >
            <Phone className="mr-2 h-5 w-5" />
            Anrufen
          </Button>
        </div>
      </div>
    </section>
  );
};
