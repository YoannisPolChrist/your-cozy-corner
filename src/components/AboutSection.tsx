import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="uebermich" className="py-20 bg-off-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 to-gold-accent/20 rounded-2xl"></div>
            </div>

            <div className="order-1 md:order-2">
              <h2 className="font-heading text-4xl md:text-5xl mb-6 text-primary">
                Über mich
              </h2>
              
              <p className="text-xl text-muted-foreground italic mb-8 leading-relaxed">
                Ich bin Johannes Christ, Gestalttherapeut, Coach und Psychologe (M.Sc.). 
                Meine Arbeit basiert auf der Überzeugung, dass echte Veränderung entsteht, 
                wenn wir die Verbindung zwischen unseren Gedanken, Gefühlen und unserem Körper verstehen.
              </p>

              <Card className="p-6 bg-background mb-8">
                <p className="text-foreground leading-relaxed">
                  Mit meiner Erfahrung in Gestalttherapie und Coaching begleite ich Sie auf dem Weg zu 
                  mehr Klarheit, Wohlbefinden und Erfüllung.
                </p>
              </Card>

              <Button variant="gold" className="font-semibold">
                Mehr über mich erfahren <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
