import { Navigation } from "@/components/Navigation";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AnimatedSection, AnimatedItem, StaggerContainer } from "@/components/AnimatedSection";
import { Hand, Brain, Palette } from "lucide-react";
import gestaltKontaktzyklus from "@/assets/gestalt-kontaktzyklus.png";
import ressourcenUnterstuetzung from "@/assets/ressourcen-unterstuetzung.png";
import gestaltVideo from "@/assets/gestalt-video.mp4";
import gestaltVideo2 from "@/assets/gestalt-video-2.mp4";
import gestaltVideo3 from "@/assets/gestalt-video-3.mp4";
import { cinematicEase, viewportSettings } from "@/lib/animations";
import { Footer } from "@/components/Footer";
import { GestaltScrollTelling } from "@/components/GestaltScrollTelling";

interface VideoSectionProps {
  videoSrc: string;
  title: string;
  content: React.ReactNode;
  sectionId: string;
  position?: 'left' | 'center' | 'right';
}

const VideoSection = ({ videoSrc, title, content, sectionId, position = 'center' }: VideoSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionHeight = sectionRef.current.offsetHeight;
        const viewportHeight = window.innerHeight;
        
        const progress = Math.max(0, Math.min(1, 
          (viewportHeight - rect.top) / (viewportHeight + sectionHeight)
        ));
        setScrollProgress(progress);
        
        // Set visibility for Framer Motion
        const shouldBeVisible = progress > 0.15 && progress < 0.70;
        setIsVisible(shouldBeVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Position classes - centered vertically in viewport
  const positionClasses = {
    left: 'items-center justify-start pl-6 md:pl-12 lg:pl-20',
    center: 'items-center justify-center',
    right: 'items-center justify-end pr-6 md:pr-12 lg:pr-20'
  };

  return (
    <section 
      ref={sectionRef}
      id={sectionId}
      className="relative h-[400vh]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        
        {/* Subtle overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
        <div className={`absolute inset-0 flex ${positionClasses[position]} p-4`}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ 
              opacity: isVisible ? 1 : 0, 
              y: isVisible ? 0 : 40 
            }}
            transition={{ 
              duration: 0.9, 
              ease: cinematicEase
            }}
            className="max-w-sm lg:max-w-md"
          >
            {/* Glassmorphism Card */}
            <div 
              className="p-8 md:p-10 rounded-2xl shadow-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              }}
            >
              <h2 
                className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-5 text-center"
              >
                {title}
              </h2>
              <div className="text-foreground/80 text-base md:text-lg leading-relaxed">
                {content}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Gestalttherapie = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24">
        {/* Scroll-Telling: Was ist Gestalttherapie? */}
        <GestaltScrollTelling />

        {/* Video 1: Offene Gestalt */}
        <VideoSection
          videoSrc={gestaltVideo}
          sectionId="offene-gestalt"
          title="Offene Gestalt"
          position="right"
          content={
            <>
              <p className="mb-3">
                Eine <strong className="text-accent font-semibold">offene Gestalt</strong> ist ein unvollendetes Erlebnis – 
                ein ungelöster Konflikt oder unterdrücktes Gefühl.
              </p>
              <p className="text-primary font-medium text-center mt-4 text-sm md:text-base">
                In der Therapie schließen wir diese Gestalten.
              </p>
            </>
          }
        />

        {/* Video 2: Kontaktunterbrechungen */}
        <VideoSection
          videoSrc={gestaltVideo2}
          sectionId="kontaktunterbrechungen"
          title="Kontaktunterbrechungen"
          position="left"
          content={
            <>
              <p className="mb-3">
                <strong className="text-accent font-semibold">Kontaktunterbrechungen</strong> sind Schutzmechanismen, 
                die uns einst geholfen haben, aber heute hindern.
              </p>
              <p className="text-primary font-medium text-center mt-4 text-sm md:text-base">
                Wir lernen, sie zu erkennen und zu lösen.
              </p>
            </>
          }
        />

        {/* Video 3: Hier und Jetzt */}
        <VideoSection
          videoSrc={gestaltVideo3}
          sectionId="hier-und-jetzt"
          title="Hier und Jetzt"
          position="center"
          content={
            <>
              <p className="mb-3">
                Das <strong className="text-accent font-semibold">Hier und Jetzt</strong> ist der einzige Moment, 
                in dem echte Veränderung möglich ist.
              </p>
              <p className="text-primary font-medium text-center mt-4 text-sm md:text-base">
                Präsenz als Schlüssel zur Heilung.
              </p>
            </>
          }
        />

        {/* Image 2: Gestalt-Kontaktzyklus - Warm paper background */}
        <section className="py-24 md:py-32" style={{ backgroundColor: '#fdfbf7' }}>
          <div className="container mx-auto px-4">
            <AnimatedSection className="max-w-5xl mx-auto">
              <motion.img 
                src={gestaltKontaktzyklus} 
                alt="Der Gestalt-Kontaktzyklus" 
                className="w-full rounded-xl mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ boxShadow: '0 10px 40px rgba(30, 95, 116, 0.1)' }}
              />
              
              {/* Gold connector line from image to cards */}
              <div className="flex justify-center mb-8">
                <div className="w-px h-12 bg-gradient-to-b from-accent to-accent/30" />
              </div>
              
              <motion.div 
                className="p-10 md:p-14 rounded-2xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ backgroundColor: '#f7f5f0' }}
              >
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-8">
                  Der Gestalt-Kontaktzyklus
                </h2>
                <p className="text-foreground/80 text-lg leading-loose mb-10">
                  Der Kontaktzyklus beschreibt den <strong className="text-primary">natürlichen Rhythmus</strong> von 
                  Bedürfnis und Handlung – ein kontinuierlicher Prozess, der in sechs Phasen verläuft:
                </p>
                <StaggerContainer className="grid md:grid-cols-2 gap-5 mb-10">
                  <div className="space-y-4">
                    <AnimatedItem>
                      <div className="p-5 rounded-xl border-l-3 border-accent" style={{ backgroundColor: 'rgba(30, 95, 116, 0.04)', borderLeftWidth: '3px' }}>
                        <p className="text-foreground/80"><span className="text-accent font-semibold text-lg">1. Empfindung</span> <span className="text-sm text-foreground/50">(Körper)</span><br/><span className="text-sm text-foreground/70">Wahrnehmen eines inneren Bedürfnisses</span></p>
                      </div>
                    </AnimatedItem>
                    <AnimatedItem>
                      <div className="p-5 rounded-xl border-l-3 border-accent" style={{ backgroundColor: 'rgba(30, 95, 116, 0.04)', borderLeftWidth: '3px' }}>
                        <p className="text-foreground/80"><span className="text-accent font-semibold text-lg">2. Gewahrsein</span> <span className="text-sm text-foreground/50">(Geist)</span><br/><span className="text-sm text-foreground/70">Bewusstwerdung und Erkenntnis</span></p>
                      </div>
                    </AnimatedItem>
                    <AnimatedItem>
                      <div className="p-5 rounded-xl border-l-3 border-accent" style={{ backgroundColor: 'rgba(30, 95, 116, 0.04)', borderLeftWidth: '3px' }}>
                        <p className="text-foreground/80"><span className="text-accent font-semibold text-lg">3. Mobilisierung</span> <span className="text-sm text-foreground/50">(Handlung)</span><br/><span className="text-sm text-foreground/70">Energie und Motivation aufbauen</span></p>
                      </div>
                    </AnimatedItem>
                  </div>
                  <div className="space-y-4">
                    <AnimatedItem>
                      <div className="p-5 rounded-xl border-l-3 border-accent" style={{ backgroundColor: 'rgba(30, 95, 116, 0.04)', borderLeftWidth: '3px' }}>
                        <p className="text-foreground/80"><span className="text-accent font-semibold text-lg">4. Kontakt</span><br/><span className="text-sm text-foreground/70">Vollständiges Erleben im Moment</span></p>
                      </div>
                    </AnimatedItem>
                    <AnimatedItem>
                      <div className="p-5 rounded-xl border-l-3 border-accent" style={{ backgroundColor: 'rgba(30, 95, 116, 0.04)', borderLeftWidth: '3px' }}>
                        <p className="text-foreground/80"><span className="text-accent font-semibold text-lg">5. Integration</span> <span className="text-sm text-foreground/50">(Verdauen)</span><br/><span className="text-sm text-foreground/70">Verarbeitung und Einordnung</span></p>
                      </div>
                    </AnimatedItem>
                    <AnimatedItem>
                      <div className="p-5 rounded-xl border-l-3 border-accent" style={{ backgroundColor: 'rgba(30, 95, 116, 0.04)', borderLeftWidth: '3px' }}>
                        <p className="text-foreground/80"><span className="text-accent font-semibold text-lg">6. Rückzug</span> <span className="text-sm text-foreground/50">(Ruhe)</span><br/><span className="text-sm text-foreground/70">Regeneration und Neuorientierung</span></p>
                      </div>
                    </AnimatedItem>
                  </div>
                </StaggerContainer>
                <motion.div 
                  className="p-6 rounded-xl border-l-4 border-primary"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  style={{ backgroundColor: 'rgba(30, 95, 116, 0.08)' }}
                >
                  <p className="text-foreground/80 leading-relaxed">
                    <strong className="text-primary">Unterbrechungen</strong> dieses Zyklus – wie Deflektionen, 
                    Projektionen oder Introjektionen – können zu psychischen Beschwerden führen. In der Therapie 
                    arbeiten wir daran, diese zu erkennen und <strong className="text-primary">neue Verhaltensweisen 
                    in einem sicheren Raum auszuprobieren</strong>.
                  </p>
                </motion.div>
              </motion.div>
            </AnimatedSection>
          </div>
        </section>

        {/* Image 3: Ressourcen & Unterstützung - Warm paper background */}
        <section className="py-24 md:py-32 bg-background">
          <div className="container mx-auto px-4">
            <AnimatedSection className="max-w-5xl mx-auto">
              <motion.img 
                src={ressourcenUnterstuetzung} 
                alt="Ressourcen und Unterstützung für den Prozess" 
                className="w-full rounded-xl mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ boxShadow: '0 10px 40px rgba(30, 95, 116, 0.1)' }}
              />
              
              {/* Gold connector with arrow */}
              <div className="flex flex-col items-center mb-8">
                <div className="w-px h-8 bg-gradient-to-b from-accent to-accent/50" />
                <div className="w-3 h-3 border-b-2 border-r-2 border-accent rotate-45 -mt-1" />
              </div>
              
              <motion.div 
                className="p-10 md:p-14 rounded-2xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ backgroundColor: '#f7f5f0' }}
              >
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-8">
                  Ressourcen & Unterstützung für Ihren Weg
                </h2>
                <p className="text-foreground/80 text-lg leading-loose mb-10">
                  Im therapeutischen Prozess nutzen wir verschiedene <strong className="text-primary">Ressourcen zur Stabilisierung</strong> – 
                  diese bilden das Fundament für nachhaltige Veränderung:
                </p>
                <StaggerContainer className="grid md:grid-cols-3 gap-6">
                  <AnimatedItem>
                    <div className="text-center p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: 'rgba(30, 95, 116, 0.04)' }}>
                      <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: 'rgba(197, 160, 101, 0.15)' }}>
                        <Hand className="w-7 h-7 text-accent" />
                      </div>
                      <h3 className="font-heading font-bold text-primary mb-4 text-xl">Äußere Stützen</h3>
                      <p className="text-foreground/70 leading-relaxed text-sm">
                        Die therapeutische Beziehung – geprägt von Vertrauen und Empathie – sowie 
                        Familie und Gruppen bilden ein stabiles Netzwerk für Ihren Weg.
                      </p>
                    </div>
                  </AnimatedItem>
                  <AnimatedItem>
                    <div className="text-center p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: 'rgba(30, 95, 116, 0.04)' }}>
                      <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: 'rgba(197, 160, 101, 0.15)' }}>
                        <Brain className="w-7 h-7 text-accent" />
                      </div>
                      <h3 className="font-heading font-bold text-primary mb-4 text-xl">Innere Ressourcen</h3>
                      <p className="text-foreground/70 leading-relaxed text-sm">
                        Körperliches Spüren, Zentrierung und Resilienz – die Verbindung von 
                        Herz und Verstand für innere Stabilität und Selbstvertrauen.
                      </p>
                    </div>
                  </AnimatedItem>
                  <AnimatedItem>
                    <div className="text-center p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: 'rgba(30, 95, 116, 0.04)' }}>
                      <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: 'rgba(197, 160, 101, 0.15)' }}>
                        <Palette className="w-7 h-7 text-accent" />
                      </div>
                      <h3 className="font-heading font-bold text-primary mb-4 text-xl">Kreative Ausdrucksformen</h3>
                      <p className="text-foreground/70 leading-relaxed text-sm">
                        Malen, Schreiben, Bewegung und Musik – kreative Methoden öffnen 
                        neue Wege zur Verarbeitung und zum authentischen Selbstausdruck.
                      </p>
                    </div>
                  </AnimatedItem>
                </StaggerContainer>
              </motion.div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA with gradient */}
        <section className="py-24 md:py-28 text-white relative overflow-hidden bg-gradient-cta">
          {/* Subtle gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-teal-navy/30" />
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <AnimatedSection>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-white">
                Neugierig geworden?
              </h2>
              <p className="text-white/85 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                Vereinbaren Sie ein unverbindliches Erstgespräch und erfahren Sie, 
                wie Gestalttherapie Ihnen helfen kann.
              </p>
              <motion.a 
                href="/kontakt"
                className="inline-flex items-center justify-center bg-gold-accent text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-gold-dark hover:shadow-gold hover:-translate-y-0.5"
                whileHover={{ y: -2 }}
              >
                Kontakt aufnehmen
              </motion.a>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Gestalttherapie;