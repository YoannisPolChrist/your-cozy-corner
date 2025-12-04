import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-background">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl mb-8 text-primary italic leading-tight animate-fade-in">
            Ihr Weg zu innerer Stärke und Klarheit
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-muted-foreground animate-fade-in opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
            Gestalttherapie für persönliches Wachstum und erfüllte Beziehungen.
          </p>

          <Link to="/kontakt">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 py-6 text-lg animate-fade-in opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]"
            >
              Jetzt Erstgespräch vereinbaren
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
