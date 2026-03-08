// Gestalttherapie page - placeholder that will be fully populated
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/i18n";
import { AnimatedSection, AnimatedItem, StaggerContainer } from "@/components/AnimatedSection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Hand, Brain, Palette, ArrowRight, Star, Dumbbell, MapPin, CheckCircle, UserMinus, Compass, Award } from "lucide-react";
import { GestaltScrollTelling } from "@/components/GestaltScrollTelling";
import { TextReveal } from "@/components/ui/text-reveal";
import { ThreeDBackground } from "@/components/ThreeDBackground";
import { MagneticButton } from "@/components/ui/magnetic-button";
import gestaltKontaktzyklus from "@/assets/gestalt-kontaktzyklus.webp";
import ressourcenUnterstuetzung from "@/assets/ressourcen-unterstuetzung.webp";
import heroImage from "@/assets/GestaltHero.svg";
import johannesCoachingTalk from "@/assets/johannes-coaching-talk.webp";
import johannesMeet from "@/assets/johannes-meet.webp";
import johannesCoachingNew from "@/assets/johannes-coaching-new.webp";
import johannesPortrait from "@/assets/johannes-hero-portrait.webp";

const scrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };

const Gestalttherapie = () => {
  const { t, getLocalizedPath } = useLanguage();
  const ressourcenIcons = [Hand, Brain, Palette];
  const testimonials = t.testimonials?.gestalt ?? [];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 bg-primary/90">
            <img src={heroImage} alt="Gestalttherapie" className="w-full h-full object-cover object-top opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent mix-blend-multiply opacity-60" />
          </div>
          <ThreeDBackground className="absolute inset-0 z-0 opacity-40 mix-blend-screen" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="max-w-4xl mx-auto text-center">
              <TextReveal text={t.gestalttherapie.scrollTelling.title} className="typ-h1 text-white mb-4" delay={0.2} />
              <p className="typ-lead text-white/85 max-w-2xl mx-auto mb-6">{t.gestalttherapie.hero.subtitle}</p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
                <MapPin className="w-4 h-4 text-gold-accent" /><span className="text-white/90 text-sm font-medium">Toulouse & Online</span>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to={getLocalizedPath('/kontakt')} onClick={scrollToTop}>
                  <MagneticButton strength={0.3}>
                    <Button variant="gold" size="lg" className="font-semibold text-lg px-8">{t.gestalttherapie.hero.cta} <ArrowRight className="ml-2 h-5 w-5" /></Button>
                  </MagneticButton>
                </Link>
              </motion.div>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-off-white to-transparent" />
        </section>

        {/* Pain Points */}
        <AnimatedSection className="py-24 md:py-32 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-accent text-sm uppercase tracking-[0.2em] font-medium mb-4 block">{t.shared?.gestaltPainLabel ?? 'Die Ausgangslage'}</span>
              <h2 className="typ-h2 text-primary mb-4">{t.gestalttherapie.painPoints.title}</h2>
            </div>
            <StaggerContainer className="grid md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
              {t.gestalttherapie.painPoints.items.map((item, idx) => (
                <AnimatedItem key={idx}>
                  <Card className="p-8 bg-off-white border-none shadow-sm hover:shadow-md transition-all h-full relative group">
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                        {idx === 0 && <UserMinus className="w-7 h-7 text-accent" />}
                        {idx === 1 && <Compass className="w-7 h-7 text-accent" />}
                        {idx === 2 && <Brain className="w-7 h-7 text-accent" />}
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

        {/* Approach & Qualifications */}
        <AnimatedSection className="py-24 md:py-32 bg-off-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <StaggerContainer className="grid lg:grid-cols-2 gap-12 items-center">
                <AnimatedItem className="space-y-8">
                  <div>
                    <span className="text-accent text-sm uppercase tracking-[0.2em] font-medium mb-4 block">{t.gestalttherapie.approach?.label}</span>
                    <h2 className="typ-h2 text-primary mb-6">{t.gestalttherapie.approach?.title}</h2>
                    <p className="typ-body text-muted-foreground whitespace-pre-line mb-8">{t.gestalttherapie.approach?.description}</p>
                  </div>
                  {t.gestalttherapie.qualifications && (
                    <div className="p-6 bg-white rounded-2xl shadow-sm border border-accent/20">
                      <div className="flex items-center gap-3 mb-4"><Award className="w-6 h-6 text-accent" /><h3 className="typ-h4 text-primary">{t.gestalttherapie.qualifications.title}</h3></div>
                      <ul className="space-y-2">
                        {t.gestalttherapie.qualifications.items.map((item, index) => (
                          <li key={index} className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" /><span className="typ-body text-muted-foreground">{item}</span></li>
                        ))}
                      </ul>
                    </div>
                  )}
                </AnimatedItem>
                <AnimatedItem className="relative w-full">
                  <div className="grid grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-4 md:space-y-6 pt-8 md:pt-12">
                      <motion.img whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }} src={johannesCoachingTalk} alt="Gestalttherapie Coaching" className="w-full rounded-2xl shadow-lg object-cover" loading="lazy" />
                      <motion.img whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }} src={johannesMeet} alt="Gestalttherapie Kontakt" className="w-full rounded-2xl shadow-lg object-cover" loading="lazy" />
                    </div>
                    <div className="space-y-4 md:space-y-6">
                      <motion.img whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }} src={johannesPortrait} alt="Gestalttherapeut Johannes Christ" className="w-full rounded-2xl shadow-lg object-cover" loading="lazy" />
                      <motion.img whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }} src={johannesCoachingNew} alt="Gestalttherapie Sitzung" className="w-full rounded-2xl shadow-lg object-cover" loading="lazy" />
                    </div>
                  </div>
                </AnimatedItem>
              </StaggerContainer>
            </div>
          </div>
        </AnimatedSection>

        <GestaltScrollTelling />

        {/* Philosophy */}
        <section className="py-24 md:py-32 bg-primary text-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <AnimatedSection className="max-w-4xl mx-auto space-y-12">
              <div className="text-center">
                <span className="text-accent text-sm uppercase tracking-[0.2em] font-medium mb-4 block">{t.gestalttherapie.philosophy.label}</span>
                <h2 className="typ-h2 mb-10">{t.gestalttherapie.philosophy.title}</h2>
                <div className="space-y-6 text-base md:text-lg text-white/80 text-left md:text-center max-w-3xl mx-auto">
                  <p>{t.gestalttherapie.philosophy.p1}</p>
                  <p dangerouslySetInnerHTML={{ __html: t.gestalttherapie.philosophy.p2 }}></p>
                </div>
                <div className="mt-16 md:mt-24 p-8 md:p-12 border border-accent/20 rounded-2xl bg-white/5 relative">
                  <p className="typ-h4 text-accent font-light leading-relaxed">{t.gestalttherapie.philosophy.quote}</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* CTA */}
        <AnimatedSection className="py-16 md:py-36 bg-gradient-cta text-white relative overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <StaggerContainer className="max-w-2xl mx-auto">
              <AnimatedItem><h2 className="typ-h2 mb-8 text-white">{t.gestalttherapie.cta.title}</h2></AnimatedItem>
              <AnimatedItem><p className="typ-body text-white/85 mb-10">{t.gestalttherapie.cta.description}</p></AnimatedItem>
              <AnimatedItem>
                <Link to={getLocalizedPath('/kontakt')} onClick={scrollToTop}>
                  <Button variant="gold" size="lg" className="font-semibold text-lg px-8">{t.gestalttherapie.cta.button} <ArrowRight className="ml-2 h-5 w-5" /></Button>
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
export default Gestalttherapie;
