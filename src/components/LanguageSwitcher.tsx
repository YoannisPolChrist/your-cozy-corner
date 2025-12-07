import { useLanguage, Language } from '@/i18n';

const languages: { code: Language; label: string }[] = [
  { code: 'de', label: 'DE' },
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
];

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 text-sm">
      {languages.map((lang, index) => (
        <span key={lang.code} className="flex items-center">
          <button
            onClick={() => setLanguage(lang.code)}
            className={`px-1.5 py-0.5 rounded transition-colors ${
              language === lang.code
                ? 'text-gold-accent font-semibold'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            aria-label={`Switch to ${lang.label}`}
          >
            {lang.label}
          </button>
          {index < languages.length - 1 && (
            <span className="text-muted-foreground/50">|</span>
          )}
        </span>
      ))}
    </div>
  );
};
