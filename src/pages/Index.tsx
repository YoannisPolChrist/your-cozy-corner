import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { AnimatedSection, StaggerContainer, AnimatedItem } from "@/components/AnimatedSection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Brain, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import johannesPortrait from "@/assets/johannes-portrait.png";
import johannesMeet from "@/assets/johannes-meet.jpg";
import { goldFrameVariants, imageVariants, viewportSettings } from "@/lib/animations";
import { Footer } from "@/components/Footer";
const painPoints = [{
  title: "Auf der Stelle treten",
  description: "Das Gefühl, auf der Stelle zu treten, obwohl Sie sich bewegen wollen. Alte Muster wiederholen sich, besonders in Beziehungen."
}, {
  title: "Distanz und Nähe",
  description: "Die Distanz zu anderen wächst, oder die Nähe fühlt sich erdrückend an. Gespräche drehen sich im Kreis."
}, {
  title: "Nebel der Unklarheit",
  description: "Der Wunsch nach Klarheit ist da, aber der nächste Schritt bleibt im Nebel verborgen."
}];
const services = [{
  icon: Heart,
  title: "Therapie",
  description: "Tiefgreifende Arbeit an emotionalen Themen"
}, {
  icon: Brain,
  title: "Coaching",
  description: "Fokussierte Entwicklung Ihrer Potenziale"
}, {
  icon: Lightbulb,
  title: "Diagnostik",
  description: "Professionelle Einordnung und Klarheit"
}];
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// Parallax component for Meet section
const MeetParallaxImage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);
  return <motion.div ref={ref} initial={{
    opacity: 0,
    y: 20
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true,
    amount: 0.3
  }} transition={{
    duration: 0.6
  }} className="md:col-span-2 order-1 overflow-hidden rounded-xl aspect-[4/5]">
      <motion.img src={johannesMeet} alt="Johannes Christ – Gestalttherapeut und Coach, freundlicher Blickkontakt" className="w-full h-full object-cover object-top" style={{
      y,
      scale
    }} />
    </motion.div>;
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
  return <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />

        {/* Meet Johannes Section - Overlapping Organic Card */}
        <section className="relative z-10 pb-20 md:pb-28 bg-gradient-to-b from-transparent via-warm-sand/50 to-warm-sand">
          <div className="container mx-auto px-4">
            <motion.div initial={{
            opacity: 0,
            y: 50
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true,
            amount: 0.15
          }} transition={{
            duration: 1,
            ease: [0.2, 0.8, 0.2, 1]
          }} className="max-w-5xl mx-auto -mt-28 md:-mt-36 lg:-mt-40">
              {/* Warm Glassmorphism Card */}
              <div className="rounded-3xl md:rounded-[2rem] p-8 md:p-12 lg:p-14 shadow-2xl border border-white/40" style={{
              background: 'linear-gradient(135deg, hsla(40, 25%, 96%, 0.92) 0%, hsla(38, 30%, 94%, 0.88) 100%)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.15), 0 10px 20px -8px rgba(0, 0, 0, 0.08)'
            }}>
                <div className="grid md:grid-cols-5 gap-10 md:gap-14 items-center">
                  {/* Portrait - Organic Rounded Shape with Depth */}
                  <motion.div initial={{
                  opacity: 0,
                  scale: 0.9,
                  y: 20
                }} whileInView={{
                  opacity: 1,
                  scale: 1,
                  y: 0
                }} viewport={{
                  once: true
                }} transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.2, 0.8, 0.2, 1]
                }} className="md:col-span-2 order-1">
                    <div className="relative">
                      {/* Layered organic shadows for depth */}
                      <div className="absolute -inset-3 rounded-[2.5rem] opacity-40" style={{
                      background: 'linear-gradient(135deg, hsl(190 75% 30% / 0.15), hsl(40 45% 55% / 0.1))',
                      filter: 'blur(20px)'
                    }} />
                      <div className="absolute inset-0 rounded-[2rem] shadow-xl" style={{
                      boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.2), 0 8px 16px -6px rgba(0, 0, 0, 0.1)'
                    }} />
                      {/* Main image container with organic corners */}
                      <div className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] aspect-[4/5]">
                        <motion.img src={johannesMeet} alt="Johannes Christ – Gestalttherapeut und Coach, freundlicher Blickkontakt" className="w-full h-full object-cover object-top" whileHover={{
                        scale: 1.04
                      }} transition={{
                        duration: 0.5,
                        ease: [0.2, 0.8, 0.2, 1]
                      }} />
                        {/* Subtle inner vignette for depth */}
                        <div className="absolute inset-0 pointer-events-none" style={{
                        boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.08)'
                      }} />
                      </div>
                    </div>
                  </motion.div>

                  {/* Content */}
                  <motion.div initial={{
                  opacity: 0,
                  y: 30
                }} whileInView={{
                  opacity: 1,
                  y: 0
                }} viewport={{
                  once: true
                }} transition={{
                  duration: 0.8,
                  delay: 0.35,
                  ease: [0.2, 0.8, 0.2, 1]
                }} className="md:col-span-3 order-2">
                    <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] text-primary mb-6 leading-tight">
                      Johannes kennenlernen
                    </h2>
                    
                    <div className="space-y-4 text-gray-700 text-base md:text-lg leading-relaxed mb-8">
                      <p>
                        Ich begleite Menschen, die spüren, dass etwas in Bewegung kommen darf – 
                        auch wenn der Weg noch unklar ist.
                      </p>
                      <p>
                        Meine Arbeit ist geprägt von Ruhe, Präsenz und einem tiefen Vertrauen 
                        in die Kraft des Augenblicks.
                      </p>
                    </div>

                    <p className="text-sm text-gray-500/90 mb-8 tracking-wide">
                      Praxis in Frankfurt · Online & vor Ort
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link to="/kontakt" onClick={scrollToTop}>
                        <Button variant="gold" size="lg" className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-shadow">
                          Erstgespräch buchen
                        </Button>
                      </Link>
                      <Link to="/ueber-mich" onClick={scrollToTop}>
                        <Button variant="outline" size="lg" className="w-full sm:w-auto border-primary/25 text-primary hover:bg-primary/5 hover:border-primary/40 transition-all">
                          Mehr erfahren
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
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
                Wenn der innere Kompass stillsteht
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto italic">
                Oft spüren wir, dass etwas fehlt, lange bevor wir es benennen können.
              </p>
            </div>

            <StaggerContainer className="grid md:grid-cols-2 gap-x-20 gap-y-16 max-w-4xl mx-auto">
              {painPoints.map((point, index) => <AnimatedItem key={index} className={`relative pl-8 ${index === 2 ? 'md:col-span-2 md:max-w-lg md:mx-auto' : ''}`}>
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

        {/* Services Section - High-End Cards */}
        <AnimatedSection className="py-28 md:py-36 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="font-heading text-[2.2rem] md:text-[2.7rem] mb-5 text-primary">
                Mein Angebot
              </h2>
              <p className="text-muted-foreground text-lg">
                Individuelle Räume für Ihre Entwicklung
              </p>
            </div>

            <StaggerContainer className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto mb-16">
              {services.map((service, index) => {
              const Icon = service.icon;
              return <AnimatedItem key={index}>
                    <Card className="p-10 bg-off-white border border-accent/20 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group relative overflow-hidden h-full">
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
                  </AnimatedItem>;
            })}
            </StaggerContainer>

            <div className="text-center">
              <Link to="/angebot" onClick={scrollToTop}>
                <Button variant="gold" className="font-semibold">
                  Alle Angebote entdecken <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </AnimatedSection>

        {/* Gestalttherapie Creative Link */}
        <AnimatedSection className="py-28 md:py-36 bg-primary">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <StaggerContainer className="grid md:grid-cols-2 gap-16 lg:gap-20 items-center">
                <AnimatedItem>
                  <span className="text-gold-accent text-sm uppercase tracking-wider mb-5 block">
                    Mein therapeutischer Ansatz
                  </span>
                  <h2 className="font-heading text-4xl md:text-5xl text-white mb-8 leading-tight">
                    Was ist <span className="italic">Gestalttherapie?</span>
                  </h2>
                  <p className="text-white/85 text-lg leading-loose mb-10">
                    Die Gestalttherapie ist ein humanistischer Therapieansatz, der sich auf das bewusste 
                    Erleben im Hier und Jetzt konzentriert. Statt nur über Probleme zu sprechen, 
                    erforschen wir gemeinsam, wie Sie Ihre Welt wahrnehmen und gestalten.
                  </p>
                  <Link to="/gestalttherapie" onClick={scrollToTop} className="inline-flex items-center text-gold-accent hover:text-gold-accent/80 font-medium text-lg group transition-colors duration-300">
                    Mehr über Gestalttherapie erfahren
                    <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                  </Link>
                </AnimatedItem>
                <AnimatedItem className="relative flex justify-center">
                  {/* Organic Breathing Quote Card */}
                  <motion.div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center" animate={{
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
                      <p className="text-white/95 text-lg italic leading-relaxed font-heading">
                        Sei ganz hier, ganz jetzt – der Rest folgt von selbst.
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
                    Ihr Begleiter
                  </span>
                </AnimatedItem>
                <AnimatedItem>
                  <h2 className="font-heading text-4xl md:text-5xl mb-8 text-primary">
                    Über mich
                  </h2>
                </AnimatedItem>
                <AnimatedItem>
                  <p className="text-muted-foreground text-lg mb-6 leading-loose">
                    Ich bin Johannes Christ, Gestalttherapeut, Coach und M.Sc. Psychologie (i.A.). 
                    Meine Arbeit basiert auf der Überzeugung, dass echte Veränderung entsteht, 
                    wenn wir die Verbindung zwischen unseren Gedanken, Gefühlen und unserem Körper verstehen.
                  </p>
                </AnimatedItem>
                <AnimatedItem>
                  <p className="text-muted-foreground text-lg mb-10 leading-loose">
                    Mit langjähriger Erfahrung in Gestalttherapie und Coaching begleite ich Sie 
                    auf dem Weg zu mehr Klarheit, Wohlbefinden und Erfüllung.
                  </p>
                </AnimatedItem>
                <AnimatedItem>
                  <Link to="/ueber-mich" onClick={scrollToTop} className="inline-flex items-center text-primary font-semibold text-lg group relative">
                    <span className="relative">
                      Mehr zu meiner Person
                      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
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
                  Bereit für den ersten Schritt?
                </h2>
              </AnimatedItem>
              <AnimatedItem>
                <p className="text-white/85 text-lg mb-10">
                  Vereinbaren Sie ein kostenloses Kennenlerngespräch und erfahren Sie, 
                  wie ich Sie auf Ihrem Weg unterstützen kann.
                </p>
              </AnimatedItem>
              <AnimatedItem>
                <Link to="/kontakt" onClick={scrollToTop}>
                  <Button variant="gold" size="lg" className="font-semibold">
                    Kontakt aufnehmen <ArrowRight className="ml-2 h-4 w-4" />
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