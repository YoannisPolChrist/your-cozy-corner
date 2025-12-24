import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Brain, Compass, Activity, BarChart3, Map, Video, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { fadeUp, staggerContainer, cardStagger, cardItem, iconStagger, iconItem, viewportSettings } from "@/lib/animations";
import { useLanguage } from "@/i18n";

const Angebot = () => {
  const { t, getLocalizedPath } = useLanguage();
  const serviceIcons = [Heart, Brain, Compass];
  const checkupIcons = [Activity, BarChart3, Map];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        {/* Section 1: The 3 Pillars */}
        <section className="pt-[68px] pb-32 bg-background">
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
                className="font-heading text-[2.25rem] md:text-[3.1875rem] text-primary text-center mb-16"
              >
                {t.angebot.title}
              </motion.h2>

              <motion.div variants={cardStagger} className="grid md:grid-cols-3 gap-8 md:gap-16">
                {t.angebot.services.map((service, index) => {
                  const Icon = serviceIcons[index];
                  return (
                    <motion.div key={index} variants={cardItem}>
                      <Card className="p-8 h-full bg-card border-none shadow-soft hover:shadow-teal transition-all duration-500 hover:-translate-y-2">
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

        {/* Section 2: Holomotion Check-Up */}
        <section className="py-32 bg-primary">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={staggerContainer}
              className="max-w-6xl mx-auto"
            >
              <motion.p
                variants={fadeUp}
                className="text-[#c5a065] text-xs uppercase tracking-widest text-center mb-4"
              >
                {t.angebot.checkup.label}
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-heading text-[2.25rem] md:text-[3.1875rem] text-primary-foreground text-center mb-16"
              >
                {t.angebot.checkup.title}
              </motion.h2>

              <motion.div variants={iconStagger} className="grid md:grid-cols-3 gap-8 md:gap-16">
                {t.angebot.checkup.features.map((feature, index) => {
                  const Icon = checkupIcons[index];
                  return (
                    <motion.div key={index} variants={iconItem} className="text-center">
                      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                        <Icon className="w-8 h-8 text-[#c5a065] stroke-[1.5]" />
                      </div>
                      <h3 className="font-heading text-xl text-primary-foreground mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-primary-foreground/80 leading-relaxed text-sm">
                        {feature.description}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Diagnostic Integration Text */}
              <motion.p
                variants={fadeUp}
                className="text-primary-foreground/90 text-center max-w-3xl mx-auto mt-12 text-lg italic leading-relaxed"
              >
                {t.angebot.checkup.diagnosticIntegration}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Section 3: Investment & Cooperation */}
        <section className="py-32 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={staggerContainer}
              className="max-w-5xl mx-auto"
            >
              <motion.h2
                variants={fadeUp}
                className="font-heading text-[2.25rem] md:text-[3.1875rem] text-primary text-center mb-16"
              >
                {t.angebot.konditionen.title}
              </motion.h2>

              <motion.div variants={cardStagger} className="grid md:grid-cols-2 gap-8 md:gap-16">
                {/* Card 1: Einzelbegleitung */}
                <motion.div variants={cardItem}>
                  <Card className="p-10 h-full bg-card border-none shadow-soft hover:shadow-teal transition-all duration-500 flex flex-col group hover:-translate-y-2 hover:border-[#c5a065]/20 hover:bg-card/95">
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
                    <Link to={getLocalizedPath('/kontakt')} className="block mt-auto">
                      <Button variant="gold-outline" className="w-full font-semibold">
                        {t.angebot.konditionen.einzelbegleitung.cta}
                      </Button>
                    </Link>
                  </Card>
                </motion.div>

                {/* Card 2: Intensive Zusammenarbeit */}
                <motion.div variants={cardItem}>
                  <Card className="p-10 h-full bg-card border-none shadow-soft hover:shadow-teal transition-all duration-500 flex flex-col group hover:-translate-y-2 hover:border-[#c5a065]/20 hover:bg-card/95">
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
                    <Link to={getLocalizedPath('/kontakt')} className="block mt-auto">
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
        <section className="py-32 bg-off-white">
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
                className="font-heading text-[2.25rem] md:text-[3.1875rem] text-primary text-center mb-16"
              >
                {t.angebot.formate.title}
              </motion.h2>

              <motion.div variants={cardStagger} className="grid md:grid-cols-2 gap-8 md:gap-16">
                <motion.div variants={cardItem} className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Video className="w-7 h-7 text-accent stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-primary mb-2">
                      {t.angebot.formate.online.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t.angebot.formate.online.description}
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={cardItem} className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-7 h-7 text-accent stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-primary mb-2">
                      {t.angebot.formate.praesenz.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t.angebot.formate.praesenz.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-28 md:py-36 bg-gradient-cta relative overflow-hidden">
          {/* Subtle gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-teal-navy/30" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={staggerContainer}
              className="max-w-2xl mx-auto"
            >
              <motion.h2 variants={fadeUp} className="font-heading text-3xl md:text-4xl text-white mb-8">
                {t.angebot.cta.title}
              </motion.h2>
              <motion.p variants={fadeUp} className="text-white/85 text-lg mb-10">
                {t.angebot.cta.description}
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link to={getLocalizedPath('/kontakt')}>
                  <Button variant="gold" size="lg" className="font-semibold">
                    {t.angebot.cta.button} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
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
