import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import heroVideo from "@/assets/hero-video.mp4";
import { useLanguage } from "@/i18n";

export const Hero = () => {
  const { t, getLocalizedPath } = useLanguage();
  const [isRevealed, setIsRevealed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Reveal Cover Animation */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isRevealed ? 0 : 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute inset-0 z-50 bg-primary pointer-events-none"
      />

      {/* Video Background with Parallax */}
      <motion.div style={{ y, scale }} className="absolute inset-0 w-full h-full">
        <video autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover">
          <source src={heroVideo} type="video/mp4" />
        </video>
      </motion.div>

      {/* Gradient Overlay - Darker for readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, hsl(0 0% 0% / 0.75) 0%, hsl(0 0% 0% / 0.6) 40%, hsl(0 0% 0% / 0.4) 100%)'
        }}
      />

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 container mx-auto px-4 py-24 mb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Approach Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6 text-white leading-tight drop-shadow-lg"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
          >
            <span className="block mb-4 md:mb-6">{t.hero.title}</span>
            <span className="italic text-accent">{t.hero.titleHighlight}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-xl mb-12 text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-md"
            style={{ textShadow: '0 1px 10px rgba(0,0,0,0.4)' }}
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <Link to={getLocalizedPath('/kontakt')} onClick={scrollToTop}>
              <Button
                size="default"
                className="text-white font-medium px-6 py-3 text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                style={{ backgroundColor: '#c5a065' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#d4b07a'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#c5a065'}
              >
                {t.hero.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isRevealed ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-primary-foreground/40 rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-primary-foreground/60 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
