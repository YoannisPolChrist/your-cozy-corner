import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Brain, Lightbulb, ArrowRight, Clock, Video, Users } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Heart,
    title: "Therapie & Heilung",
    description: "Für tieferliegende Themen, emotionale Blockaden und die Aufarbeitung alter Muster. Finden Sie zurück zu innerer Balance.",
    details: [
      "Gestalttherapeutische Einzelsitzungen",
      "Traumabearbeitung",
      "Emotionale Blockaden lösen",
      "Innere Balance wiederfinden"
    ]
  },
  {
    icon: Brain,
    title: "Coaching & Fokus",
    description: "Für berufliche Entscheidungen, Neuorientierung im Ausland und persönliche Weiterentwicklung. Setzen Sie klare Ziele für Ihre Zukunft.",
    details: [
      "Berufliche Neuorientierung",
      "Entscheidungsfindung",
      "Persönliche Entwicklung",
      "Zielklarheit gewinnen"
    ]
  },
  {
    icon: Lightbulb,
    title: "Klarheit & Einordnung",
    description: "Sie wissen nicht genau, was Ihnen fehlt? Wir nutzen professionelle Diagnostik, um Ihre Situation zu verstehen und den richtigen Weg zu finden.",
    details: [
      "Psychologische Diagnostik",
      "Standortbestimmung",
      "Individuelle Beratung",
      "Klarer Behandlungsplan"
    ]
  },
];

const formats = [
  {
    icon: Video,
    title: "Online-Sitzungen",
    description: "Flexibel von überall aus – ideal für Deutsche im Ausland oder Menschen mit wenig Zeit."
  },
  {
    icon: Users,
    title: "Persönliche Termine",
    description: "Face-to-Face Sitzungen für eine intensive therapeutische Arbeit."
  },
  {
    icon: Clock,
    title: "Flexible Zeiten",
    description: "Termine auch abends und am Wochenende nach Vereinbarung."
  }
];

const Angebot = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-gray-light to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-heading text-4xl md:text-6xl mb-6 text-primary">
                Mein Angebot
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Spezialisierte Unterstützung in Gestalttherapie, Coaching und psychologischer Diagnostik – 
                individuell auf Ihre Bedürfnisse abgestimmt.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card
                    key={index}
                    className="p-8 hover:shadow-teal transition-all duration-300 hover:-translate-y-1 bg-gray-light border-none"
                  >
                    <div className="mb-6">
                      <Icon className="w-12 h-12 text-gold-accent" strokeWidth={1.5} />
                    </div>
                    <h2 className="font-heading text-2xl mb-4 text-primary">
                      {service.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold-accent" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Formats Section */}
        <section className="py-20 bg-gray-light">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl mb-4 text-primary">
                Flexible Formate
              </h2>
              <p className="text-muted-foreground text-lg">
                Wählen Sie das Format, das am besten zu Ihnen passt
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {formats.map((format, index) => {
                const Icon = format.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-heading text-xl mb-2 text-primary">{format.title}</h3>
                    <p className="text-muted-foreground text-sm">{format.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-teal text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading text-3xl md:text-4xl mb-6">
              Bereit für den ersten Schritt?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Vereinbaren Sie ein kostenloses 20-minütiges Kennenlerngespräch, 
              um herauszufinden, wie ich Sie unterstützen kann.
            </p>
            <Link to="/kontakt">
              <Button size="lg" className="bg-gold-accent hover:bg-gold-accent/90 text-white font-semibold">
                Kontakt aufnehmen <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">© {new Date().getFullYear()} Johannes Christ · Gestalttherapie & Coaching</p>
          <div className="space-x-4 text-sm text-white/80">
            <a href="#" className="hover:text-gold-accent transition-colors">Datenschutzerklärung</a>
            <span>·</span>
            <a href="#" className="hover:text-gold-accent transition-colors">Impressum</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Angebot;
