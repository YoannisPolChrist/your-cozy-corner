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
      {/* Decorative background element */}
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
          <p className="typ-lead text-muted-foreground italic max-w-2xl mx-auto">
            Spezialisierte Unterstützung in Gestalttherapie, Coaching und Diagnostik
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 1.8,
                  delay: index * 0.2,
                  ease: [0.16, 1, 0.3, 1] // Custom highly damped curve (Expo Out)
                }}
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.6, ease: "easeOut" } }}
                className="h-full"
              >
                <Card className="h-full p-8 bg-white/80 backdrop-blur-sm border border-black/5 hover:border-gold-accent/30 shadow-soft hover:shadow-premium-hover transition-all duration-500 relative overflow-hidden group rounded-2xl">
                  {/* Organic Panning Hover Lighting */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden rounded-2xl pointer-events-none">
                    <motion.div
                      className="absolute -inset-[100%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-accent/15 via-transparent to-transparent"
                      animate={{
                        x: ['-25%', '25%', '-25%'],
                        y: ['-25%', '25%', '-25%'],
                      }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                  </div>

                  <div className="relative z-10">
                    <div className="mb-8 relative inline-block">
                      <div className="absolute inset-0 bg-gold-accent/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150" />
                      <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.4 // Stagger the breathing effect
                        }}
                      >
                        <Icon className="w-12 h-12 text-gold-accent relative z-10 transform group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
                      </motion.div>
                    </div>
                    <h3 className="typ-h3 mb-4 text-primary group-hover:text-teal-navy transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="typ-body text-muted-foreground leading-relaxed">
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
