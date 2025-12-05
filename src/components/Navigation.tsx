import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = () => {
    scrollToTop();
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3" onClick={scrollToTop}>
          <img src={logo} alt="Johannes Christ Therapie Logo" className="w-14 h-14 object-contain" />
          <div>
            <div className="font-heading font-bold text-gold-accent text-lg tracking-wide">
              JOHANNES CHRIST
            </div>
            <p className="text-xs text-muted-foreground">
              Gestalttherapeut, Coach, M.Sc. Psychologie
            </p>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/gestalttherapie"
            className="text-muted-foreground hover:text-gold-accent transition-colors font-medium"
            onClick={scrollToTop}
          >
            Gestalttherapie
          </Link>
          <Link
            to="/angebot"
            className="text-muted-foreground hover:text-gold-accent transition-colors font-medium"
            onClick={scrollToTop}
          >
            Angebot
          </Link>
          <Link
            to="/ueber-mich"
            className="text-muted-foreground hover:text-gold-accent transition-colors font-medium"
            onClick={scrollToTop}
          >
            Über mich
          </Link>
          <Link
            to="/kontakt"
            className="text-muted-foreground hover:text-gold-accent transition-colors font-medium"
            onClick={scrollToTop}
          >
            Kontakt
          </Link>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-t border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              to="/gestalttherapie"
              className="text-left text-foreground hover:text-gold-accent transition-colors py-2"
              onClick={handleNavClick}
            >
              Gestalttherapie
            </Link>
            <Link
              to="/angebot"
              className="text-left text-foreground hover:text-gold-accent transition-colors py-2"
              onClick={handleNavClick}
            >
              Angebot
            </Link>
            <Link
              to="/ueber-mich"
              className="text-left text-foreground hover:text-gold-accent transition-colors py-2"
              onClick={handleNavClick}
            >
              Über mich
            </Link>
            <Link
              to="/kontakt"
              className="text-left text-foreground hover:text-gold-accent transition-colors py-2"
              onClick={handleNavClick}
            >
              Kontakt
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
