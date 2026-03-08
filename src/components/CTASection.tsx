import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { LazyParticles } from "@/components/LazyParticles";
import { MagneticButton } from "@/components/ui/magnetic-button";

const grainSvg = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E`;

export const CTASection = () => {
  const scrollToContact = () => {
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 md:py-32 bg-gradient-cta text-white relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay z-0"
        style={{ backgroundImage: `url("${grainSvg}")` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-teal-navy/50 via-transparent to-gold-accent/20 z-0" />
      <LazyParticles />

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="typ-h2 mb-6 text-white drop-shadow-md">
            Bereit für Veränderung?
          </h2>
          <p className="typ-lead mb-12 max-w-3xl mx-auto italic text-white/90 drop-shadow-sm">
            Kontaktieren Sie mich für ein kostenloses Erstgespräch. Gemeinsam schauen wir,
            wie ich Sie unterstützen kann.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <MagneticButton strength={0.15}>
              <div className="relative inline-block group">
                <motion.div
                  className="absolute -inset-1 rounded-full bg-gold-accent opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
                  animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.35, 0.15] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <Button
                  onClick={scrollToContact}
                  size="lg"
                  className="relative overflow-hidden text-primary font-medium px-8 py-6 text-base rounded-full shadow-gold group border border-transparent transition-all duration-300 hover:shadow-premium-hover hover:-translate-y-1 bg-white hover:bg-white/95"
                >
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold-accent/20 to-transparent group-hover:animate-shimmer" />
                  <span className="relative z-10 flex items-center">
                    Termin vereinbaren <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
              </div>
            </MagneticButton>

            <MagneticButton strength={0.15}>
              <Button
                size="lg"
                className="relative overflow-hidden font-medium px-8 py-6 text-base rounded-full group border border-white/50 text-white bg-white/5 hover:bg-white hover:text-primary transition-all duration-300 backdrop-blur-sm"
              >
                <span className="relative z-10 flex items-center">
                  <Phone className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  Anrufen
                </span>
              </Button>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
