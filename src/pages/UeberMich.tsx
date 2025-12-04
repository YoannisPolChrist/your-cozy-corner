import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Heart, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import therapistPortrait from "@/assets/therapist-portrait.jpg";

const qualifications = [
  {
    icon: GraduationCap,
    title: "Ausbildung",
    items: [
      "M.Sc. Psychologie",
      "Gestalttherapie-Ausbildung",
      "Coaching-Zertifizierung"
    ]
  },
  {
    icon: Heart,
    title: "Schwerpunkte",
    items: [
      "Gestalttherapie",
      "Persönlichkeitsentwicklung",
      "Emotionale Blockaden"
    ]
  },
  {
    icon: Globe,
    title: "Arbeitsweise",
    items: [
      "Online & Präsenz",
      "Deutsch & Englisch",
      "Internationale Klienten"
    ]
  }
];

const UeberMich = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gray-light">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="font-heading text-4xl md:text-5xl mb-6 text-primary">
                    Über mich
                  </h1>
                  <p className="text-xl text-muted-foreground italic mb-8 leading-relaxed">
                    Ich bin Johannes Christ, Gestalttherapeut, Coach und Psychologe (M.Sc.). 
                    Meine Arbeit basiert auf der Überzeugung, dass echte Veränderung entsteht, 
                    wenn wir die Verbindung zwischen unseren Gedanken, Gefühlen und unserem Körper verstehen.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Mit meiner Erfahrung in Gestalttherapie und Coaching begleite ich Sie auf dem Weg zu 
                    mehr Klarheit, Wohlbefinden und Erfüllung. Ich arbeite sowohl online als auch persönlich 
                    und unterstütze Menschen weltweit – insbesondere Deutsche, die im Ausland leben.
                  </p>
                </div>
                <div className="order-first md:order-last">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src={therapistPortrait} 
                      alt="Johannes Christ - Gestalttherapeut und Coach" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl mb-6 text-gold-accent">
                Meine Philosophie
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                In der Gestalttherapie geht es darum, im Hier und Jetzt präsent zu sein und 
                sich selbst mit all seinen Facetten anzunehmen. Ich glaube daran, dass jeder Mensch 
                die Ressourcen in sich trägt, um zu wachsen und zu heilen – manchmal braucht es nur 
                die richtige Begleitung, um diese zu entdecken.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {qualifications.map((qual, index) => {
                const Icon = qual.icon;
                return (
                  <Card key={index} className="p-6 bg-gray-light border-none text-center">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-heading text-xl mb-4 text-primary">{qual.title}</h3>
                    <ul className="space-y-2">
                      {qual.items.map((item, i) => (
                        <li key={i} className="text-muted-foreground text-sm">{item}</li>
                      ))}
                    </ul>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Personal Touch Section */}
        <section className="py-20 bg-gray-light">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Card className="p-8 md:p-12 bg-background">
                <h2 className="font-heading text-2xl md:text-3xl mb-6 text-primary text-center">
                  Warum ich Therapeut wurde
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Mein Weg zur Gestalttherapie begann mit meiner eigenen Suche nach Verständnis und 
                  Wachstum. Durch meine Ausbildung und persönliche Erfahrungen habe ich gelernt, 
                  wie kraftvoll es sein kann, sich selbst wirklich zu begegnen.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Heute ist es meine Leidenschaft, andere Menschen auf diesem Weg zu begleiten. 
                  Ich schaffe einen sicheren Raum, in dem Sie sich öffnen, erforschen und 
                  entwickeln können – ohne Bewertung, mit vollem Respekt für Ihren individuellen Prozess.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-teal text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading text-3xl md:text-4xl mb-6">
              Lassen Sie uns kennenlernen
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              In einem kostenlosen Erstgespräch können wir herausfinden, 
              ob die Chemie stimmt und wie ich Sie am besten unterstützen kann.
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

export default UeberMich;
