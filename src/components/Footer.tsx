import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";

export const Footer = () => {
  const { t, language, getLocalizedPath } = useLanguage();

  return (
    <footer className="bg-background relative pt-16 pb-8 overflow-hidden">
      {/* Decorative top border gradient line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-primary via-gold-accent to-teal-navy opacity-50"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-12">
            {/* Contact Column */}
            <div>
              <p className="font-heading text-lg text-primary font-bold mb-6 relative inline-block">
                {t.footer.kontakt}
                <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gold-accent rounded-full"></span>
              </p>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3 text-muted-foreground group">
                  <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <MapPin className="w-4 h-4 text-gold-accent" />
                  </div>
                  <span className="mt-1.5">Toulouse, {language === 'en' ? 'France' : 'Frankreich'}</span>
                </div>
                <MagneticButton strength={0.15} className="!block">
                  <a href="tel:+491621709979" className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors group-hover:shadow-sm">
                      <Phone className="w-4 h-4 text-gold-accent" />
                    </div>
                    <span className="mt-1.5">+49 162 170 9979</span>
                  </a>
                </MagneticButton>
                <MagneticButton strength={0.15} className="!block mt-2">
                  <a href="mailto:contact@johanneschrist.com" className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors group-hover:shadow-sm">
                      <Mail className="w-4 h-4 text-gold-accent" />
                    </div>
                    <span className="mt-1.5">contact@johanneschrist.com</span>
                  </a>
                </MagneticButton>
              </div>
            </div>

            {/* Spacer Column */}
            <div className="hidden md:block"></div>

            {/* Legal Column */}
            <div className="md:text-right">
              <p className="font-heading text-lg text-primary font-bold mb-6 relative inline-block">
                {t.footer.rechtliches}
                <span className="absolute -bottom-2 md:right-0 md:left-auto left-0 w-8 h-0.5 bg-gold-accent rounded-full"></span>
              </p>
              <nav className="space-y-3 text-sm flex flex-col items-start md:items-end">
                <Link to={getLocalizedPath('/datenschutz')} className="text-muted-foreground hover:text-gold-accent transition-colors py-1">
                  {t.footer.datenschutz}
                </Link>
                <Link to={getLocalizedPath('/impressum')} className="text-muted-foreground hover:text-gold-accent transition-colors py-1">
                  {t.footer.impressum}
                </Link>
              </nav>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-black/5 text-center flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground/80 font-medium">
              © {new Date().getFullYear()} {t.footer.copyright}
            </p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-accent opacity-50"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-primary opacity-50"></span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
