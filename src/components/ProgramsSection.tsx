import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, ArrowRight } from "lucide-react";

export const ProgramsSection = () => {
  return (
    <section className="py-20 bg-off-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="typ-h2 mb-4 text-primary">
            Meine Programme
          </h2>
          <p className="typ-lead text-muted-foreground italic">
            Strukturierte Programme für Ihre persönliche Entwicklung
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="overflow-hidden shadow-soft hover:shadow-teal transition-all duration-300">
            <div className="p-8">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gold-accent/10 flex items-center justify-center">
                    <Brain className="w-8 h-8 text-gold-accent" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="typ-h3 mb-2 text-primary">
                    Gestalt-Impuls: 4 Wochen zur Klarheit
                  </h3>
                  <p className="text-gold-accent font-semibold mb-4">4 Wochen</p>
                  <p className="typ-body text-muted-foreground mb-6">
                    Ein intensives Kurzprogramm zur ersten Orientierung und Stärkung Ihrer inneren Ressourcen. 
                    Dieses 4-wöchige Programm bietet Ihnen einen ersten tiefen Einblick in die Gestalttherapie. 
                    Durch wöchentliche Einzelsitzungen und gezielte Übungen lernen Sie, Ihre aktuellen 
                    Herausforderungen zu erkennen und erste Schritte zur Veränderung einzuleiten.
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-bold text-primary">899,99€</p>
                    <Button variant="gold">
                      Mehr erfahren <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-2 bg-gradient-gold"></div>
          </Card>
        </div>
      </div>
    </section>
  );
};
