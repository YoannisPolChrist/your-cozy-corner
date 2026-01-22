import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Sparkles, Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import johannesHeroPortrait from "@/assets/johannes-hero-portrait.png";
import conversationWindow from "@/assets/conversation-window.webp";
import johannesPersoenlich from "@/assets/johannes-persoenlich-neu.webp";
import johannesMeet from "@/assets/johannes-meet.webp";
import { Footer } from "@/components/Footer";
import {
  fadeUp,
  staggerContainer,
  goldFrameVariants,
  imageVariants,
  viewportSettings
} from "@/lib/animations";
import { useLanguage } from "@/i18n";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Parallax wrapper component for images
const ParallaxImageWrapper = ({
  src,
  alt,
  className = "",
  aspectRatio = "aspect-[3/4]"
}: {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);

  return (
    <motion.div
      ref={ref}
      variants={imageVariants}
      className={`relative ${aspectRatio} rounded-2xl overflow-hidden shadow-xl`}
    >
      <motion.img
        src={src}
        alt={alt}
        className={`w-full h-full ${className}`}
        style={{ y, scale }}
      />
    </motion.div>
  );
};

const UeberMich = () => {
  const { t, getLocalizedPath } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        {/* Section 1: About Me - Off-White Background */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
          className="pt-12 md:pt-[68px] pb-16 md:pb-32 bg-off-white"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-16 items-center">
                {/* Mobile-only: Title at top */}
                <motion.div variants={staggerContainer} className="space-y-2 md:hidden order-1">
                  <motion.span
                    variants={fadeUp}
                    className="block text-[#c5a065] font-medium tracking-[0.2em] uppercase text-xs"
                  >
                    {t.ueberMich.hero.label}
                  </motion.span>
                  <motion.h1
                    variants={fadeUp}
                    className="font-heading text-2xl text-primary leading-tight"
                  >
                    {t.ueberMich.hero.title}
                  </motion.h1>
                </motion.div>

                {/* Image with Gold Frame - Shows after title on mobile, left on desktop */}
                <motion.div className="relative order-2 md:order-1 max-w-sm md:max-w-md mx-auto md:mx-0">
                  {/* Gold Frame - Slides out from behind with delay */}
                  <motion.div
                    variants={goldFrameVariants}
                    className="absolute bottom-[8px] right-[8px] md:bottom-[20px] md:right-[20px] w-full h-full bg-[#c5a065] rounded-xl md:rounded-2xl"
                  />
                  {/* Main Image - Portrait Rectangle with Parallax */}
                  <ParallaxImageWrapper
                    src={johannesHeroPortrait}
                    alt="Johannes Christ - Gestalttherapeut"
                    className="object-cover object-center"
                    aspectRatio="aspect-[3/4]"
                  />
                </motion.div>

                {/* Text Content - Right Side on desktop, after image on mobile */}
                <motion.div variants={staggerContainer} className="space-y-4 md:space-y-6 order-3 md:order-2">
                  {/* Desktop-only: Title */}
                  <motion.span
                    variants={fadeUp}
                    className="hidden md:block text-[#c5a065] font-medium tracking-[0.2em] uppercase text-sm"
                  >
                    {t.ueberMich.hero.label}
                  </motion.span>
                  <motion.h1
                    variants={fadeUp}
                    className="hidden md:block font-heading text-[calc(3rem+3px)] text-primary leading-tight"
                  >
                    {t.ueberMich.hero.title}
                  </motion.h1>
                  <motion.div
                    variants={fadeUp}
                    className="space-y-3 md:space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base"
                  >
                    <p className="whitespace-pre-line">{t.ueberMich.hero.description1}</p>
                    <p>{t.ueberMich.hero.description2}</p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 2: Arbeitsweise - Deep Teal Background */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
          className="py-16 md:py-32 bg-primary"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-16 items-center">
                {/* Mobile-only: Title at top */}
                <motion.div variants={staggerContainer} className="space-y-2 md:hidden order-1">
                  <motion.span
                    variants={fadeUp}
                    className="block text-[#c5a065] font-medium tracking-[0.2em] uppercase text-xs"
                  >
                    {t.ueberMich.arbeitsweise.label}
                  </motion.span>
                  <motion.h2
                    variants={fadeUp}
                    className="font-heading text-2xl text-white leading-tight"
                  >
                    {t.ueberMich.arbeitsweise.title}
                  </motion.h2>
                </motion.div>

                {/* Image with Gold Frame - Shows after title on mobile */}
                <motion.div className="relative order-2 md:order-2">
                  <motion.div
                    variants={goldFrameVariants}
                    className="absolute bottom-[8px] left-[8px] md:bottom-[20px] md:left-[20px] w-full h-full bg-[#c5a065] rounded-xl md:rounded-2xl"
                  />
                  <ParallaxImageWrapper
                    src={conversationWindow}
                    alt="Therapeutische Arbeit"
                    className="object-cover"
                    aspectRatio="aspect-[4/3]"
                  />
                </motion.div>

                {/* Text Content - after image on mobile, left on desktop */}
                <motion.div variants={staggerContainer} className="space-y-4 md:space-y-6 order-3 md:order-1 text-left">
                  {/* Desktop-only: Title */}
                  <motion.span
                    variants={fadeUp}
                    className="hidden md:block text-[#c5a065] font-medium tracking-[0.2em] uppercase text-sm"
                  >
                    {t.ueberMich.arbeitsweise.label}
                  </motion.span>
                  <motion.h2
                    variants={fadeUp}
                    className="hidden md:block font-heading text-[calc(2.25rem+3px)] text-white leading-tight"
                  >
                    {t.ueberMich.arbeitsweise.title}
                  </motion.h2>
                  <motion.div
                    variants={fadeUp}
                    className="space-y-3 md:space-y-4 text-white/90 leading-relaxed text-sm md:text-base"
                  >
                    <p>{t.ueberMich.arbeitsweise.description1}</p>
                    <p>{t.ueberMich.arbeitsweise.description2}</p>
                    <p className="italic text-[#c5a065] font-heading text-base md:text-lg">{t.ueberMich.arbeitsweise.quote}</p>
                  </motion.div>

                  {/* Qualifications Accordion */}
                  <motion.div variants={fadeUp} className="pt-4">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="qualifikationen" className="border-[#c5a065]/30">
                        <AccordionTrigger className="text-white hover:text-[#c5a065] font-heading text-base md:text-lg">
                          {t.ueberMich.qualifikationen.title}
                        </AccordionTrigger>
                        <AccordionContent className="space-y-6 pt-4">
                          {/* Akademisch */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-[#c5a065]">
                              <GraduationCap className="w-5 h-5" />
                              <h4 className="font-semibold">{t.ueberMich.qualifikationen.akademisch.title}</h4>
                            </div>
                            <ul className="space-y-1 text-white/80 text-sm pl-7">
                              {t.ueberMich.qualifikationen.akademisch.items.map((item, idx) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Therapeutisch */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-[#c5a065]">
                              <Sparkles className="w-5 h-5" />
                              <h4 className="font-semibold">{t.ueberMich.qualifikationen.therapeutisch.title}</h4>
                            </div>
                            <ul className="space-y-1 text-white/80 text-sm pl-7">
                              {t.ueberMich.qualifikationen.therapeutisch.items.map((item, idx) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Coaching */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-[#c5a065]">
                              <Dumbbell className="w-5 h-5" />
                              <h4 className="font-semibold">{t.ueberMich.qualifikationen.coaching.title}</h4>
                            </div>
                            <ul className="space-y-1 text-white/80 text-sm pl-7">
                              {t.ueberMich.qualifikationen.coaching.items.map((item, idx) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 3: Persönlich - White Background */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
          className="py-16 md:py-32 bg-off-white"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-16 items-center">
                {/* Mobile-only: Title at top */}
                <motion.div variants={staggerContainer} className="space-y-2 md:hidden order-1">
                  <motion.span
                    variants={fadeUp}
                    className="block text-[#c5a065] font-medium tracking-[0.2em] uppercase text-xs"
                  >
                    {t.ueberMich.persoenlich.label}
                  </motion.span>
                  <motion.h2
                    variants={fadeUp}
                    className="font-heading text-2xl text-primary leading-tight"
                  >
                    {t.ueberMich.persoenlich.title}
                  </motion.h2>
                </motion.div>

                {/* Text Content - right on desktop, after title on mobile */}
                <motion.div variants={staggerContainer} className="space-y-4 md:space-y-6 order-3 md:order-2">
                  {/* Desktop-only: Title */}
                  <motion.span
                    variants={fadeUp}
                    className="hidden md:block text-[#c5a065] font-medium tracking-[0.2em] uppercase text-sm"
                  >
                    {t.ueberMich.persoenlich.label}
                  </motion.span>
                  <motion.h2
                    variants={fadeUp}
                    className="hidden md:block font-heading text-[calc(2.25rem+3px)] text-primary leading-tight"
                  >
                    {t.ueberMich.persoenlich.title}
                  </motion.h2>
                  <motion.div
                    variants={fadeUp}
                    className="space-y-3 md:space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base"
                  >
                    <p>{t.ueberMich.persoenlich.description1}</p>
                    <p>{t.ueberMich.persoenlich.description2}</p>
                  </motion.div>
                </motion.div>

                {/* Image with Gold Frame - Shows after title on mobile, left on desktop */}
                <motion.div className="relative order-2 md:order-1 max-w-sm md:max-w-md mx-auto md:mx-0">
                  <motion.div
                    variants={goldFrameVariants}
                    className="absolute bottom-[8px] right-[8px] md:bottom-[20px] md:right-[20px] w-full h-full bg-[#c5a065] rounded-xl md:rounded-2xl"
                  />
                  <ParallaxImageWrapper
                    src={johannesPersoenlich}
                    alt="Johannes Christ"
                    className="object-cover"
                    aspectRatio="aspect-[3/4]"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 4: Training - Deep Teal Background */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
          className="py-16 md:py-32 bg-primary"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-16 items-center">
                {/* Mobile-only: Title at top */}
                <motion.div variants={staggerContainer} className="space-y-2 md:hidden order-1">
                  <motion.span
                    variants={fadeUp}
                    className="block text-[#c5a065] font-medium tracking-[0.2em] uppercase text-xs"
                  >
                    {t.ueberMich.training?.label}
                  </motion.span>
                  <motion.h2
                    variants={fadeUp}
                    className="font-heading text-2xl text-white leading-tight"
                  >
                    {t.ueberMich.training?.title}
                  </motion.h2>
                </motion.div>

                {/* Image with Gold Frame - Shows after title on mobile */}
                <motion.div className="relative order-2 md:order-2">
                  <motion.div
                    variants={goldFrameVariants}
                    className="absolute bottom-[8px] left-[8px] md:bottom-[20px] md:left-[20px] w-full h-full bg-[#c5a065] rounded-xl md:rounded-2xl"
                  />
                  <ParallaxImageWrapper
                    src={johannesMeet}
                    alt="Johannes Christ - Personal Training"
                    className="object-cover"
                    aspectRatio="aspect-[4/3]"
                  />
                </motion.div>

                {/* Text Content - after image on mobile, left on desktop */}
                <motion.div variants={staggerContainer} className="space-y-4 md:space-y-6 order-3 md:order-1 text-left">
                  {/* Desktop-only: Title */}
                  <motion.span
                    variants={fadeUp}
                    className="hidden md:block text-[#c5a065] font-medium tracking-[0.2em] uppercase text-sm"
                  >
                    {t.ueberMich.training?.label}
                  </motion.span>
                  <motion.h2
                    variants={fadeUp}
                    className="hidden md:block font-heading text-[calc(2.25rem+3px)] text-white leading-tight"
                  >
                    {t.ueberMich.training?.title}
                  </motion.h2>
                  <motion.div
                    variants={fadeUp}
                    className="space-y-3 md:space-y-4 text-white/90 leading-relaxed text-sm md:text-base"
                  >
                    <p>{t.ueberMich.training?.description1}</p>
                    <p>{t.ueberMich.training?.description2}</p>
                    {t.ueberMich.training?.description3 && <p>{t.ueberMich.training.description3}</p>}
                  </motion.div>

                  <motion.div variants={fadeUp} className="pt-4">
                    <Link to={getLocalizedPath('/angebot')}>
                      <Button variant="gold" className="font-semibold">
                        Personal Training <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
          className="py-28 md:py-36 relative overflow-hidden bg-gradient-cta"
        >
          {/* Subtle gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-teal-navy/30" />

          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.h2
              variants={fadeUp}
              className="font-heading text-3xl md:text-4xl mb-8 text-white"
            >
              {t.ueberMich.cta.title}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-white/85 text-lg mb-10 max-w-2xl mx-auto"
            >
              {t.ueberMich.cta.description}
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link to={getLocalizedPath('/kontakt')}>
                <Button variant="gold" size="lg" className="font-semibold">
                  {t.ueberMich.cta.button} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default UeberMich;
