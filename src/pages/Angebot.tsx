import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Brain, Compass, Activity, BarChart3, Map, Video, MapPin, ArrowRight, Dumbbell } from "lucide-react";
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
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        {/* Section 1: The 3 Pillars */}
        <section className="pt-[68px] pb-32 bg-primary">
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
                className="font-heading text-[2.25rem] md:text-[3.1875rem] text-white text-center mb-16"
              >
                {t.angebot.title}
              </motion.h2>

              <motion.div variants={cardStagger} className="grid md:grid-cols-3 gap-8 md:gap-16">
                {t.angebot.services.map((service, index) => {
                  const Icon = serviceIcons[index];
                  const serviceIds = ['gestalttherapie', 'coaching', 'personal-training'];
                  return (
                    <motion.div key={index} id={serviceIds[index]} variants={cardItem} className="scroll-mt-24">
                      <Card className="p-8 h-full bg-off-white shadow-soft hover:shadow-teal transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden border border-accent/20">
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        <div className="mb-6">
                          <Icon className="w-12 h-12 text-accent stroke-[1.5]" />
                        </div>
                        <h3 className="font-heading text-2xl text-primary mb-2">
                          {service.title}
                        </h3>
                        <p className="text-[#c5a065] text-xs uppercase tracking-widest mb-4">
                          {service.subline}
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
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
        <section id="konditionen" className="pt-32 pb-56 bg-background scroll-mt-24">
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
                className="font-heading text-[2.25rem] md:text-[3.1875rem] text-primary text-center mb-24"
              >
                {t.angebot.konditionen.title}
              </motion.h2>

              <motion.div variants={cardStagger} className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
                {/* Card 1: Einzelbegleitung */}
                <motion.div variants={cardItem}>
                  <Card className="px-10 py-16 md:py-20 h-full bg-white border border-accent/20 shadow-none hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-2 relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    {/* Title */}
                    <h3 className="font-heading text-2xl md:text-3xl text-primary text-center mb-4">
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
                    <p className="text-[#c5a065] text-xs uppercase tracking-widest text-center mb-4">
                      {t.angebot.konditionen.einzelbegleitung.label}
                    </p>
                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed text-center mb-8 flex-grow">
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
                  <Card className="px-10 py-16 md:py-20 h-full bg-white border border-accent/20 shadow-none hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-2 relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    {/* Title */}
                    <h3 className="font-heading text-2xl md:text-3xl text-primary text-center mb-4">
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
                    <p className="text-[#c5a065] text-xs uppercase tracking-widest text-center mb-4">
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
        <section className="py-32 bg-primary">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={staggerContainer}
              className="max-w-4xl mx-auto"
            >
              <motion.h2
                variants={fadeUp}
                className="font-heading text-[2.25rem] md:text-[3.1875rem] text-white text-center mb-16"
              >
                {t.angebot.formate.title}
              </motion.h2>

              <motion.div variants={cardStagger} className="grid md:grid-cols-2 gap-8 md:gap-16">
                <motion.div variants={cardItem} className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Video className="w-7 h-7 text-accent stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-white mb-2">
                      {t.angebot.formate.online.title}
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      {t.angebot.formate.online.description}
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={cardItem} className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-7 h-7 text-accent stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-white mb-2">
                      {t.angebot.formate.praesenz.title}
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      {t.angebot.formate.praesenz.description}
                    </p>
                  </div>
                </motion.div>
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
