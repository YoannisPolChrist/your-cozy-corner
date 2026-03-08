import { Navigation } from "@/components/Navigation";
import { AnimatedSection, StaggerContainer, AnimatedItem } from "@/components/AnimatedSection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Dumbbell, Heart, Target, MapPin, Award, CheckCircle, Star, Brain, BatteryWarning, ShieldAlert, Activity, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/i18n";
import { TextReveal } from "@/components/ui/text-reveal";
import { ThreeDBackground } from "@/components/ThreeDBackground";
import { MagneticButton } from "@/components/ui/magnetic-button";
import heroImage from "@/assets/TrainingHero.svg";
import johannesSpeed from "@/assets/johannes-speed.webp";
import johannesCyclingFriends from "@/assets/johannes-cycling-friends.webp";
import johannesBodywork1 from "@/assets/johannes-bodywork-new-1.jpg";
import johannesBodywork2 from "@/assets/johannes-bodywork-new-2.jpg";
import { goldFrameVariants } from "@/lib/animations";

const scrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };

const PersonalTraining = () => {
  const { t, getLocalizedPath } = useLanguage();
  const serviceIcons = [Dumbbell, Heart, Target];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        {/* Hero */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 bg-primary/90">
            <img src={heroImage} alt="Personal Training" className="w-full h-full object-cover object-[center_30%] opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent mix-blend-multiply opacity-60" />
          </div>
          <ThreeDBackground className="absolute inset-0 z-0 opacity-40 mix-blend-screen" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="max-w-4xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
                <MapPin className="w-4 h-4 text-red-accent" /><span className="text-white/90 text-sm font-medium">{t.personalTraining.location.city}</span>
              </motion.div>
              <TextReveal text={t.personalTraining.hero.title} className="typ-h1 text-white mb-6" delay={0.4} />
              <p className="typ-lead text-white/85 max-w-2xl mx-auto mb-10">{t.personalTraining.hero.subtitle}</p>
              <Link to={getLocalizedPath('/kontakt')} onClick={scrollToTop}>
                <MagneticButton strength={0.3}>
                  <Button variant="red" size="lg" className="font-semibold text-lg px-8">{t.personalTraining.hero.cta} <ArrowRight className="ml-2 h-5 w-5" /></Button>
                </MagneticButton>
              </Link>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-off-white to-transparent" />
        </section>

        {/* Pain Points */}
        <AnimatedSection className="py-24 md:py-32 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-red-accent text-sm uppercase tracking-[0.2em] font-medium mb-4 block">{t.personalTraining.painPoints.label}</span>
              <h2 className="typ-h2 text-primary mb-4">{t.personalTraining.painPoints.title}</h2>
            </div>
            <StaggerContainer className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {t.personalTraining.painPoints.items.map((item, idx) => (
                <AnimatedItem key={idx}>
                  <Card className="p-8 bg-off-white border-none shadow-sm hover:shadow-md transition-all h-full relative group">
                    <div className="relative z-10 flex flex-col h-full justify-center">
                      <div className="w-14 h-14 rounded-full bg-red-accent/10 flex items-center justify-center mb-6">
                        {idx === 0 && <BatteryWarning className="w-7 h-7 text-red-accent" />}
                        {idx === 1 && <ShieldAlert className="w-7 h-7 text-red-accent" />}
                        {idx === 2 && <Activity className="w-7 h-7 text-red-accent" />}
                        {idx === 3 && <Flame className="w-7 h-7 text-red-accent" />}
                      </div>
                      <h3 className="typ-h4 text-primary mb-3">{item.title}</h3>
                      <p className="typ-body text-muted-foreground italic">{item.description}</p>
                    </div>
                  </Card>
                </AnimatedItem>
              ))}
            </StaggerContainer>
          </div>
        </AnimatedSection>

        {/* Services */}
        <AnimatedSection className="py-24 md:py-32 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="typ-h2 text-primary mb-4">Mein Angebot</h2>
            </div>
            <StaggerContainer className="grid md:grid-cols-3 gap-4 max-w-7xl mx-auto">
              {t.personalTraining.services.map((service, index) => {
                const Icon = serviceIcons[index];
                return (
                  <AnimatedItem key={index}>
                    <Card className="!py-6 !px-6 bg-white border border-red-accent/10 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group shadow-sm">
                      <div className="mb-6"><div className="w-16 h-16 rounded-2xl bg-primary/[0.03] flex items-center justify-center"><Icon className="w-8 h-8 text-red-accent" strokeWidth={1.5} /></div></div>
                      <span className="text-[10px] uppercase font-semibold block mb-2 text-red-accent tracking-tight">{service.subline}</span>
                      <h3 className="text-xl font-bold mb-4 text-primary">{service.title}</h3>
                      <p className="typ-body text-muted-foreground leading-relaxed">{service.description}</p>
                    </Card>
                  </AnimatedItem>
                );
              })}
            </StaggerContainer>
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection className="py-24 md:py-32 bg-gradient-cta text-white relative overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <StaggerContainer className="max-w-2xl mx-auto">
              <AnimatedItem><h2 className="typ-h2 mb-4 text-white">{t.personalTraining.cta.title}</h2></AnimatedItem>
              <AnimatedItem><p className="typ-body text-white/85 mb-10">{t.personalTraining.cta.description}</p></AnimatedItem>
              <AnimatedItem>
                <Link to={getLocalizedPath('/kontakt')} onClick={scrollToTop}>
                  <Button variant="red" size="lg" className="font-semibold">{t.personalTraining.cta.button} <ArrowRight className="ml-2 h-4 w-4" /></Button>
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
export default PersonalTraining;
