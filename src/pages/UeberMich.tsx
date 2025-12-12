import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Brain, MessageCircle, GraduationCap, Sparkles, Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import johannesHeroPortrait from "@/assets/johannes-hero-portrait.png";
import conversationWindow from "@/assets/conversation-window.jpg";
import johannesLaughing from "@/assets/johannes-laughing.png";
import { Footer } from "@/components/Footer";
import {
  fadeUp,
  staggerContainer,
  goldFrameVariants,
  imageVariants,
  iconStagger,
  iconItem,
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
        {/* Section 1: Hero - White Background */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
          className="pt-[68px] pb-32 bg-white"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                {/* Image with Gold Frame - Cinematic Parallax */}
                <motion.div className="relative">
                  {/* Gold Frame - Slides out from behind with delay */}
                  <motion.div
                    variants={goldFrameVariants}
                    className="absolute bottom-[10px] right-[10px] md:bottom-[20px] md:right-[20px] w-full h-full bg-[#c5a065] rounded-2xl"
                  />
                  {/* Main Image with Parallax */}
                  <ParallaxImageWrapper
                    src={johannesHeroPortrait}
                    alt="Johannes Christ - Gestalttherapeut"
                    className="object-cover object-center"
                    aspectRatio="aspect-[3/4]"
                  />
                </motion.div>

                {/* Text Content */}
                <motion.div variants={staggerContainer} className="space-y-6 order-first md:order-last">
                  <motion.span
                    variants={fadeUp}
                    className="block text-[#c5a065] font-medium tracking-[0.2em] uppercase text-sm"
                  >
                    {t.ueberMich.hero.label}
                  </motion.span>
                  <motion.h1
                    variants={fadeUp}
                    className="font-heading text-[calc(2.25rem+3px)] md:text-[calc(3rem+3px)] text-primary leading-tight"
                  >
                    {t.ueberMich.hero.title}
                  </motion.h1>
                  <motion.div
                    variants={fadeUp}
                    className="space-y-4 text-muted-foreground leading-relaxed"
                  >
                    <p>{t.ueberMich.hero.description1}</p>
                    <p>{t.ueberMich.hero.description2}</p>
                  </motion.div>
                  
                  {/* Qualifications Accordion */}
                  <motion.div variants={fadeUp} className="pt-4">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="qualifikationen" className="border-[#c5a065]/20">
                        <AccordionTrigger className="text-primary hover:text-[#c5a065] font-heading text-lg">
                          {t.ueberMich.qualifikationen.title}
                        </AccordionTrigger>
                        <AccordionContent className="space-y-6 pt-4">
                          {/* Akademisch */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-[#c5a065]">
                              <GraduationCap className="w-5 h-5" />
                              <h4 className="font-semibold">{t.ueberMich.qualifikationen.akademisch.title}</h4>
                            </div>
                            <ul className="space-y-1 text-muted-foreground text-sm pl-7">
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
                            <ul className="space-y-1 text-muted-foreground text-sm pl-7">
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
                            <ul className="space-y-1 text-muted-foreground text-sm pl-7">
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

        {/* Section 2: Process - Deep Teal Background */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
          className="py-32 bg-primary"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                {/* Text Content - Left aligned */}
                <motion.div variants={staggerContainer} className="space-y-6 order-2 md:order-1 text-left">
                  <motion.span
                    variants={fadeUp}
                    className="block text-[#c5a065] font-medium tracking-[0.2em] uppercase text-sm"
                  >
                    {t.ueberMich.arbeitsweise.label}
                  </motion.span>
                  <motion.h2
                    variants={fadeUp}
                    className="font-heading text-[calc(1.875rem+3px)] md:text-[calc(2.25rem+3px)] text-white leading-tight text-left"
                  >
                    {t.ueberMich.arbeitsweise.title}
                  </motion.h2>
                  <motion.div
                    variants={fadeUp}
                    className="space-y-4 text-white/90 leading-relaxed text-left"
                  >
                    <p>{t.ueberMich.arbeitsweise.description1}</p>
                    <p>{t.ueberMich.arbeitsweise.description2}</p>
                  </motion.div>

                  {/* Gold Icons - Left aligned, larger */}
                  <motion.div
                    variants={iconStagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-8 pt-6"
                  >
                    <motion.div variants={iconItem} className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-full border border-[#c5a065]/40 flex items-center justify-center">
                        <Heart className="w-8 h-8 text-[#c5a065]" strokeWidth={1.5} />
                      </div>
                      <span className="text-sm font-medium text-white">{t.ueberMich.arbeitsweise.icons.koerper}</span>
                    </motion.div>
                    <motion.div variants={iconItem} className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-full border border-[#c5a065]/40 flex items-center justify-center">
                        <Brain className="w-8 h-8 text-[#c5a065]" strokeWidth={1.5} />
                      </div>
                      <span className="text-sm font-medium text-white">{t.ueberMich.arbeitsweise.icons.psyche}</span>
                    </motion.div>
                    <motion.div variants={iconItem} className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-full border border-[#c5a065]/40 flex items-center justify-center">
                        <MessageCircle className="w-8 h-8 text-[#c5a065]" strokeWidth={1.5} />
                      </div>
                      <span className="text-sm font-medium text-white">{t.ueberMich.arbeitsweise.icons.resonanz}</span>
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Image with Gold Frame - Cinematic Parallax */}
                <motion.div className="order-1 md:order-2 relative">
                  {/* Gold Frame - Slides out from behind with delay */}
                  <motion.div
                    variants={goldFrameVariants}
                    className="absolute bottom-[10px] left-[10px] md:bottom-[20px] md:left-[20px] w-full h-full bg-[#c5a065] rounded-2xl"
                  />
                  {/* Main Image with Parallax */}
                  <ParallaxImageWrapper
                    src={conversationWindow}
                    alt="Therapeutische Arbeit"
                    className="object-cover"
                    aspectRatio="aspect-[4/3]"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 3: Personal - Off-White Background (Image Left / Text Right) */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
          className="py-32 bg-off-white"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                {/* Image with Gold Frame - Left Side */}
                <motion.div className="relative">
                  {/* Gold Frame - Slides out from behind with delay */}
                  <motion.div
                    variants={goldFrameVariants}
                    className="absolute bottom-[10px] right-[10px] md:bottom-[20px] md:right-[20px] w-full h-full bg-[#c5a065] rounded-2xl"
                  />
                  {/* Main Image - Portrait Rectangle with Parallax */}
                  <ParallaxImageWrapper
                    src={johannesLaughing}
                    alt="Johannes Christ lachend"
                    className="object-cover"
                    aspectRatio="aspect-[3/4]"
                  />
                </motion.div>

                {/* Text Content - Right Side */}
                <motion.div variants={staggerContainer} className="space-y-6">
                  <motion.span
                    variants={fadeUp}
                    className="block text-[#c5a065] font-medium tracking-[0.2em] uppercase text-sm"
                  >
                    {t.ueberMich.persoenlich.label}
                  </motion.span>
                  <motion.h2
                    variants={fadeUp}
                    className="font-heading text-[calc(1.875rem+3px)] md:text-[calc(2.25rem+3px)] text-primary leading-tight"
                  >
                    {t.ueberMich.persoenlich.title}
                  </motion.h2>
                  <motion.div
                    variants={fadeUp}
                    className="space-y-4 text-muted-foreground leading-relaxed"
                  >
                    <p>{t.ueberMich.persoenlich.description1}</p>
                    <p>{t.ueberMich.persoenlich.description2}</p>
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
