import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, Dumbbell } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/i18n";
import { TextReveal } from "@/components/ui/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ThreeDBackground } from "@/components/ThreeDBackground";
import logo from "@/assets/logo.webp";
import therapyImage from "@/assets/johannes-coaching-new.jpg";
import trainingImage from "@/assets/johannes-cycling-friends.webp";

export const Hero = () => {
  const { t, getLocalizedPath } = useLanguage();
  const [hoveredPanel, setHoveredPanel] = useState<'left' | 'right' | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  useEffect(() => { const timer = setTimeout(() => setIsRevealed(true), 100); return () => clearTimeout(timer); }, []);

  return (
    <section className="relative h-[100dvh] w-full flex flex-col md:flex-row overflow-hidden bg-black" aria-label="Hero">
      <ThreeDBackground className="absolute inset-0 z-[1] opacity-70 transition-opacity duration-1000" />
      <motion.div initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }} animate={{ opacity: isRevealed ? 1 : 0, scale: isRevealed ? 1 : 0.8, filter: isRevealed ? "blur(0px)" : "blur(10px)" }} transition={{ duration: 1.2, delay: 0.5 }} className="absolute top-8 md:top-12 inset-x-0 z-50 flex flex-col items-center pointer-events-none">
        <div className="relative group mt-4 md:mt-0">
          <div className="absolute inset-0 bg-gold-accent/40 rounded-full blur-2xl opacity-50"></div>
          <img src={logo} alt="Johannes Christ Logo" className="relative z-10 w-20 md:w-32 h-auto object-contain drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]" />
        </div>
      </motion.div>

      {/* LEFT PANEL */}
      <motion.div className="relative w-full md:h-full flex-1 flex items-center justify-center cursor-pointer border-b md:border-b-0 md:border-r border-white/10 overflow-hidden z-10" onMouseEnter={() => setHoveredPanel('left')} onMouseLeave={() => setHoveredPanel(null)} animate={{ flexGrow: hoveredPanel === 'left' ? 1.4 : hoveredPanel === 'right' ? 0.6 : 1 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
        <motion.div className="absolute inset-0 bg-[#0e100f]" animate={{ scale: hoveredPanel === 'left' ? 1.05 : 1 }} transition={{ duration: 6 }}>
          <img src={therapyImage} alt="Gestalttherapie" className="w-full h-full object-cover object-center opacity-40 md:opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/80" />
        </motion.div>
        <div className="relative z-10 text-center px-6 md:px-12 w-full max-w-xl">
          <motion.div animate={{ y: hoveredPanel === 'left' ? -10 : 0 }} transition={{ duration: 0.8 }}>
            <Brain className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-4 text-gold-accent opacity-80" strokeWidth={1.5} />
            <TextReveal text="Gestalttherapie" className="typ-h1 text-white mb-3" delay={0.7} />
            <p className="text-white/70 text-sm md:text-lg mb-8 font-light max-w-sm mx-auto">{t.gestalttherapie.hero.subtitle}</p>
          </motion.div>
          <motion.div animate={{ opacity: hoveredPanel === 'left' ? 1 : 0.4, y: hoveredPanel === 'left' ? 0 : 10 }} className="flex justify-center">
            <Link to={getLocalizedPath('/gestalttherapie')} className="block">
              <MagneticButton strength={0.25}>
                <Button variant="outline" className="border-gold-accent/50 text-white hover:bg-gold-accent hover:text-black rounded-full px-8 py-6 bg-black/20 backdrop-blur-sm uppercase tracking-widest text-xs font-semibold">{t.gestalttherapie.hero.cta} <ArrowRight className="ml-2 w-4 h-4" /></Button>
              </MagneticButton>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* RIGHT PANEL */}
      <motion.div className="relative w-full md:h-full flex-1 flex items-center justify-center cursor-pointer overflow-hidden z-10" onMouseEnter={() => setHoveredPanel('right')} onMouseLeave={() => setHoveredPanel(null)} animate={{ flexGrow: hoveredPanel === 'right' ? 1.4 : hoveredPanel === 'left' ? 0.6 : 1 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
        <motion.div className="absolute inset-0 bg-[#0a0005]" animate={{ scale: hoveredPanel === 'right' ? 1.05 : 1 }} transition={{ duration: 8 }}>
          <img src={trainingImage} alt="Personal Training" className="w-full h-full object-cover object-[center_30%] opacity-40 md:opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/80" />
        </motion.div>
        <div className="relative z-10 text-center px-6 md:px-12 w-full max-w-xl mt-10 md:mt-0">
          <motion.div animate={{ y: hoveredPanel === 'right' ? -10 : 0 }} transition={{ duration: 0.8 }}>
            <Dumbbell className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-4 text-destructive opacity-80" strokeWidth={1.5} />
            <TextReveal text="Personal Training" className="typ-h1 text-white mb-3" delay={0.8} />
            <p className="text-white/70 text-sm md:text-lg mb-8 font-light max-w-sm mx-auto">Personal Training. Stärke aufbauen, wo sie gebraucht wird.</p>
          </motion.div>
          <motion.div animate={{ opacity: hoveredPanel === 'right' ? 1 : 0.4, y: hoveredPanel === 'right' ? 0 : 10 }} className="flex justify-center">
            <Link to={getLocalizedPath('/personal-training')} className="block">
              <MagneticButton strength={0.25}>
                <Button variant="outline" className="border-destructive/50 text-white hover:bg-destructive hover:text-white rounded-full px-8 py-6 bg-black/20 backdrop-blur-sm uppercase tracking-widest text-xs font-semibold">Körperliche Kraft aufbauen <ArrowRight className="ml-2 w-4 h-4" /></Button>
              </MagneticButton>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
