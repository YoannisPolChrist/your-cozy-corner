import { motion } from "framer-motion";
import { AnimatedSection, AnimatedItem, StaggerContainer } from "@/components/AnimatedSection";
import gestalttherapieIntro from "@/assets/gestalttherapie-intro.png";

export const GestaltScrollTelling = () => {
  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: '#fdfbf7' }}>
      <div className="container mx-auto px-4">
        <AnimatedSection className="max-w-5xl mx-auto">
          <motion.img 
            src={gestalttherapieIntro} 
            alt="Was ist Gestalttherapie?" 
            className="w-full rounded-xl mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ boxShadow: '0 10px 40px rgba(30, 95, 116, 0.1)' }}
          />
          
          {/* Gold connector line from image to cards */}
          <div className="flex justify-center mb-8">
            <div className="w-px h-12 bg-gradient-to-b from-accent to-accent/30" />
          </div>
          
          <motion.div 
            className="p-10 md:p-14 rounded-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ backgroundColor: '#f7f5f0' }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-8">
              Was ist Gestalttherapie?
            </h2>
            <p className="text-foreground/80 text-lg leading-loose mb-10">
              Gestalttherapie ist ein <strong className="text-primary">humanistischer Therapieansatz</strong>, 
              der auf drei wesentlichen Grundpfeilern basiert:
            </p>
            <StaggerContainer className="grid md:grid-cols-3 gap-6 mb-10">
              <AnimatedItem>
                <div className="p-6 rounded-xl border-l-3" style={{ backgroundColor: 'rgba(30, 95, 116, 0.04)', borderLeftWidth: '3px', borderLeftColor: 'hsl(var(--accent))' }}>
                  <h3 className="text-accent font-semibold text-xl mb-3">1. Gewahrsein</h3>
                  <p className="text-sm text-foreground/60 mb-2 italic">Spüren statt Denken</p>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    Körper und Gefühle bewusst wahrnehmen. Im Moment verankert sein, ohne zu analysieren oder zu bewerten.
                  </p>
                </div>
              </AnimatedItem>
              <AnimatedItem>
                <div className="p-6 rounded-xl border-l-3" style={{ backgroundColor: 'rgba(30, 95, 116, 0.04)', borderLeftWidth: '3px', borderLeftColor: 'hsl(var(--accent))' }}>
                  <h3 className="text-accent font-semibold text-xl mb-3">2. Ganzheitlichkeit</h3>
                  <p className="text-sm text-foreground/60 mb-2 italic">Körper, Seele, Geist & Umfeld</p>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    Alle Aspekte des Menschseins als untrennbare Einheit betrachten. Nichts existiert isoliert.
                  </p>
                </div>
              </AnimatedItem>
              <AnimatedItem>
                <div className="p-6 rounded-xl border-l-3" style={{ backgroundColor: 'rgba(30, 95, 116, 0.04)', borderLeftWidth: '3px', borderLeftColor: 'hsl(var(--accent))' }}>
                  <h3 className="text-accent font-semibold text-xl mb-3">3. Kontakt & Dialog</h3>
                  <p className="text-sm text-foreground/60 mb-2 italic">Echte Begegnung auf Augenhöhe</p>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    Heilung geschieht im authentischen Dialog. In der Beziehung zwischen Therapeut und Klient entsteht Veränderung.
                  </p>
                </div>
              </AnimatedItem>
            </StaggerContainer>
            <motion.div 
              className="p-6 rounded-xl border-l-4 border-primary"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ backgroundColor: 'rgba(30, 95, 116, 0.08)' }}
            >
              <p className="text-foreground/80 leading-relaxed">
                <strong className="text-primary">Gestalttherapie</strong> bedeutet, im gegenwärtigen Moment 
                <strong className="text-primary"> ganz präsent</strong> zu sein und die eigene Wahrnehmung zu schärfen. 
                Durch achtsame Selbsterfahrung werden alte Muster erkannt und neue Wege der Begegnung möglich.
              </p>
            </motion.div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default GestaltScrollTelling;
