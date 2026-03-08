import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Sparkles, Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ThreeDBackground } from "@/components/ThreeDBackground";
import { TextReveal } from "@/components/ui/text-reveal";
import johannesHeroPortrait from "@/assets/johannes-hero-portrait.webp";
import johannesCoachingTalk from "@/assets/johannes-coaching-new.jpg";
import johannesPersoenlich from "@/assets/johannes-persoenlich-neu.webp";
import johannesSpeed from "@/assets/johannes-speed.webp";
import johannesCyclingFriends from "@/assets/johannes-cycling-friends.webp";
import johannesBodywork1 from "@/assets/johannes-bodywork-new-1.jpg";
import johannesBodywork2 from "@/assets/johannes-bodywork-new-2.jpg";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { AnimatedSection, AnimatedItem, StaggerContainer } from "@/components/AnimatedSection";
import { fadeUp, staggerContainer, goldFrameVariants, imageVariants, viewportSettings } from "@/lib/animations";
import { useLanguage } from "@/i18n";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const scrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };

const ParallaxImageWrapper = ({ src, alt, className = "", aspectRatio = "aspect-[3/4]" }: { src: string; alt: string; className?: string; aspectRatio?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);
  return (
    <motion.div ref={ref} variants={imageVariants} className={`relative ${aspectRatio} rounded-2xl overflow-hidden shadow-xl`}>
      <motion.img src={src} alt={alt} className={`w-full h-full ${className}`} style={{ y, scale }} />
    </motion.div>
  );
};

const UeberMich = () => {
  const { t, language, getLocalizedPath } = useLanguage();
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  return (
    <div className="min-h-screen bg-background">
      <SEO title={`${t.nav.ueberMich} | Johannes Christ`} description={t.ueberMich.hero.description1}
        schema={{ "@context": "https://schema.org", "@type": "Person", "name": "Johannes Christ", "jobTitle": t.ueberMich.hero.byline ?? 'Gestalt Therapist & Coach', "hasCredential": [{ "@type": "EducationalOccupationalCredential", "credentialCategory": "degree", "recognizedBy": { "@type": "Organization", "name": "Akademie für Handgemachte Psychotherapie / Symbolon Institut" } }], "knowsAbout": ["Gestalttherapie", "Körperarbeit", "Coaching", "Achtsamkeit", "Psychologie"] }}
        breadcrumbs={[{ name: "Home", url: `/${language}` }, { name: t.nav.ueberMich, url: `/${language}/ueber-mich` }]}
        dateModified="2026-02-25"
      />
      <Navigation />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative min-h-[90vh] flex items-center pt-24 md:pt-[100px] pb-16 md:pb-32 bg-primary overflow-hidden">
          <ThreeDBackground />
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-teal-navy/80 pointer-events-none" />
          <motion.div className="absolute top-20 -left-20 w-96 h-96 bg-gold-accent/10 rounded-full blur-[100px] pointer-events-none" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="container mx-auto px-4 relative z-10" initial="hidden" whileInView="visible" viewport={viewportSettings} variants={staggerContainer}>
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <motion.div variants={fadeUp} className="w-full lg:col-span-5 relative order-2 lg:order-1 px-4 sm:px-0">
                  <div className="relative w-full max-w-sm lg:max-w-md mx-auto">
                    <motion.div variants={goldFrameVariants} className="absolute bottom-4 left-4 md:bottom-6 md:-left-6 w-full h-full bg-accent rounded-2xl" />
                    <div className="relative z-10 w-full rounded-2xl overflow-hidden shadow-2xl">
                      <ParallaxImageWrapper src={johannesHeroPortrait} alt="Johannes Christ - Gestalttherapeut" className="object-cover object-center w-full" aspectRatio="aspect-[4/5]" />
                    </div>
                  </div>
                </motion.div>
                <motion.div variants={staggerContainer} className="w-full lg:col-span-7 space-y-6 order-1 lg:order-2 z-10 text-center lg:text-left pt-8 lg:pt-0 lg:pr-8 xl:pr-12">
                  <motion.span variants={fadeUp} className="block text-accent font-medium tracking-[0.1em] md:tracking-[0.2em] uppercase text-xs md:text-sm break-words hyphens-auto">{t.ueberMich.hero.label}</motion.span>
                  <div className="mx-auto lg:mx-0 max-w-xl break-words">
                    <TextReveal text={t.ueberMich.hero.title} className="font-heading text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-white leading-[1.15] mb-2" />
                  </div>
                  <motion.p variants={fadeUp} className="text-accent font-medium text-lg md:text-xl break-words">{t.ueberMich.hero.byline ?? 'Gestalt Therapist, Coach & Bodyworker'}</motion.p>
                  <motion.div variants={fadeUp} className="text-base md:text-lg text-white/90 leading-relaxed font-light max-w-xl mx-auto lg:mx-0 break-words hyphens-auto">
                    <p className="whitespace-pre-line">{t.ueberMich.hero.description1}</p>
                    <p>{t.ueberMich.hero.description2}</p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-primary to-transparent" />
        </section>

        {/* Arbeitsweise */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportSettings} variants={staggerContainer} className="relative py-16 md:py-32 bg-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white to-off-white/40 pointer-events-none" />
          <motion.div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gold-accent/5 rounded-full blur-[120px] pointer-events-none" animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              {/* Heading */}
              <motion.div variants={staggerContainer} className="text-center mb-12">
                <motion.span variants={fadeUp} className="block text-accent font-medium tracking-[0.2em] uppercase text-sm mb-4">{t.ueberMich.arbeitsweise.label}</motion.span>
                <div className="max-w-2xl mx-auto">
                  <TextReveal text={t.ueberMich.arbeitsweise.title} className="font-heading text-4xl md:text-5xl leading-tight text-teal-navy m-0" />
                </div>
              </motion.div>

              {/* Image */}
              <motion.div className="relative max-w-lg mx-auto mb-12">
                <motion.div variants={goldFrameVariants} className="absolute -bottom-4 right-4 md:-bottom-6 md:right-6 w-full h-full bg-accent rounded-2xl" />
                <ParallaxImageWrapper src={johannesCoachingTalk} alt="Therapeutische Arbeit" className="object-cover relative z-10" aspectRatio="aspect-[3/4]" />
              </motion.div>

              {/* Text */}
              <motion.div variants={staggerContainer} className="max-w-3xl mx-auto space-y-6 md:space-y-8 text-center">
                <motion.div variants={fadeUp} className="flex flex-col items-center gap-4 pt-2 pb-6">
                  <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border border-teal-navy/10 bg-teal-navy/5 shadow-sm text-teal-navy font-medium hover:bg-white transition-colors w-fit">
                    <div className="w-8 h-8 rounded-full bg-gold-accent/20 flex items-center justify-center"><Sparkles className="w-4 h-4 text-gold-accent" /></div>
                    {t.ueberMich.hero.badges?.[0] ?? '8 years of practice & training'}
                  </div>
                  <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border border-teal-navy/10 bg-teal-navy/5 shadow-sm text-teal-navy font-medium hover:bg-white transition-colors w-fit">
                    <div className="w-8 h-8 rounded-full bg-teal-navy/10 flex items-center justify-center"><GraduationCap className="w-4 h-4 text-teal-navy" /></div>
                    <span className="text-teal-navy">{t.ueberMich.hero.badges?.[1] ?? 'M.Sc. Psychology & Counseling (in training)'}</span>
                  </div>
                </motion.div>
                <motion.div variants={fadeUp} className="text-base md:text-lg leading-relaxed space-y-6 text-teal-navy text-left md:text-center">
                  <p>{t.ueberMich.arbeitsweise.bodyP1}</p>
                  <p>{t.ueberMich.arbeitsweise.bodyP2Prefix}<strong className="text-accent font-semibold">{t.ueberMich.arbeitsweise.bodyP2Strong}</strong>{t.ueberMich.arbeitsweise.bodyP2Suffix}</p>
                  <p>{t.ueberMich.arbeitsweise.bodyP3} <span className="italic">{t.ueberMich.arbeitsweise.bodyP3Italic}</span></p>
                </motion.div>
                <motion.div variants={fadeUp} className="pt-6 max-w-2xl mx-auto">
                  <Accordion type="single" collapsible className="w-full bg-off-white rounded-2xl border border-teal-navy/10 px-6 py-2 shadow-sm">
                    <AccordionItem value="qualifikationen" className="border-none">
                      <AccordionTrigger className="text-teal-navy hover:text-accent font-heading text-xl md:text-2xl transition-colors py-4">{t.ueberMich.qualifikationen.title}</AccordionTrigger>
                      <AccordionContent className="space-y-8 pt-6 pb-6 border-t border-teal-navy/10 mt-2">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-accent"><GraduationCap className="w-5 h-5" /><h4 className="font-semibold text-teal-navy">{t.ueberMich.qualifikationen.akademisch.title}</h4></div>
                          <ul className="space-y-1 text-teal-navy text-sm pl-7 text-left">{t.ueberMich.qualifikationen.akademisch.items.map((item, idx) => (<li key={idx}>{item}</li>))}</ul>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-accent"><Sparkles className="w-5 h-5" /><h4 className="font-semibold text-teal-navy">{t.ueberMich.qualifikationen.therapeutisch.title}</h4></div>
                          <ul className="space-y-1 text-teal-navy text-sm pl-7 text-left">{t.ueberMich.qualifikationen.therapeutisch.items.map((item, idx) => (<li key={idx}>{item}</li>))}</ul>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-accent"><Dumbbell className="w-5 h-5" /><h4 className="font-semibold text-teal-navy">{t.ueberMich.qualifikationen.coaching.title}</h4></div>
                          <ul className="space-y-1 text-teal-navy text-sm pl-7 text-left">{t.ueberMich.qualifikationen.coaching.items.map((item, idx) => (<li key={idx}>{item}</li>))}</ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Training */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportSettings} variants={staggerContainer} className="relative py-24 md:py-32 bg-off-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent pointer-events-none" />
          <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-accent/5 rounded-full blur-[120px] pointer-events-none" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              {/* Heading */}
              <motion.div variants={staggerContainer} className="text-center mb-12">
                <motion.span variants={fadeUp} className="block text-accent font-medium tracking-[0.2em] uppercase text-sm mb-4">{t.ueberMich.training?.label}</motion.span>
                <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl leading-tight text-primary pb-2">{t.ueberMich.training?.title}</motion.h2>
              </motion.div>

              {/* Image Carousel */}
              <motion.div className="relative max-w-lg mx-auto mb-12">
                <motion.div variants={goldFrameVariants} className="absolute bottom-4 -left-4 md:bottom-6 md:-left-6 w-full h-full bg-accent rounded-2xl" />
                <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[3/4] group z-10">
                  <Carousel plugins={[plugin.current]} className="w-full h-full" onMouseEnter={plugin.current.stop} onMouseLeave={plugin.current.reset}>
                    <CarouselContent className="h-full -ml-0">
                      <CarouselItem className="h-full pl-0"><img src={johannesSpeed} alt="Johannes Christ - Triathlon Performance auf dem Rennrad" width={600} height={800} className="w-full h-full object-cover" loading="lazy" decoding="async" /></CarouselItem>
                      <CarouselItem className="h-full pl-0"><img src={johannesCyclingFriends} alt="Johannes Christ - Rennradfahren mit Freunden in der Natur" width={600} height={800} className="w-full h-full object-cover" loading="lazy" decoding="async" /></CarouselItem>
                      <CarouselItem className="h-full pl-0"><img src={johannesBodywork1} alt="Johannes Christ bodywork" width={600} height={800} className="w-full h-full object-cover" loading="lazy" decoding="async" /></CarouselItem>
                      <CarouselItem className="h-full pl-0"><img src={johannesBodywork2} alt="Johannes Christ bodywork practice" width={600} height={800} className="w-full h-full object-cover" loading="lazy" decoding="async" /></CarouselItem>
                    </CarouselContent>
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      <CarouselPrevious className="relative inset-0 translate-y-0 h-8 w-8 bg-white/80 hover:bg-white text-primary border-none opacity-0 group-hover:opacity-100 transition-opacity" />
                      <CarouselNext className="relative inset-0 translate-y-0 h-8 w-8 bg-white/80 hover:bg-white text-primary border-none opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Carousel>
                </div>
              </motion.div>

              {/* Text */}
              <motion.div variants={fadeUp} className="text-base md:text-lg leading-relaxed space-y-5 text-muted-foreground max-w-3xl mx-auto text-center">
                <p className="whitespace-pre-line">{t.ueberMich.training?.description1}</p>
                <p className="whitespace-pre-line">{t.ueberMich.training?.description2}</p>
                <p className="whitespace-pre-line">{t.ueberMich.training?.description3}</p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Persönliches */}
        <motion.section initial="hidden" whileInView="visible" viewport={viewportSettings} variants={staggerContainer} className="pb-16 md:pb-32 pt-16 md:pt-32 bg-primary">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-teal-navy/30 pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
                <motion.div variants={staggerContainer} className="space-y-6 md:space-y-8 order-1 md:order-1 text-center md:text-left pt-8 md:pt-0 pb-8 md:pb-0">
                  <motion.span variants={fadeUp} className="block text-accent font-medium tracking-[0.2em] uppercase text-sm md:text-sm">{t.ueberMich.persoenlich?.label}</motion.span>
                  <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl leading-tight text-white pb-2">{t.ueberMich.persoenlich?.title}</motion.h2>
                  <motion.div variants={fadeUp} className="text-base md:text-lg leading-relaxed space-y-5 text-white/80 mx-auto md:mx-0 max-w-xl">
                    <p>{t.ueberMich.persoenlich?.description1}</p>
                    <p className="italic text-white font-medium">{t.ueberMich.persoenlich?.description2}</p>
                  </motion.div>
                </motion.div>
                <motion.div variants={fadeUp} className="relative order-2 md:order-2 px-4 sm:px-0">
                  <motion.div variants={goldFrameVariants} className="absolute bottom-4 -left-4 md:bottom-6 md:-left-6 w-full h-full bg-accent rounded-3xl" />
                  <div className="relative z-10 w-full overflow-hidden rounded-3xl shadow-xl border border-primary/5">
                    <ParallaxImageWrapper src={johannesPersoenlich} alt="Johannes Christ - Persönlich" className="object-cover object-center w-full" aspectRatio="aspect-[4/5]" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <AnimatedSection className="py-20 md:py-32 bg-off-white border-t border-accent/10">
          <div className="container mx-auto px-4 text-center">
            <StaggerContainer className="max-w-3xl mx-auto space-y-8">
              <AnimatedItem><h2 className="font-heading text-4xl md:text-5xl text-primary">{t.cta?.title || "Bereit für den nächsten Schritt?"}</h2></AnimatedItem>
              <AnimatedItem><p className="text-lg md:text-xl text-muted-foreground">{t.cta?.description || "Vereinbare ein kostenloses Kennenlerngespräch oder ruf einfach durch, um herauszufinden, ob eine Zusammenarbeit sinnvoll ist."}</p></AnimatedItem>
              <AnimatedItem className="pt-6">
                <Link to={getLocalizedPath('/kontakt')} onClick={scrollToTop}>
                  <div className="relative inline-block group">
                    <motion.div className="absolute -inset-1 rounded-full bg-gold-accent opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.35, 0.15] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
                    <Button variant="gold" size="lg" className="font-semibold text-lg px-8 py-6 relative z-10 transition-transform duration-300 hover:scale-[1.02]">
                      {t.cta?.button || "Kontakt aufnehmen"} <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
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

export default UeberMich;
