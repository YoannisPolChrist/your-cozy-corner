import { Navigation } from "@/components/Navigation";
import { motion } from "framer-motion";
import { AnimatedSection, AnimatedItem, StaggerContainer } from "@/components/AnimatedSection";
import { Hand, Brain, Palette, ArrowRight, Star, Dumbbell, MapPin, CheckCircle, UserMinus, Compass, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import gestaltKontaktzyklus from "@/assets/gestalt-kontaktzyklus.webp";
import ressourcenUnterstuetzung from "@/assets/ressourcen-unterstuetzung.webp";
import { Footer } from "@/components/Footer";
import { GestaltScrollTelling } from "@/components/GestaltScrollTelling";
import { useLanguage } from "@/i18n";
import { TextReveal } from "@/components/ui/text-reveal";
import { ThreeDBackground } from "@/components/ThreeDBackground";
import { MagneticButton } from "@/components/ui/magnetic-button";
import heroImage from "@/assets/Gestalt Header.png";
import johannesCoachingTalk from "@/assets/johannes-coaching-talk.webp";
import johannesMeet from "@/assets/johannes-meet.webp";
import johannesCoachingNew from "@/assets/johannes-coaching-new.webp";
import johannesPortrait from "@/assets/johannes-hero-portrait.webp";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

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
          <div className="absolute inset-0 overflow-hidden">
            <motion.div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-accent/10 blur-3xl" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
            <motion.div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-gold-accent/10 blur-3xl" animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="max-w-4xl mx-auto text-center">
              <TextReveal text={t.gestalttherapie.scrollTelling.title} className="typ-h1 text-white mb-4" delay={0.2} />
              <p className="typ-lead text-white/85 max-w-2xl mx-auto mb-6">{t.gestalttherapie.hero.subtitle}</p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
                <MapPin className="w-4 h-4 text-gold-accent" />
                <span className="text-white/90 text-sm font-medium">Toulouse & Online</span>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to={getLocalizedPath('/kontakt')} onClick={scrollToTop}>
                  <MagneticButton strength={0.3}>
                    <div className="relative inline-block group mt-2">
                      <motion.div className="absolute -inset-1 rounded-full bg-gold-accent opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.35, 0.15] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
                      <Button variant="gold" size="lg" className="font-semibold text-lg px-8 relative z-10 transition-transform duration-300 hover:scale-[1.02]">
                        {t.gestalttherapie.hero.cta} <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
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
                    <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl group-hover:bg-primary/10 transition-colors" />
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
            <div className="max-w-5xl mx-auto">
              <StaggerContainer className="grid lg:grid-cols-2 gap-12 items-center">
                <AnimatedItem className="space-y-8">
                  <div>
                    <span className="text-accent text-sm uppercase tracking-[0.2em] font-medium mb-4 block">{t.gestalttherapie.approach?.label}</span>
                    <h2 className="typ-h2 text-primary mb-6">{t.gestalttherapie.approach?.title}</h2>
                    <p className="typ-body text-muted-foreground whitespace-pre-line mb-8">{t.gestalttherapie.approach?.description}</p>
                  </div>
                  {t.gestalttherapie.qualifications && (
                    <div className="p-6 bg-white rounded-2xl shadow-sm border border-accent/20">
                      <div className="flex items-center gap-3 mb-4">
                        <Award className="w-6 h-6 text-accent" />
                        <h3 className="typ-h4 text-primary">{t.gestalttherapie.qualifications.title}</h3>
                      </div>
                      <ul className="space-y-2">
                        {t.gestalttherapie.qualifications.items.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                            <span className="typ-body text-muted-foreground">{item}</span>
                          </li>
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
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  {t.gestalttherapie.philosophy.badges.map((badge, idx) => (
                    <span key={idx} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wider">{badge}</span>
                  ))}
                </div>
                <h2 className="typ-h2 mb-10">{t.gestalttherapie.philosophy.title}</h2>
                <div className="space-y-6 text-base md:text-lg text-white/80 text-left md:text-center max-w-3xl mx-auto">
                  <p>{t.gestalttherapie.philosophy.p1}</p>
                  <p dangerouslySetInnerHTML={{ __html: t.gestalttherapie.philosophy.p2 }}></p>
                </div>
                <div className="mt-16 md:mt-24 p-8 md:p-12 border border-accent/20 rounded-2xl bg-white/5 relative">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-primary flex items-center justify-center rounded-full border border-accent/20">
                    <span className="text-accent text-3xl font-serif">"</span>
                  </div>
                  <p className="typ-h4 text-accent font-light leading-relaxed">{t.gestalttherapie.philosophy.quote}</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Kontaktzyklus */}
        <section className="py-12 md:py-32 bg-off-white">
          <div className="container mx-auto px-4">
            <AnimatedSection className="max-w-5xl mx-auto">
              <motion.img src={gestaltKontaktzyklus} alt={t.gestalttherapie.kontaktzyklus.title} className="w-full rounded-xl mb-6 md:mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ boxShadow: '0 10px 40px rgba(30, 95, 116, 0.1)' }} />
              <div className="hidden md:flex justify-center mb-8"><div className="w-px h-12 bg-gradient-to-b from-accent to-accent/30" /></div>
              <motion.div className="p-5 md:p-14 rounded-2xl bg-secondary" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
                <h2 className="typ-h2 font-bold text-primary mb-4 md:mb-8">{t.gestalttherapie.kontaktzyklus.title}</h2>
                <p className="typ-body text-foreground/80 mb-6 md:mb-10">{t.gestalttherapie.kontaktzyklus.intro}</p>
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 mb-6 md:mb-10">
                  {t.gestalttherapie.kontaktzyklus.phases.map((phase, index) => (
                    <AnimatedItem key={index}>
                      <div className="p-3 md:p-5 rounded-xl border-l-[3px] border-accent bg-primary/[0.04]">
                        <p className="text-foreground/80">
                          <span className="typ-h4 text-accent font-semibold">{phase.title}</span>
                          {phase.subtitle && <span className="text-xs md:text-sm text-foreground/50"> ({phase.subtitle})</span>}
                          <br /><span className="typ-small text-foreground/70">{phase.description}</span>
                        </p>
                      </div>
                    </AnimatedItem>
                  ))}
                </StaggerContainer>
                <motion.div className="p-4 md:p-6 rounded-xl border-l-4 border-primary bg-primary/[0.08]" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}>
                  <p className="typ-body text-foreground/80">{t.gestalttherapie.kontaktzyklus.summary}</p>
                </motion.div>
              </motion.div>
            </AnimatedSection>
          </div>
        </section>

        {/* Ressourcen */}
        <section className="py-12 md:py-32 bg-background">
          <div className="container mx-auto px-4">
            <AnimatedSection className="max-w-5xl mx-auto">
              <motion.img src={ressourcenUnterstuetzung} alt={t.gestalttherapie.ressourcen.title} className="w-full rounded-xl mb-6 md:mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ boxShadow: '0 10px 40px rgba(30, 95, 116, 0.1)' }} />
              <div className="hidden md:flex flex-col items-center mb-8">
                <div className="w-px h-8 bg-gradient-to-b from-accent to-accent/50" />
                <div className="w-3 h-3 border-b-2 border-r-2 border-accent rotate-45 -mt-1" />
              </div>
              <motion.div className="p-5 md:p-14 rounded-2xl bg-secondary" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
                <h2 className="typ-h2 font-bold text-primary mb-4 md:mb-8">{t.gestalttherapie.ressourcen.title}</h2>
                <p className="typ-body text-foreground/80 mb-6 md:mb-10">{t.gestalttherapie.ressourcen.intro}</p>
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {t.gestalttherapie.ressourcen.items.map((item, index) => {
                    const Icon = ressourcenIcons[index];
                    return (
                      <AnimatedItem key={index}>
                        <div className="text-center p-4 md:p-6 rounded-2xl transition-all duration-300 md:hover:-translate-y-1 bg-primary/[0.04]">
                          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-5 bg-accent/15">
                            <Icon className="w-6 h-6 md:w-7 md:h-7 text-accent" />
                          </div>
                          <h3 className="typ-h3 font-bold text-primary mb-2 md:mb-4">{item.title}</h3>
                          <p className="typ-small text-foreground/70">{item.description}</p>
                        </div>
                      </AnimatedItem>
                    );
                  })}
                </StaggerContainer>
              </motion.div>
            </AnimatedSection>
          </div>
        </section>

        {/* Testimonials */}
        <AnimatedSection className="py-24 md:py-32 bg-off-white relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/[0.02]" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <span className="text-accent text-sm uppercase tracking-[0.2em] font-medium mb-4 block">{t.shared?.testimonialsLabel ?? 'Erfahrungen'}</span>
              <h2 className="typ-h2 text-primary mb-4">{t.shared?.testimonialsTitle ?? 'Stimmen meiner Klienten'}</h2>
              <p className="typ-body text-muted-foreground max-w-2xl mx-auto">{t.shared?.gestaltTestimonialsSubtitle ?? 'Integrität und Vertraulichkeit haben höchste Priorität. Hier ein paar anonymisierte Einblicke.'}</p>
            </div>
            <StaggerContainer className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <AnimatedItem key={index}>
                  <Card className="p-8 bg-white shadow-soft border-none h-full flex flex-col">
                    <div className="flex gap-1 mb-6">{[...Array(5)].map((_, i) => (<Star key={i} className="w-5 h-5 text-gold-accent fill-gold-accent" />))}</div>
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
              <p className="text-sm text-muted-foreground italic">({t.shared?.moreReviewsComingSoon ?? 'Weitere Erfahrungsberichte folgen'})</p>
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
              <h2 className="typ-h2 text-primary mb-4">{t.shared?.gestaltLocationTitle ?? 'Praxis für Gestalttherapie'}</h2>
              <p className="typ-h3 font-heading text-accent mb-4">{t.gestalttherapie.location?.city ?? 'Toulouse Zentrum'}</p>
              <p className="typ-body text-muted-foreground">{t.gestalttherapie.location?.description ?? 'IZICure, 47 Allées Jean Jaurès, 31000 Toulouse'}</p>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-8 rounded-2xl overflow-hidden shadow-lg border border-accent/10 h-[350px] w-full">
                <iframe src="https://maps.google.com/maps?q=IZICure,+47+All.+Jean+Jaur%C3%A8s,+31000+Toulouse&t=m&z=17&output=embed&iwloc=Near" width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* Pricing */}
        <section className="py-24 md:py-32 bg-secondary/30" id="pricing">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-accent text-sm uppercase tracking-[0.2em] font-medium mb-4 block">{t.shared?.pricingLabel ?? 'Transparenz'}</span>
              <h2 className="typ-h2 text-primary mb-4">{t.shared?.gestaltPricingTitle ?? 'Konditionen & Investition'}</h2>
            </div>
            <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <AnimatedItem>
                <Card className="p-8 bg-white shadow-soft border-none h-full relative overflow-hidden flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-accent font-semibold block mb-4">{t.angebot.konditionen.einzelbegleitung.label}</span>
                  <h3 className="typ-h3 text-primary mb-2">{t.angebot.konditionen.einzelbegleitung.title}</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-heading typ-h2 text-accent">{t.angebot.konditionen.einzelbegleitung.price}</span>
                    <span className="text-muted-foreground">/ {t.angebot.konditionen.einzelbegleitung.priceLabel}</span>
                  </div>
                  <p className="typ-body text-muted-foreground mb-8 text-left whitespace-pre-line flex-grow">{t.angebot.konditionen.einzelbegleitung.description}</p>
                  <Link to={getLocalizedPath('/kontakt')} onClick={scrollToTop} className="mt-auto w-full">
                    <Button variant="outline" className="w-full">{t.angebot.konditionen.einzelbegleitung.cta}</Button>
                  </Link>
                </Card>
              </AnimatedItem>
              <AnimatedItem>
                <Card className="p-8 pt-12 bg-primary text-white shadow-xl h-full relative overflow-hidden border-0 flex flex-col">
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-gold-accent text-primary text-xs font-semibold rounded-full">{t.angebot.konditionen.intensiv.discount}</span>
                  </div>
                  <span className="text-gold-accent text-xs uppercase tracking-wider font-semibold block mb-4">{t.angebot.konditionen.intensiv.label}</span>
                  <h3 className="typ-h3 text-white mb-2">{t.angebot.konditionen.intensiv.title}</h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-heading typ-h2 text-gold-accent">{t.angebot.konditionen.intensiv.discountPrice}</span>
                    <span className="text-white/70">/ {t.angebot.konditionen.intensiv.priceLabel}</span>
                  </div>
                  <p className="typ-small text-white/70 mb-4 line-through">{t.shared?.regularPrice ?? 'Regulär'} {t.angebot.konditionen.einzelbegleitung.price}</p>
                  <p className="typ-body text-white/85 mb-8 flex-grow">{t.angebot.konditionen.intensiv.description}</p>
                  <Link to={`${getLocalizedPath('/kontakt')}?subject=Individuelle+Beratung`} onClick={scrollToTop} className="mt-auto w-full">
                    <Button variant="gold" className="w-full">{t.angebot.konditionen.intensiv.cta}</Button>
                  </Link>
                </Card>
              </AnimatedItem>
            </StaggerContainer>
          </div>
        </section>

        {/* CTA */}
        <AnimatedSection className="py-16 md:py-36 bg-gradient-cta text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-teal-navy/30" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <StaggerContainer className="max-w-2xl mx-auto">
              <AnimatedItem><h2 className="typ-h2 mb-8 text-white">{t.gestalttherapie.cta.title}</h2></AnimatedItem>
              <AnimatedItem><p className="typ-body text-white/85 mb-10">{t.gestalttherapie.cta.description}</p></AnimatedItem>
              <AnimatedItem>
                <Link to={getLocalizedPath('/kontakt')} onClick={scrollToTop}>
                  <div className="relative inline-block group mt-2">
                    <motion.div className="absolute -inset-1 rounded-full bg-gold-accent opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.35, 0.15] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
                    <Button variant="gold" size="lg" className="font-semibold text-lg px-8 relative z-10 transition-transform duration-300 hover:scale-[1.02]">
                      {t.gestalttherapie.cta.button} <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </Link>
              </AnimatedItem>
            </StaggerContainer>
          </div>
        </AnimatedSection>

        {/* Cross-Link to Personal Training */}
        <AnimatedSection className="py-24 md:py-32 bg-off-white relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/[0.02]" />
          <div className="container mx-auto px-4 relative z-10">
            <StaggerContainer className="max-w-4xl mx-auto">
              <motion.div className="relative rounded-3xl overflow-hidden shadow-2xl" whileHover={{ scale: 1.01 }} transition={{ duration: 0.5, ease: "easeOut" }}>
                <div className="absolute inset-0 bg-primary">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-teal-navy/80 mix-blend-multiply" />
                  <motion.div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gold-accent/20 blur-[100px]" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
                  <motion.div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-teal-highlight/20 blur-[80px]" animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
                </div>
                <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                  <div className="flex-shrink-0 relative">
                    <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
                      <Dumbbell className="w-10 h-10 text-gold-accent" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="text-center md:text-left flex-grow">
                    <span className="text-gold-accent text-sm uppercase tracking-[0.2em] font-semibold mb-3 block">{t.shared?.crossLinkLabel ?? 'Die andere Dimension'}</span>
                    <h3 className="typ-h3 text-white mb-4">{t.shared?.crossLinkTrainingTitle ?? 'Eher auf der Suche nach körperlicher Veränderung?'}</h3>
                    <p className="text-white/80 text-lg leading-relaxed max-w-xl">{t.shared?.crossLinkTrainingDescription ?? 'Manchmal beginnt die mentale Transformation am besten über den eigenen physischen Körper. Entdecke mein evidenzbasiertes Personal Training.'}</p>
                  </div>
                  <div className="flex-shrink-0 mt-6 md:mt-0 w-full md:w-auto">
                    <Link to={getLocalizedPath('/personal-training')} onClick={scrollToTop} className="block w-full">
                      <Button variant="gold" size="lg" className="w-full md:w-auto font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                        {t.shared?.crossLinkTrainingButton ?? 'Zum Personal Training'} <ArrowRight className="ml-2 w-5 h-5" />
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
export default Gestalttherapie;
