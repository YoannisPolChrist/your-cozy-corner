import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/i18n";
import { AnimatedSection, AnimatedItem, StaggerContainer } from "@/components/AnimatedSection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Brain, Dumbbell, ArrowRight, Target, Zap, Palette } from "lucide-react";
import { viewportSettings } from "@/lib/animations";
import { GestaltScrollTelling } from "@/components/GestaltScrollTelling";
import { TiltCard } from "@/components/ui/tilt-card";
import gestaltKontaktzyklusEn from "@/assets/gestalt-kontaktzyklus-en.jpg";
import gestaltKontaktzyklusFr from "@/assets/gestalt-kontaktzyklus-fr.jpg";
import gestaltKontaktzyklusDe from "@/assets/gestalt-kontaktzyklus-de.jpg";
import ressourcenUnterstuetzungEn from "@/assets/ressourcen-unterstuetzung-en.jpg";
import ressourcenUnterstuetzungFr from "@/assets/ressourcen-unterstuetzung-fr.jpg";
import ressourcenUnterstuetzungDe from "@/assets/ressourcen-unterstuetzung-de.jpg";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const MyWork = () => {
  const { t, getLocalizedPath, language } = useLanguage();
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) { setTimeout(() => { element.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100); }
    }
  }, [location.hash]);

  const ressourcenIcons = [Heart, Brain, Palette];
  const coachingIcons = [Dumbbell, Target, Zap];

  return (
    <div className="min-h-screen bg-background overflow-x-clip">
      <Navigation />
      <main className="pt-24 overflow-x-clip">
        <section className="py-10 sm:py-12 md:py-20 bg-off-white overflow-x-clip">
          <div className="container mx-auto px-4 text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="font-heading text-3xl sm:text-4xl md:text-6xl text-primary mb-10 leading-tight">
              {t.myWork?.hero?.title || "Approach"}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-muted-foreground text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mb-10">
              {t.myWork?.hero?.subtitle}
            </motion.p>
          </div>
        </section>

        <GestaltScrollTelling />

        {/* CTA */}
        <AnimatedSection className="py-16 md:py-36 bg-primary relative overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <StaggerContainer className="max-w-2xl mx-auto">
              <AnimatedItem><h2 className="font-heading text-2xl md:text-4xl mb-4 md:mb-8 text-white">{t.myWork?.cta?.title || t.gestalttherapie.cta.title}</h2></AnimatedItem>
              <AnimatedItem><p className="text-white/85 text-base md:text-lg mb-6 md:mb-10">{t.myWork?.cta?.description || t.gestalttherapie.cta.description}</p></AnimatedItem>
              <AnimatedItem>
                <Link to={getLocalizedPath('/angebot')} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  <Button variant="gold" size="lg" className="font-semibold">{t.myWork?.cta?.button || "Zum Angebot"} <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </Link>
              </AnimatedItem>
            </StaggerContainer>
          </div>
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
};
export default MyWork;
