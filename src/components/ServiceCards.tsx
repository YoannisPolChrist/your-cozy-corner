import { Card } from "@/components/ui/card";
import { Heart, Brain, Lightbulb } from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "Therapie & Heilung",
    description: "Für tieferliegende Themen, emotionale Blockaden und die Aufarbeitung alter Muster. Finden Sie zurück zu innerer Balance.",
  },
  {
    icon: Brain,
    title: "Coaching & Fokus",
    description: "Für berufliche Entscheidungen, Neuorientierung im Ausland und persönliche Weiterentwicklung. Setzen Sie klare Ziele für Ihre Zukunft.",
  },
  {
    icon: Lightbulb,
    title: "Klarheit & Einordnung",
    description: "Sie wissen nicht genau, was Ihnen fehlt? Wir nutzen professionelle Diagnostik, um Ihre Situation zu verstehen und den richtigen Weg zu finden.",
  },
];

export const ServiceCards = () => {
  return (
    <section className="py-20 bg-off-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl mb-4 text-primary">
            Mein Angebot
          </h2>
          <p className="text-xl text-muted-foreground italic">
            Spezialisierte Unterstützung in Gestalttherapie, Coaching und Diagnostik
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="p-8 hover:shadow-teal transition-all duration-300 hover:-translate-y-1 animate-fade-in opacity-0 [animation-fill-mode:forwards] bg-card border-none shadow-soft"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="mb-6">
                  <Icon className="w-12 h-12 text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-2xl mb-4 text-primary">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
