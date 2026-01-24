import { Navigation } from "@/components/Navigation";
import { AnimatedSection, StaggerContainer, AnimatedItem } from "@/components/AnimatedSection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Dumbbell, Heart, Target, MapPin, Award, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/i18n";

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

const PersonalTraining = () => {
    const { t, getLocalizedPath } = useLanguage();
    const serviceIcons = [Dumbbell, Heart, Target];

    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <main>
                {/* Hero Section */}
                <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
                    {/* Background with gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-teal-navy" />

                    {/* Animated background elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.div
                            className="absolute top-20 right-20 w-64 h-64 rounded-full bg-accent/10 blur-3xl"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-gold-accent/10 blur-3xl"
                            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="max-w-4xl mx-auto text-center"
                        >
                            {/* Location badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
                            >
                                <MapPin className="w-4 h-4 text-gold-accent" />
                                <span className="text-white/90 text-sm font-medium">{t.personalTraining.location.city}</span>
                            </motion.div>

                            <h1 className="typ-h1 text-white mb-6">
                                {t.personalTraining.hero.title}
                            </h1>

                            <p className="typ-lead text-white/85 max-w-2xl mx-auto mb-10">
                                {t.personalTraining.hero.subtitle}
                            </p>

                            <Link to={getLocalizedPath('/kontakt')} onClick={scrollToTop}>
                                <Button variant="gold" size="lg" className="font-semibold text-lg px-8">
                                    {t.personalTraining.hero.cta} <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Bottom gradient fade */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-off-white to-transparent" />
                </section>

                {/* Approach Section */}
                <AnimatedSection className="py-24 md:py-32 bg-off-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <StaggerContainer className="grid md:grid-cols-5 gap-12 items-center">
                                <AnimatedItem className="md:col-span-3">
                                    <span className="text-accent text-sm uppercase tracking-[0.2em] font-medium mb-4 block">
                                        {t.personalTraining.approach.title}
                                    </span>
                                    <h2 className="typ-h2 text-primary mb-6">
                                        Körper &amp; Geist in Bewegung
                                    </h2>
                                    <p className="typ-body text-muted-foreground whitespace-pre-line">
                                        {t.personalTraining.approach.description}
                                    </p>
                                </AnimatedItem>

                                <AnimatedItem className="md:col-span-2">
                                    {/* Qualifications Card */}
                                    <Card className="p-8 bg-white border border-accent/20 shadow-lg">
                                        <div className="flex items-center gap-3 mb-6">
                                            <Award className="w-8 h-8 text-accent" />
                                            <h3 className="typ-h4 text-primary">{t.personalTraining.qualifications.title}</h3>
                                        </div>
                                        <ul className="space-y-3">
                                            {t.personalTraining.qualifications.items.map((item, index) => (
                                                <li key={index} className="flex items-start gap-3">
                                                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                                                    <span className="typ-body text-muted-foreground">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </Card>
                                </AnimatedItem>
                            </StaggerContainer>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Services Section */}
                <AnimatedSection className="py-24 md:py-32 bg-secondary/30">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="typ-h2 text-primary mb-4">
                                Mein Angebot
                            </h2>
                            <p className="typ-body text-muted-foreground max-w-2xl mx-auto">
                                Drei Säulen für deine körperliche Transformation
                            </p>
                        </div>

                        <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {t.personalTraining.services.map((service, index) => {
                                const Icon = serviceIcons[index];
                                return (
                                    <AnimatedItem key={index}>
                                        <Card className="p-8 bg-off-white border border-accent/20 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
                                            <div className="mb-6">
                                                <Icon className="w-12 h-12 text-accent group-hover:text-primary transition-colors duration-300" strokeWidth={1.5} />
                                            </div>
                                            <span className="text-xs uppercase tracking-wider text-accent font-semibold block mb-2">
                                                {service.subline}
                                            </span>
                                            <h3 className="typ-h4 mb-4 text-primary">
                                                {service.title}
                                            </h3>
                                            <p className="typ-body text-muted-foreground">
                                                {service.description}
                                            </p>
                                        </Card>
                                    </AnimatedItem>
                                );
                            })}
                        </StaggerContainer>
                    </div>
                </AnimatedSection>

                {/* Location Section */}
                <AnimatedSection className="py-20 md:py-28 bg-off-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-8"
                            >
                                <MapPin className="w-10 h-10 text-primary" />
                            </motion.div>
                            <h2 className="typ-h2 text-primary mb-4">
                                {t.personalTraining.location.title}
                            </h2>
                            <p className="typ-h3 font-heading text-accent mb-4">
                                {t.personalTraining.location.city}
                            </p>
                            <p className="typ-body text-muted-foreground">
                                {t.personalTraining.location.description}
                            </p>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Pricing Section */}
                <section className="py-24 md:py-32 bg-secondary/30" id="pricing">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="typ-h2 text-primary mb-4">
                                {t.personalTraining.pricing.title}
                            </h2>
                        </div>

                        <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {/* Single Session */}
                            <AnimatedItem>
                                <Card className="p-8 bg-off-white border border-accent/20 h-full relative overflow-hidden">
                                    <span className="text-xs uppercase tracking-wider text-accent font-semibold block mb-4">
                                        {t.personalTraining.pricing.single.label}
                                    </span>
                                    <h3 className="typ-h3 text-primary mb-2">
                                        {t.personalTraining.pricing.single.title}
                                    </h3>
                                    <div className="flex items-baseline gap-2 mb-4">
                                        <span className="font-heading typ-h2 text-accent">{t.personalTraining.pricing.single.price}</span>
                                        <span className="text-muted-foreground">/ {t.personalTraining.pricing.single.priceLabel}</span>
                                    </div>
                                    <p className="typ-body text-muted-foreground mb-8">
                                        {t.personalTraining.pricing.single.description}
                                    </p>
                                    <Link to={getLocalizedPath('/kontakt')} onClick={scrollToTop}>
                                        <Button variant="outline" className="w-full">
                                            {t.personalTraining.pricing.single.cta}
                                        </Button>
                                    </Link>
                                </Card>
                            </AnimatedItem>

                            {/* Package */}
                            <AnimatedItem>
                                <Card className="p-8 bg-primary text-white h-full relative overflow-hidden border-0">
                                    {/* Popular badge */}
                                    <div className="absolute top-4 right-4">
                                        <span className="px-3 py-1 bg-gold-accent text-primary text-xs font-semibold rounded-full">
                                            {t.personalTraining.pricing.package.discount}
                                        </span>
                                    </div>
                                    <span className="text-gold-accent text-xs uppercase tracking-wider font-semibold block mb-4">
                                        {t.personalTraining.pricing.package.label}
                                    </span>
                                    <h3 className="typ-h3 text-white mb-2">
                                        {t.personalTraining.pricing.package.title}
                                    </h3>
                                    <div className="flex items-baseline gap-2 mb-2">
                                        <span className="font-heading typ-h2 text-gold-accent">{t.personalTraining.pricing.package.price}</span>
                                        <span className="text-white/70">/ {t.personalTraining.pricing.package.priceLabel}</span>
                                    </div>
                                    <p className="typ-small text-white/70 mb-4">
                                        {t.personalTraining.pricing.package.discountPrice}
                                    </p>
                                    <p className="typ-body text-white/85 mb-8">
                                        {t.personalTraining.pricing.package.description}
                                    </p>
                                    <Link to={getLocalizedPath('/kontakt')} onClick={scrollToTop}>
                                        <Button variant="gold" className="w-full">
                                            {t.personalTraining.pricing.package.cta}
                                        </Button>
                                    </Link>
                                </Card>
                            </AnimatedItem>
                        </StaggerContainer>
                    </div>
                </section>

                {/* CTA Section */}
                <AnimatedSection className="py-24 md:py-32 bg-gradient-cta text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-teal-navy/30" />
                    <div className="container mx-auto px-4 text-center relative z-10">
                        <StaggerContainer className="max-w-2xl mx-auto">
                            <AnimatedItem>
                                <h2 className="typ-h2 mb-8 text-white">
                                    {t.personalTraining.cta.title}
                                </h2>
                            </AnimatedItem>
                            <AnimatedItem>
                                <p className="typ-body text-white/85 mb-10">
                                    {t.personalTraining.cta.description}
                                </p>
                            </AnimatedItem>
                            <AnimatedItem>
                                <Link to={getLocalizedPath('/kontakt')} onClick={scrollToTop}>
                                    <Button variant="gold" size="lg" className="font-semibold">
                                        {t.personalTraining.cta.button} <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
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
