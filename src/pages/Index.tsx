import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { AnimatedSection, StaggerContainer, AnimatedItem } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Brain, Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";
import { goldFrameVariants, imageVariants, viewportSettings } from "@/lib/animations";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/i18n";
import { SEO } from "@/components/SEO";
import { AnimatedDivider } from "@/components/AnimatedDivider";

const Index = () => {
  const { t, getLocalizedPath, language } = useLanguage();
  const serviceIcons = [Heart, Brain, Dumbbell];
  const homeLabel = language === 'de' ? 'Startseite' : language === 'fr' ? 'Accueil' : 'Home';
  const profileImage = "https://johanneschrist-website.web.app/assets/images/e688c494-51b1-4167-a52c-840cab4d93c5.webp";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://johanneschrist-website.web.app/#johannes",
        "name": "Johannes Christ",
        "jobTitle": language === 'fr' ? "Gestalt-thérapeute & Coach" : "Gestalttherapeut & Coach",
        "image": profileImage,
        "url": "https://johanneschrist-website.web.app",
        "sameAs": ["https://www.linkedin.com/in/johannes-christ-57b59a203/"]
      },
      {
        "@type": language === 'fr' ? "MedicalBusiness" : "LocalBusiness",
        "name": "Johannes Christ - Gestalttherapie",
        "image": profileImage,
        "@id": "https://johanneschrist-website.web.app",
        "url": "https://johanneschrist-website.web.app",
        "telephone": "",
        "address": { "@type": "PostalAddress", "addressLocality": "Toulouse", "addressCountry": "FR" },
        "geo": { "@type": "GeoCoordinates", "latitude": 43.6047, "longitude": 1.4442 },
        "priceRange": "€€",
        "medicalSpecialty": language === 'fr' ? ["Psychotherapy", "PhysicalTherapy"] : undefined,
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        },
        "makesOffer": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": language === 'fr' ? "Thérapie Gestalt" : "Gestalttherapie" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Coaching" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": language === 'fr' ? "Thérapie en ligne" : "Online Therapy" } }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background overflow-x-clip">
      <SEO
        title={t.seo?.index.title}
        description={t.seo?.index.description}
        keywords={t.seo?.index.keywords}
        schema={schema}
        dateModified="2026-02-25"
        breadcrumbs={[{ name: homeLabel, url: `/${language}` }]}
      />
      <a href="#main-content" className="skip-to-content">
        {language === 'de' ? 'Zum Hauptinhalt springen' : language === 'fr' ? 'Aller au contenu principal' : 'Skip to main content'}
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
