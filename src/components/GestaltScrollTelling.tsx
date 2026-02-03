import { motion } from "framer-motion";
import { AnimatedSection, AnimatedItem, StaggerContainer } from "@/components/AnimatedSection";
import gestalttherapieIntro from "@/assets/gestalttherapie-intro.webp";
import { useLanguage } from "@/i18n";
export const GestaltScrollTelling = () => {
  const {
    t
  } = useLanguage();
  // React expects the lowercase attribute (`fetchpriority`), but framer-motion's TS types don't include it.
  const imgFetchPriorityProps = {
    fetchpriority: "high",
  } as const as unknown as Record<string, string>;
  return <section className="pt-16 pb-12 md:pt-32 md:pb-32 bg-off-white">
    <div className="container mx-auto px-4">
      <AnimatedSection className="max-w-5xl mx-auto">
        <motion.img {...imgFetchPriorityProps} alt={t.gestalttherapie.scrollTelling.title} className="w-full rounded-xl mb-6 md:mb-12" loading="eager" decoding="async" initial={{
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
        }} src="/assets/images/a1f9adf6-b700-4003-a692-6327154bf5bc.webp" />

        {/* Gold connector line from image to cards - hidden on mobile */}
        <div className="hidden md:flex justify-center mb-8">
          <div className="w-px h-12 bg-gradient-to-b from-accent to-accent/30" />
        </div>

        <motion.div className="p-5 md:p-14 rounded-2xl bg-off-white shadow-lg">
          <h2 className="typ-h2 font-bold text-primary mb-4 md:mb-8">
            {t.gestalttherapie.scrollTelling.title}
          </h2>
          <p className="typ-body text-foreground/80 mb-6 md:mb-10">
            {t.gestalttherapie.scrollTelling.intro}
          </p>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-10">
            {t.gestalttherapie.scrollTelling.pillars.map((pillar, index) => <AnimatedItem key={index}>
              <div className="p-4 md:p-6 rounded-xl border-l-[3px] border-accent bg-primary/[0.04] transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-lg cursor-default">
                <h3 className="typ-h4 text-accent font-semibold mb-2 md:mb-3">
                  {pillar.title}
                </h3>
                <p className="typ-small text-foreground/60 mb-1 md:mb-2 italic">
                  {pillar.subtitle}
                </p>
                <p className="typ-small text-foreground/70">
                  {pillar.description}
                </p>
              </div>
            </AnimatedItem>)}
          </StaggerContainer>
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
            <p className="typ-body text-foreground/80">
              {t.gestalttherapie.scrollTelling.summary}
            </p>
          </motion.div>
        </motion.div>
      </AnimatedSection>
    </div>
  </section>;
};
export default GestaltScrollTelling;