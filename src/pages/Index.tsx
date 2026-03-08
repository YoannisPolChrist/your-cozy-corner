import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { AnimatedSection, StaggerContainer, AnimatedItem } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Brain, Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { goldFrameVariants, imageVariants, viewportSettings } from "@/lib/animations";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/i18n";
import { SEO } from "@/components/SEO";
import { AnimatedDivider } from "@/components/AnimatedDivider";



const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// Parallax component for About section
const AboutParallaxImage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);
  return <motion.div ref={ref} initial="hidden" whileInView="visible" viewport={viewportSettings} className="relative order-2 md:order-1">
    {/* Gold Frame - Slides out from behind with delay */}
    <motion.div variants={goldFrameVariants} className="absolute bottom-[-10px] right-[-10px] md:bottom-[-20px] md:right-[-20px] w-full h-full bg-accent rounded-2xl" />
    {/* Main image with parallax */}
    <div className="relative z-10 overflow-hidden rounded-2xl shadow-xl aspect-[4/5]">
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="w-full h-full"
      >
        <motion.img variants={imageVariants} alt="Johannes Christ - Gestalttherapeut und Coach" className="w-full h-full object-cover object-center" style={{
          y,
          scale
        }} width={528} height={683} loading="lazy" decoding="async" src="/assets/images/e688c494-51b1-4167-a52c-840cab4d93c5.webp" />
      </motion.div>
    </div>
  </motion.div>;
};

const Index = () => {
  const {
    t,
    getLocalizedPath,
    language
  } = useLanguage();
  const serviceIcons = [Heart, Brain, Dumbbell];

  // Dynamic Schema Generation
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://johanneschrist-website.web.app/#johannes",
        "name": "Johannes Christ",
        "jobTitle": language === 'fr' ? "Gestalt-thérapeute & Coach" : "Gestalttherapeut & Coach",
        "image": "https://johanneschrist-website.web.app/assets/johannes-portrait.webp",
        "url": "https://johanneschrist-website.web.app",
        "sameAs": [
          "https://www.linkedin.com/in/johannes-christ-57b59a203/"
        ]
      },
      {
        "@type": language === 'fr' ? "MedicalBusiness" : "LocalBusiness", // Stronger signal for therapy in FR
        "name": "Johannes Christ - Gestalttherapie",
        "image": "https://johanneschrist-website.web.app/assets/logo.webp",
        "@id": "https://johanneschrist-website.web.app",
        "url": "https://johanneschrist-website.web.app",
        "telephone": "",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Toulouse",
          "addressCountry": "FR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 43.6047,
          "longitude": 1.4442
        },
        "priceRange": "€€",
        "medicalSpecialty": language === 'fr' ? ["Psychotherapy", "PhysicalTherapy"] : undefined,
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
          ],
          "opens": "09:00",
          "closes": "18:00"
        },
        "makesOffer": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": language === 'fr' ? "Thérapie Gestalt" : "Gestalttherapie"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Coaching"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": language === 'fr' ? "Thérapie en ligne" : "Online Therapy"
            }
          }
        ]
      }
    ]
  };
  return <div className="min-h-screen bg-background overflow-x-clip">
    <SEO
      title={t.seo?.index.title}
      description={t.seo?.index.description}
      keywords={t.seo?.index.keywords}
      schema={schema}
      dateModified="2026-02-25"
      breadcrumbs={[
        { name: "Home", url: `/ ${language} ` },
      ]}
    />
    {/* Skip-to-content link for keyboard accessibility */}
    <a href="#main-content" className="skip-to-content">
      {language === 'de' ? 'Zum Hauptinhalt springen' : language === 'fr' ? 'Aller au contenu principal' : 'Skip to main content'}
    </a>
    <Navigation />
    <main id="main-content" className="h-[100dvh] w-full overflow-hidden">
      <div className="h-full w-full">
        <Hero />
      </div>
    </main>
  </div>;
};
export default Index;