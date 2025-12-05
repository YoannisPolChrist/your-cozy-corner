import { MapPin, Phone, Mail } from "lucide-react";
export const Footer = () => {
  return <footer className="bg-white border-t border-primary/10 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Contact Column */}
            <div>
              <p className="font-heading text-base text-primary font-semibold mb-3">Kontakt</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2 text-primary">
                  <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>Toulouse, Frankreich</span>
                </div>
                <div className="flex items-start gap-2 text-primary">
                  <Phone className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>+49 162 170 9979</span>
                </div>
                <div className="flex items-start gap-2 text-primary">
                  <Mail className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>ps.johanneschrist@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Navigation Column */}
            

            {/* Legal Column */}
            <div>
              <p className="font-heading text-base text-primary font-semibold mb-3">Rechtliches</p>
              <nav className="space-y-2 text-sm">
                <a href="#" className="block text-primary hover:text-accent transition-colors">
                  Datenschutzerklärung
                </a>
                <a href="#" className="block text-primary hover:text-accent transition-colors">
                  Impressum
                </a>
              </nav>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 pt-4 border-t border-primary/10 text-center">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Johannes Christ · Gestalttherapie & Coaching
            </p>
          </div>
        </div>
      </div>
    </footer>;
};