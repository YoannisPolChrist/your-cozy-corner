import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Brain, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedSection, StaggerContainer, AnimatedItem } from "@/components/AnimatedSection";
import johannesHero from "@/assets/johannes-hero.png";
import handsTherapy from "@/assets/hands-therapy.jpg";
import johannesPortrait from "@/assets/johannes-portrait.png";

const UeberMich = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        {/* Section 1: Hero - Image Left, Text Right */}
        <AnimatedSection className="py-24 md:py-32 bg-[#fafafa]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Image with Gold Frame */}
                <StaggerContainer className="relative">
                  <AnimatedItem>
                    <div className="relative">
                      {/* Gold background accent */}
                      <div className="absolute -bottom-4 -right-4 w-full h-full bg-accent rounded-2xl" />
                      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                        <img 
                          src={johannesHero} 
                          alt="Johannes Christ - Gestalttherapeut" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </AnimatedItem>
                </StaggerContainer>

                {/* Text Content */}
                <StaggerContainer className="space-y-6">
                  <AnimatedItem>
                    <span className="text-accent font-medium tracking-[0.2em] uppercase text-sm">
                      JOHANNES CHRIST — M.SC. PSYCHOLOGIE (i.A.)
                    </span>
                  </AnimatedItem>
                  <AnimatedItem>
                    <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-primary leading-tight">
                      Fundiert durch Wissenschaft. Geerdet durch Erfahrung.
                    </h1>
                  </AnimatedItem>
                  <AnimatedItem>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>
                        Hi, ich bin Johannes – Psychologe (M.Sc., i.A.) und Gestalttherapeut in Ausbildung. 
                        Ich begleite Menschen dabei, sich selbst besser zu verstehen, blockierende Muster 
                        zu erkennen und neue Wege zu gehen.
                      </p>
                      <p>
                        Mein Ansatz verbindet wissenschaftlich fundierte Psychologie mit der erfahrungsorientierten 
                        Tiefe der Gestalttherapie. Ich glaube daran, dass echte Veränderung nicht nur im Kopf passiert, 
                        sondern im ganzen Körper spürbar wird.
                      </p>
                    </div>
                  </AnimatedItem>
                </StaggerContainer>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Section 2: Process - Text Left, Image Right */}
        <AnimatedSection className="py-24 md:py-32 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Text Content */}
                <StaggerContainer className="space-y-6 order-2 md:order-1">
                  <AnimatedItem>
                    <span className="text-accent font-medium tracking-[0.2em] uppercase text-sm">
                      MEINE ARBEITSWEISE
                    </span>
                  </AnimatedItem>
                  <AnimatedItem>
                    <h2 className="font-heading text-3xl md:text-4xl text-primary leading-tight">
                      Raum für das, was ist.
                    </h2>
                  </AnimatedItem>
                  <AnimatedItem>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>
                        In über 40 intensiven Einzelprozessen habe ich gelernt: Jeder Mensch trägt seine 
                        eigene Weisheit in sich. Meine Aufgabe ist es, einen Raum zu schaffen, in dem diese 
                        Weisheit sichtbar werden kann.
                      </p>
                      <p>
                        Ich arbeite nicht mit schnellen Lösungen oder standardisierten Techniken. Stattdessen 
                        begegne ich dir auf Augenhöhe – präsent, ehrlich und mit echtem Interesse an dem, 
                        was dich bewegt.
                      </p>
                    </div>
                  </AnimatedItem>
                  
                  {/* Icon Placeholders */}
                  <AnimatedItem>
                    <div className="grid grid-cols-3 gap-6 pt-6">
                      <div className="text-center">
                        <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                          <Heart className="w-7 h-7 text-accent" />
                        </div>
                        <span className="text-sm font-medium text-primary">Körper</span>
                      </div>
                      <div className="text-center">
                        <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                          <Brain className="w-7 h-7 text-accent" />
                        </div>
                        <span className="text-sm font-medium text-primary">Psyche</span>
                      </div>
                      <div className="text-center">
                        <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                          <Sparkles className="w-7 h-7 text-accent" />
                        </div>
                        <span className="text-sm font-medium text-primary">Resonanz</span>
                      </div>
                    </div>
                  </AnimatedItem>
                </StaggerContainer>

                {/* Image */}
                <StaggerContainer className="order-1 md:order-2">
                  <AnimatedItem>
                    <div className="relative">
                      <div className="absolute -bottom-4 -left-4 w-full h-full bg-accent/20 rounded-2xl" />
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                        <img 
                          src={handsTherapy} 
                          alt="Therapeutische Arbeit" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </AnimatedItem>
                </StaggerContainer>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Section 3: Personal - Centered/Asymmetrical */}
        <AnimatedSection className="py-24 md:py-32 bg-[#fdfbf7]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <StaggerContainer className="text-center space-y-8">
                <AnimatedItem>
                  <h2 className="font-heading text-3xl md:text-4xl text-primary">
                    Und sonst so?
                  </h2>
                </AnimatedItem>
                
                <AnimatedItem>
                  <div className="relative mx-auto w-48 h-48 md:w-64 md:h-64">
                    <div className="absolute -bottom-3 -right-3 w-full h-full bg-accent rounded-full" />
                    <div className="relative w-full h-full rounded-full overflow-hidden shadow-xl">
                      <img 
                        src={johannesPortrait} 
                        alt="Johannes Christ lachend" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </AnimatedItem>

                <AnimatedItem>
                  <div className="max-w-2xl mx-auto space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Wer mich kennt, weiß: Ich nehme meine Arbeit ernst, aber mich selbst nicht zu sehr. 
                      Ich glaube an die Kraft von Humor, Leichtigkeit und echten Begegnungen.
                    </p>
                    <p>
                      Abseits der Therapie findest du mich beim Wandern in den Bergen, beim Kochen mit 
                      Freunden oder versunken in ein gutes Buch. Ich bin überzeugt, dass ein erfülltes 
                      Leben aus vielen kleinen Momenten der Verbundenheit besteht – mit uns selbst und 
                      mit anderen.
                    </p>
                  </div>
                </AnimatedItem>
              </StaggerContainer>
            </div>
          </div>
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection className="py-20 relative overflow-hidden">
          {/* Background with gradient */}
          <div className="absolute inset-0 bg-gradient-teal" />
          <div 
            className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, hsl(var(--primary-light)) 0%, transparent 70%)',
              transform: 'translate(-50%, -50%)',
            }}
          />
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <StaggerContainer>
              <AnimatedItem>
                <h2 className="font-heading text-3xl md:text-4xl mb-6 text-white">
                  Neugierig geworden?
                </h2>
              </AnimatedItem>
              <AnimatedItem>
                <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                  In einem kostenlosen Erstgespräch können wir herausfinden, 
                  ob die Chemie stimmt und wie ich dich am besten unterstützen kann.
                </p>
              </AnimatedItem>
              <AnimatedItem>
                <Link to="/kontakt">
                  <Button 
                    size="lg" 
                    className="bg-accent hover:bg-accent/90 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Kontakt aufnehmen <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </AnimatedItem>
            </StaggerContainer>
          </div>
        </AnimatedSection>
      </main>

      <footer className="bg-primary text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">© {new Date().getFullYear()} Johannes Christ · Gestalttherapie & Coaching</p>
          <div className="space-x-4 text-sm text-white/80">
            <a href="#" className="hover:text-accent transition-colors">Datenschutzerklärung</a>
            <span>·</span>
            <a href="#" className="hover:text-accent transition-colors">Impressum</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UeberMich;
