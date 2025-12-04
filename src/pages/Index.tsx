import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Brain, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import johannesPortrait from "@/assets/johannes-portrait.png";

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
        <AnimatedSection className="py-24 relative overflow-hidden" animation="fade-up">
          {/* Subtle topographical background */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 90 Q 30 70, 50 80 T 90 70' stroke='%231e5f74' fill='none' stroke-width='1'/%3E%3Cpath d='M10 60 Q 40 40, 60 55 T 90 45' stroke='%231e5f74' fill='none' stroke-width='1'/%3E%3Cpath d='M10 30 Q 35 15, 55 25 T 90 20' stroke='%231e5f74' fill='none' stroke-width='1'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px'
            }}
          />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="font-heading text-[2.2rem] md:text-[2.7rem] mb-5 text-primary leading-tight">
                Wenn der innere Kompass stillsteht
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto italic">
                Oft spüren wir, dass etwas fehlt, lange bevor wir es benennen können.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 max-w-4xl mx-auto">
              {painPoints.map((point, index) => (
                <div
                  key={index}
                  className={`relative pl-8 ${index === 2 ? 'md:col-span-2 md:max-w-lg md:mx-auto' : ''}`}
                >
                  <div className="absolute left-0 top-1 w-1 h-full bg-gradient-to-b from-primary/30 to-transparent rounded-full" />
                  <h3 className="font-heading text-xl mb-3 text-primary">
                    {point.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Services Section - High-End Cards */}
        <AnimatedSection className="py-24 bg-secondary/30" animation="fade-up">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="font-heading text-[2.2rem] md:text-[2.7rem] mb-4 text-accent">
                Mein Angebot
              </h2>
              <p className="text-muted-foreground text-lg">
                Individuelle Räume für Ihre Entwicklung
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-14">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card
                    key={index}
                    className="p-8 bg-[#fdfbf7] border border-accent/20 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 group relative overflow-hidden"
                  >
                    {/* Bottom border highlight on hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    
                    <div className="mb-5 flex justify-center">
                      <Icon 
                        className="w-10 h-10 text-accent group-hover:text-primary transition-colors duration-300" 
                        strokeWidth={1.5} 
                      />
                    </div>
                    <h3 className="font-heading text-xl mb-3 text-primary">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </Card>
                );
              })}
            </div>

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
        <AnimatedSection className="py-20 bg-primary" animation="fade-up">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="text-gold-accent text-sm uppercase tracking-wider mb-4 block">
                    Mein therapeutischer Ansatz
                  </span>
                  <h2 className="font-heading text-3xl md:text-4xl text-white mb-6 leading-tight">
                    Was ist <span className="italic">Gestalttherapie?</span>
                  </h2>
                  <p className="text-white/80 leading-relaxed mb-8">
                    Die Gestalttherapie ist ein humanistischer Therapieansatz, der sich auf das bewusste 
                    Erleben im Hier und Jetzt konzentriert. Statt nur über Probleme zu sprechen, 
                    erforschen wir gemeinsam, wie Sie Ihre Welt wahrnehmen und gestalten.
                  </p>
                  <Link to="/gestalttherapie" onClick={scrollToTop}>
                    <Button 
                      variant="outline" 
                      className="border-white/30 text-white hover:bg-white hover:text-primary font-medium group"
                    >
                      Mehr über Gestalttherapie
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
                <div className="relative">
                  <div className="aspect-square bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                    <div className="text-center p-8">
                      <div className="font-heading text-6xl text-gold-accent mb-4 italic">
                        "
                      </div>
                      <p className="text-white/90 text-lg italic leading-relaxed">
                        Sei ganz hier, ganz jetzt – der Rest folgt von selbst.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* About Preview - Split Layout with Diagonal */}
        <AnimatedSection className="py-20 bg-background overflow-hidden" animation="fade-up" delay={100}>
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-0 items-stretch min-h-[500px]">
              {/* Left Side - Text */}
              <div className="flex flex-col justify-center pr-8 md:pr-16 py-12">
                <h2 className="font-heading text-4xl md:text-5xl mb-6 text-primary">
                  Über mich
                </h2>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  Ich bin Johannes Christ, Gestalttherapeut, Coach und Psychologe (M.Sc.). 
                  Meine Arbeit basiert auf der Überzeugung, dass echte Veränderung entsteht, 
                  wenn wir die Verbindung zwischen unseren Gedanken, Gefühlen und unserem Körper verstehen.
                </p>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  Mit langjähriger Erfahrung in Gestalttherapie und Coaching begleite ich Sie 
                  auf dem Weg zu mehr Klarheit, Wohlbefinden und Erfüllung.
                </p>
                <Link 
                  to="/ueber-mich" 
                  onClick={scrollToTop}
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors group"
                >
                  Mehr über mich erfahren 
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              
              {/* Right Side - Image with Diagonal Clip */}
              <div className="relative h-full min-h-[400px] md:min-h-[500px]">
                {/* Diagonal overlay */}
                <div 
                  className="absolute inset-0 bg-background z-10"
                  style={{
                    clipPath: 'polygon(0 0, 15% 0, 0 100%, 0 100%)'
                  }}
                />
                <img 
                  src={johannesPortrait} 
                  alt="Johannes Christ - Gestalttherapeut und Coach"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection className="py-20 bg-gradient-teal text-white" animation="scale">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading text-3xl md:text-4xl mb-6">
              Bereit für den ersten Schritt?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Vereinbaren Sie ein kostenloses Kennenlerngespräch und erfahren Sie, 
              wie ich Sie auf Ihrem Weg unterstützen kann.
            </p>
            <Link to="/kontakt" onClick={scrollToTop}>
              <Button size="lg" className="bg-gold-accent hover:bg-gold-accent/90 text-white font-semibold">
                Kontakt aufnehmen <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </AnimatedSection>
      </main>

      <footer className="bg-primary text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">© {new Date().getFullYear()} Johannes Christ · Gestalttherapie & Coaching</p>
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