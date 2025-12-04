import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Brain, Lightbulb, AlertCircle, Users, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import johannesPortrait from "@/assets/johannes-portrait.png";

const problems = [
  {
    icon: AlertCircle,
    title: "Innere Unruhe & Blockaden",
    description: "Sie fühlen sich festgefahren, haben wiederkehrende Ängste oder können bestimmte Muster nicht durchbrechen.",
  },
  {
    icon: Users,
    title: "Beziehungskonflikte",
    description: "Schwierigkeiten in Partnerschaften, Familie oder am Arbeitsplatz belasten Ihren Alltag und Ihre Lebensqualität.",
  },
  {
    icon: Compass,
    title: "Orientierungslosigkeit",
    description: "Sie stehen vor wichtigen Entscheidungen oder suchen nach Sinn und Richtung in Ihrem Leben.",
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

        {/* Problems Section */}
        <AnimatedSection className="py-24 bg-gray-light" animation="fade-up">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl mb-4 text-primary">
                Kennen Sie das?
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Viele meiner Klienten kommen mit ähnlichen Herausforderungen zu mir
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {problems.map((problem, index) => {
                const Icon = problem.icon;
                return (
                  <div
                    key={index}
                    className="text-center p-8"
                  >
                    <div className="mb-6 flex justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                      </div>
                    </div>
                    <h3 className="font-heading text-xl mb-3 text-primary">
                      {problem.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {problem.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </AnimatedSection>

        {/* Services Teaser */}
        <AnimatedSection className="py-24 bg-background" animation="fade-up">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl mb-4 text-gold-accent">
                Mein Angebot
              </h2>
              <p className="text-muted-foreground text-lg">
                Individuelle Unterstützung für Ihren Weg
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card
                    key={index}
                    className="p-6 bg-gray-light border-none text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="mb-4 flex justify-center">
                      <Icon className="w-8 h-8 text-gold-accent" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-heading text-lg mb-2 text-primary">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {service.description}
                    </p>
                  </Card>
                );
              })}
            </div>

            <div className="text-center">
              <Link to="/angebot" onClick={scrollToTop}>
                <Button className="bg-gold-accent hover:bg-gold-accent/90 text-white font-semibold">
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