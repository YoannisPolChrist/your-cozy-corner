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

  const testimonials = t.testimonials?.personalTraining ?? [];

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
          <div className="absolute inset-0 overflow-hidden">
            <motion.div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-red-accent/10 blur-3xl" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
            <motion.div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-red-accent/10 blur-3xl" animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="max-w-4xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
                <MapPin className="w-4 h-4 text-red-accent" /><span className="text-white/90 text-sm font-medium">{t.personalTraining.location.city}</span>
              </motion.div>
              <TextReveal text={t.personalTraining.hero.title} className="typ-h1 text-white mb-6" delay={0.4} />
              <p className="typ-lead text-white/85 max-w-2xl mx-auto mb-10">{t.personalTraining.hero.subtitle}</p>
              <Link to={getLocalizedPath('/kontakt')} onClick={scrollToTop}>
                <MagneticButton strength={0.3}>
                  <div className="relative inline-block group mt-2">
                    <motion.div className="absolute -inset-1 rounded-full bg-red-accent opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.35, 0.15] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
                    <Button variant="red" size="lg" className="font-semibold text-lg px-8 relative z-10 transition-transform duration-300 hover:scale-[1.02]">
                      {t.personalTraining.hero.cta} <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
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
                    <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl group-hover:bg-primary/10 transition-colors" />
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

        {/* Approach Section with Masonry Grid */}
        <AnimatedSection className="py-24 md:py-32 bg-off-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <StaggerContainer className="grid lg:grid-cols-2 gap-12 items-center">
                <AnimatedItem className="space-y-8">
                  <div>
                    <span className="text-red-accent text-sm uppercase tracking-[0.2em] font-medium mb-4 block">{t.personalTraining.approach.title}</span>
                    <h2 className="typ-h2 text-primary mb-6">{t.shared?.approachSectionTitle ?? 'Body & Mind in Motion'}</h2>
                    <p className="typ-body text-muted-foreground whitespace-pre-line mb-8">{t.personalTraining.approach.description}</p>
                  </div>
                  <div className="p-6 bg-white rounded-2xl shadow-sm border border-red-accent/10">
                    <div className="flex items-center gap-3 mb-4">
                      <Award className="w-6 h-6 text-red-accent" />
                      <h3 className="typ-h4 text-primary">{t.personalTraining.qualifications.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {t.personalTraining.qualifications.items.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-red-accent mt-0.5 flex-shrink-0" />
                          <span className="typ-body text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedItem>
                <AnimatedItem className="relative w-full">
                  <div className="grid grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-4 md:space-y-6 pt-8 md:pt-12">
                      <motion.img whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }} src={johannesBodywork1} alt="Manual Therapy" className="w-full rounded-2xl shadow-lg object-cover" loading="lazy" />
                      <motion.img whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }} src={johannesSpeed} alt="Performance Training" className="w-full rounded-2xl shadow-lg object-cover" loading="lazy" />
                    </div>
                    <div className="space-y-4 md:space-y-6">
                      <motion.img whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }} src={johannesCyclingFriends} alt="Community Training" className="w-full rounded-2xl shadow-lg object-cover" loading="lazy" />
                      <motion.img whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }} src={johannesBodywork2} alt="Mobility" className="w-full rounded-2xl shadow-lg object-cover" loading="lazy" />
                    </div>
                  </div>
                </AnimatedItem>
              </StaggerContainer>
            </div>
          </div>
        </AnimatedSection>

        {/* Services */}
        <AnimatedSection className="py-24 md:py-32 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-red-accent text-sm uppercase tracking-[0.2em] font-medium mb-4 block">{t.shared?.servicesSectionLabel ?? 'Building Blocks'}</span>
              <h2 className="typ-h2 text-primary mb-4">{t.shared?.servicesSectionTitle ?? 'My Services'}</h2>
              <p className="typ-body text-muted-foreground max-w-2xl mx-auto">{t.shared?.servicesSectionSubtitle ?? 'Evidence-based pillars for your transformation'}</p>
            </div>
            <StaggerContainer className="grid md:grid-cols-3 gap-4 max-w-7xl mx-auto">
              {t.personalTraining.services.map((service, index) => {
                const Icon = serviceIcons[index];
                return (
                  <AnimatedItem key={index}>
                    <Card className="!py-6 !px-6 bg-white border border-red-accent/10 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group shadow-sm">
                      <div className="mb-6"><div className="w-16 h-16 rounded-2xl bg-primary/[0.03] flex items-center justify-center group-hover:bg-primary/[0.06] transition-colors"><Icon className="w-8 h-8 text-red-accent group-hover:text-primary transition-colors duration-300" strokeWidth={1.5} /></div></div>
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

        {/* Testimonials */}
        <AnimatedSection className="py-24 md:py-32 bg-off-white relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/[0.02]" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <span className="text-red-accent text-sm uppercase tracking-[0.2em] font-medium mb-4 block">Erfahrungen</span>
              <h2 className="typ-h2 text-primary mb-4">Stimmen meiner Klienten</h2>
              <p className="typ-body text-muted-foreground max-w-2xl mx-auto">Was andere über die Zusammenarbeit und Ergebnisse sagen.</p>
            </div>
            <StaggerContainer className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <AnimatedItem key={index}>
                  <Card className="p-8 bg-white shadow-soft border-none h-full flex flex-col">
                    <div className="flex gap-1 mb-6">{[...Array(5)].map((_, i) => (<Star key={i} className="w-5 h-5 text-red-accent fill-gold-accent" />))}</div>
                    <p className="text-lg text-primary italic leading-relaxed mb-8 flex-grow">"{testimonial.text}"</p>
                    <div className="mt-auto">
                      <p className="font-semibold text-primary">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </Card>
                </AnimatedItem>
              ))}
            </StaggerContainer>
            <div className="text-center mt-10 opacity-60">
              <p className="text-sm text-muted-foreground italic">(Mehr Einblicke und Ergebnisse folgen in Kürze)</p>
            </div>
          </div>
        </AnimatedSection>

        {/* Location */}
        <AnimatedSection className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-8">
                <MapPin className="w-10 h-10 text-primary" />
              </motion.div>
              <h2 className="typ-h2 text-primary mb-4">{t.personalTraining.location.title}</h2>
              <p className="typ-h3 font-heading text-red-accent mb-4">{t.personalTraining.location.city}</p>
              <p className="typ-body text-muted-foreground">{t.personalTraining.location.description}</p>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-8 rounded-2xl overflow-hidden shadow-lg border border-red-accent/10 h-[350px] w-full">
                <iframe src="https://maps.google.com/maps?q=12+Rue+Jean-Palaprat,+31000+Toulouse&t=m&z=17&output=embed&iwloc=Near" width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* Pricing */}
        <section className="py-24 md:py-32 bg-secondary/30" id="pricing">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-red-accent text-sm uppercase tracking-[0.2em] font-medium mb-4 block">Transparenz</span>
              <h2 className="typ-h2 text-primary mb-4">{t.personalTraining.pricing.title}</h2>
            </div>
            <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <AnimatedItem>
                <Card className="p-8 bg-white shadow-soft border-none h-full relative overflow-hidden flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-red-accent font-semibold block mb-4">{t.angebot.konditionen.einzelbegleitung.label}</span>
                  <h3 className="typ-h3 text-primary mb-2">{t.angebot.konditionen.einzelbegleitung.title}</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-heading typ-h2 text-red-accent">{t.angebot.konditionen.einzelbegleitung.price}</span>
                    <span className="text-muted-foreground">/ {t.angebot.konditionen.einzelbegleitung.priceLabel}</span>
                  </div>
                  <p className="typ-body text-muted-foreground mb-8 text-left whitespace-pre-line flex-grow">{t.angebot.konditionen.einzelbegleitung.description}</p>
                  <Link to={getLocalizedPath('/kontakt')} onClick={scrollToTop} className="mt-auto w-full">
                    <Button variant="outline" className="w-full">{t.angebot.konditionen.einzelbegleitung.cta}</Button>
                  </Link>
                </Card>
              </AnimatedItem>
              <AnimatedItem>
                <Card className="p-8 bg-primary text-white shadow-xl h-full relative overflow-hidden border-0 flex flex-col">
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-red-accent text-primary text-xs font-semibold rounded-full">{t.angebot.konditionen.intensiv.discount}</span>
                  </div>
                  <span className="text-red-accent text-xs uppercase tracking-wider font-semibold block mb-4">{t.angebot.konditionen.intensiv.label}</span>
                  <h3 className="typ-h3 text-white mb-2">{t.angebot.konditionen.intensiv.title}</h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-heading typ-h2 text-red-accent">{t.angebot.konditionen.intensiv.discountPrice}</span>
                    <span className="text-white/70">/ {t.angebot.konditionen.intensiv.priceLabel}</span>
                  </div>
                  <p className="typ-small text-white/70 mb-4 line-through">Regulär {t.angebot.konditionen.einzelbegleitung.price}</p>
                  <p className="typ-body text-white/85 mb-8 text-left whitespace-pre-line flex-grow">{t.angebot.konditionen.intensiv.description}</p>
                  <Link to={getLocalizedPath('/kontakt')} onClick={scrollToTop} className="mt-auto w-full">
                    <Button variant="red" className="w-full">{t.angebot.konditionen.intensiv.cta}</Button>
                  </Link>
                </Card>
              </AnimatedItem>
            </StaggerContainer>
          </div>
        </section>

        {/* CTA */}
        <AnimatedSection className="py-24 md:py-32 bg-gradient-cta text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-teal-navy/30" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <StaggerContainer className="max-w-2xl mx-auto">
              <AnimatedItem><h2 className="typ-h2 mb-4 text-white">{t.personalTraining.cta.title}</h2></AnimatedItem>
              <AnimatedItem><p className="typ-body text-white/85 mb-10">{t.personalTraining.cta.description}</p></AnimatedItem>
              <AnimatedItem>
                <Link to={getLocalizedPath('/kontakt')} onClick={scrollToTop}>
                  <div className="relative inline-block group mt-2">
                    <motion.div className="absolute -inset-1 rounded-full bg-red-accent opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.35, 0.15] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
                    <Button variant="red" size="lg" className="font-semibold relative z-10 transition-transform duration-300 hover:scale-[1.02]">
                      {t.personalTraining.cta.button} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </Link>
              </AnimatedItem>
            </StaggerContainer>
          </div>
        </AnimatedSection>

        {/* Cross-Link to Gestalttherapie */}
        <AnimatedSection className="py-24 md:py-32 bg-off-white relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/[0.02]" />
          <div className="container mx-auto px-4 relative z-10">
            <StaggerContainer className="max-w-4xl mx-auto">
              <motion.div className="relative rounded-3xl overflow-hidden shadow-2xl" whileHover={{ scale: 1.01 }} transition={{ duration: 0.5, ease: "easeOut" }}>
                <div className="absolute inset-0 bg-primary">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-teal-navy/80 mix-blend-multiply" />
                  <motion.div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-red-accent/20 blur-[100px]" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
                  <motion.div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-teal-highlight/20 blur-[80px]" animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
                </div>
                <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                  <div className="flex-shrink-0 relative">
                    <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
                      <Brain className="w-10 h-10 text-red-accent" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="text-center md:text-left flex-grow">
                    <span className="text-red-accent text-sm uppercase tracking-[0.2em] font-semibold mb-3 block">Die andere Dimension</span>
                    <h3 className="typ-h3 text-white mb-4">Eigentlich auf der Suche nach Orientierung im Kopf?</h3>
                    <p className="text-white/80 text-lg leading-relaxed max-w-xl">Manchmal sitzt das Problem nicht im Körper, sondern tiefer. Entdecke meinen therapeutischen Ansatz für echte emotionale Klarheit.</p>
                  </div>
                  <div className="flex-shrink-0 mt-6 md:mt-0 w-full md:w-auto">
                    <Link to={getLocalizedPath('/gestalttherapie')} onClick={scrollToTop} className="block w-full">
                      <Button variant="red" size="lg" className="w-full md:w-auto font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                        Zur Gestalttherapie <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </StaggerContainer>
          </div>
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
};
export default PersonalTraining;
