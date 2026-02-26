import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import heroBackground from "@/assets/hero-poster.webp";
import logo from "@/assets/logo.webp";
import heroVideo from "@/assets/hero-video.mp4";
import { useLanguage } from "@/i18n";

import { MagneticButton } from "@/components/ui/magnetic-button";

const grainSvg = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E`;

export const Hero = () => {
  const { t, getLocalizedPath } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    // Reveal text immediately after a short delay for animation
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black" aria-label="Hero – Startseite Johannes Christ">
      {/* Video Background with Advanced Parallax */}
      <motion.div style={{ y, scale }} className="absolute inset-0 w-full h-full origin-top">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={heroBackground}
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          aria-hidden="true"
          title="Hintergrundvideo – Natur und Landschaft"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      </motion.div>


      {/* Cinematic Noise Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay z-0"
        style={{ backgroundImage: `url("${grainSvg}")` }}
      />

      {/* Gradient Overlay - Darker for readability */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(to top, hsl(0 0% 0% / 0.85) 0%, hsl(0 0% 0% / 0.5) 50%, hsl(0 0% 0% / 0.3) 100%)'
        }}
      />


      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 container mx-auto px-4 py-20 mb-10 -mt-20 md:-mt-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: isRevealed ? 1 : 0, scale: isRevealed ? 1 : 0.9, filter: isRevealed ? "blur(0px)" : "blur(10px)" }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center mb-6"
          >
            <div className="relative group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="absolute inset-0 bg-gold-accent/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <img
                src={logo}
                alt="Johannes Christ Logo"
                className="relative z-10 w-24 md:w-28 lg:w-36 h-auto object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                width={160}
                height={160}
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 40, filter: isRevealed ? "blur(0px)" : "blur(10px)" }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6 text-white leading-tight drop-shadow-lg"
            style={{ textShadow: '0 4px 30px rgba(0,0,0,0.6)' }}
          >
            <span className="block mb-4 md:mb-6 tracking-tight">{t.hero.title}</span>
            <span className="italic text-gold-accent font-light">{t.hero.titleHighlight}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
            animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 30, filter: isRevealed ? "blur(0px)" : "blur(5px)" }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="text-lg md:text-2xl mb-10 text-white/80 max-w-2xl mx-auto leading-relaxed font-light"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 20 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          >
            <Link to={getLocalizedPath('/kontakt')} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <MagneticButton strength={0.15}>
                <div className="relative inline-block group">
                  {/* Organic Breathing Aura behind button */}
                  <motion.div
                    className="absolute -inset-1 rounded-full bg-gold-accent opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
                    animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.35, 0.15] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <Button
                    size="lg"
                    className="relative overflow-hidden text-white font-medium px-8 py-7 md:px-10 md:py-8 text-base md:text-lg rounded-full shadow-gold border border-gold-accent/30 transition-all duration-300 hover:shadow-premium-hover hover:-translate-y-1"
                    style={{ backgroundColor: 'transparent' }}
                  >
                    {/* Background colored layer */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#c5a065] to-[#d4b07a] opacity-90 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Shine effect that sweeps across */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-shimmer" />

                    <span className="relative z-10 flex items-center tracking-wide">
                      {t.hero.cta}
                      <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </span>
                  </Button>
                </div>
              </MagneticButton>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isRevealed ? 1 : 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-7 h-12 border-2 border-white/30 rounded-full flex justify-center pt-2 backdrop-blur-sm"
        >
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3], height: ["20%", "40%", "20%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 bg-white/60 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
