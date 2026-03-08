import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const ProgramsSection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="typ-h2 mb-4 text-primary">
            Meine Programme
          </h2>
          <p className="typ-lead text-muted-foreground italic">
            Strukturierte Programme für Ihre persönliche Entwicklung
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card className="overflow-hidden shadow-soft hover:shadow-premium transition-all duration-700 border border-black/5 hover:border-gold-accent/20 group rounded-2xl bg-white/50 backdrop-blur-sm relative">
              {/* Organic Panning Hover Lighting */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden rounded-2xl pointer-events-none">
                <motion.div
                  className="absolute -inset-[100%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-accent/15 via-transparent to-transparent"
                  animate={{
                    x: ['-25%', '25%', '-25%'],
                    y: ['-25%', '25%', '-25%'],
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
              </div>

              <div className="p-8 md:p-10 relative z-10">
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold-accent/20 to-gold-accent/5 flex items-center justify-center relative group-hover:scale-110 transition-transform duration-500">
                      <div className="absolute inset-0 bg-gold-accent/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Brain className="w-10 h-10 text-gold-accent relative z-10" />
                      </motion.div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="typ-h3 mb-2 text-primary group-hover:text-teal-navy transition-colors duration-300">
                      Gestalt-Impuls: 4 Wochen zur Klarheit
                    </h3>
                    <p className="text-gold-accent font-medium tracking-wide uppercase text-sm mb-4">4 Wochen Intensivprogramm</p>
                    <p className="typ-body text-muted-foreground mb-8 leading-relaxed">
                      Ein intensives Kurzprogramm zur ersten Orientierung und Stärkung Ihrer inneren Ressourcen.
                      Dieses 4-wöchige Programm bietet Ihnen einen ersten tiefen Einblick in die Gestalttherapie.
                      Durch wöchentliche Einzelsitzungen und gezielte Übungen lernen Sie, Ihre aktuellen
                      Herausforderungen zu erkennen und erste Schritte zur Veränderung einzuleiten.
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-black/5">
                      <p className="text-3xl font-heading text-primary">899,99€</p>
                      <Button
                        size="lg"
                        className="bg-gold-accent hover:bg-gold-dark text-white rounded-full px-8 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                      >
                        Mehr erfahren <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-1.5 w-full bg-gradient-to-r from-teal-primary via-gold-accent to-teal-navy transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-out"></div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
