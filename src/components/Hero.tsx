import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Brain, Bot } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import heroVideo from "@/assets/hero-video.mp4";

export const Hero = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 w-full h-full"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      </motion.div>
      
      {/* Gradient Overlay - Teal to transparent */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, hsl(190 75% 30% / 0.7) 0%, hsl(190 75% 30% / 0.4) 40%, transparent 70%, hsl(0 0% 0% / 0.3) 100%)'
        }}
      />
      
      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 container mx-auto px-4 py-24"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Approach Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full text-primary-foreground/90 text-sm border border-primary-foreground/20">
              <Sparkles className="w-4 h-4" />
              Gestalttherapie
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full text-primary-foreground/90 text-sm border border-primary-foreground/20">
              <Brain className="w-4 h-4" />
              Coaching
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full text-primary-foreground/90 text-sm border border-primary-foreground/20">
              <Bot className="w-4 h-4" />
              KI-gestützt
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6 text-primary-foreground leading-tight"
          >
            Veränderung beginnt im{" "}
            <span className="italic text-accent">Hier und Jetzt</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-lg md:text-xl mb-10 text-primary-foreground/85 max-w-2xl mx-auto leading-relaxed"
          >
            Begleitung auf Ihrem Weg zu mehr Klarheit und Erfüllung – 
            durch humanistische Gestalttherapie, modernes Coaching und innovative KI-Tools.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/kontakt" onClick={scrollToTop}>
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-8 py-6 text-lg w-full sm:w-auto shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Kennenlerngespräch vereinbaren
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/angebot" onClick={scrollToTop}>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-medium px-8 py-6 text-lg w-full sm:w-auto backdrop-blur-sm"
              >
                Angebot entdecken
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
