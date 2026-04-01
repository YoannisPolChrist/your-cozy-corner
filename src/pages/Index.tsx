import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { useLanguage } from "@/i18n";
import { SEO } from "@/components/SEO";
import { SITE_DEFAULT_DESCRIPTION, SITE_DOMAIN, SITE_NAME, SITE_PROFILE_IMAGE } from "@/lib/site";

const Index = () => {
  const { t, language } = useLanguage();
  const homeLabel = language === "de" ? "Startseite" : language === "fr" ? "Accueil" : "Home";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_DOMAIN}/#johannes`,
        "name": SITE_NAME,
        "jobTitle": language === "fr" ? "Gestalt-therapeute & Coach" : "Gestalttherapeut & Coach",
        "image": SITE_PROFILE_IMAGE,
        "url": SITE_DOMAIN,
        "description": SITE_DEFAULT_DESCRIPTION,
        "email": "contact@johanneschrist.com",
        "sameAs": ["https://www.linkedin.com/in/johannes-christ-57b59a203/"],
      },
      {
        "@type": language === "fr" ? "MedicalBusiness" : "LocalBusiness",
        "@id": SITE_DOMAIN,
        "name": `${SITE_NAME} - Gestalttherapie`,
        "image": SITE_PROFILE_IMAGE,
        "url": SITE_DOMAIN,
        "description": SITE_DEFAULT_DESCRIPTION,
        "email": "contact@johanneschrist.com",
        "telephone": "",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Toulouse",
          "addressCountry": "FR",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 43.6047,
          "longitude": 1.4442,
        },
        "priceRange": "EUR",
        "medicalSpecialty": language === "fr" ? ["Psychotherapy", "PhysicalTherapy"] : undefined,
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00",
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer support",
          "email": "contact@johanneschrist.com",
          "availableLanguage": ["de", "en", "fr"],
        },
        "makesOffer": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": language === "fr" ? "Gestalt-therapie" : "Gestalttherapie" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Coaching" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": language === "fr" ? "Therapie en ligne" : "Online Therapy" } },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background overflow-x-clip">
      <SEO
        title={t.seo?.index.title}
        description={t.seo?.index.description}
        keywords={t.seo?.index.keywords}
        schema={schema}
        dateModified="2026-03-28"
        breadcrumbs={[{ name: homeLabel, url: `/${language}` }]}
      />
      <a href="#main-content" className="skip-to-content">
        {language === "de" ? "Zum Hauptinhalt springen" : language === "fr" ? "Aller au contenu principal" : "Skip to main content"}
      </a>
      <Navigation />
      <main id="main-content" className="min-h-[100svh] md:h-[100dvh] w-full overflow-hidden">
        <div className="h-full w-full">
          <Hero />
        </div>
      </main>
    </div>
  );
};

export default Index;
