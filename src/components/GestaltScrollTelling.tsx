import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import cardGewahrsein from "@/assets/card-gewahrsein.jpg";
import cardGanzheitlichkeit from "@/assets/card-ganzheitlichkeit.jpg";
import cardKontakt from "@/assets/card-kontakt.jpg";
const principles = [{
  id: 1,
  title: "Gewahrsein",
  subtitle: "Spüren statt Denken",
  description: "Körper und Gefühle bewusst wahrnehmen. Im Moment verankert sein, ohne zu analysieren oder zu bewerten.",
  image: cardGewahrsein
}, {
  id: 2,
  title: "Ganzheitlichkeit",
  subtitle: "Körper, Seele, Geist & Umfeld",
  description: "Alle Aspekte des Menschseins als untrennbare Einheit betrachten. Nichts existiert isoliert.",
  image: cardGanzheitlichkeit
}, {
  id: 3,
  title: "Kontakt & Dialog",
  subtitle: "Echte Begegnung auf Augenhöhe",
  description: "Heilung geschieht im authentischen Dialog. In der Beziehung zwischen Therapeut und Klient entsteht Veränderung.",
  image: cardKontakt
}];
export const GestaltScrollTelling = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Progress for each card (0-0.33, 0.33-0.66, 0.66-1)
  const activeIndex = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0, 1, 2, 2]);
  return <section ref={containerRef} className="relative" style={{
    height: "300vh",
    backgroundColor: "hsl(195, 80%, 15%)" // Deep teal
  }}>
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20" />
        
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full max-w-6xl mx-auto">
            
            {/* Left Column - The Narrator (Text) */}
            <div className="relative z-10 order-2 lg:order-1">
              <motion.div initial={{
              opacity: 0,
              x: -30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.8,
              ease: [0.2, 0.8, 0.2, 1]
            }} viewport={{
              once: true
            }}>
                <p className="text-accent/80 font-medium tracking-widest uppercase text-sm mb-4">
                  Die drei Grundpfeiler
                </p>
                <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight">
                  Was ist<br />
                  <span className="text-accent">Gestalttherapie?</span>
                </h2>
              </motion.div>
              
              {/* Dynamic Text based on scroll */}
              <div className="relative h-40">
                {principles.map((principle, index) => <PrincipleText key={principle.id} principle={principle} index={index} scrollProgress={scrollYProgress} />)}
              </div>
            </div>

            {/* Right Column - The Visuals (Stacking Cards) */}
            <div className="relative h-[60vh] lg:h-[70vh] order-1 lg:order-2">
              <div className="relative w-full h-full flex items-center justify-center">
                {principles.map((principle, index) => <PrincipleCard key={principle.id} principle={principle} index={index} scrollProgress={scrollYProgress} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
interface PrincipleTextProps {
  principle: typeof principles[0];
  index: number;
  scrollProgress: any;
}
const PrincipleText = ({
  principle,
  index,
  scrollProgress
}: PrincipleTextProps) => {
  // Each principle is active during its third of the scroll
  const startProgress = index * 0.33;
  const endProgress = (index + 1) * 0.33;
  const opacity = useTransform(scrollProgress, [startProgress - 0.05, startProgress + 0.05, endProgress - 0.05, endProgress + 0.05], [0, 1, 1, index === 2 ? 1 : 0]);
  const y = useTransform(scrollProgress, [startProgress - 0.05, startProgress + 0.05], [20, 0]);
  return <motion.div style={{
    opacity,
    y
  }} className="absolute top-0 left-0">
      <div className="flex items-center gap-3 mb-3">
        <span className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-semibold text-sm">
          {index + 1}
        </span>
        <h3 className="font-heading text-2xl md:text-3xl text-white">
          {principle.title}
        </h3>
      </div>
      <p className="text-accent/90 font-medium mb-2 text-lg">
        {principle.subtitle}
      </p>
      <p className="text-white/70 leading-relaxed max-w-md">
        {principle.description}
      </p>
    </motion.div>;
};
interface PrincipleCardProps {
  principle: typeof principles[0];
  index: number;
  scrollProgress: any;
}
const PrincipleCard = ({
  principle,
  index,
  scrollProgress
}: PrincipleCardProps) => {
  const startProgress = index * 0.33;
  const midProgress = startProgress + 0.165;
  const endProgress = (index + 1) * 0.33;

  // Card enters from bottom, then scales down and fades as next card comes
  const y = useTransform(scrollProgress, [startProgress - 0.1, startProgress + 0.05, endProgress - 0.05, endProgress + 0.1], [100, 0, 0, index === 2 ? 0 : -20]);
  const scale = useTransform(scrollProgress, [startProgress, midProgress, endProgress - 0.05, endProgress + 0.1], [0.95, 1, 1, index === 2 ? 1 : 0.92]);
  const opacity = useTransform(scrollProgress, [startProgress - 0.1, startProgress, endProgress - 0.1, endProgress + 0.05], [0, 1, 1, index === 2 ? 1 : 0.4]);

  // Z-index decreases as cards stack (newer cards on top)
  const zIndex = useTransform(scrollProgress, [startProgress, endProgress], [30 - index * 10, 30 - index * 10]);
  return <motion.div style={{
    y,
    scale,
    opacity,
    zIndex
  }} className="absolute w-full max-w-[280px] md:max-w-[320px] lg:max-w-[360px]">
      <div className="relative">
        <img 
          src={principle.image} 
          alt={principle.title}
          className="w-full aspect-[3/4] object-cover rounded-2xl shadow-2xl"
        />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h4 className="font-heading text-xl text-white drop-shadow-lg">{principle.title}</h4>
        </div>
      </div>
    </motion.div>;
};
export default GestaltScrollTelling;