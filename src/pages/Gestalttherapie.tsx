import { Navigation } from "@/components/Navigation";
import { useEffect, useRef, useState } from "react";
import gestalttherapieIntro from "@/assets/gestalttherapie-intro.png";
import gestaltKontaktzyklus from "@/assets/gestalt-kontaktzyklus.png";
import ressourcenUnterstuetzung from "@/assets/ressourcen-unterstuetzung.png";
import gestaltVideo from "@/assets/gestalt-video.mp4";
import gestaltVideo2 from "@/assets/gestalt-video-2.mp4";
import gestaltVideo3 from "@/assets/gestalt-video-3.mp4";

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
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getBoxOpacity = () => {
    if (scrollProgress < 0.15) return 0;
    if (scrollProgress < 0.20) return (scrollProgress - 0.15) / 0.05;
    if (scrollProgress < 0.65) return 1;
    if (scrollProgress < 0.70) return 1 - (scrollProgress - 0.65) / 0.05;
    return 0;
  };

  const boxOpacity = getBoxOpacity();

  const positionClasses = {
    left: 'justify-start pl-8 md:pl-16',
    center: 'justify-center',
    right: 'justify-end pr-8 md:pr-16'
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
        
        <div className="absolute inset-0 bg-primary/10" />
        
        <div 
          className={`absolute inset-0 flex items-center ${positionClasses[position]} p-4`}
          style={{ 
            opacity: boxOpacity,
            transform: `translateY(${(1 - boxOpacity) * 20}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <div className="bg-card/90 backdrop-blur-sm p-8 md:p-10 rounded-xl shadow-lg max-w-lg border border-gold-accent/20">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-4 text-center">
              {title}
            </h2>
            <div className="text-muted-foreground text-base md:text-lg">
              {content}
            </div>
          </div>
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
        {/* Image 1: Gestalttherapie Intro */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <img 
                src={gestalttherapieIntro} 
                alt="Gestalttherapie - Humanistisches Erleben und Selbstentfaltung" 
                className="w-full rounded-xl shadow-lg mb-10"
              />
              <div className="bg-card p-10 md:p-12 rounded-xl border border-border shadow-soft">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-6">
                  Was ist Gestalttherapie?
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Die Gestalttherapie ist ein <strong className="text-primary">humanistischer Psychotherapieansatz</strong>, 
                  der den Fokus auf das <strong className="text-gold-accent">Hier und Jetzt</strong> legt – 
                  im Gegensatz zur klassischen Analyse der Vergangenheit. 
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8 italic border-l-4 border-gold-accent pl-6">
                  Anstatt zu fragen „Warum?" fragen wir „Wie?" und „Was erlebe ich gerade?"
                </p>
                <h3 className="font-heading text-xl font-semibold text-primary mb-6">
                  Die drei Grundpfeiler der Gestalttherapie:
                </h3>
                <ul className="space-y-5 text-muted-foreground">
                  <li className="flex items-start gap-4 p-4 bg-primary/5 rounded-lg">
                    <span className="text-teal-primary font-bold text-lg whitespace-nowrap">Gewahrsein</span> 
                    <span className="text-base leading-relaxed">Spüren statt Denken – Körper und Gefühle bewusst wahrnehmen und im Moment verankert sein.</span>
                  </li>
                  <li className="flex items-start gap-4 p-4 bg-primary/5 rounded-lg">
                    <span className="text-teal-primary font-bold text-lg whitespace-nowrap">Ganzheitlichkeit</span> 
                    <span className="text-base leading-relaxed">Körper, Seele, Geist und Umfeld als untrennbare Einheit betrachten und verstehen.</span>
                  </li>
                  <li className="flex items-start gap-4 p-4 bg-primary/5 rounded-lg">
                    <span className="text-teal-primary font-bold text-lg whitespace-nowrap">Kontakt & Dialog</span> 
                    <span className="text-base leading-relaxed">Echte Begegnung auf Augenhöhe – Heilung geschieht im authentischen Dialog.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Video 1: Offene Gestalt */}
        <VideoSection
          videoSrc={gestaltVideo}
          sectionId="offene-gestalt"
          title="Offene Gestalt"
          position="right"
          content={
            <>
              <p className="mb-2">
                Eine <strong className="text-gold-accent">offene Gestalt</strong> ist ein unvollendetes Erlebnis – 
                ein ungelöster Konflikt oder unterdrücktes Gefühl.
              </p>
              <p className="text-teal-primary font-medium text-center mt-3">
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
              <p className="mb-2">
                <strong className="text-gold-accent">Kontaktunterbrechungen</strong> sind Schutzmechanismen, 
                die uns einst geholfen haben, aber heute hindern.
              </p>
              <p className="text-teal-primary font-medium text-center mt-3">
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
              <p className="mb-2">
                Das <strong className="text-gold-accent">Hier und Jetzt</strong> ist der einzige Moment, 
                in dem echte Veränderung möglich ist.
              </p>
              <p className="text-teal-primary font-medium text-center mt-3">
                Präsenz als Schlüssel zur Heilung.
              </p>
            </>
          }
        />

        {/* Image 2: Gestalt-Kontaktzyklus */}
        <section className="py-20 bg-gray-light/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <img 
                src={gestaltKontaktzyklus} 
                alt="Der Gestalt-Kontaktzyklus" 
                className="w-full rounded-xl shadow-lg mb-10"
              />
              <div className="bg-card p-10 md:p-12 rounded-xl border border-border shadow-soft">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-6">
                  Der Gestalt-Kontaktzyklus
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Der Kontaktzyklus beschreibt den <strong className="text-primary">natürlichen Rhythmus</strong> von 
                  Bedürfnis und Handlung – ein kontinuierlicher Prozess, der in sechs Phasen verläuft:
                </p>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <p className="text-muted-foreground"><span className="text-gold-accent font-semibold">1. Empfindung</span> <span className="text-sm text-muted-foreground/70">(Körper)</span><br/><span className="text-sm">Wahrnehmen eines inneren Bedürfnisses</span></p>
                    </div>
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <p className="text-muted-foreground"><span className="text-gold-accent font-semibold">2. Gewahrsein</span> <span className="text-sm text-muted-foreground/70">(Geist)</span><br/><span className="text-sm">Bewusstwerdung und Erkenntnis</span></p>
                    </div>
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <p className="text-muted-foreground"><span className="text-gold-accent font-semibold">3. Mobilisierung</span> <span className="text-sm text-muted-foreground/70">(Handlung)</span><br/><span className="text-sm">Energie und Motivation aufbauen</span></p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <p className="text-muted-foreground"><span className="text-gold-accent font-semibold">4. Kontakt</span><br/><span className="text-sm">Vollständiges Erleben im Moment</span></p>
                    </div>
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <p className="text-muted-foreground"><span className="text-gold-accent font-semibold">5. Integration</span> <span className="text-sm text-muted-foreground/70">(Verdauen)</span><br/><span className="text-sm">Verarbeitung und Einordnung</span></p>
                    </div>
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <p className="text-muted-foreground"><span className="text-gold-accent font-semibold">6. Rückzug</span> <span className="text-sm text-muted-foreground/70">(Ruhe)</span><br/><span className="text-sm">Regeneration und Neuorientierung</span></p>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-teal-primary/10 rounded-lg border-l-4 border-teal-primary">
                  <p className="text-muted-foreground leading-relaxed">
                    <strong className="text-teal-primary">Unterbrechungen</strong> dieses Zyklus – wie Deflektionen, 
                    Projektionen oder Introjektionen – können zu psychischen Beschwerden führen. In der Therapie 
                    arbeiten wir daran, diese zu erkennen und <strong className="text-teal-primary">neue Verhaltensweisen 
                    in einem sicheren Raum auszuprobieren</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Image 3: Ressourcen & Unterstützung */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <img 
                src={ressourcenUnterstuetzung} 
                alt="Ressourcen und Unterstützung für den Prozess" 
                className="w-full rounded-xl shadow-lg mb-10"
              />
              <div className="bg-card p-10 md:p-12 rounded-xl border border-border shadow-soft">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-6">
                  Ressourcen & Unterstützung für Ihren Weg
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Im therapeutischen Prozess nutzen wir verschiedene <strong className="text-primary">Ressourcen zur Stabilisierung</strong> – 
                  diese bilden das Fundament für nachhaltige Veränderung:
                </p>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center p-6 bg-primary/5 rounded-xl border border-border/50 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-teal-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-teal-primary text-xl">🤝</span>
                    </div>
                    <h3 className="font-heading font-bold text-teal-primary mb-3 text-lg">Äußere Stützen</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Die therapeutische Beziehung – geprägt von Vertrauen und Empathie – sowie 
                      Familie und Gruppen bilden ein stabiles Netzwerk für Ihren Weg.
                    </p>
                  </div>
                  <div className="text-center p-6 bg-primary/5 rounded-xl border border-border/50 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-gold-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-gold-accent text-xl">💫</span>
                    </div>
                    <h3 className="font-heading font-bold text-gold-accent mb-3 text-lg">Innere Ressourcen</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Körperliches Spüren, Zentrierung und Resilienz – die Verbindung von 
                      Herz und Verstand für innere Stabilität und Selbstvertrauen.
                    </p>
                  </div>
                  <div className="text-center p-6 bg-primary/5 rounded-xl border border-border/50 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-teal-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-teal-primary text-xl">🎨</span>
                    </div>
                    <h3 className="font-heading font-bold text-teal-primary mb-3 text-lg">Kreative Ausdrucksformen</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Malen, Schreiben, Bewegung und Musik – kreative Methoden öffnen 
                      neue Wege zur Verarbeitung und zum authentischen Selbstausdruck.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-teal text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading text-3xl font-bold mb-4">
              Neugierig geworden?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Vereinbaren Sie ein unverbindliches Erstgespräch und erfahren Sie, 
              wie Gestalttherapie Ihnen helfen kann.
            </p>
            <a 
              href="/#kontakt"
              className="inline-block bg-gold-accent text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gold-accent/90 transition-colors"
            >
              Kontakt aufnehmen
            </a>
          </div>
        </section>
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

export default Gestalttherapie;