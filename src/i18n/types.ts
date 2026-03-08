export type Language = 'de' | 'en' | 'fr';

export interface Translations {
  nav: {
    gestalttherapie: string;
    personalTraining: string;
    approach: string;
    angebot: string;
    ueberMich: string;
    kontakt: string;
    subtitle1: string;
    subtitle2: string;
  };
  seo?: {
    index: {
      title: string;
      description: string;
      keywords: string;
    };
  };
  hero: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    cta: string;
  };
  meet: {
    title: string;
    description: string;
  };
  painPoints: {
    title: string;
    subtitle: string;
    items: Array<{ title: string; description: string }>;
  };
  services: {
    title: string;
    subtitle: string;
    items: Array<{ title: string; description: string }>;
    cta: string;
  };
  gestaltSection: {
    label: string;
    title: string;
    titleHighlight: string;
    description: string;
    link: string;
    quote: string;
  };
  myWorkSection: {
    title: string;
    description: string;
    link: string;
    quote: string;
  };
  myWork: {
    hero: {
      title: string;
      subtitle: string;
      iconDescriptions?: {
        diagnostik: string;
        gestalt: string;
        coaching: string;
        personalTraining: string;
      };
      iconCards?: {
        diagnostik: { title: string; subline: string; description: string };
        gestalt: { title: string; subline: string; description: string };
        coaching: { title: string; subline: string; description: string };
      };
    };
    diagnostics: {
      label: string;
      title: string;
      intro: string;
      items: Array<{ title: string; description: string }>;
    };
    coaching: {
      label: string;
      title: string;
      intro: string;
      items: Array<{ title: string; description: string }>;
    };
    cta?: { title: string; description: string; button: string };
  };
  aboutPreview: {
    label: string;
    title: string;
    whyTitle: string;
    whyDescription1: string;
    whyDescription2: string;
    link: string;
  };
  landingAbout: {
    title: string;
    description: string;
    cardText: string;
    button: string;
  };
  focusAreas: {
    title: string;
    items: Array<{ title: string; description: string }>;
  };
  personalTrainingPreview: {
    label: string;
    title: string;
    description: string;
    link: string;
  };
  cta: {
    title: string;
    description: string;
    button: string;
    buttonAlt: string;
  };
  gestalttherapie: {
    hero: { subtitle: string; cta: string };
    gestaltIntro?: {
      label?: string;
      title: string;
      description: string;
      essence?: Array<{ title: string; description: string }>;
      additionalInfo?: string;
    };
    approach?: { label: string; title: string; description: string };
    qualifications?: { title: string; items: string[] };
    scrollTelling: {
      title: string;
      intro: string;
      pillars: Array<{ title: string; subtitle: string; description: string }>;
      summary: string;
    };
    offeneGestalt: { title: string; description: string; tagline: string };
    kontaktunterbrechungen: { title: string; description: string; tagline: string };
    geschlosseneGestalt: { title: string; description: string; tagline: string };
    kontaktzyklus: {
      title: string;
      intro: string;
      phases: Array<{ title: string; subtitle: string; description: string }>;
      summary: string;
    };
    ressourcen: {
      title: string;
      intro: string;
      items: Array<{ title: string; description: string }>;
    };
    painPoints: {
      label: string;
      title: string;
      items: Array<{ title: string; description: string }>;
    };
    philosophy: {
      label: string;
      badges: string[];
      title: string;
      p1: string;
      p2: string;
      quote: string;
    };
    cta: { title: string; description: string; button: string };
    location?: { title: string; city: string; description: string };
  };
  angebot: {
    title: string;
    process: { title: string; description: string };
    services: Array<{ title: string; subline: string; description: string }>;
    checkup: {
      label: string;
      title: string;
      intro?: string;
      features: Array<{ title: string; description: string }>;
      diagnosticIntegration: string;
    };
    konditionen: {
      title: string;
      einzelbegleitung: {
        label: string; price: string; priceLabel: string;
        title: string; description: string; cta: string;
      };
      intensiv: {
        label: string; price: string; priceLabel: string;
        title: string; description: string; discount?: string; discountPrice?: string; cta: string;
      };
      personalTraining?: {
        label: string; price: string; priceLabel: string;
        title: string; description: string; cta: string;
      };
    };
    formate: {
      title: string;
      online: { title: string; description: string };
      praesenz: { title: string; description: string };
      map: {
        title: string;
        therapie: { title: string; description: string };
        training: { title: string; description: string };
      };
    };
    faq: {
      title: string;
      items: Array<{ question: string; answer: string }>;
    };
    cta: { title: string; description: string; button: string };
  };
  ueberMich: {
    hero: {
      label: string; title: string; byline?: string; badges?: string[];
      description1: string; description2: string;
    };
    qualifikationen: {
      title: string;
      akademisch: { title: string; items: string[] };
      therapeutisch: { title: string; items: string[] };
      coaching: { title: string; items: string[] };
    };
    arbeitsweise: {
      label: string; title: string;
      bodyP1?: string; bodyP2Prefix?: string; bodyP2Strong?: string; bodyP2Suffix?: string;
      bodyP3?: string; bodyP3Italic?: string;
      description1: string; description2: string; quote: string;
      icons: { koerper: string; psyche: string; resonanz: string };
    };
    persoenlich: { label: string; title: string; description1: string; description2: string };
    training?: {
      label: string; title: string; description1: string; description2: string; description3?: string;
    };
    cta: { title: string; description: string; button: string };
  };
  shared?: {
    pricingLabel: string; regularPrice: string;
    testimonialsLabel: string; testimonialsTitle: string;
    gestaltTestimonialsSubtitle: string; personalTrainingTestimonialsSubtitle: string;
    moreTestimonialsComingSoon: string; moreReviewsComingSoon: string;
    crossLinkLabel: string;
    crossLinkGestaltTitle: string; crossLinkGestaltDescription: string; crossLinkGestaltButton: string;
    crossLinkTrainingTitle: string; crossLinkTrainingDescription: string; crossLinkTrainingButton: string;
    approachSectionTitle: string;
    servicesSectionLabel: string; servicesSectionTitle: string; servicesSectionSubtitle: string;
    gestaltLocationTitle: string; gestaltPainLabel: string; gestaltPricingTitle: string;
  };
  testimonials?: {
    gestalt: Array<{ text: string; name: string; role: string }>;
    personalTraining: Array<{ text: string; name: string; role: string }>;
  };
  kontakt: {
    hero: { title: string; subtitle: string };
    form: {
      title: string; name: string; email: string; phone: string;
      message: string; messagePlaceholder: string; submit: string;
      successTitle: string; successMessage: string;
    };
    info: {
      title: string; standort: string; telefon: string;
      erreichbarkeit: string; erreichbarkeitZeiten: string; erreichbarkeitTermine: string;
    };
    erstgespraech: { title: string; description: string };
    online: { title: string; description: string };
  };
  footer: {
    kontakt: string; rechtliches: string; datenschutz: string; impressum: string; copyright: string;
  };
  common: { learnMore: string; bookAppointment: string; freeConsultation: string };
  personalTraining: {
    nav: string;
    hero: { title: string; subtitle: string; cta: string };
    approach: { label?: string; title: string; description: string };
    painPoints: {
      label: string; title: string;
      items: Array<{ title: string; description: string }>;
    };
    services: Array<{ title: string; subline: string; description: string }>;
    qualifications: { title: string; items: string[] };
    location: { title: string; city: string; description: string };
    pricing: {
      title: string;
      single: { label: string; price: string; priceLabel: string; title: string; description: string; cta: string };
      package: { label: string; price: string; priceLabel: string; title: string; description: string; discount?: string; discountPrice?: string; cta: string };
    };
    cta: { title: string; description: string; button: string };
  };
  legal: {
    impressum: {
      title: string;
      angaben: { title: string; name: string; address: string; contact: string; email: string; phone: string; businessId?: string };
      publication: { title: string; name: string };
      dispute: { title: string; content: string };
      disclaimer: { title: string; content: string };
    };
    datenschutz: {
      title: string;
      intro: { title: string; content: string };
      rights: { title: string; content: string };
      hosting: { title: string; content: string };
      googleFonts: { title: string; content: string };
      encryption: { title: string; content: string };
    };
  };
}
