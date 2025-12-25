import { Navigation } from "@/components/Navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { AnimatedSection, AnimatedItem, StaggerContainer } from "@/components/AnimatedSection";
import { Hand, Brain, Palette, ArrowRight, Activity, BarChart3, HeartPulse, Dumbbell, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import gestaltKontaktzyklus from "@/assets/gestalt-kontaktzyklus.webp";
import ressourcenUnterstuetzung from "@/assets/ressourcen-unterstuetzung.webp";
import { viewportSettings } from "@/lib/animations";
import { Footer } from "@/components/Footer";
import { GestaltScrollTelling } from "@/components/GestaltScrollTelling";
import { useLanguage } from "@/i18n";

const MyWork = () => {
  const { t, getLocalizedPath } = useLanguage();
  const location = useLocation();
  
  // Handle smooth scroll to section on page load
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location.hash]);

  const ressourcenIcons = [Hand, Brain, Palette];
  const diagnosticsIcons = [Activity, BarChart3, HeartPulse];
  const coachingIcons = [Dumbbell, Target, Zap];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24">
        {/* Hero Section with H1 */}
        <section className="py-16 md:py-24 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-heading text-4xl md:text-6xl text-white mb-6"
            >
              {t.myWork?.hero?.title || "My Work"}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/85 text-lg md:text-xl max-w-3xl mx-auto"
            >
              {t.myWork?.hero?.subtitle || "Gestalttherapie, Psychologische Diagnostik & Coaching – integriert für nachhaltige Veränderung."}
            </motion.p>
          </div>
        </section>

        {/* Diagnostics Section */}
        <section id="diagnostics" className="py-16 md:py-32 bg-off-white scroll-mt-24">
          <div className="container mx-auto px-4">
            <AnimatedSection className="max-w-5xl mx-auto">
              <motion.div
                className="p-5 md:p-14 rounded-2xl bg-white shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-accent text-sm uppercase tracking-widest font-medium mb-4 block">
                  {t.myWork?.diagnostics?.label || "Evidence-Based Assessment"}
                </span>
                <h2 className="font-heading text-2xl md:text-4xl font-bold text-primary mb-4 md:mb-8">
                  {t.myWork?.diagnostics?.title || "Psychologische Diagnostik"}
                </h2>
                <p className="text-foreground/80 text-base md:text-lg leading-relaxed md:leading-loose mb-6 md:mb-10">
                  {t.myWork?.diagnostics?.intro || "Precision through physiological data. We use sleep tracking, HRV monitoring, and evidence-based psychological assessment to create an objective baseline for your transformation journey."}
                </p>
                
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {(t.myWork?.diagnostics?.items || [
                    { title: "Vital Signs & Biomarkers", description: "Blood values, sleep quality, and stress indicators provide objective health metrics." },
                    { title: "Pattern Analysis", description: "Track routines and energy levels to identify where your system is under strain." },
                    { title: "Personalized Strategy", description: "Data-driven roadmap that goes beyond intuition for measurable progress." }
                  ]).map((item, index) => {
                    const Icon = diagnosticsIcons[index];
                    return (
                      <AnimatedItem key={index}>
                        <div className="text-center p-4 md:p-6 rounded-2xl transition-all duration-300 md:hover:-translate-y-1 bg-secondary/50">
                          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-5 bg-accent/15">
                            <Icon className="w-6 h-6 md:w-7 md:h-7 text-accent" />
                          </div>
                          <h3 className="font-heading font-bold text-primary mb-2 md:mb-4 text-lg md:text-xl">
                            {item.title}
                          </h3>
                          <p className="text-foreground/70 leading-relaxed text-sm">
                            {item.description}
                          </p>
                        </div>
                      </AnimatedItem>
                    );
                  })}
                </StaggerContainer>
              </motion.div>
            </AnimatedSection>
          </div>
        </section>

        {/* Gestalt Therapy Section */}
        <section id="gestalt" className="scroll-mt-24">
          <GestaltScrollTelling />
          
          {/* Kontaktzyklus */}
          <div className="py-12 md:py-32 bg-off-white">
            <div className="container mx-auto px-4">
              <AnimatedSection className="max-w-5xl mx-auto">
                <motion.img
                  src={gestaltKontaktzyklus}
                  alt={t.gestalttherapie.kontaktzyklus.title}
                  className="w-full rounded-xl mb-6 md:mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  style={{ boxShadow: '0 10px 40px rgba(30, 95, 116, 0.1)' }}
                />

                <div className="hidden md:flex justify-center mb-8">
                  <div className="w-px h-12 bg-gradient-to-b from-accent to-accent/30" />
                </div>

                <motion.div
                  className="p-5 md:p-14 rounded-2xl bg-secondary"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h2 className="font-heading text-2xl md:text-4xl font-bold text-primary mb-4 md:mb-8">
                    {t.gestalttherapie.kontaktzyklus.title}
                  </h2>
                  <p className="text-foreground/80 text-base md:text-lg leading-relaxed md:leading-loose mb-6 md:mb-10">
                    {t.gestalttherapie.kontaktzyklus.intro}
                  </p>
                  <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 mb-6 md:mb-10">
                    {t.gestalttherapie.kontaktzyklus.phases.map((phase, index) => (
                      <AnimatedItem key={index}>
                        <div className="p-3 md:p-5 rounded-xl border-l-[3px] border-accent bg-primary/[0.04]">
                          <p className="text-foreground/80">
                            <span className="text-accent font-semibold text-base md:text-lg">
                              {phase.title}
                            </span>
                            {phase.subtitle && (
                              <span className="text-xs md:text-sm text-foreground/50"> ({phase.subtitle})</span>
                            )}
                            <br />
                            <span className="text-xs md:text-sm text-foreground/70">{phase.description}</span>
                          </p>
                        </div>
                      </AnimatedItem>
                    ))}
                  </StaggerContainer>
                  <motion.div
                    className="p-4 md:p-6 rounded-xl border-l-4 border-primary bg-primary/[0.08]"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <p className="text-foreground/80 text-sm md:text-base leading-relaxed">
                      {t.gestalttherapie.kontaktzyklus.summary}
                    </p>
                  </motion.div>
                </motion.div>
              </AnimatedSection>
            </div>
          </div>

          {/* Ressourcen */}
          <div className="py-12 md:py-32 bg-background">
            <div className="container mx-auto px-4">
              <AnimatedSection className="max-w-5xl mx-auto">
                <motion.img
                  src={ressourcenUnterstuetzung}
                  alt={t.gestalttherapie.ressourcen.title}
                  className="w-full rounded-xl mb-6 md:mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  style={{ boxShadow: '0 10px 40px rgba(30, 95, 116, 0.1)' }}
                />

                <div className="hidden md:flex flex-col items-center mb-8">
                  <div className="w-px h-8 bg-gradient-to-b from-accent to-accent/50" />
                  <div className="w-3 h-3 border-b-2 border-r-2 border-accent rotate-45 -mt-1" />
                </div>

                <motion.div
                  className="p-5 md:p-14 rounded-2xl bg-secondary"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h2 className="font-heading text-2xl md:text-4xl font-bold text-primary mb-4 md:mb-8">
                    {t.gestalttherapie.ressourcen.title}
                  </h2>
                  <p className="text-foreground/80 text-base md:text-lg leading-relaxed md:leading-loose mb-6 md:mb-10">
                    {t.gestalttherapie.ressourcen.intro}
                  </p>
                  <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {t.gestalttherapie.ressourcen.items.map((item, index) => {
                      const Icon = ressourcenIcons[index];
                      return (
                        <AnimatedItem key={index}>
                          <div className="text-center p-4 md:p-6 rounded-2xl transition-all duration-300 md:hover:-translate-y-1 bg-primary/[0.04]">
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-5 bg-accent/15">
                              <Icon className="w-6 h-6 md:w-7 md:h-7 text-accent" />
                            </div>
                            <h3 className="font-heading font-bold text-primary mb-2 md:mb-4 text-lg md:text-xl">
                              {item.title}
                            </h3>
                            <p className="text-foreground/70 leading-relaxed text-sm">
                              {item.description}
                            </p>
                          </div>
                        </AnimatedItem>
                      );
                    })}
                  </StaggerContainer>
                </motion.div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Coaching Section */}
        <section id="coaching" className="py-16 md:py-32 bg-primary scroll-mt-24">
          <div className="container mx-auto px-4">
            <AnimatedSection className="max-w-5xl mx-auto">
              <motion.div
                className="p-5 md:p-14 rounded-2xl bg-white/10 backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-gold-accent text-sm uppercase tracking-widest font-medium mb-4 block">
                  {t.myWork?.coaching?.label || "Holomotion Coaching"}
                </span>
                <h2 className="font-heading text-2xl md:text-4xl font-bold text-white mb-4 md:mb-8">
                  {t.myWork?.coaching?.title || "Coaching"}
                </h2>
                <p className="text-white/85 text-base md:text-lg leading-relaxed md:leading-loose mb-6 md:mb-10">
                  {t.myWork?.coaching?.intro || "Holomotion Coaching combines cognitive strategy with body intelligence. When decisions don't just sound logical but also feel right in your gut, sustainable habits emerge naturally. We bridge the gap between what your mind knows and what your body needs."}
                </p>
                
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {(t.myWork?.coaching?.items || [
                    { title: "Embodied Strategy", description: "Integrate cognitive planning with somatic awareness for decisions that stick." },
                    { title: "Goal Alignment", description: "Clarify what truly matters and create actionable pathways forward." },
                    { title: "Sustainable Habits", description: "Build routines that honor both your ambitions and your wellbeing." }
                  ]).map((item, index) => {
                    const Icon = coachingIcons[index];
                    return (
                      <AnimatedItem key={index}>
                        <div className="text-center p-4 md:p-6 rounded-2xl transition-all duration-300 md:hover:-translate-y-1 bg-white/10">
                          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-5 bg-gold-accent/20">
                            <Icon className="w-6 h-6 md:w-7 md:h-7 text-gold-accent" />
                          </div>
                          <h3 className="font-heading font-bold text-white mb-2 md:mb-4 text-lg md:text-xl">
                            {item.title}
                          </h3>
                          <p className="text-white/70 leading-relaxed text-sm">
                            {item.description}
                          </p>
                        </div>
                      </AnimatedItem>
                    );
                  })}
                </StaggerContainer>
              </motion.div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA with gradient */}
        <AnimatedSection className="py-16 md:py-36 bg-gradient-cta text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-teal-navy/30" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <StaggerContainer className="max-w-2xl mx-auto">
              <AnimatedItem>
                <h2 className="font-heading text-2xl md:text-4xl mb-4 md:mb-8 text-white">
                  {t.gestalttherapie.cta.title}
                </h2>
              </AnimatedItem>
              <AnimatedItem>
                <p className="text-white/85 text-base md:text-lg mb-6 md:mb-10">
                  {t.gestalttherapie.cta.description}
                </p>
              </AnimatedItem>
              <AnimatedItem>
                <Link to={getLocalizedPath('/kontakt')}>
                  <Button variant="gold" size="default" className="font-semibold">
                    {t.gestalttherapie.cta.button} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </AnimatedItem>
            </StaggerContainer>
          </div>
        </AnimatedSection>
      </main>

      <Footer />
    </div>
  );
};

export default MyWork;
