import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Brain, Compass, Activity, BarChart3, Map, Video, ArrowRight, Dumbbell } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { fadeUp, staggerContainer, cardStagger, cardItem, iconStagger, iconItem, viewportSettings } from "@/lib/animations";
import { useLanguage } from "@/i18n";
import { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Angebot = () => {
  const { t, getLocalizedPath } = useLanguage();
  const location = useLocation();
  const serviceIcons = [Heart, Brain, Dumbbell];
  const checkupIcons = [Activity, BarChart3, Map];

  // Handle hash navigation with retries
  useEffect(() => {
    const scrollToHash = () => {
      if (location.hash) {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return true;
        }
      }
      return false;
    };

    if (location.hash) {
      // Try immediately and then with delays
      if (!scrollToHash()) {
        setTimeout(scrollToHash, 100);
        setTimeout(scrollToHash, 300);
        setTimeout(scrollToHash, 800);
      }
    }
  }, [location.hash, location.pathname]);

  return (
    <div className="min-h-screen bg-background overflow-x-clip">
      <Navigation />
      <main className="pt-20 overflow-x-clip">
        {/* Section 1: The 3 Pillars */}
        <section className="pt-[68px] pb-20 sm:pb-28 md:pb-32 bg-primary overflow-x-clip">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={staggerContainer}
              className="max-w-6xl mx-auto"
            >
              <motion.h2
                variants={fadeUp}
                className="font-heading text-[2rem] sm:text-[2.25rem] md:text-[3.1875rem] text-white text-center mb-10 sm:mb-14 md:mb-16 leading-tight"
              >
                {t.angebot.title}
              </motion.h2>

              <motion.div variants={cardStagger} className="grid md:grid-cols-3 gap-6 sm:gap-8 md:gap-16">
                {t.angebot.services.map((service, index) => {
                  const Icon = serviceIcons[index];
                  const serviceIds = ['gestalttherapie', 'coaching', 'personal-training'];
                  return (
                    <motion.div key={index} id={serviceIds[index]} variants={cardItem} className="scroll-mt-24">
                      <Card className="p-6 sm:p-8 h-full bg-off-white shadow-soft hover:shadow-teal transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden border border-accent/20">
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        <div className="mb-6">
                          <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-accent stroke-[1.5]" />
                        </div>
                        <h3 className="font-heading text-xl sm:text-2xl text-primary mb-2">
                          {service.title}
                        </h3>
                        <p className="text-accent text-xs uppercase tracking-widest mb-4">
                          {service.subline}
                        </p>
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                          {service.description}
                        </p>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Section 2: Investment & Cooperation */}
        <section id="konditionen" className="pt-20 sm:pt-28 md:pt-32 pb-28 sm:pb-40 md:pb-56 bg-background scroll-mt-24 overflow-x-clip">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={staggerContainer}
              className="max-w-7xl mx-auto"
            >
              <motion.h2
                variants={fadeUp}
                className="font-heading text-[2rem] sm:text-[2.25rem] md:text-[3.1875rem] text-primary text-center mb-12 sm:mb-18 md:mb-24 leading-tight"
              >
                {t.angebot.konditionen.title}
              </motion.h2>

              <motion.div variants={cardStagger} className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
                {/* Card 1: Einzelbegleitung */}
                <motion.div variants={cardItem}>
                  <Card className="px-6 sm:px-10 py-10 sm:py-14 md:py-20 h-full bg-white border border-accent/20 shadow-none hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-2 relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    {/* Title */}
                    <h3 className="font-heading text-xl sm:text-2xl md:text-3xl text-primary text-center mb-4">
                      {t.angebot.konditionen.einzelbegleitung.title}
                    </h3>
                    {/* Duration - same height as priceLabel on right */}
                    <p className="text-muted-foreground text-center mb-2">
                      {t.angebot.konditionen.einzelbegleitung.priceLabel}
                    </p>
                    {/* Price */}
                    <div className="text-center mb-6">
                      <div className="inline-block px-6 py-4 bg-accent/10 rounded-lg border border-accent/20">
                        <span className="font-heading text-2xl text-primary">
                          {t.angebot.konditionen.einzelbegleitung.price}
                        </span>
                      </div>
                    </div>
                    {/* Label */}
                    <p className="text-accent text-xs uppercase tracking-widest text-center mb-4">
                      {t.angebot.konditionen.einzelbegleitung.label}
                    </p>
                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed text-center mb-8 flex-grow whitespace-pre-line">
                      {t.angebot.konditionen.einzelbegleitung.description}
                    </p>
                    <a href="https://calendly.com/johanneschrist/neues-meeting" target="_blank" rel="noopener noreferrer" className="block mt-auto">
                      <Button variant="gold-outline" className="w-full font-semibold">
                        {t.angebot.konditionen.einzelbegleitung.cta}
                      </Button>
                    </a>
                  </Card>
                </motion.div>


                {/* Card 3: Intensive Zusammenarbeit */}
                <motion.div variants={cardItem}>
                  <Card className="px-6 sm:px-10 py-10 sm:py-14 md:py-20 h-full bg-white border border-accent/20 shadow-none hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-2 relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    {/* Title */}
                    <h3 className="font-heading text-xl sm:text-2xl md:text-3xl text-primary text-center mb-4">
                      {t.angebot.konditionen.intensiv.title}
                    </h3>
                    {/* Duration - same height as priceLabel on left */}
                    <p className="text-muted-foreground text-center mb-2">
                      {t.angebot.konditionen.intensiv.priceLabel}
                    </p>
                    {/* Price with discount */}
                    <div className="text-center mb-6">
                      <div className="inline-block px-6 py-4 bg-accent/10 rounded-lg border border-accent/20">
                        <span className="font-heading text-2xl text-primary">
                          {t.angebot.konditionen.intensiv.discountPrice}
                        </span>
                        <span className="text-muted-foreground line-through ml-2 text-lg">
                          {t.angebot.konditionen.einzelbegleitung.price}
                        </span>
                      </div>
                      <p className="text-accent text-sm mt-2">
                        {t.angebot.konditionen.intensiv.discount}
                      </p>
                    </div>
                    {/* Label */}
                    <p className="text-accent text-xs uppercase tracking-widest text-center mb-4">
                      {t.angebot.konditionen.intensiv.label}
                    </p>
                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed text-center mb-8 flex-grow">
                      {t.angebot.konditionen.intensiv.description}
                    </p>
                    <Link to={`${getLocalizedPath('/kontakt')}?subject=Individuelle+Beratung`} className="block mt-auto">
                      <Button variant="gold" className="w-full font-semibold">
                        {t.angebot.konditionen.intensiv.cta}
                      </Button>
                    </Link>
                  </Card>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Section 4: Flexible Formats */}
        <section className="py-16 sm:py-24 md:py-32 bg-primary">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={staggerContainer}
              className="max-w-5xl xl:max-w-6xl mx-auto"
            >
              <motion.h2
                variants={fadeUp}
                className="font-heading text-[1.75rem] sm:text-[2.25rem] md:text-[3.1875rem] text-white text-center mb-8 sm:mb-12 md:mb-16"
              >
                {t.angebot.formate.title}
              </motion.h2>

              <motion.div variants={fadeUp} className="text-center mb-6 sm:mb-10 md:mb-12 mt-2 sm:mt-4">
                <h3 className="font-heading text-xl sm:text-2xl md:text-3xl text-white mb-2 sm:mb-3">
                  {t.angebot.formate.map.title}
                </h3>
              </motion.div>

              <motion.div variants={staggerContainer} className="grid md:grid-cols-2 gap-5 sm:gap-8 md:gap-12 lg:gap-16">
                {/* Karte Gestalttherapie (Links) */}
                <motion.div variants={fadeUp} className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border border-accent/10 flex flex-col h-full transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="text-center mb-4 sm:mb-6">
                    <h4 className="font-heading text-lg sm:text-xl md:text-2xl text-primary mb-1.5 sm:mb-2 flex items-center justify-center gap-2 sm:gap-3">
                      <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-accent flex-shrink-0" />
                      {t.angebot.formate.map.therapie.title}
                    </h4>
                    <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4">
                      {t.angebot.formate.map.therapie.description}
                    </p>
                    <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-accent/10 text-accent font-medium text-xs sm:text-sm rounded-lg mb-4 sm:mb-6 break-words">
                      IZICure, 47 Allées Jean Jaurès, 31000 Toulouse
                    </div>
                  </div>
                  <div className="flex-grow w-full h-[250px] sm:h-[350px] md:h-[400px] rounded-xl sm:rounded-2xl overflow-hidden shadow-inner border border-accent/20 relative bg-muted/20">
                    <iframe
                      src="https://maps.google.com/maps?q=IZICure,+47+All.+Jean+Jaur%C3%A8s,+31000+Toulouse&t=m&z=17&output=embed&iwloc=Near"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="IZICure Location"
                    ></iframe>
                  </div>
                </motion.div>

                {/* Karte Personal Training (Rechts) */}
                <motion.div variants={fadeUp} className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border border-accent/10 flex flex-col h-full transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="text-center mb-4 sm:mb-6">
                    <h4 className="font-heading text-lg sm:text-xl md:text-2xl text-primary mb-1.5 sm:mb-2 flex items-center justify-center gap-2 sm:gap-3">
                      <Dumbbell className="w-5 h-5 sm:w-6 sm:h-6 text-accent flex-shrink-0" />
                      {t.angebot.formate.map.training.title}
                    </h4>
                    <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4">
                      {t.angebot.formate.map.training.description}
                    </p>
                    <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-accent/10 text-accent font-medium text-xs sm:text-sm rounded-lg mb-4 sm:mb-6 break-words">
                      12 Rue Jean-Palaprat, 31000 Toulouse
                    </div>
                  </div>
                  <div className="flex-grow w-full h-[250px] sm:h-[350px] md:h-[400px] rounded-xl sm:rounded-2xl overflow-hidden shadow-inner border border-accent/20 relative bg-muted/20">
                    <iframe
                      src="https://maps.google.com/maps?q=12+Rue+Jean-Palaprat,+31000+Toulouse&t=m&z=17&output=embed&iwloc=Near"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Personal Training Location"
                    ></iframe>
                  </div>
                </motion.div>
              </motion.div>

              {/* + Symbol and Online Option */}
              <motion.div variants={fadeUp} className="flex flex-col items-center mt-8 sm:mt-12 relative z-10 w-full px-2 sm:px-4">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  viewport={viewportSettings}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-primary/80 backdrop-blur-sm shadow-soft flex items-center justify-center mb-6 sm:mb-10 mt-1 sm:mt-2 z-20"
                >
                  <span className="text-white text-xl sm:text-2xl font-light font-heading leading-none mt-0.5 sm:mt-1">+</span>
                </motion.div>

                <div className="bg-white/10 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 max-w-2xl w-full flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-6 backdrop-blur-md transition-all hover:bg-white/15 hover:-translate-y-1">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 shadow-inner border border-accent/20">
                    <Video className="w-6 h-6 sm:w-8 sm:h-8 text-accent stroke-[1.5]" />
                  </div>
                  <div className="mt-0.5 sm:mt-1">
                    <h3 className="font-heading text-lg sm:text-xl md:text-2xl text-white mb-1.5 sm:mb-2 tracking-wide">
                      {t.angebot.formate.online.title}
                    </h3>
                    <p className="text-white/80 leading-relaxed text-xs sm:text-sm md:text-base">
                      {t.angebot.formate.online.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-28 md:py-36 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={staggerContainer}
              className="max-w-3xl mx-auto"
            >
              <motion.h2
                variants={fadeUp}
                className="font-heading text-[2.25rem] md:text-[3.1875rem] text-primary text-center mb-16"
              >
                {t.angebot.faq.title}
              </motion.h2>

              <motion.div variants={fadeUp}>
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {t.angebot.faq.items.map((item, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="bg-off-white border border-border/50 rounded-xl px-6 data-[state=open]:shadow-soft"
                    >
                      <AccordionTrigger className="text-left font-heading text-lg text-primary hover:no-underline py-6">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            </motion.div>
          </div>
        </section>




      </main >

      <Footer />
    </div >
  );
};

export default Angebot;
