import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.webp";
import { useLanguage } from "@/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, getLocalizedPath } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
      const isHomePage = ['/', '/de', '/en', '/fr'].includes(location.pathname);
      if (!isHomePage) { setIsVisible(true); } else { setIsVisible(scrollPosition > 50); }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const isActive = (to: string) => {
    const currentPath = location.pathname;
    const localizedPath = getLocalizedPath(to);
    return currentPath === localizedPath || currentPath.includes(`/${to}`);
  };

  const scrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const handleNavClick = () => { scrollToTop(); setIsOpen(false); };

  const navLinks = [
    { to: 'gestalttherapie', label: t.nav.gestalttherapie },
    { to: 'personal-training', label: t.nav.personalTraining },
    { to: 'ueber-mich', label: t.nav.ueberMich },
    { to: 'kontakt', label: t.nav.kontakt },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} ${isScrolled ? 'bg-glass backdrop-blur-xl shadow-premium border-b border-glass py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between transition-all duration-300">
        <Link to={getLocalizedPath('/')} className="flex items-center gap-2 md:gap-3 group" onClick={scrollToTop}>
          <div className="relative">
            <img src={logo} alt="Johannes Christ Therapie Logo" className="w-10 h-10 md:w-14 md:h-14 object-contain transition-transform duration-500 group-hover:scale-110" width={56} height={56} decoding="async" />
          </div>
          <div className="min-w-0">
            <div className="font-heading font-bold text-gold-accent text-sm md:text-lg tracking-wide whitespace-nowrap">JOHANNES CHRIST</div>
            <p className={`text-[10px] md:text-xs leading-tight ${isScrolled ? 'text-muted-foreground' : 'text-foreground/80'}`}>
              <span className="whitespace-nowrap">{t.nav.subtitle1}</span><br className="md:hidden" /><span className="hidden md:inline"> </span><span className="whitespace-nowrap">{t.nav.subtitle2}</span>
            </p>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = isActive(link.to);
            return (
              <Link key={link.to} to={getLocalizedPath(link.to)} onClick={scrollToTop} className={`relative px-2 py-1 text-sm transition-colors duration-300 font-medium ${active ? 'text-gold-accent' : isScrolled ? 'text-muted-foreground hover:text-foreground' : 'text-foreground/80 hover:text-foreground'}`}>
                {link.label}
                {active && <motion.div layoutId="nav-underline" className="absolute left-0 bottom-0 w-full h-[2px] bg-gold-accent rounded-full" initial={false} transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
              </Link>
            );
          })}
          <LanguageSwitcher />
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} aria-label="Menü öffnen" className={isScrolled ? 'text-foreground' : 'text-foreground/80'}><Menu className="h-6 w-6" /></Button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="md:hidden overflow-hidden bg-glass backdrop-blur-xl border-t border-glass">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link key={link.to} to={getLocalizedPath(link.to)} className={`text-left transition-colors py-2 px-4 rounded-md ${isActive(link.to) ? 'bg-gold-accent/10 text-gold-accent font-semibold' : 'text-foreground hover:bg-foreground/5'}`} onClick={handleNavClick}>{link.label}</Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
