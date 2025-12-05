import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { AnimatedSection, StaggerContainer, AnimatedItem } from "@/components/AnimatedSection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Brain, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import johannesPortrait from "@/assets/johannes-portrait.png";
import { goldFrameVariants, imageVariants, viewportSettings } from "@/lib/animations";

const painPoints = [
  {
    title: "Auf der Stelle treten",
    description: "Das Gefühl, auf der Stelle zu treten, obwohl Sie sich bewegen wollen. Alte Muster wiederholen sich, besonders in Beziehungen.",
  },
  {
    title: "Distanz und Nähe",
    description: "Die Distanz zu anderen wächst, oder die Nähe fühlt sich erdrückend an. Gespräche drehen sich im Kreis.",
  },
  {
    title: "Nebel der Unklarheit",
    description: "Der Wunsch nach Klarheit ist da, aber der nächste Schritt bleibt im Nebel verborgen.",
  },
];

const services = [
  {
    icon: Heart,
    title: "Therapie",
    description: "Tiefgreifende Arbeit an emotionalen Themen",
  },
  {
    icon: Brain,
    title: "Coaching",
    description: "Fokussierte Entwicklung Ihrer Potenziale",
  },
  {
    icon: Lightbulb,
    title: "Diagnostik",
    description: "Professionelle Einordnung und Klarheit",
  },
];

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />

        {/* Pain Points Section - Empathetic Narrative */}
        <AnimatedSection className="py-28 md:py-36 relative overflow-hidden">
          {/* Subtle topographical background */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 90 Q 30 70, 50 80 T 90 70' stroke='%231e5f74' fill='none' stroke-width='1'/%3E%3Cpath d='M10 60 Q 40 40, 60 55 T 90 45' stroke='%231e5f74' fill='none' stroke-width='1'/%3E%3Cpath d='M10 30 Q 35 15, 55 25 T 90 20' stroke='%231e5f74' fill='none' stroke-width='1'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px'
            }}
          />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-20">
              <h2 className="font-heading text-[2.2rem] md:text-[2.7rem] mb-6 text-primary leading-tight">
                Wenn der innere Kompass stillsteht
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto italic">
                Oft spüren wir, dass etwas fehlt, lange bevor wir es benennen können.
              </p>
            </div>

            <StaggerContainer className="grid md:grid-cols-2 gap-x-20 gap-y-16 max-w-4xl mx-auto">
              {painPoints.map((point, index) => (
                <AnimatedItem
                  key={index}
                  className={`relative pl-8 ${index === 2 ? 'md:col-span-2 md:max-w-lg md:mx-auto' : ''}`}
                >
                  <div className="absolute left-0 top-1 w-1 h-full bg-gradient-to-b from-primary/30 to-transparent rounded-full" />
                  <h3 className="font-heading text-xl mb-4 text-primary">
                    {point.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {point.description}
                  </p>
                </AnimatedItem>
              ))}
            </StaggerContainer>
          </div>
        </AnimatedSection>

        {/* Services Section - High-End Cards */}
        <AnimatedSection className="py-28 md:py-36 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="font-heading text-[2.2rem] md:text-[2.7rem] mb-5 text-accent">
                Mein Angebot
              </h2>
              <p className="text-muted-foreground text-lg">
                Individuelle Räume für Ihre Entwicklung
              </p>
            </div>

            <StaggerContainer className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto mb-16">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <AnimatedItem key={index}>
                    <Card className="p-10 bg-[#fdfbf7] border border-accent/20 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group relative overflow-hidden h-full">
                      {/* Bottom border highlight on hover */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      
                      <div className="mb-6 flex justify-center">
                        <Icon 
                          className="w-12 h-12 text-accent group-hover:text-primary transition-colors duration-300" 
                          strokeWidth={1.5} 
                        />
                      </div>
                      <h3 className="font-heading text-xl mb-4 text-primary">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {service.description}
                      </p>
                    </Card>
                  </AnimatedItem>
                );
              })}
            </StaggerContainer>

            <div className="text-center">
              <Link to="/angebot" onClick={scrollToTop}>
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                  Alle Angebote entdecken <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </AnimatedSection>

        {/* Gestalttherapie Creative Link */}
        <AnimatedSection className="py-28 md:py-36 bg-primary relative overflow-hidden">
          {/* Animated organic gradient background */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(ellipse at 30% 50%, hsl(190 80% 35% / 0.4) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, hsl(185 75% 40% / 0.3) 0%, transparent 45%)',
              animation: 'gradientShift 12s ease-in-out infinite alternate'
            }}
          />
          <style>{`
            @keyframes gradientShift {
              0% { transform: scale(1) translateX(0); }
              100% { transform: scale(1.1) translateX(-3%); }
            }
            @keyframes breathe {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }
          `}</style>
          
          <div className="container mx-auto px-4 relative z-10">
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
                  <Link 
                    to="/gestalttherapie" 
                    onClick={scrollToTop}
                    className="inline-flex items-center text-gold-accent hover:text-gold-accent/80 font-medium text-lg group transition-colors duration-300"
                  >
                    Mehr über Gestalttherapie erfahren
                    <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                  </Link>
                </AnimatedItem>
                <AnimatedItem className="relative flex justify-center">
                  {/* Organic Blob with Glassmorphism */}
                  <div 
                    className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center"
                    style={{
                      animation: 'breathe 6s ease-in-out infinite'
                    }}
                  >
                    {/* Blob shape with glassmorphism */}
                    <div 
                      className="absolute inset-0 backdrop-blur-md border border-white/20"
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        borderRadius: '60% 40% 55% 45% / 55% 60% 40% 45%',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 60px rgba(255, 255, 255, 0.05)'
                      }}
                    />
                    {/* Quote content */}
                    <div className="relative z-10 text-center px-8">
                      <div className="font-heading text-7xl text-gold-accent mb-2 leading-none" style={{ marginTop: '-10px' }}>
                        "
                      </div>
                      <p className="text-white/95 text-lg italic leading-relaxed font-heading">
                        Sei ganz hier, ganz jetzt – der Rest folgt von selbst.
                      </p>
                    </div>
                  </div>
                </AnimatedItem>
              </StaggerContainer>
            </div>
          </div>
        </AnimatedSection>

        {/* About Preview - Editorial Layout */}
        <AnimatedSection className="py-28 md:py-40 bg-[#fafafa] overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center max-w-6xl mx-auto">
              {/* Left Side - Image with Gold Frame Effect - Cinematic Parallax */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                className="relative order-2 md:order-1"
              >
                {/* Gold Frame - Slides out from behind with delay */}
                <motion.div 
                  variants={goldFrameVariants}
                  className="absolute bottom-[-10px] right-[-10px] md:bottom-[-20px] md:right-[-20px] w-full h-full bg-accent rounded-2xl"
                />
                {/* Main image */}
                <motion.img 
                  variants={imageVariants}
                  src={johannesPortrait} 
                  alt="Johannes Christ - Gestalttherapeut und Coach"
                  className="relative z-10 w-full aspect-[4/5] object-cover object-center rounded-2xl shadow-xl"
                />
              </motion.div>
              
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
                    Ich bin Johannes Christ, Gestalttherapeut, Coach und Psychologe (M.Sc.). 
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
                  <Link 
                    to="/ueber-mich" 
                    onClick={scrollToTop}
                    className="inline-flex items-center text-primary font-semibold text-lg group relative"
                  >
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
        <AnimatedSection className="py-28 md:py-36 bg-gradient-teal text-white">
          <div className="container mx-auto px-4 text-center">
            <StaggerContainer className="max-w-2xl mx-auto">
              <AnimatedItem>
                <h2 className="font-heading text-3xl md:text-4xl mb-8">
                  Bereit für den ersten Schritt?
                </h2>
              </AnimatedItem>
              <AnimatedItem>
                <p className="text-white/80 text-lg mb-10">
                  Vereinbaren Sie ein kostenloses Kennenlerngespräch und erfahren Sie, 
                  wie ich Sie auf Ihrem Weg unterstützen kann.
                </p>
              </AnimatedItem>
              <AnimatedItem>
                <Link to="/kontakt" onClick={scrollToTop}>
                  <Button size="lg" className="bg-gold-accent hover:bg-gold-accent/90 text-white font-semibold">
                    Kontakt aufnehmen <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </AnimatedItem>
            </StaggerContainer>
          </div>
        </AnimatedSection>
      </main>

      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-5">© {new Date().getFullYear()} Johannes Christ · Gestalttherapie & Coaching</p>
          <div className="space-x-4 text-sm text-white/80">
            <a href="#" className="hover:text-gold-accent transition-colors">
              Datenschutzerklärung
            </a>
            <span>·</span>
            <a href="#" className="hover:text-gold-accent transition-colors">
              Impressum
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
