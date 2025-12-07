import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Brain, Compass, Activity, BarChart3, Map, Video, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { 
  fadeUp, 
  staggerContainer, 
  cardStagger, 
  cardItem, 
  iconStagger, 
  iconItem,
  viewportSettings,
  cinematicEase
} from "@/lib/animations";

const services = [
  {
    icon: Heart,
    title: "Integrative Gestalttherapie",
    subline: "WENN VERSTEHEN NICHT REICHT",
    description: "Wir lösen alte Muster dort auf, wo sie entstanden sind: im Kontakt und im Körper. Statt jahrelangem 'Darüber-Reden' nutzen wir das Hier und Jetzt, um emotionale Blockaden spürbar und veränderbar zu machen."
  },
  {
    icon: Brain,
    title: "Holomotion Coaching",
    subline: "KLARHEIT DURCH KÖRPERINTELLIGENZ",
    description: "Strategie trifft Intuition. Wir kombinieren kognitive Planung mit der Weisheit deines Körpers. Für Entscheidungen, die sich nicht nur logisch anhören, sondern auch im Bauch richtig anfühlen."
  },
  {
    icon: Compass,
    title: "Psychologische Diagnostik",
    subline: "PRÄZISION STATT BAUCHGEFÜHL",
    description: "Auf Basis aktueller wissenschaftlicher Standards (M.Sc. Psychologie i.A.) biete ich eine fundierte Standortbestimmung. Wir ordnen Symptome ein und erstellen einen Fahrplan, der zu Ihrer Situation passt."
  }
];

const checkupFeatures = [
  {
    icon: Activity,
    title: "Vitalwerte & Körper",
    description: "Wir werfen einen Blick auf Blutwerte, Schlaf und Ressourcen, um körperliche Ursachen für psychische Themen auszuschließen."
  },
  {
    icon: BarChart3,
    title: "Tracking & Muster",
    description: "Wir erheben den Ist-Zustand Ihrer Routinen. Wo verlieren Sie Energie? Wir machen das Unsichtbare messbar."
  },
  {
    icon: Map,
    title: "Strategie",
    description: "Basierend auf Daten erstellen wir Ihren individuellen Fahrplan. Fortschritt ist kein Zufall."
  }
];

const Angebot = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        {/* Section 1: The 3 Pillars */}
        <section className="pt-[88px] pb-32 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={staggerContainer}
              className="max-w-6xl mx-auto"
            >
              <motion.h2
                variants={fadeUp}
                className="font-heading text-[2.25rem] md:text-[3.1875rem] text-primary text-center mb-16"
              >
                Meine Leistungen
              </motion.h2>
              
              <motion.div 
                variants={cardStagger}
                className="grid md:grid-cols-3 gap-8 md:gap-16"
              >
                {services.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <motion.div key={index} variants={cardItem}>
                      <Card className="p-8 h-full bg-card border-none shadow-soft hover:shadow-teal transition-all duration-500 hover:-translate-y-2">
                        <div className="mb-6">
                          <Icon className="w-12 h-12 text-accent stroke-[1.5]" />
                        </div>
                        <h3 className="font-heading text-2xl text-primary mb-2">
                          {service.title}
                        </h3>
                        <p className="text-[#c5a065] text-xs uppercase tracking-widest mb-4">
                          {service.subline}
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Section 2: Holomotion Check-Up */}
        <section className="py-32 bg-primary">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={staggerContainer}
              className="max-w-6xl mx-auto"
            >
              <motion.p
                variants={fadeUp}
                className="text-[#c5a065] text-xs uppercase tracking-widest text-center mb-4"
              >
                PHASE 1: DIE STANDORTBESTIMMUNG
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-heading text-[2.25rem] md:text-[3.1875rem] text-primary-foreground text-center mb-16"
              >
                Wir können nur verändern, was wir verstehen.
              </motion.h2>
              
              <motion.div 
                variants={iconStagger}
                className="grid md:grid-cols-3 gap-8 md:gap-16"
              >
                {checkupFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      variants={iconItem}
                      className="text-center"
                    >
                      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                        <Icon className="w-8 h-8 text-[#c5a065] stroke-[1.5]" />
                      </div>
                      <h3 className="font-heading text-xl text-primary-foreground mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-primary-foreground/80 leading-relaxed text-sm">
                        {feature.description}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Section 3: Investment & Cooperation */}
        <section className="py-32 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={staggerContainer}
              className="max-w-5xl mx-auto"
            >
              <motion.h2
                variants={fadeUp}
                className="font-heading text-[2.25rem] md:text-[3.1875rem] text-primary text-center mb-16"
              >
                Konditionen & Zusammenarbeit
              </motion.h2>
              
              <motion.div 
                variants={cardStagger}
                className="grid md:grid-cols-2 gap-8 md:gap-16"
              >
                {/* Card 1: Einzelbegleitung */}
                <motion.div variants={cardItem}>
                  <Card className="p-10 h-full bg-card border-none shadow-soft hover:shadow-teal transition-all duration-500">
                    <div className="text-center mb-6">
                      <span className="font-heading text-6xl text-primary">50€</span>
                      <p className="text-muted-foreground mt-2">pro 50 Min. Sitzung</p>
                    </div>
                    <h3 className="font-heading text-2xl text-primary text-center mb-4">
                      Einzelbegleitung
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-center mb-8">
                      Psychologische Beratung (i.A.), Gestalttherapie & Coaching. Ideal für akute Anliegen.
                    </p>
                    <Link to="/kontakt" className="block">
                      <Button variant="gold" className="w-full font-semibold">
                        Termin buchen
                      </Button>
                    </Link>
                  </Card>
                </motion.div>

                {/* Card 2: Intensive Zusammenarbeit */}
                <motion.div variants={cardItem}>
                  <Card className="p-10 h-full bg-card border-none shadow-soft hover:shadow-teal transition-all duration-500">
                    <div className="text-center mb-6">
                      <span className="font-heading text-4xl md:text-5xl text-primary">Individueller Rahmen</span>
                      <p className="text-muted-foreground mt-2">Empfohlen: 3-6 Monate</p>
                    </div>
                    <h3 className="font-heading text-2xl text-primary text-center mb-4">
                      Intensive Zusammenarbeit
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-center mb-8">
                      Veränderung braucht Zeit. Für tiefgreifende Themen vereinbaren wir einen festen Rhythmus. Abrechnung flexibel pro Sitzung.
                    </p>
                    <Link to="/kontakt" className="block">
                      <Button variant="gold-outline" className="w-full font-semibold">
                        Kostenloses Vorgespräch
                      </Button>
                    </Link>
                  </Card>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Section 4: Flexible Formats */}
        <section className="py-32 bg-off-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={staggerContainer}
              className="max-w-4xl mx-auto"
            >
              <motion.h2
                variants={fadeUp}
                className="font-heading text-[2.25rem] md:text-[3.1875rem] text-primary text-center mb-16"
              >
                Flexible Formate
              </motion.h2>
              
              <motion.div 
                variants={cardStagger}
                className="grid md:grid-cols-2 gap-8 md:gap-16"
              >
                <motion.div variants={cardItem} className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Video className="w-7 h-7 text-accent stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-primary mb-2">Online (Zoom)</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Ortsunabhängig für Klienten weltweit.
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={cardItem} className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-7 h-7 text-accent stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-primary mb-2">Präsenz & Walk-and-Talk</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      In Toulouse und Umgebung.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-28 md:py-36 bg-gradient-cta relative overflow-hidden">
          {/* Subtle gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-teal-navy/30" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={staggerContainer}
              className="max-w-2xl mx-auto"
            >
              <motion.h2
                variants={fadeUp}
                className="font-heading text-3xl md:text-4xl text-white mb-8"
              >
                Bereit für den ersten Schritt?
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-white/85 text-lg mb-10"
              >
                Vereinbaren Sie ein kostenloses 20-minütiges Kennenlerngespräch, 
                um herauszufinden, wie ich Sie unterstützen kann.
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link to="/kontakt">
                  <Button variant="gold" size="lg" className="font-semibold">
                    Kontakt aufnehmen <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Angebot;
