import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, Dumbbell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/i18n";
import { TextReveal } from "@/components/ui/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ThreeDBackground } from "@/components/ThreeDBackground";
import logo from "@/assets/logo.webp";
import therapyImage from "@/assets/johannes-coaching-new.jpg";
import trainingImage from "@/assets/johannes-cycling-friends.webp";
import type { Variants } from "framer-motion";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const panelContentVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease, staggerChildren: 0.15 } }
};

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } }
};

export const Hero = () => {
  const { t, getLocalizedPath } = useLanguage();
  const [hoveredPanel, setHoveredPanel] = useState<'left' | 'right' | null>(null);
  const [activePanel, setActivePanel] = useState<'left' | 'right' | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  useEffect(() => { const timer = setTimeout(() => setIsRevealed(true), 100); return () => clearTimeout(timer); }, []);

  // On mobile, activePanel drives the visual state; on desktop, hoveredPanel does
  const effectivePanel = hoveredPanel ?? activePanel;

  const handlePanelTap = (panel: 'left' | 'right', path: string) => {
    if (window.innerWidth >= 768) return; // desktop uses hover
    if (activePanel === panel) {
      // Second tap → navigate
      window.location.href = path;
    } else {
      setActivePanel(panel);
    }
  };

  return (
    <section className="relative h-[100dvh] w-full flex flex-col md:flex-row overflow-hidden bg-black" aria-label="Hero">
      <ThreeDBackground className="absolute inset-0 z-[1] opacity-50 transition-opacity duration-1000" />

      {/* Logo – centered at the split between panels */}
      <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: isRevealed ? 1 : 0,
            scale: isRevealed ? 1 : 0.6,
          }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative">
            <motion.div 
              className="absolute inset-0 bg-gold-accent/50 rounded-full blur-3xl"
              animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <img src={logo} alt="Johannes Christ Logo" className="relative z-10 w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain drop-shadow-[0_0_20px_rgba(0,0,0,0.9)]" />
          </div>
        </motion.div>
      </div>

      {/* LEFT PANEL – Gestalttherapie */}
      <motion.div
        className="relative w-full h-1/2 md:h-full flex-1 flex items-center justify-center cursor-pointer overflow-hidden z-10"
        onMouseEnter={() => setHoveredPanel('left')}
        onMouseLeave={() => setHoveredPanel(null)}
        onClick={() => handlePanelTap('left', getLocalizedPath('/gestalttherapie'))}
        animate={{ flexGrow: effectivePanel === 'left' ? 1.5 : effectivePanel === 'right' ? 0.5 : 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="absolute inset-0 bg-[#0e100f]"
          animate={{ scale: effectivePanel === 'left' ? 1.08 : 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
        >
          <img src={therapyImage} alt="Gestalttherapie" className="w-full h-full object-cover object-center opacity-50 md:opacity-70 transition-opacity duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60" />
          {/* Animated overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-gold-accent/10 to-transparent"
            animate={{ opacity: effectivePanel === 'left' ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>

        <motion.div
          className="relative z-10 text-center px-6 md:px-12 w-full max-w-xl"
          variants={panelContentVariants}
          initial="hidden"
          animate={isRevealed ? "visible" : "hidden"}
        >
          <motion.div
            animate={{ y: effectivePanel === 'left' ? -12 : 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div variants={itemVariant}>
              <Brain className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-4 text-gold-accent" strokeWidth={1.5} />
            </motion.div>
            <motion.div variants={itemVariant}>
              <TextReveal text={t.nav.gestalttherapie} className="typ-h1 text-white mb-3" delay={0.7} />
            </motion.div>
            <motion.p variants={itemVariant} className="text-white/70 text-sm md:text-lg mb-8 font-light max-w-sm mx-auto leading-relaxed">
              {t.gestalttherapie.hero.subtitle}
            </motion.p>
          </motion.div>
          <motion.div
            animate={{ opacity: hoveredPanel === 'left' ? 1 : 0.3, y: hoveredPanel === 'left' ? 0 : 10, scale: hoveredPanel === 'left' ? 1 : 0.95 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <Link to={getLocalizedPath('/gestalttherapie')} className="block">
              <MagneticButton strength={0.25}>
                <Button variant="outline" className="border-gold-accent/50 text-white hover:bg-gold-accent hover:text-black rounded-full px-8 py-6 bg-black/30 backdrop-blur-md uppercase tracking-widest text-xs font-semibold transition-all duration-300">
                  {t.gestalttherapie.hero.cta} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </MagneticButton>
            </Link>
          </motion.div>
        </motion.div>

        {/* Decorative line at panel edge */}
        <div className="hidden md:block absolute right-0 top-[15%] bottom-[15%] w-px bg-gradient-to-b from-transparent via-white/20 to-transparent z-20" />
      </motion.div>

      {/* RIGHT PANEL – Personal Training */}
      <motion.div
        className="relative w-full h-1/2 md:h-full flex-1 flex items-center justify-center cursor-pointer overflow-hidden z-10"
        onMouseEnter={() => setHoveredPanel('right')}
        onMouseLeave={() => setHoveredPanel(null)}
        onClick={() => { if (window.innerWidth < 768) window.location.href = getLocalizedPath('/personal-training'); }}
        animate={{ flexGrow: hoveredPanel === 'right' ? 1.5 : hoveredPanel === 'left' ? 0.5 : 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="absolute inset-0 bg-[#0a0005]"
          animate={{ scale: hoveredPanel === 'right' ? 1.08 : 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
        >
          <img src={trainingImage} alt="Personal Training" className="w-full h-full object-cover object-[center_30%] opacity-50 md:opacity-70 transition-opacity duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-bl from-destructive/10 to-transparent"
            animate={{ opacity: hoveredPanel === 'right' ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>

        <motion.div
          className="relative z-10 text-center px-6 md:px-12 w-full max-w-xl"
          variants={panelContentVariants}
          initial="hidden"
          animate={isRevealed ? "visible" : "hidden"}
        >
          <motion.div
            animate={{ y: hoveredPanel === 'right' ? -12 : 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div variants={itemVariant}>
              <Dumbbell className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-4 text-destructive" strokeWidth={1.5} />
            </motion.div>
            <motion.div variants={itemVariant}>
              <TextReveal text="Personal Training" className="typ-h1 text-white mb-3" delay={0.8} />
            </motion.div>
            <motion.p variants={itemVariant} className="text-white/70 text-sm md:text-lg mb-8 font-light max-w-sm mx-auto leading-relaxed">
              {t.personalTraining.hero.subtitle}
            </motion.p>
          </motion.div>
          <motion.div
            animate={{ opacity: hoveredPanel === 'right' ? 1 : 0.3, y: hoveredPanel === 'right' ? 0 : 10, scale: hoveredPanel === 'right' ? 1 : 0.95 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <Link to={getLocalizedPath('/personal-training')} className="block">
              <MagneticButton strength={0.25}>
                <Button variant="outline" className="border-destructive/50 text-white hover:bg-destructive hover:text-white rounded-full px-8 py-6 bg-black/30 backdrop-blur-md uppercase tracking-widest text-xs font-semibold transition-all duration-300">
                  {t.personalTraining.hero.cta} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </MagneticButton>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Mobile horizontal divider line */}
      <div className="md:hidden absolute left-[15%] right-[15%] top-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-20" />
    </section>
  );
};