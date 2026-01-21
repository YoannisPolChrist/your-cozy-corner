import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { AnimatedSection, StaggerContainer, AnimatedItem } from "@/components/AnimatedSection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Brain, Compass, Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import johannesMeet from "@/assets/johannes-meet.jpg";
import { goldFrameVariants, imageVariants, viewportSettings } from "@/lib/animations";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/i18n";
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// Parallax component for About section
const AboutParallaxImage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);
  return <motion.div ref={ref} initial="hidden" whileInView="visible" viewport={viewportSettings} className="relative order-2 md:order-1">
    {/* Gold Frame - Slides out from behind with delay */}
    <motion.div variants={goldFrameVariants} className="absolute bottom-[-10px] right-[-10px] md:bottom-[-20px] md:right-[-20px] w-full h-full bg-accent rounded-2xl" />
    {/* Main image with parallax */}
    <div className="relative z-10 overflow-hidden rounded-2xl shadow-xl aspect-[4/5]">
      <motion.img variants={imageVariants} alt="Johannes Christ - Gestalttherapeut und Coach" className="w-full h-full object-cover object-center" style={{
        y,
        scale
      }} width={528} height={683} loading="lazy" decoding="async" src="/lovable-uploads/e688c494-51b1-4167-a52c-840cab4d93c5.jpg" />
    </div>
  </motion.div>;
};
const Index = () => {
  const {
    t,
    getLocalizedPath
  } = useLanguage();
  const serviceIcons = [Compass, Heart, Brain];
  return <div className="min-h-screen bg-background">
    <Navigation />
    <main>
      <Hero />

      {/* Meet Johannes Section - Overlapping Organic Card */}
      <section className="relative z-10 pb-20 md:pb-28 bg-off-white">
        <div className="container mx-auto px-4">
          <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1]
          }} className="max-w-5xl mx-auto -mt-24 md:-mt-32 lg:-mt-40">
            {/* Warm Glassmorphism Card */}
            <div className="rounded-3xl md:rounded-[2rem] p-8 md:p-12 lg:p-14 shadow-2xl border border-white/40" style={{
              background: 'linear-gradient(135deg, hsla(40, 25%, 96%, 0.92) 0%, hsla(38, 30%, 94%, 0.88) 100%)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.15), 0 10px 20px -8px rgba(0, 0, 0, 0.08)'
            }}>
              <div className="grid md:grid-cols-5 gap-10 md:gap-14 items-center">
                {/* Portrait - Johannes emerging from forest atmosphere */}
                <motion.div initial={{
                  opacity: 0,
                  scale: 0.95,
                  y: 20
                }} whileInView={{
                  opacity: 1,
                  scale: 1,
                  y: 0
                }} viewport={{
                  once: true
                }} transition={{
                  duration: 0.8,
                  delay: 0.1,
                  ease: [0.2, 0.8, 0.2, 1]
                }} className="md:col-span-2 order-1 max-w-sm md:max-w-md mx-auto">
                  <div className="relative">
                    {/* Atmospheric forest glow behind */}
                    <div className="absolute -inset-8 rounded-[3rem] opacity-60" style={{
                      background: 'radial-gradient(ellipse at center, hsl(160 40% 35% / 0.25) 0%, hsl(145 35% 25% / 0.15) 40%, transparent 70%)',
                      filter: 'blur(30px)'
                    }} />
                    {/* Soft light emanating from behind figure */}
                    <div className="absolute -inset-4 rounded-[2.5rem] opacity-50" style={{
                      background: 'radial-gradient(ellipse at 50% 30%, hsl(45 50% 90% / 0.6) 0%, transparent 60%)',
                      filter: 'blur(20px)'
                    }} />
                    {/* Deeper shadow for grounding */}
                    <div className="absolute inset-0 rounded-[2rem]" style={{
                      boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.3), 0 15px 30px -10px rgba(0, 0, 0, 0.15), 0 0 80px -20px hsl(160 40% 30% / 0.2)'
                    }} />
                    {/* Main image container with organic corners */}
                    <div className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] aspect-[4/5]">
                      {/* Forest atmosphere overlay at edges */}
                      <div className="absolute inset-0 z-10 pointer-events-none" style={{
                        background: 'radial-gradient(ellipse at 50% 50%, transparent 50%, hsl(160 30% 25% / 0.08) 100%)'
                      }} />
                      <motion.img alt="Johannes Christ – Gestalttherapeut und Coach, freundlicher Blickkontakt" className="w-full h-full object-cover object-top" style={{
                        filter: 'contrast(1.02) saturate(1.05)'
                      }} whileHover={{
                        scale: 1.03,
                        filter: 'contrast(1.04) saturate(1.08)'
                      }} transition={{
                        duration: 0.6,
                        ease: [0.2, 0.8, 0.2, 1]
                      }} width={550} height={736} loading="eager" decoding="async" src="/lovable-uploads/7ba139ec-2d72-4520-abf4-5660e7c3f8d0.webp" />
                      {/* Subtle vignette for emerging effect */}
                      <div className="absolute inset-0 pointer-events-none z-20" style={{
                        boxShadow: 'inset 0 0 60px rgba(0, 0, 0, 0.1), inset 0 -30px 60px -30px hsl(160 30% 20% / 0.15)'
                      }} />
                      {/* Top light highlight for emergence */}
                      <div className="absolute inset-x-0 top-0 h-1/3 pointer-events-none z-20" style={{
                        background: 'linear-gradient(to bottom, hsl(45 40% 95% / 0.1) 0%, transparent 100%)'
                      }} />
                    </div>
                  </div>
                </motion.div>

                {/* Content */}
                <div className="md:col-span-3 order-2">
                  <motion.h2 initial={{
                    opacity: 0,
                    y: 20
                  }} whileInView={{
                    opacity: 1,
                    y: 0
                  }} viewport={{
                    once: true
                  }} transition={{
                    duration: 0.8,
                    delay: 0.2,
                    ease: [0.2, 0.8, 0.2, 1]
                  }} className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] text-primary mb-6 leading-tight">
                    {t.meet.title}
                  </motion.h2>

                  <motion.p initial={{
                    opacity: 0,
                    y: 20
                  }} whileInView={{
                    opacity: 1,
                    y: 0
                  }} viewport={{
                    once: true
                  }} transition={{
                    duration: 0.8,
                    delay: 0.3,
                    ease: [0.2, 0.8, 0.2, 1]
                  }} className="text-muted-foreground text-base md:text-lg leading-relaxed whitespace-pre-line">
                    {t.meet.description}
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pain Points Section - Empathetic Narrative */}
      <AnimatedSection className="py-28 md:py-36 bg-off-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="font-heading text-[2.2rem] md:text-[2.7rem] mb-6 text-primary leading-tight">
              {t.painPoints.title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto italic">
              {t.painPoints.subtitle}
            </p>
          </div>

          <StaggerContainer className="grid md:grid-cols-2 gap-x-20 gap-y-16 max-w-4xl mx-auto">
            {t.painPoints.items.map((point, index) => <AnimatedItem key={index} className={`relative pl-8 ${index === 2 ? 'md:col-span-2 md:max-w-lg md:mx-auto' : ''}`}>
              <div className="absolute left-0 top-1 w-1 h-full bg-gradient-to-b from-primary/30 to-transparent rounded-full" />
              <h3 className="font-heading text-xl mb-4 text-primary">
                {point.title}
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {point.description}
              </p>
            </AnimatedItem>)}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      {/* Services Section - High-End Cards with Anchor Links */}
      <AnimatedSection className="py-28 md:py-36 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="font-heading text-[2.2rem] md:text-[2.7rem] mb-5 text-primary">
              {t.services.title}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t.services.subtitle}
            </p>
          </div>

          <StaggerContainer className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto mb-16">
            {t.services.items.map((service, index) => {
              const Icon = serviceIcons[index];
              const serviceAnchors = ['diagnostik', 'gestalttherapie', 'coaching'];
              return <AnimatedItem key={index}>
                <Link to={getLocalizedPath(`/angebot#${serviceAnchors[index]}`)} className="block h-full">
                  <Card className="p-10 bg-off-white border border-accent/20 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group relative overflow-hidden h-full cursor-pointer">
                    {/* Bottom border highlight on hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                    <div className="mb-6 flex justify-center">
                      <Icon className="w-12 h-12 text-accent group-hover:text-primary transition-colors duration-300" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-heading text-xl mb-4 text-primary">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </Card>
                </Link>
              </AnimatedItem>;
            })}
          </StaggerContainer>

          <div className="text-center">
            <Link to={getLocalizedPath('/angebot#konditionen')} onClick={scrollToTop}>
              <Button variant="gold" className="font-semibold">
                {t.services.cta} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* My Work Creative Link */}
      <AnimatedSection className="py-28 md:py-36 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <StaggerContainer className="grid md:grid-cols-2 gap-16 lg:gap-20 items-center">
              <AnimatedItem>
                <span className="text-gold-accent text-sm uppercase tracking-wider mb-5 block">
                  {t.gestaltSection.label}
                </span>
                <h2 className="font-heading text-4xl md:text-5xl text-white mb-8 leading-tight">
                  {t.myWorkSection?.title || "My Work"}
                </h2>
                <p className="text-white/85 text-lg leading-loose mb-10 whitespace-pre-line">
                  {t.myWorkSection?.description || "Change happens not just through thinking. While the mind understands, true movement only begins when feeling and logic interweave. If a change doesn't make holistic sense—both in your head and your heart—it won't stick. We use Diagnostics, Gestalt Therapy, and Coaching to bridge this gap and create lasting experience."}
                </p>
                <Link to={getLocalizedPath('/ansatz')} onClick={scrollToTop} className="inline-flex items-center text-gold-accent hover:text-gold-accent/80 font-medium text-lg group transition-colors duration-300">
                  {t.myWorkSection?.link || "More About My Work"}
                  <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                </Link>
              </AnimatedItem>
              <AnimatedItem className="relative flex justify-center">
                {/* Organic Breathing Quote Card - Fritz Perls Quote */}
                <motion.div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center" animate={{
                  scale: [1, 1.02, 1]
                }} transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}>
                  <motion.div className="absolute inset-0 backdrop-blur-md border border-white/20" style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    borderRadius: '60% 40% 50% 50% / 50% 60% 40% 50%'
                  }} animate={{
                    borderRadius: ['60% 40% 50% 50% / 50% 60% 40% 50%', '50% 60% 40% 60% / 60% 40% 60% 40%', '40% 50% 60% 50% / 50% 50% 50% 60%', '60% 40% 50% 50% / 50% 60% 40% 50%']
                  }} transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }} />
                  <div className="relative z-10 text-center px-8">
                    <div className="font-heading text-7xl text-gold-accent mb-2 leading-none" style={{
                      marginTop: '-10px'
                    }}>
                      "
                    </div>
                    <p className="text-white/95 text-lg italic leading-relaxed font-heading whitespace-pre-line">
                      {t.myWorkSection?.quote || "Lose your mind and come to your senses.\n\n— Fritz Perls"}
                    </p>

                  </div>
                </motion.div>
              </AnimatedItem>
            </StaggerContainer>
          </div>
        </div>
      </AnimatedSection>

      {/* About Preview - Editorial Layout */}
      <AnimatedSection className="py-28 md:py-40 bg-off-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center max-w-6xl mx-auto">
            {/* Left Side - Image with Gold Frame Effect - Cinematic Parallax */}
            <AboutParallaxImage />

            {/* Right Side - Text */}
            <StaggerContainer className="order-1 md:order-2">
              <AnimatedItem>
                <span className="text-accent text-sm uppercase tracking-[0.2em] font-medium mb-4 block">
                  {t.aboutPreview.label}
                </span>
              </AnimatedItem>
              <AnimatedItem>
                <h2 className="font-heading text-4xl md:text-5xl mb-4 text-primary">
                  {t.aboutPreview.whyTitle}
                </h2>
              </AnimatedItem>
              <AnimatedItem>
                <p className="text-muted-foreground text-lg mb-4 leading-loose">
                  {t.aboutPreview.whyDescription1}
                </p>
              </AnimatedItem>
              <AnimatedItem>
                <p className="text-muted-foreground text-lg mb-6 leading-loose">
                  {t.aboutPreview.whyDescription2}
                </p>
              </AnimatedItem>
              <AnimatedItem>
                <Link to={getLocalizedPath('/ueber-mich')} onClick={scrollToTop} className="inline-flex items-center text-primary font-semibold text-lg group relative">
                  <span className="relative">
                    {t.aboutPreview.link}
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
                  </span>
                  <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                </Link>
              </AnimatedItem>
            </StaggerContainer>
          </div>
        </div>
      </AnimatedSection>

      {/* Personal Training Preview - Playful Section */}
      <AnimatedSection className="py-28 md:py-40 bg-primary relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-gold-accent/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <StaggerContainer>
              <AnimatedItem>
                <span className="text-gold-accent text-sm uppercase tracking-[0.2em] font-medium mb-4 block">
                  {t.personalTrainingPreview.label}
                </span>
              </AnimatedItem>
              <AnimatedItem>
                <h2 className="font-heading text-3xl md:text-5xl mb-6 text-white">
                  {t.personalTrainingPreview.title}
                </h2>
              </AnimatedItem>
              <AnimatedItem>
                <p className="text-white/85 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
                  {t.personalTrainingPreview.description}
                </p>
              </AnimatedItem>
              <AnimatedItem>
                <div className="flex justify-center items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                    <Dumbbell className="w-8 h-8 text-gold-accent" strokeWidth={1.5} />
                  </div>
                </div>
              </AnimatedItem>
              <AnimatedItem>
                <Link to={getLocalizedPath('/personal-training')} onClick={scrollToTop} className="inline-flex items-center text-gold-accent font-semibold text-lg group relative mt-8">
                  <span className="relative">
                    {t.personalTrainingPreview.link}
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gold-accent group-hover:w-full transition-all duration-300" />
                  </span>
                  <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                </Link>
              </AnimatedItem>
            </StaggerContainer>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-28 md:py-36 bg-gradient-cta text-white relative overflow-hidden">
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-teal-navy/30" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <StaggerContainer className="max-w-2xl mx-auto">
            <AnimatedItem>
              <h2 className="font-heading text-3xl md:text-4xl mb-8 text-white">
                {t.cta.title}
              </h2>
            </AnimatedItem>
            <AnimatedItem>
              <p className="text-white/85 text-lg mb-10">
                {t.cta.description}
              </p>
            </AnimatedItem>
            <AnimatedItem>
              <Link to={getLocalizedPath('/kontakt')} onClick={scrollToTop}>
                <Button variant="gold" size="lg" className="font-semibold">
                  {t.cta.buttonAlt} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </AnimatedItem>
          </StaggerContainer>
        </div>
      </AnimatedSection>
    </main>

    <Footer />
  </div>;
};
export default Index;