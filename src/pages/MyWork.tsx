import { Navigation } from "@/components/Navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { AnimatedSection, AnimatedItem, StaggerContainer } from "@/components/AnimatedSection";
import { Heart, Brain, Palette, ArrowRight, Activity, Compass, HeartPulse, Dumbbell, Target, Zap, Map, BarChart3 } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
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

  const ressourcenIcons = [Heart, Brain, Palette];
  const diagnosticsIcons = [Activity, BarChart3, HeartPulse];
  const coachingIcons = [Dumbbell, Target, Zap];
  const checkupIcons = [Activity, BarChart3, Map];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24">
        {/* Hero Section with H1 */}
        <section className="py-12 md:py-20 bg-off-white">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-heading text-4xl md:text-6xl text-primary mb-24"
            >
              {t.myWork?.hero?.title || "Approach"}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-16"
            >
              {t.myWork?.hero?.subtitle}
            </motion.p>

            {/* Icon Navigation - Three Pillars */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center items-stretch gap-6 md:gap-12 lg:gap-20"
            >
              <a
                href="#gestalt"
                onClick={(e) => handleSmoothScroll(e, 'gestalt')}
                className="flex flex-col items-center gap-4 p-6 md:p-8 rounded-2xl bg-primary border border-accent/20 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group relative overflow-hidden cursor-pointer max-w-[200px] md:max-w-[240px]"
              >
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-sm group-hover:border-accent/30 group-hover:shadow-md flex items-center justify-center transition-all duration-300">
                  <Heart className="w-9 h-9 md:w-11 md:h-11 text-accent transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <span className="text-base md:text-lg font-heading font-semibold text-white text-center">
                  Gestalttherapie
                </span>
                <span className="text-xs md:text-sm text-white/80 text-center leading-relaxed px-2">
                  {t.myWork?.hero?.iconDescriptions?.gestalt || "Das Herz meiner Arbeit"}
                </span>
              </a>
              <a
                href="#coaching"
                onClick={(e) => handleSmoothScroll(e, 'coaching')}
                className="flex flex-col items-center gap-4 p-6 md:p-8 rounded-2xl bg-primary border border-accent/20 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group relative overflow-hidden cursor-pointer max-w-[200px] md:max-w-[240px]"
              >
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-sm group-hover:border-accent/30 group-hover:shadow-md flex items-center justify-center transition-all duration-300">
                  <Brain className="w-9 h-9 md:w-11 md:h-11 text-accent transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <span className="text-base md:text-lg font-heading font-semibold text-white text-center">
                  Coaching
                </span>
                <span className="text-xs md:text-sm text-white/80 text-center leading-relaxed px-2">
                  {t.myWork?.hero?.iconDescriptions?.coaching || "Inkl. Diagnostik"}
                </span>
              </a>
              <Link
                to={getLocalizedPath('/personal-training')}
                className="flex flex-col items-center gap-4 p-6 md:p-8 rounded-2xl bg-primary border border-accent/20 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group relative overflow-hidden cursor-pointer max-w-[200px] md:max-w-[240px]"
              >
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-sm group-hover:border-accent/30 group-hover:shadow-md flex items-center justify-center transition-all duration-300">
                  <Dumbbell className="w-9 h-9 md:w-11 md:h-11 text-accent transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <span className="text-base md:text-lg font-heading font-semibold text-white text-center">
                  {t.personalTraining?.nav || "Personal Training"}
                </span>
                <span className="text-xs md:text-sm text-white/80 text-center leading-relaxed px-2">
                  Körperarbeit in Toulouse
                </span>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Gestalt Therapy Section */}
        <section id="gestalt" className="scroll-mt-24">
          {/* Gestalt Intro - Dark teal background like Coaching */}
          <div className="py-20 md:py-32 bg-primary relative z-10">
            {/* Decorative snaking lines - flowing from top to bottom along the sides */}
            <svg className="absolute inset-0 w-full h-[1800px] z-20 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1000 1200">
              {/* Left side - snaking lines flowing down from center */}
              <path d="M0,0 C60,60 50,100 50,180 S80,280 40,350 S60,420 -20,500 S-100,600 -400,700" stroke="rgba(180,80,60,0.45)" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M80,-30 C110,60 90,110 90,160 S120,260 80,330 S100,400 70,480 S0,580 -300,680" stroke="rgba(200,120,60,0.4)" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M160,-10 C180,70 130,120 130,190 S160,290 120,360 S140,430 110,510 S80,610 -200,710" stroke="rgba(191,166,127,0.45)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <path d="M240,-30 C210,40 170,90 170,160 S200,260 160,340 S180,410 150,490 S150,590 -100,690" stroke="rgba(180,80,60,0.35)" strokeWidth="3" fill="none" strokeLinecap="round" />

              {/* Right side - snaking lines flowing down from center (mirrored) */}
              <path d="M1000,0 C940,60 950,100 950,180 S920,280 960,350 S940,420 1020,500 S1100,600 1400,700" stroke="rgba(180,80,60,0.45)" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M920,-30 C890,60 910,110 910,160 S880,260 920,330 S900,400 930,480 S1000,580 1300,680" stroke="rgba(200,120,60,0.4)" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M840,-10 C820,70 870,120 870,190 S840,290 880,360 S860,430 890,510 S920,610 1200,710" stroke="rgba(191,166,127,0.45)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <path d="M760,-30 C790,40 830,90 830,160 S800,260 840,340 S820,410 850,490 S850,590 1100,690" stroke="rgba(180,80,60,0.35)" strokeWidth="3" fill="none" strokeLinecap="round" />
            </svg>

            <div className="container mx-auto px-4 relative z-30">
              <AnimatedSection className="max-w-5xl mx-auto">
                <motion.div
                  className="p-5 md:p-14 rounded-2xl bg-white/10 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="text-gold-accent text-sm uppercase tracking-widest font-medium mb-4 block">
                    Das Herzstück meiner Arbeit
                  </span>
                  <h2 className="font-heading text-2xl md:text-4xl font-bold text-white mb-4 md:mb-8">
                    {t.gestalttherapie?.gestaltIntro?.title || "Die Gestalttherapie"}
                  </h2>
                  <p className="text-white/85 text-base md:text-lg leading-relaxed md:leading-loose">
                    {t.gestalttherapie?.gestaltIntro?.description || "Gestalttherapie ist ein humanistischer, erlebnisorientierter Therapieansatz, der den Menschen als Ganzes betrachtet."}
                  </p>
                </motion.div>
              </AnimatedSection>
            </div>
          </div>

          <GestaltScrollTelling />

          {/* Kontaktzyklus */}
          <div className="pt-4 pb-12 md:pt-8 md:pb-32 bg-off-white">
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
                  className="p-5 md:p-14 rounded-2xl bg-off-white shadow-lg"
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
          <div className="pt-4 pb-12 md:pt-8 md:pb-32 bg-background">
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
                  className="p-5 md:p-14 rounded-2xl bg-off-white shadow-lg"
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
                className="p-5 md:p-14 rounded-2xl bg-white shadow-xl border border-accent/50"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-gold-accent text-sm uppercase tracking-widest font-medium mb-4 block">
                  {t.myWork?.coaching?.label || "Holomotion Coaching"}
                </span>
                <h2 className="font-heading text-2xl md:text-4xl font-bold text-primary mb-4 md:mb-8">
                  {t.myWork?.coaching?.title || "Coaching"}
                </h2>
                <p className="text-foreground/80 text-base md:text-lg leading-relaxed md:leading-loose mb-6 md:mb-10">
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
                        <div className="text-center p-4 md:p-6 rounded-2xl transition-all duration-300 md:hover:-translate-y-1 bg-primary shadow-lg border border-accent/20 h-full flex flex-col">
                          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-5 bg-white/10">
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

        {/* Personal Training Section */}
        <section id="personal-training" className="py-16 md:py-32 bg-off-white scroll-mt-24">
          <div className="container mx-auto px-4">
            <AnimatedSection className="max-w-5xl mx-auto">
              <motion.div
                className="p-5 md:p-14 rounded-2xl bg-primary relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gold-accent/10 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-accent/10 blur-2xl" />

                <div className="relative z-10">
                  <span className="text-gold-accent text-sm uppercase tracking-widest font-medium mb-4 block">
                    {t.personalTrainingPreview?.label || "Die dritte Dimension"}
                  </span>
                  <h2 className="font-heading text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6">
                    {t.personalTrainingPreview?.title || "Der Körper als Tor zur Veränderung"}
                  </h2>
                  <p className="text-white/85 text-base md:text-lg leading-relaxed md:leading-loose mb-8">
                    {t.personalTrainingPreview?.description || "Veränderung beginnt oft dort, wo Worte aufhören: im Körper."}
                  </p>

                  {/* Service highlights */}
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    {t.personalTraining?.services?.slice(0, 3).map((service, index) => (
                      <div key={index} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                        <h3 className="font-heading font-semibold text-white mb-2">{service.title}</h3>
                        <p className="text-white/70 text-sm">{service.description}</p>
                      </div>
                    )) || (
                        <>
                          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                            <h3 className="font-heading font-semibold text-white mb-2">Performance Training</h3>
                            <p className="text-white/70 text-sm">Kraft, Ausdauer und funktionelle Fitness für deine Ziele.</p>
                          </div>
                          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                            <h3 className="font-heading font-semibold text-white mb-2">Bewegungstherapie</h3>
                            <p className="text-white/70 text-sm">Prävention, Rehabilitation und Stressabbau durch Bewegung.</p>
                          </div>
                          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                            <h3 className="font-heading font-semibold text-white mb-2">Motivation & Begleitung</h3>
                            <p className="text-white/70 text-sm">Dranbleiben wird einfacher mit dem richtigen Sparringspartner.</p>
                          </div>
                        </>
                      )}
                  </div>

                  {/* Location badge */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10">
                      <span className="text-gold-accent text-sm">{t.personalTraining?.location?.city || "Toulouse, Frankreich"}</span>
                    </div>
                  </div>

                  <Link to={getLocalizedPath('/personal-training')} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <Button variant="gold" className="font-semibold">
                      {t.personalTrainingPreview?.link || "Personal Training entdecken"} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA with gradient */}
        <AnimatedSection className="py-16 md:py-36 bg-off-white relative overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <StaggerContainer className="max-w-2xl mx-auto">
              <AnimatedItem>
                <h2 className="font-heading text-2xl md:text-4xl mb-4 md:mb-8 text-primary">
                  {t.myWork?.cta?.title || t.gestalttherapie.cta.title}
                </h2>
              </AnimatedItem>
              <AnimatedItem>
                <p className="text-muted-foreground text-base md:text-lg mb-6 md:mb-10">
                  {t.myWork?.cta?.description || t.gestalttherapie.cta.description}
                </p>
              </AnimatedItem>
              <AnimatedItem>
                <Link to={getLocalizedPath('/angebot#konditionen')}>
                  <Button variant="gold" size="default" className="font-semibold">
                    {t.myWork?.cta?.button || "Zum Angebot"} <ArrowRight className="ml-2 h-4 w-4" />
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
