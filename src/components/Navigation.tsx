import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.webp";
import { useLanguage } from "@/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, getLocalizedPath } = useLanguage();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const handleNavClick = () => {
    scrollToTop();
    setIsOpen(false);
  };

  const navLinks = [
    { to: 'gestalttherapie', label: t.nav.gestalttherapie },
    { to: 'angebot', label: t.nav.angebot },
    { to: 'ueber-mich', label: t.nav.ueberMich },
    { to: 'kontakt', label: t.nav.kontakt },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to={getLocalizedPath('/')} className="flex items-center gap-2 md:gap-3" onClick={scrollToTop}>
          <img src={logo} alt="Johannes Christ Therapie Logo" className="w-10 h-10 md:w-14 md:h-14 object-contain" width={56} height={56} decoding="async" />
          <div className="min-w-0">
            <div className="font-heading font-bold text-gold-accent text-sm md:text-lg tracking-wide whitespace-nowrap">
              JOHANNES CHRIST
            </div>
            <p className="text-[10px] md:text-xs text-muted-foreground leading-tight">
              <span className="whitespace-nowrap">Gestalttherapeut, Coach,</span>
              <br className="md:hidden" />
              <span className="hidden md:inline"> </span>
              <span className="whitespace-nowrap">M.Sc. Psychologie (i.A.)</span>
            </p>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.to}
              to={getLocalizedPath(link.to)} 
              className="text-muted-foreground hover:text-gold-accent transition-colors font-medium" 
              onClick={scrollToTop}
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} aria-label="Menü öffnen">
            <Menu className="h-6 w-6" aria-hidden="true" />
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-t border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link 
                key={link.to}
                to={getLocalizedPath(link.to)} 
                className="text-left text-foreground hover:text-gold-accent transition-colors py-2" 
                onClick={handleNavClick}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
