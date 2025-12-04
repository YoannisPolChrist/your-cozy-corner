import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Brain, Bot } from "lucide-react";
import heroVideo from "@/assets/gestalt-video.mp4";

export const Hero = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Approach Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8 animate-fade-in">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm border border-white/20">
              <Sparkles className="w-4 h-4" />
              Gestalttherapie
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm border border-white/20">
              <Brain className="w-4 h-4" />
              Coaching
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm border border-white/20">
              <Bot className="w-4 h-4" />
              KI-gestützt
            </span>
          </div>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6 text-white leading-tight animate-fade-in">
            Veränderung beginnt im <span className="italic text-gold-accent">Hier und Jetzt</span>
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-white/80 max-w-2xl mx-auto animate-fade-in opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards] leading-relaxed">
            Ich verbinde humanistische Gestalttherapie mit modernem Coaching und innovativen KI-Tools, 
            um Ihnen einen individuellen Weg zu mehr Klarheit, Selbstbewusstsein und innerer Stärke zu ermöglichen.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]">
            <Link to="/kontakt" onClick={scrollToTop}>
              <Button
                size="lg"
                className="bg-gold-accent hover:bg-gold-accent/90 text-white font-medium px-8 py-6 text-lg w-full sm:w-auto"
              >
                Kostenloses Erstgespräch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/angebot" onClick={scrollToTop}>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-medium px-8 py-6 text-lg w-full sm:w-auto"
              >
                Angebot entdecken
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};