import { Button } from "@/components/ui/button";
import { LogIn, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.webp";
import { useLanguage } from "@/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { scrollToTop } from "@/lib/scroll";
import { getCompanionUrl } from "@/lib/site";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, language, getLocalizedPath } = useLanguage();
  const location = useLocation();
  const isHomePage = ['/', '/de', '/en', '/fr'].includes(location.pathname);
  const isHeroFirstPage = /\/(gestalttherapie|personal-training)$/.test(location.pathname);
  const shouldRevealOnScroll = isHomePage || isHeroFirstPage;
  const showSolidHeader = isScrolled;
  const showLoginButton = !isHomePage;

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const solidHeaderThreshold = shouldRevealOnScroll ? 220 : 20;
      setIsScrolled(scrollPosition > solidHeaderThreshold);
      if (shouldRevealOnScroll) {
        setIsVisible(scrollPosition > 50);
      } else {
        setIsVisible(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, shouldRevealOnScroll]);

  const isActive = (to: string) => {
    const currentPath = location.pathname;
    const localizedPath = getLocalizedPath(to);
    return currentPath === localizedPath || currentPath.includes(`/${to}`);
  };

  const handleNavClick = () => { scrollToTop(); setIsOpen(false); };

  const navLinks = [
    { to: 'gestalttherapie', label: t.nav.gestalttherapie },
    { to: 'personal-training', label: t.nav.personalTraining },
    { to: 'ueber-mich', label: t.nav.ueberMich },
    { to: 'kontakt', label: t.nav.kontakt },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} ${showSolidHeader ? 'bg-glass backdrop-blur-xl shadow-premium border-b border-glass py-2' : 'bg-transparent py-4'}`}>
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12 flex items-center justify-between transition-all duration-300">
        <Link to={getLocalizedPath('/')} className="flex items-center gap-2 md:gap-3 group" onClick={handleNavClick}>
          <div className="relative">
            <img src={logo} alt={t.ui.logoAlt} className="w-10 h-10 md:w-14 md:h-14 object-contain transition-transform duration-500 group-hover:scale-110" width={56} height={56} decoding="async" />
          </div>
          <div className="min-w-0">
            <div className="font-heading font-bold text-gold-accent text-sm md:text-lg tracking-wide whitespace-nowrap">JOHANNES CHRIST</div>
            <p className={`text-[10px] md:text-xs leading-tight ${showSolidHeader ? 'text-muted-foreground' : 'text-foreground/80'}`}>
              <span className="whitespace-nowrap">{t.nav.subtitle1}</span><br className="md:hidden" /><span className="hidden md:inline"> </span><span className="whitespace-nowrap">{t.nav.subtitle2}</span>
            </p>
          </div>
        </Link>
        <div className="hidden md:flex items-center ml-auto pl-8 lg:pl-10">
          <div className="flex items-center flex-wrap justify-end gap-5 lg:gap-8 xl:gap-10">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <Link key={link.to} to={getLocalizedPath(link.to)} onClick={scrollToTop} className={`relative py-1 text-sm transition-colors duration-300 font-medium whitespace-nowrap ${active ? 'text-gold-accent' : showSolidHeader ? 'text-muted-foreground hover:text-foreground' : 'text-foreground/80 hover:text-foreground'}`}>
                  {link.label}
                  {active && <motion.div layoutId="nav-underline" className="absolute left-0 bottom-0 w-full h-[2px] bg-gold-accent rounded-full" initial={false} transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
                </Link>
              );
            })}
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              {showLoginButton && (
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 320, damping: 22 }}>
                  <Button
                    asChild
                    variant="gold"
                    size="sm"
                    className="group relative ml-1 flex h-9 items-center gap-2 overflow-hidden rounded-full px-5 font-semibold tracking-wide text-primary shadow-md shadow-gold-accent/25 transition-shadow duration-300 hover:shadow-xl hover:shadow-gold-accent/40"
                  >
                    <a href={getCompanionUrl(language)} aria-label="Kind Minds Login" className="flex items-center gap-2">
                      <span className="absolute inset-0 bg-gradient-to-r from-gold-accent/20 via-white/30 to-gold-accent/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
                      <span className="relative z-10 flex items-center gap-2">
                        <LogIn className="h-4 w-4" />
                        <span className="text-xs uppercase">Login</span>
                      </span>
                    </a>
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <Button variant="ghost" size="icon" type="button" onClick={() => setIsOpen(!isOpen)} aria-label={t.ui.menuOpen} aria-expanded={isOpen} className={showSolidHeader ? 'text-foreground' : 'text-foreground/80'}><Menu className="h-6 w-6" /></Button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="md:hidden overflow-hidden bg-glass backdrop-blur-xl border-t border-glass">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {showLoginButton && (
                <motion.div whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.99 }} transition={{ type: "spring", stiffness: 320, damping: 20 }}>
                  <Button asChild variant="gold" className="w-full justify-center shadow-md shadow-gold-accent/20 transition-shadow duration-300 hover:shadow-lg hover:shadow-gold-accent/30">
                    <a href={getCompanionUrl(language)} aria-label="Kind Minds Login" className="flex items-center gap-2">
                      <LogIn className="h-4 w-4" />
                      Login
                    </a>
                  </Button>
                </motion.div>
              )}
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
