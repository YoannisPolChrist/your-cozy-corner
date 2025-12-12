import { motion } from "framer-motion";
import { AnimatedSection, AnimatedItem, StaggerContainer } from "@/components/AnimatedSection";
import gestaltDamalsJetzt from "@/assets/gestalt-damals-jetzt.png";
import cardGewahrsein from "@/assets/card-gewahrsein.jpg";
import cardGanzheitlichkeit from "@/assets/card-ganzheitlichkeit.jpg";
import cardKontakt from "@/assets/card-kontakt.jpg";
import { useLanguage } from "@/i18n";
export const GestaltScrollTelling = () => {
  const {
    t
  } = useLanguage();
  return <section className="pt-[28px] pb-12 md:pt-[68px] md:pb-32 bg-off-white">
      <div className="container mx-auto px-4">
        <AnimatedSection className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-6 md:mb-10" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }}>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-primary mb-2">
              Gestalttherapie
            </h1>
            <p className="text-lg md:text-xl text-foreground/70">
              Humanistisches Erleben. Selbstentfaltung
            </p>
          </motion.div>
          <motion.img alt="Gestalttherapie - Damals & Dort zu Hier & Jetzt" className="w-full rounded-xl mb-6 md:mb-12" loading="eager" decoding="async"
        // @ts-ignore - fetchPriority is valid HTML attribute
        fetchPriority="high" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }} style={{
          boxShadow: '0 10px 40px rgba(30, 95, 116, 0.1)'
        }} src="/lovable-uploads/baeef6bd-c138-4333-9c96-043aaf6502c3.png" />

          {/* Gold connector line from image to cards - hidden on mobile */}
          <div className="hidden md:flex justify-center mb-8">
            <div className="w-px h-12 bg-gradient-to-b from-accent to-accent/30" />
          </div>

          <motion.div className="p-5 md:p-14 rounded-2xl bg-secondary">
            <h2 className="font-heading text-2xl md:text-4xl font-bold text-primary mb-4 md:mb-8 text-center">
              {t.gestalttherapie.scrollTelling.title}
            </h2>
            <p className="text-foreground/80 text-base md:text-lg leading-relaxed md:leading-loose mb-8 md:mb-12 text-center max-w-3xl mx-auto">
              {t.gestalttherapie.scrollTelling.intro}
            </p>

            {/* Pillar 1: Image left, Text right */}
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-8 md:mb-12 items-center" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }}>
              <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                <img alt="Gewahrsein - Spüren statt Denken" className="w-full h-full object-cover" src="/lovable-uploads/faa811b8-b250-4326-837c-5e135fcd2b61.png" />
              </div>
              <div className="p-4 md:p-6">
                
                <h3 className="text-primary font-heading font-bold text-xl md:text-2xl mb-3">
                  {t.gestalttherapie.scrollTelling.pillars[0].title}
                </h3>
                <p className="text-foreground/60 italic text-sm mb-3">
                  {t.gestalttherapie.scrollTelling.pillars[0].subtitle}
                </p>
                <p className="text-foreground/70 leading-relaxed">
                  {t.gestalttherapie.scrollTelling.pillars[0].description}
                </p>
              </div>
            </motion.div>

            {/* Pillar 2: Text left, Image right */}
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-8 md:mb-12 items-center" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.1
          }}>
              <div className="p-4 md:p-6 order-2 md:order-1">
                
                <h3 className="text-primary font-heading font-bold text-xl md:text-2xl mb-3">
                  {t.gestalttherapie.scrollTelling.pillars[1].title}
                </h3>
                <p className="text-foreground/60 italic text-sm mb-3">
                  {t.gestalttherapie.scrollTelling.pillars[1].subtitle}
                </p>
                <p className="text-foreground/70 leading-relaxed">
                  {t.gestalttherapie.scrollTelling.pillars[1].description}
                </p>
              </div>
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] order-1 md:order-2">
                <img alt="Ganzheitlichkeit - Körper, Seele, Geist & Umfeld" className="w-full h-full object-cover" src="/lovable-uploads/ed513495-a95f-4b6d-afaa-8f239f06589c.png" />
              </div>
            </motion.div>

            {/* Pillar 3: Image left, Text right */}
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-8 md:mb-12 items-center" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }}>
              <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                <img src={cardKontakt} alt="Kontakt & Dialog - Echte Begegnung auf Augenhöhe" className="w-full h-full object-cover" />
              </div>
              <div className="p-4 md:p-6">
                
                <h3 className="text-primary font-heading font-bold text-xl md:text-2xl mb-3">
                  {t.gestalttherapie.scrollTelling.pillars[2].title}
                </h3>
                <p className="text-foreground/60 italic text-sm mb-3">
                  {t.gestalttherapie.scrollTelling.pillars[2].subtitle}
                </p>
                <p className="text-foreground/70 leading-relaxed">
                  {t.gestalttherapie.scrollTelling.pillars[2].description}
                </p>
              </div>
            </motion.div>

            <motion.div className="p-4 md:p-6 rounded-xl border-l-4 border-primary bg-primary/[0.08]" initial={{
            opacity: 0,
            x: -20
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.4
          }}>
              <p className="text-foreground/80 text-sm md:text-base leading-relaxed">
                {t.gestalttherapie.scrollTelling.summary}
              </p>
            </motion.div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>;
};
export default GestaltScrollTelling;