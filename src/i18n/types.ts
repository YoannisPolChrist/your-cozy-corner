export type Language = 'de' | 'en' | 'fr';

export interface Translations {
  // Navigation
  nav: {
    gestalttherapie: string;
    approach: string;
    angebot: string;
    ueberMich: string;
    kontakt: string;
    subtitle1: string;
    subtitle2: string;
  };

  // Hero
  hero: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    cta: string;
  };

  // Meet Section
  meet: {
    title: string;
    description: string;
  };

  // Pain Points
  painPoints: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };

  // Services Section
  services: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
    }>;
    cta: string;
  };

  // Gestalt Section on Index
  gestaltSection: {
    label: string;
    title: string;
    titleHighlight: string;
    description: string;
    link: string;
    quote: string;
  };

  // My Work Section on Index
  myWorkSection: {
    title: string;
    description: string;
    link: string;
    quote: string;
  };

  // My Work Page
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
        diagnostik: {
          title: string;
          subline: string;
          description: string;
        };
        gestalt: {
          title: string;
          subline: string;
          description: string;
        };
        coaching: {
          title: string;
          subline: string;
          description: string;
        };
      };
    };
    diagnostics: {
      label: string;
      title: string;
      intro: string;
      items: Array<{
        title: string;
        description: string;
      }>;
    };
    coaching: {
      label: string;
      title: string;
      intro: string;
      items: Array<{
        title: string;
        description: string;
      }>;
    };
    cta?: {
      title: string;
      description: string;
      button: string;
    };
  };

  // About Preview
  aboutPreview: {
    label: string;
    title: string;
    whyTitle: string;
    whyDescription1: string;
    whyDescription2: string;
    link: string;
  };

  // Focus Areas / Schwerpunkte Section
  focusAreas: {
    title: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };

  // Personal Training Preview on Index
  personalTrainingPreview: {
    label: string;
    title: string;
    description: string;
    link: string;
  };

  // CTA Section
  cta: {
    title: string;
    description: string;
    button: string;
    buttonAlt: string;
  };

  // Gestalttherapie Page
  gestalttherapie: {
    gestaltIntro?: {
      title: string;
      description: string;
      essence?: Array<{
        title: string;
        description: string;
      }>;
      additionalInfo?: string;
    };
    scrollTelling: {
      title: string;
      intro: string;
      pillars: Array<{
        title: string;
        subtitle: string;
        description: string;
      }>;
      summary: string;
    };
    offeneGestalt: {
      title: string;
      description: string;
      tagline: string;
    };
    kontaktunterbrechungen: {
      title: string;
      description: string;
      tagline: string;
    };
    geschlosseneGestalt: {
      title: string;
      description: string;
      tagline: string;
    };
    kontaktzyklus: {
      title: string;
      intro: string;
      phases: Array<{
        title: string;
        subtitle: string;
        description: string;
      }>;
      summary: string;
    };
    ressourcen: {
      title: string;
      intro: string;
      items: Array<{
        title: string;
        description: string;
      }>;
    };
    cta: {
      title: string;
      description: string;
      button: string;
    };
  };

  // Angebot Page
  angebot: {
    title: string;
    process: {
      title: string;
      description: string;
    };
    services: Array<{
      title: string;
      subline: string;
      description: string;
    }>;
    checkup: {
      label: string;
      title: string;
      intro?: string;
      features: Array<{
        title: string;
        description: string;
      }>;
      diagnosticIntegration: string;
    };
    konditionen: {
      title: string;
      einzelbegleitung: {
        label: string;
        price: string;
        priceLabel: string;
        title: string;
        description: string;
        cta: string;
      };
      intensiv: {
        label: string;
        price: string;
        priceLabel: string;
        title: string;
        description: string;
        discount?: string;
        discountPrice?: string;
        cta: string;
      };
      personalTraining?: {
        label: string;
        price: string;
        priceLabel: string;
        title: string;
        description: string;
        cta: string;
      };
    };
    formate: {
      title: string;
      online: {
        title: string;
        description: string;
      };
      praesenz: {
        title: string;
        description: string;
      };
    };
    faq: {
      title: string;
      items: Array<{
        question: string;
        answer: string;
      }>;
    };
    cta: {
      title: string;
      description: string;
      button: string;
    };
  };

  // Über mich Page
  ueberMich: {
    hero: {
      label: string;
      title: string;
      description1: string;
      description2: string;
    };
    qualifikationen: {
      title: string;
      akademisch: {
        title: string;
        items: string[];
      };
      therapeutisch: {
        title: string;
        items: string[];
      };
      coaching: {
        title: string;
        items: string[];
      };
    };
    arbeitsweise: {
      label: string;
      title: string;
      description1: string;
      description2: string;
      quote: string;
      icons: {
        koerper: string;
        psyche: string;
        resonanz: string;
      };
    };
    persoenlich: {
      label: string;
      title: string;
      description1: string;
      description2: string;
    };
    training?: {
      label: string;
      title: string;
      description1: string;
      description2: string;
      description3?: string;
    };
    cta: {
      title: string;
      description: string;
      button: string;
    };
  };

  // Kontakt Page
  kontakt: {
    hero: {
      title: string;
      subtitle: string;
    };
    form: {
      title: string;
      name: string;
      email: string;
      phone: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      successTitle: string;
      successMessage: string;
    };
    info: {
      title: string;
      standort: string;
      telefon: string;
      erreichbarkeit: string;
      erreichbarkeitZeiten: string;
      erreichbarkeitTermine: string;
    };
    erstgespraech: {
      title: string;
      description: string;
    };
    online: {
      title: string;
      description: string;
    };
  };

  // Footer
  footer: {
    kontakt: string;
    rechtliches: string;
    datenschutz: string;
    impressum: string;
    copyright: string;
  };

  // Common
  common: {
    learnMore: string;
    bookAppointment: string;
    freeConsultation: string;
  };

  // Personal Training Page
  personalTraining: {
    nav: string;
    hero: {
      title: string;
      subtitle: string;
      cta: string;
    };
    approach: {
      label?: string;
      title: string;
      description: string;
    };
    services: Array<{
      title: string;
      subline: string;
      description: string;
    }>;
    qualifications: {
      title: string;
      items: string[];
    };
    location: {
      title: string;
      city: string;
      description: string;
    };
    pricing: {
      title: string;
      single: {
        label: string;
        price: string;
        priceLabel: string;
        title: string;
        description: string;
        cta: string;
      };
      package: {
        label: string;
        price: string;
        priceLabel: string;
        title: string;
        description: string;
        discount?: string;
        discountPrice?: string;
        cta: string;
      };
    };
    cta: {
      title: string;
      description: string;
      button: string;
    };
  };
  legal: {
    impressum: {
      title: string;
      angaben: {
        title: string;
        name: string;
        address: string;
        contact: string;
        email: string;
        phone: string;
        businessId?: string; // SIRET for France
      };
      publication: {
        title: string;
        name: string;
      };
      dispute: {
        title: string;
        content: string;
      };
      disclaimer: {
        title: string;
        content: string;
      };
    };
    datenschutz: {
      title: string;
      intro: {
        title: string;
        content: string;
      };
      rights: {
        title: string;
        content: string;
      };
      hosting: {
        title: string;
        content: string;
      };
      googleFonts: {
        title: string;
        content: string;
      };
      encryption: {
        title: string;
        content: string;
      };
    };
  };
}
