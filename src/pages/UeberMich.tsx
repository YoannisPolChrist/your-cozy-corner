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
      <SEO title="Über Mich | Johannes Christ" description="Erfahren Sie mehr über Johannes Christ, Gestalttherapeut und Coach in Toulouse." dateModified="2026-02-25" />
      <Navigation />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative min-h-[90vh] flex items-center pt-24 md:pt-[100px] pb-16 md:pb-32 bg-primary overflow-hidden">
          <ThreeDBackground />
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-teal-navy/80 pointer-events-none" />
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
                <motion.div variants={staggerContainer} className="w-full lg:col-span-7 space-y-6 order-1 lg:order-2 z-10 text-center lg:text-left pt-8 lg:pt-0">
                  <motion.span variants={fadeUp} className="block text-accent font-medium tracking-[0.2em] uppercase text-xs md:text-sm">{t.ueberMich.hero.label}</motion.span>
                  <div className="mx-auto lg:mx-0 max-w-xl"><TextReveal text={t.ueberMich.hero.title} className="font-heading text-4xl md:text-5xl lg:text-6xl text-white leading-[1.15] mb-2" /></div>
                  <motion.p variants={fadeUp} className="text-accent font-medium text-lg md:text-xl">Gestalttherapeut, Coach & Körperarbeiter</motion.p>
                  <motion.div variants={fadeUp} className="text-base md:text-lg text-white/90 leading-relaxed font-light max-w-xl mx-auto lg:mx-0">
                    <p className="whitespace-pre-line">{t.ueberMich.hero.description1}</p>
                    <p>{t.ueberMich.hero.description2}</p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* CTA */}
        <AnimatedSection className="py-20 md:py-32 bg-off-white border-t border-accent/10">
          <div className="container mx-auto px-4 text-center">
            <StaggerContainer className="max-w-3xl mx-auto space-y-8">
              <AnimatedItem><h2 className="font-heading text-4xl md:text-5xl text-primary">{t.cta?.title || "Bereit für den nächsten Schritt?"}</h2></AnimatedItem>
              <AnimatedItem><p className="text-lg md:text-xl text-muted-foreground">{t.cta?.description || "Vereinbare ein kostenloses Kennenlerngespräch."}</p></AnimatedItem>
              <AnimatedItem className="pt-6">
                <Link to={getLocalizedPath('/kontakt')} onClick={scrollToTop}>
                  <Button variant="gold" size="lg" className="font-semibold text-lg px-8 py-6">{t.cta?.button || "Kontakt aufnehmen"} <ArrowRight className="ml-2 h-5 w-5" /></Button>
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
