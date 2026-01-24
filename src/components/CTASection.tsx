import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";

export const CTASection = () => {
  const scrollToContact = () => {
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 md:py-28 bg-gradient-cta text-white relative overflow-hidden">
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-teal-navy/30" />
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="typ-h2 mb-6 text-white">
          Bereit für Veränderung?
        </h2>
        <p className="typ-lead mb-10 max-w-3xl mx-auto italic text-white/85">
          Kontaktieren Sie mich für ein kostenloses Erstgespräch. Gemeinsam schauen wir, 
          wie ich Sie unterstützen kann.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={scrollToContact}
            variant="gold"
            size="lg"
            className="font-semibold"
          >
            Termin vereinbaren <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            variant="gold-outline"
            size="lg"
            className="font-semibold border-white text-white hover:bg-white hover:text-primary"
          >
            <Phone className="mr-2 h-5 w-5" />
            Anrufen
          </Button>
        </div>
      </div>
    </section>
  );
};
