import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Brain, Lightbulb, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import johannesPortrait from "@/assets/johannes-portrait.png";

const services = [
  {
    icon: Heart,
    title: "Therapie & Heilung",
    description: "Für tieferliegende Themen und emotionale Blockaden.",
  },
  {
    icon: Brain,
    title: "Coaching & Fokus",
    description: "Für berufliche Entscheidungen und persönliche Entwicklung.",
  },
  {
    icon: Lightbulb,
    title: "Klarheit & Einordnung",
    description: "Professionelle Diagnostik für den richtigen Weg.",
  },
  {
    icon: Sparkles,
    title: "Gestalttherapie",
    description: "Humanistischer Ansatz mit Fokus auf das Hier und Jetzt.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <Hero />

        {/* Services Preview */}
        <AnimatedSection className="py-20 bg-background" animation="fade-up">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-4xl md:text-5xl mb-4 text-gold-accent">
                Mein Angebot
              </h2>
              <p className="text-xl text-muted-foreground italic">
                Spezialisierte Unterstützung für Ihre Bedürfnisse
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card
                    key={index}
                    className="p-6 bg-gray-light border-none text-center transition-all duration-500 hover:shadow-lg hover:-translate-y-1"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="mb-4 flex justify-center">
                      <Icon className="w-10 h-10 text-gold-accent" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-heading text-xl mb-2 text-primary">
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
              <Link to="/angebot">
                <Button className="bg-gold-accent hover:bg-gold-accent/90 text-white font-semibold">
                  Alle Angebote entdecken <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
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
                <Link to="/ueber-mich" className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors group">
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
            <Link to="/kontakt">
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
