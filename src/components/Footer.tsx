import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n";

export const Footer = () => {
  const { t, language, getLocalizedPath } = useLanguage();

  return (
    <footer className="bg-background border-t border-primary/10 py-8 overflow-x-clip">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Contact Column */}
            <div>
              <p className="font-heading text-base text-primary font-semibold mb-3">{t.footer.kontakt}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2 text-primary">
                  <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>Toulouse, {language === 'en' ? 'France' : 'Frankreich'}</span>
                </div>
                <div className="flex items-start gap-2 text-primary">
                  <Phone className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>+49 162 170 9979</span>
                </div>
                <div className="flex items-start gap-2 text-primary">
                  <Mail className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>contact@johanneschrist.com</span>
                </div>
              </div>
            </div>

            {/* Spacer Column */}
            <div className="hidden md:block"></div>

            {/* Legal Column */}
            <div className="md:text-right">
              <p className="font-heading text-base text-primary font-semibold mb-3">{t.footer.rechtliches}</p>
              <nav className="space-y-2 text-sm">
                <Link to={getLocalizedPath('/datenschutz')} className="block text-primary hover:text-accent transition-colors">
                  {t.footer.datenschutz}
                </Link>
                <Link to={getLocalizedPath('/impressum')} className="block text-primary hover:text-accent transition-colors">
                  {t.footer.impressum}
                </Link>
              </nav>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 pt-4 border-t border-primary/10 text-center">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} {t.footer.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
