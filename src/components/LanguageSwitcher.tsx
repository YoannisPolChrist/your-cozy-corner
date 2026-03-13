import { useLanguage, Language } from '@/i18n';
import { Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const languages: { code: Language; label: string; fullLabel: string }[] = [
  { code: 'de', label: 'DE', fullLabel: 'Deutsch' },
  { code: 'en', label: 'EN', fullLabel: 'English' },
  { code: 'fr', label: 'FR', fullLabel: 'Français' },
];

export const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => { if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsOpen(false); };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const currentLang = languages.find(l => l.code === language);

  return (
    <>
      <div className="hidden md:flex items-center gap-1 text-sm">
        {languages.map((lang, index) => (
          <span key={lang.code} className="flex items-center">
            <button type="button" onClick={() => setLanguage(lang.code)} className={`px-1.5 py-0.5 rounded transition-colors ${language === lang.code ? 'text-gold-accent font-semibold' : 'text-muted-foreground hover:text-foreground'}`} aria-label={`${t.ui.switchLanguagePrefix} ${lang.fullLabel}`}>{lang.label}</button>
            {index < languages.length - 1 && <span className="text-muted-foreground/50">|</span>}
          </span>
        ))}
      </div>
      <div className="md:hidden relative" ref={dropdownRef}>
        <button type="button" onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-1 px-2 py-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors" aria-label={t.ui.languageMenuLabel}>
          <Globe className="h-4 w-4" /><span className="text-xs font-medium">{currentLang?.label}</span>
        </button>
        {isOpen && (
          <div className="absolute right-0 top-full mt-1 bg-background border border-border rounded-md shadow-lg py-1 min-w-[120px] z-50">
            {languages.map((lang) => (
              <button type="button" key={lang.code} onClick={() => { setLanguage(lang.code); setIsOpen(false); }} className={`w-full text-left px-3 py-2 text-sm transition-colors ${language === lang.code ? 'text-gold-accent bg-gold-accent/10 font-medium' : 'text-foreground hover:bg-muted'}`}>{lang.fullLabel}</button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
