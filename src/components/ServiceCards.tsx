import { Card } from "@/components/ui/card";
import { Heart, Brain, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

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
    <section className="py-24 bg-off-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-gold-accent/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-teal-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="typ-h2 mb-4 text-primary">
            Mein Angebot
          </h2>
          <p className="typ-lead text-muted-foreground max-w-2xl mx-auto italic">
            Drei Wege zur Veränderung – individuell auf Sie abgestimmt
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
              >
                <Card className="p-8 bg-card border-none shadow-soft hover:shadow-teal transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold-accent/5 rounded-bl-full group-hover:bg-gold-accent/10 transition-colors duration-500" />
                  <div className="relative z-10">
                    <div className="mb-6">
                      <Icon className="w-12 h-12 text-accent" strokeWidth={1.5} />
                    </div>
                    <h3 className="typ-h3 mb-4 text-primary">
                      {service.title}
                    </h3>
                    <p className="typ-body text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
