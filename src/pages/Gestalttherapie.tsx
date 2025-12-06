import { Navigation } from "@/components/Navigation";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AnimatedSection, AnimatedItem, StaggerContainer } from "@/components/AnimatedSection";
import { Hand, Brain, Palette, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import gestaltKontaktzyklus from "@/assets/gestalt-kontaktzyklus.png";
import ressourcenUnterstuetzung from "@/assets/ressourcen-unterstuetzung.png";
import gestaltVideo from "@/assets/gestalt-video.mp4";
import gestaltVideo2 from "@/assets/gestalt-video-2.mp4";
import gestaltVideo3 from "@/assets/gestalt-video-3.mp4";
import { cinematicEase, viewportSettings } from "@/lib/animations";
import { Footer } from "@/components/Footer";
import { GestaltScrollTelling } from "@/components/GestaltScrollTelling";
import { useIsMobile } from "@/hooks/use-mobile";

interface VideoSectionProps {
  videoSrc: string;
  title: string;
  content: React.ReactNode;
  sectionId: string;
  position?: 'left' | 'center' | 'right';
  posterImage?: string;
}

const VideoSection = ({ videoSrc, title, content, sectionId, position = 'center', posterImage }: VideoSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const isMobile = useIsMobile();

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

  // Try to play video on mobile when it becomes visible
  useEffect(() => {
    if (videoRef.current && isVisible && !videoFailed) {
      videoRef.current.play().catch(() => {
        setVideoFailed(true);
      });
    }
  }, [isVisible, videoFailed]);

  // Position classes - slightly offset from center
  const positionClasses = {
    left: 'items-center justify-center -translate-x-[25%]',
    center: 'items-center justify-center',
    right: 'items-center justify-center translate-x-[10%]'
  };

  // On mobile, use a simpler layout without sticky video
  if (isMobile) {
    return (
      <section 
        ref={sectionRef}
        id={sectionId}
        className="relative py-16 bg-primary"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            <div 
              className="p-6 rounded-2xl shadow-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              }}
            >
              <h2 className="font-heading text-xl md:text-2xl font-bold text-primary mb-4 text-center">
                {title}
              </h2>
              <div className="text-foreground/80 text-sm md:text-base leading-relaxed">
                {content}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      id={sectionId}
      className="relative h-[400vh]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-85"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        
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
              className="p-6 md:p-8 rounded-2xl shadow-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              }}
            >
              <h2 
                className="font-heading text-xl md:text-2xl lg:text-3xl font-bold text-primary mb-4 text-center"
              >
                {title}
              </h2>
              <div className="text-foreground/80 text-sm md:text-base leading-relaxed">
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
        <section className="py-12 md:py-32 bg-off-white">
          <div className="container mx-auto px-4">
            <AnimatedSection className="max-w-5xl mx-auto">
              <motion.img 
                src={gestaltKontaktzyklus} 
                alt="Der Gestalt-Kontaktzyklus" 
                className="w-full rounded-xl mb-6 md:mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ boxShadow: '0 10px 40px rgba(30, 95, 116, 0.1)' }}
              />
              
              {/* Gold connector line - hidden on mobile */}
              <div className="hidden md:flex justify-center mb-8">
                <div className="w-px h-12 bg-gradient-to-b from-accent to-accent/30" />
              </div>
              
              <motion.div 
                className="p-5 md:p-14 rounded-2xl bg-secondary"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="font-heading text-2xl md:text-4xl font-bold text-primary mb-4 md:mb-8">
                  Der Gestalt-Kontaktzyklus
                </h2>
                <p className="text-foreground/80 text-base md:text-lg leading-relaxed md:leading-loose mb-6 md:mb-10">
                  Der Kontaktzyklus beschreibt den <strong className="text-primary">natürlichen Rhythmus</strong> von 
                  Bedürfnis und Handlung – in sechs Phasen:
                </p>
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 mb-6 md:mb-10">
                  <div className="space-y-3 md:space-y-4">
                    <AnimatedItem>
                      <div className="p-3 md:p-5 rounded-xl border-l-[3px] border-accent bg-primary/[0.04]">
                        <p className="text-foreground/80"><span className="text-accent font-semibold text-base md:text-lg">1. Empfindung</span> <span className="text-xs md:text-sm text-foreground/50">(Körper)</span><br/><span className="text-xs md:text-sm text-foreground/70">Wahrnehmen eines inneren Bedürfnisses</span></p>
                      </div>
                    </AnimatedItem>
                    <AnimatedItem>
                      <div className="p-3 md:p-5 rounded-xl border-l-[3px] border-accent bg-primary/[0.04]">
                        <p className="text-foreground/80"><span className="text-accent font-semibold text-base md:text-lg">2. Gewahrsein</span> <span className="text-xs md:text-sm text-foreground/50">(Geist)</span><br/><span className="text-xs md:text-sm text-foreground/70">Bewusstwerdung und Erkenntnis</span></p>
                      </div>
                    </AnimatedItem>
                    <AnimatedItem>
                      <div className="p-3 md:p-5 rounded-xl border-l-[3px] border-accent bg-primary/[0.04]">
                        <p className="text-foreground/80"><span className="text-accent font-semibold text-base md:text-lg">3. Mobilisierung</span> <span className="text-xs md:text-sm text-foreground/50">(Handlung)</span><br/><span className="text-xs md:text-sm text-foreground/70">Energie und Motivation aufbauen</span></p>
                      </div>
                    </AnimatedItem>
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    <AnimatedItem>
                      <div className="p-3 md:p-5 rounded-xl border-l-[3px] border-accent bg-primary/[0.04]">
                        <p className="text-foreground/80"><span className="text-accent font-semibold text-base md:text-lg">4. Kontakt</span><br/><span className="text-xs md:text-sm text-foreground/70">Vollständiges Erleben im Moment</span></p>
                      </div>
                    </AnimatedItem>
                    <AnimatedItem>
                      <div className="p-3 md:p-5 rounded-xl border-l-[3px] border-accent bg-primary/[0.04]">
                        <p className="text-foreground/80"><span className="text-accent font-semibold text-base md:text-lg">5. Integration</span> <span className="text-xs md:text-sm text-foreground/50">(Verdauen)</span><br/><span className="text-xs md:text-sm text-foreground/70">Verarbeitung und Einordnung</span></p>
                      </div>
                    </AnimatedItem>
                    <AnimatedItem>
                      <div className="p-3 md:p-5 rounded-xl border-l-[3px] border-accent bg-primary/[0.04]">
                        <p className="text-foreground/80"><span className="text-accent font-semibold text-base md:text-lg">6. Rückzug</span> <span className="text-xs md:text-sm text-foreground/50">(Ruhe)</span><br/><span className="text-xs md:text-sm text-foreground/70">Regeneration und Neuorientierung</span></p>
                      </div>
                    </AnimatedItem>
                  </div>
                </StaggerContainer>
                <motion.div 
                  className="p-4 md:p-6 rounded-xl border-l-4 border-primary bg-primary/[0.08]"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <p className="text-foreground/80 text-sm md:text-base leading-relaxed">
                    <strong className="text-primary">Unterbrechungen</strong> dieses Zyklus können zu psychischen Beschwerden führen. 
                    In der Therapie arbeiten wir daran, diese zu erkennen und <strong className="text-primary">neue Verhaltensweisen 
                    auszuprobieren</strong>.
                  </p>
                </motion.div>
              </motion.div>
            </AnimatedSection>
          </div>
        </section>

        {/* Image 3: Ressourcen & Unterstützung - Warm paper background */}
        <section className="py-12 md:py-32 bg-background">
          <div className="container mx-auto px-4">
            <AnimatedSection className="max-w-5xl mx-auto">
              <motion.img 
                src={ressourcenUnterstuetzung} 
                alt="Ressourcen und Unterstützung für den Prozess" 
                className="w-full rounded-xl mb-6 md:mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ boxShadow: '0 10px 40px rgba(30, 95, 116, 0.1)' }}
              />
              
              {/* Gold connector with arrow - hidden on mobile */}
              <div className="hidden md:flex flex-col items-center mb-8">
                <div className="w-px h-8 bg-gradient-to-b from-accent to-accent/50" />
                <div className="w-3 h-3 border-b-2 border-r-2 border-accent rotate-45 -mt-1" />
              </div>
              
              <motion.div 
                className="p-5 md:p-14 rounded-2xl bg-secondary"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="font-heading text-2xl md:text-4xl font-bold text-primary mb-4 md:mb-8">
                  Ressourcen & Unterstützung
                </h2>
                <p className="text-foreground/80 text-base md:text-lg leading-relaxed md:leading-loose mb-6 md:mb-10">
                  Im therapeutischen Prozess nutzen wir verschiedene <strong className="text-primary">Ressourcen zur Stabilisierung</strong>:
                </p>
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  <AnimatedItem>
                    <div className="text-center p-4 md:p-6 rounded-2xl transition-all duration-300 md:hover:-translate-y-1 bg-primary/[0.04]">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-5 bg-accent/15">
                        <Hand className="w-6 h-6 md:w-7 md:h-7 text-accent" />
                      </div>
                      <h3 className="font-heading font-bold text-primary mb-2 md:mb-4 text-lg md:text-xl">Äußere Stützen</h3>
                      <p className="text-foreground/70 leading-relaxed text-sm">
                        Die therapeutische Beziehung sowie Familie und Gruppen als stabiles Netzwerk.
                      </p>
                    </div>
                  </AnimatedItem>
                  <AnimatedItem>
                    <div className="text-center p-4 md:p-6 rounded-2xl transition-all duration-300 md:hover:-translate-y-1 bg-primary/[0.04]">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-5 bg-accent/15">
                        <Brain className="w-6 h-6 md:w-7 md:h-7 text-accent" />
                      </div>
                      <h3 className="font-heading font-bold text-primary mb-2 md:mb-4 text-lg md:text-xl">Innere Ressourcen</h3>
                      <p className="text-foreground/70 leading-relaxed text-sm">
                        Körperliches Spüren, Zentrierung und Resilienz für innere Stabilität.
                      </p>
                    </div>
                  </AnimatedItem>
                  <AnimatedItem>
                    <div className="text-center p-4 md:p-6 rounded-2xl transition-all duration-300 md:hover:-translate-y-1 bg-primary/[0.04]">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-5 bg-accent/15">
                        <Palette className="w-6 h-6 md:w-7 md:h-7 text-accent" />
                      </div>
                      <h3 className="font-heading font-bold text-primary mb-2 md:mb-4 text-lg md:text-xl">Kreative Methoden</h3>
                      <p className="text-foreground/70 leading-relaxed text-sm">
                        Malen, Schreiben, Bewegung und Musik für authentischen Selbstausdruck.
                      </p>
                    </div>
                  </AnimatedItem>
                </StaggerContainer>
              </motion.div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA with gradient */}
        <AnimatedSection className="py-16 md:py-36 bg-gradient-cta text-white relative overflow-hidden">
          {/* Subtle gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-teal-navy/30" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <StaggerContainer className="max-w-2xl mx-auto">
              <AnimatedItem>
                <h2 className="font-heading text-2xl md:text-4xl mb-4 md:mb-8 text-white">
                  Neugierig geworden?
                </h2>
              </AnimatedItem>
              <AnimatedItem>
                <p className="text-white/85 text-base md:text-lg mb-6 md:mb-10">
                  Vereinbaren Sie ein unverbindliches Erstgespräch.
                </p>
              </AnimatedItem>
              <AnimatedItem>
                <a href="/kontakt">
                  <Button variant="gold" size="default" className="font-semibold">
                    Kontakt aufnehmen <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </AnimatedItem>
            </StaggerContainer>
          </div>
        </AnimatedSection>
      </main>

      <Footer />
    </div>
  );
};

export default Gestalttherapie;