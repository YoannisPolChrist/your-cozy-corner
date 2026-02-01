import { Helmet } from "react-helmet-async";
import { useLanguage, routeMap, reverseRouteMap } from "@/i18n";
import { useLocation } from "react-router-dom";
import { Language } from "@/i18n/types";

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
}

export const SEO = ({ title, description, keywords, image, schema }: SEOProps & { schema?: object }) => {
    const { language } = useLanguage();
    const location = useLocation();

    // Domain
    const domain = "https://johanneschrist-website.web.app";

    // Base values if not provided
    const baseTitle = "Johannes Christ - Gestalttherapie, Coaching & Personal Training";
    const defaultImage = `${domain}/assets/johannes-portrait.webp`;
    const shareImage = image ? (image.startsWith('http') ? image : `${domain}${image}`) : defaultImage;

    // Construct title: "Page Title | Johannes Christ" or just default
    const fullTitle = title
        ? `${title} | Johannes Christ`
        : baseTitle;

    // --- Hreflang & Canonical Logic ---
    const getBaseRoute = (pathname: string): string => {
        const withoutLang = pathname.replace(/^\/(de|en|fr)/, '') || '/';
        const routePart = withoutLang.startsWith('/') ? withoutLang.slice(1) : withoutLang;
        if (!routePart) return '';
        // If there's a hash, ignore it for route matching (canonical usually ignores hash)
        const cleanRoutePart = routePart.split('#')[0];
        return reverseRouteMap[cleanRoutePart] || cleanRoutePart;
    };

    const baseRoute = getBaseRoute(location.pathname);

    const getUrlForLang = (lang: Language) => {
        if (baseRoute) {
            const localizedPath = routeMap[baseRoute]?.[lang] || baseRoute;
            return `${domain}/${lang}/${localizedPath}`;
        }
        return `${domain}/${lang}`;
    };

    const canonicalUrl = getUrlForLang(language);

    return (
        <Helmet>
            <html lang={language} />
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}

            {/* Canonical URL */}
            <link rel="canonical" href={canonicalUrl} />

            {/* Hreflang Tags */}
            <link rel="alternate" hreflang="de" href={getUrlForLang('de')} />
            <link rel="alternate" hreflang="en" href={getUrlForLang('en')} />
            <link rel="alternate" hreflang="fr" href={getUrlForLang('fr')} />
            <link rel="alternate" hreflang="x-default" href={getUrlForLang('de')} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={shareImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={shareImage} />

            {/* Structured Data (JSON-LD) */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};
