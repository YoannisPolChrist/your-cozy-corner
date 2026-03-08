import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Brain, Compass, Activity, BarChart3, Map, Video, ArrowRight, Dumbbell } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { fadeUp, staggerContainer, cardStagger, cardItem, viewportSettings } from "@/lib/animations";
import { useLanguage } from "@/i18n";
import { useEffect } from "react";
import { ThreeDIcon } from "@/components/ui/three-d-icon";
import { SEO } from "@/components/SEO";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Angebot = () => {
  const { t, language, getLocalizedPath } = useLanguage();
  const location = useLocation();
  const serviceIcons = [Heart, Brain, Dumbbell];

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location.hash, location.pathname]);

  return (
    <div className="min-h-screen bg-background overflow-x-clip">
      <SEO title={t.seo?.angebot?.title} description={t.seo?.angebot?.description} faqs={t.angebot.faq.items.map(i => ({ question: i.question as string, answer: i.answer as string }))} dateModified="2026-02-25" />
      <Navigation />
      <main className="pt-20 overflow-x-clip">
        {/* Pillars */}
        <section className="pt-[68px] pb-20 bg-primary overflow-x-clip relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={viewportSettings} variants={staggerContainer} className="max-w-6xl mx-auto">
              <motion.h2 variants={fadeUp} className="font-heading text-[2rem] md:text-[3.1875rem] text-white text-center mb-10 md:mb-16 leading-tight">{t.angebot.title}</motion.h2>
              <motion.div variants={cardStagger} className="grid md:grid-cols-3 gap-6 md:gap-16">
                {t.angebot.services.map((service, index) => {
                  const Icon = serviceIcons[index];
                  return (
                    <motion.div key={index} variants={cardItem}>
                      <Card className="p-6 sm:p-8 h-full bg-off-white shadow-soft hover:shadow-teal transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden border border-accent/20">
                        <div className="mb-6"><ThreeDIcon icon={Icon} size={48} delay={index * 0.3} color="hsl(var(--accent))" strokeWidth={1.5} /></div>
                        <h3 className="font-heading text-xl sm:text-2xl text-primary mb-2">{service.title}</h3>
                        <p className="text-accent text-xs uppercase tracking-widest mb-4">{service.subline}</p>
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{service.description}</p>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Pricing */}
        <section id="konditionen" className="pt-20 md:pt-32 pb-28 md:pb-56 bg-background scroll-mt-24 overflow-x-clip">
          <div className="container mx-auto px-4">
            <motion.div initial="hidden" whileInView="visible" viewport={viewportSettings} variants={staggerContainer} className="max-w-7xl mx-auto">
              <motion.h2 variants={fadeUp} className="font-heading text-[2rem] md:text-[3.1875rem] text-primary text-center mb-12 md:mb-24 leading-tight">{t.angebot.konditionen.title}</motion.h2>
              <motion.div variants={cardStagger} className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
                <motion.div variants={cardItem}>
                  <Card className="px-6 sm:px-10 py-10 sm:py-14 md:py-20 h-full bg-white border border-accent/20 flex flex-col group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                    <h3 className="font-heading text-xl sm:text-2xl md:text-3xl text-primary text-center mb-4">{t.angebot.konditionen.einzelbegleitung.title}</h3>
                    <p className="text-muted-foreground text-center mb-2">{t.angebot.konditionen.einzelbegleitung.priceLabel}</p>
                    <div className="text-center mb-6"><div className="inline-block px-6 py-4 bg-accent/10 rounded-lg border border-accent/20"><span className="font-heading text-2xl text-primary">{t.angebot.konditionen.einzelbegleitung.price}</span></div></div>
                    <p className="text-muted-foreground leading-relaxed text-center mb-8 flex-grow whitespace-pre-line">{t.angebot.konditionen.einzelbegleitung.description}</p>
                    <a href="https://calendly.com/johanneschrist/neues-meeting" target="_blank" rel="noopener noreferrer" className="block mt-auto">
                      <Button variant="gold-outline" className="w-full font-semibold">{t.angebot.konditionen.einzelbegleitung.cta}</Button>
                    </a>
                  </Card>
                </motion.div>
                <motion.div variants={cardItem}>
                  <Card className="px-6 sm:px-10 py-10 sm:py-14 md:py-20 h-full bg-white border border-accent/20 flex flex-col group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                    <h3 className="font-heading text-xl sm:text-2xl md:text-3xl text-primary text-center mb-4">{t.angebot.konditionen.intensiv.title}</h3>
                    <p className="text-muted-foreground text-center mb-2">{t.angebot.konditionen.intensiv.priceLabel}</p>
                    <div className="text-center mb-6">
                      <div className="inline-block px-6 py-4 bg-accent/10 rounded-lg border border-accent/20">
                        <span className="font-heading text-2xl text-primary">{t.angebot.konditionen.intensiv.discountPrice}</span>
                        <span className="text-muted-foreground line-through ml-2 text-lg">{t.angebot.konditionen.einzelbegleitung.price}</span>
                      </div>
                      <p className="text-accent text-sm mt-2">{t.angebot.konditionen.intensiv.discount}</p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-center mb-8 flex-grow">{t.angebot.konditionen.intensiv.description}</p>
                    <Link to={`${getLocalizedPath('/kontakt')}?subject=Individuelle+Beratung`} className="block mt-auto" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                      <Button variant="gold" className="w-full font-semibold">{t.angebot.konditionen.intensiv.cta}</Button>
                    </Link>
                  </Card>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-28 md:py-36 bg-background">
          <div className="container mx-auto px-4">
            <motion.div initial="hidden" whileInView="visible" viewport={viewportSettings} variants={staggerContainer} className="max-w-3xl mx-auto">
              <motion.h2 variants={fadeUp} className="font-heading text-[2.25rem] md:text-[3.1875rem] text-primary text-center mb-16">{t.angebot.faq.title}</motion.h2>
              <motion.div variants={fadeUp}>
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {t.angebot.faq.items.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="bg-off-white border border-border/50 rounded-xl px-6 data-[state=open]:shadow-soft">
                      <AccordionTrigger className="text-left font-heading text-lg text-primary hover:no-underline py-6">{item.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pb-6">{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
export default Angebot;
