import { Helmet } from "react-helmet-async";
import { useLanguage, routeMap, reverseRouteMap } from "@/i18n";
import { useLocation } from "react-router-dom";
import { Language } from "@/i18n/types";

interface SEOProps { title?: string; description?: string; keywords?: string; image?: string; schema?: object; faqs?: { question: string; answer: string }[]; breadcrumbs?: { name: string; url: string }[]; dateModified?: string; }

export const SEO = ({ title, description, keywords, image, schema, faqs, breadcrumbs, dateModified }: SEOProps) => {
  const { language } = useLanguage();
  const location = useLocation();
  const domain = "https://johanneschrist-website.web.app";
  const baseTitle = "Johannes Christ - Gestalttherapie, Coaching & Personal Training";
  const defaultImage = `${domain}/assets/johannes-portrait.webp`;
  const shareImage = image ? (image.startsWith('http') ? image : `${domain}${image}`) : defaultImage;
  const fullTitle = title ? `${title} | Johannes Christ` : baseTitle;

  const getBaseRoute = (pathname: string): string => {
    const withoutLang = pathname.replace(/^\/(de|en|fr)/, '') || '/';
    const routePart = withoutLang.startsWith('/') ? withoutLang.slice(1) : withoutLang;
    if (!routePart) return '';
    return reverseRouteMap[routePart.split('#')[0]] || routePart.split('#')[0];
  };

  const baseRoute = getBaseRoute(location.pathname);
  const getUrlForLang = (lang: Language) => baseRoute ? `${domain}/${lang}/${routeMap[baseRoute]?.[lang] || baseRoute}` : `${domain}/${lang}`;
  const canonicalUrl = getUrlForLang(language);

  const allSchemas: object[] = [];
  if (schema) allSchemas.push(schema);
  if (faqs && faqs.length > 0) allSchemas.push({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.question, "acceptedAnswer": { "@type": "Answer", "text": f.answer } })) });
  if (breadcrumbs && breadcrumbs.length > 0) allSchemas.push({ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": breadcrumbs.map((c, i) => ({ "@type": "ListItem", "position": i + 1, "name": c.name, "item": c.url.startsWith("http") ? c.url : `${domain}${c.url}` })) });

  return (
    <Helmet>
      <html lang={language} /><title>{fullTitle}</title><meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {dateModified && <meta name="article:modified_time" content={dateModified} />}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hreflang="de" href={getUrlForLang('de')} />
      <link rel="alternate" hreflang="en" href={getUrlForLang('en')} />
      <link rel="alternate" hreflang="fr" href={getUrlForLang('fr')} />
      <meta property="og:type" content="website" /><meta property="og:title" content={fullTitle} /><meta property="og:description" content={description} /><meta property="og:url" content={canonicalUrl} /><meta property="og:image" content={shareImage} />
      <meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content={fullTitle} /><meta name="twitter:description" content={description} /><meta name="twitter:image" content={shareImage} />
      {allSchemas.map((s, i) => <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>)}
    </Helmet>
  );
};
