import { motion } from "framer-motion";
import { AnimatedSection, AnimatedItem, StaggerContainer } from "@/components/AnimatedSection";
import gestaltDamalsJetzt from "@/assets/gestalt-damals-jetzt.png";
import cardGewahrsein from "@/assets/card-gewahrsein.jpg";
import cardGanzheitlichkeit from "@/assets/card-ganzheitlichkeit.jpg";
import cardKontakt from "@/assets/card-kontakt.jpg";
import { useLanguage } from "@/i18n";

const pillarImages = [cardGewahrsein, cardGanzheitlichkeit, cardKontakt];

export const GestaltScrollTelling = () => {
  const { t } = useLanguage();
  
  return (
    <section className="pt-[28px] pb-12 md:pt-[68px] md:pb-32 bg-off-white">
      <div className="container mx-auto px-4">
        <AnimatedSection className="max-w-5xl mx-auto">
          {/* Main Title */}
          <motion.div
            className="text-center mb-6 md:mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-primary mb-2">
              Gestalttherapie
            </h1>
            <p className="text-lg md:text-xl text-foreground/70">
              Humanistisches Erleben. Selbstentfaltung
            </p>
          </motion.div>

          {/* What is Gestalt Therapy - Title & Intro Text */}
          <motion.div
            className="p-5 md:p-14 rounded-2xl bg-secondary mb-6 md:mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-2xl md:text-4xl font-bold text-primary mb-4 md:mb-8">
              {t.gestalttherapie.scrollTelling.title}
            </h2>
            <p className="text-foreground/80 text-base md:text-lg leading-relaxed md:leading-loose">
              {t.gestalttherapie.scrollTelling.intro}
            </p>
          </motion.div>

          {/* 3 Pillar Images */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-10">
            {t.gestalttherapie.scrollTelling.pillars.map((pillar, index) => (
              <AnimatedItem key={index}>
                <div className="rounded-xl overflow-hidden shadow-lg transition-all duration-300 md:hover:-translate-y-2 md:hover:shadow-xl">
                  <img
                    src={pillarImages[index]}
                    alt={pillar.title}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
              </AnimatedItem>
            ))}
          </StaggerContainer>

          {/* Damals & Jetzt Image */}
          <motion.img
            alt="Gestalttherapie - Damals & Dort zu Hier & Jetzt"
            className="w-full rounded-xl mb-6 md:mb-12"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ boxShadow: '0 10px 40px rgba(30, 95, 116, 0.1)' }}
            src={gestaltDamalsJetzt}
          />

          {/* Summary */}
          <motion.div
            className="p-4 md:p-6 rounded-xl border-l-4 border-primary bg-primary/[0.08]"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-foreground/80 text-sm md:text-base leading-relaxed">
              {t.gestalttherapie.scrollTelling.summary}
            </p>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default GestaltScrollTelling;