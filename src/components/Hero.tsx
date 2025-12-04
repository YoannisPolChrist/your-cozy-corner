import { Button } from "@/components/ui/button";

export const Hero = () => {
  const scrollToContact = () => {
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[600px] flex items-center justify-center bg-gradient-teal text-white">
      <div className="container mx-auto px-4 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl mb-6 animate-fade-in">
            Ihr Weg zu innerer Stärke und Klarheit
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-white/90 italic animate-fade-in opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
            Gestalttherapie für persönliches Wachstum und erfüllte Beziehungen
          </p>

          <Button
            onClick={scrollToContact}
            size="lg"
            className="bg-gold-accent hover:bg-gold-accent/90 text-white font-semibold px-8 animate-fade-in opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]"
          >
            Jetzt Erstgespräch vereinbaren →
          </Button>
        </div>
      </div>
    </section>
  );
};
