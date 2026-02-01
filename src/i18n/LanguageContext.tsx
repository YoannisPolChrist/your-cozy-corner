import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Language, Translations } from './types';
import { de } from './de';
import { en } from './en';
import { fr } from './fr';

const translations: Record<Language, Translations> = { de, en, fr };

interface LanguageContextType {
  language: Language;
  t: Translations;
  setLanguage: (lang: Language) => void;
  getLocalizedPath: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'preferred-language';

// Map route names between languages
export const routeMap: Record<string, Record<Language, string>> = {
  gestalttherapie: { de: 'gestalttherapie', en: 'gestalt-therapy', fr: 'gestalt-therapie' },
  ansatz: { de: 'ansatz', en: 'approach', fr: 'approche' },
  angebot: { de: 'angebot', en: 'services', fr: 'services' },
  'ueber-mich': { de: 'ueber-mich', en: 'about-me', fr: 'a-propos' },
  kontakt: { de: 'kontakt', en: 'contact', fr: 'contact' },
  'personal-training': { de: 'personal-training', en: 'personal-training', fr: 'coaching-sportif' },
  impressum: { de: 'impressum', en: 'legal-notice', fr: 'mentions-legales' },
  datenschutz: { de: 'datenschutz', en: 'privacy-policy', fr: 'politique-confidentialite' },
};

// Reverse map for finding the base route
export const reverseRouteMap: Record<string, string> = {};
Object.entries(routeMap).forEach(([baseRoute, langRoutes]) => {
  Object.values(langRoutes).forEach(localizedRoute => {
    reverseRouteMap[localizedRoute] = baseRoute;
  });
});

function detectBrowserLanguage(): Language {
  // Check navigator.languages for priority list support
  if (typeof navigator !== 'undefined' && navigator.languages && navigator.languages.length > 0) {
    for (const lang of navigator.languages) {
      const lower = lang.toLowerCase();
      if (lower.startsWith('de')) return 'de';
      if (lower.startsWith('fr')) return 'fr';
      if (lower.startsWith('en')) return 'en';
    }
  }

  // Fallback to single navigator.language
  if (typeof navigator !== 'undefined' && navigator.language) {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('de')) return 'de';
    if (browserLang.startsWith('fr')) return 'fr';
  }

  return 'en'; // Default to English for all other languages
}

function getLanguageFromPath(pathname: string): Language | null {
  const match = pathname.match(/^\/(de|en|fr)(\/|$)/);
  return match ? (match[1] as Language) : null;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine initial language
  const [language, setLanguageState] = useState<Language>(() => {
    // First check URL
    const urlLang = getLanguageFromPath(location.pathname);
    if (urlLang) return urlLang;

    // Then check localStorage
    const stored = localStorage.getItem(STORAGE_KEY) as Language;
    if (stored && ['de', 'en', 'fr'].includes(stored)) return stored;

    // Finally detect from browser
    return detectBrowserLanguage();
  });

  const t = translations[language];

  // Get the current route without language prefix
  const getBaseRoute = (pathname: string): string => {
    const withoutLang = pathname.replace(/^\/(de|en|fr)/, '') || '/';
    const routePart = withoutLang.slice(1); // Remove leading slash

    if (!routePart) return '';

    // Find the base route key
    return reverseRouteMap[routePart] || routePart;
  };

  // Create localized path
  const getLocalizedPath = (path: string): string => {
    if (path === '/' || path === '') {
      return `/${language}`;
    }

    // Handle hash
    let hash = '';
    let pathWithoutHash = path;
    if (path.includes('#')) {
      const [p, h] = path.split('#');
      pathWithoutHash = p;
      hash = `#${h}`;
    }

    // Remove leading slash and any existing language prefix
    const cleanPath = pathWithoutHash.replace(/^\/(de|en|fr)?\/?/, '');

    // Check if this is a known route that needs translation
    const baseRoute = reverseRouteMap[cleanPath] || cleanPath;
    const localizedRoute = routeMap[baseRoute]?.[language] || cleanPath;

    return `/${language}/${localizedRoute}${hash}`;
  };

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);

    // Navigate to the same page in the new language
    const baseRoute = getBaseRoute(location.pathname);
    const newPath = baseRoute
      ? `/${newLang}/${routeMap[baseRoute]?.[newLang] || baseRoute}`
      : `/${newLang}`;

    navigate(newPath, { replace: true });
  };

  // Handle initial redirect if no language in URL
  useEffect(() => {
    const urlLang = getLanguageFromPath(location.pathname);

    if (!urlLang) {
      // No language prefix, redirect to the proper URL
      const baseRoute = location.pathname.slice(1); // Remove leading slash
      const resolvedBaseRoute = reverseRouteMap[baseRoute] || baseRoute;
      const localizedRoute = resolvedBaseRoute
        ? routeMap[resolvedBaseRoute]?.[language] || resolvedBaseRoute
        : '';

      const newPath = localizedRoute
        ? `/${language}/${localizedRoute}`
        : `/${language}`;

      navigate(newPath, { replace: true });
    } else if (urlLang !== language) {
      // URL has different language, update state
      setLanguageState(urlLang);
      localStorage.setItem(STORAGE_KEY, urlLang);
    }
  }, [location.pathname, language, navigate]);

  // Sync html lang attribute
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, t, setLanguage, getLocalizedPath }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
