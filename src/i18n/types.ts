export type Language = 'de' | 'en' | 'fr';

export interface Translations {
  // Navigation
  nav: {
    gestalttherapie: string;
    angebot: string;
    ueberMich: string;
    kontakt: string;
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
  
  // About Preview
  aboutPreview: {
    label: string;
    title: string;
    description1: string;
    description2: string;
    link: string;
  };
  
  // CTA Section
  cta: {
    title: string;
    description: string;
    button: string;
  };
  
  // Gestalttherapie Page
  gestalttherapie: {
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
    services: Array<{
      title: string;
      subline: string;
      description: string;
    }>;
    checkup: {
      label: string;
      title: string;
      features: Array<{
        title: string;
        description: string;
      }>;
    };
    konditionen: {
      title: string;
      einzelbegleitung: {
        price: string;
        priceLabel: string;
        title: string;
        description: string;
        cta: string;
      };
      intensiv: {
        price: string;
        priceLabel: string;
        title: string;
        description: string;
        discount?: string;
        discountPrice?: string;
        discountPriceLabel?: string;
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
    arbeitsweise: {
      label: string;
      title: string;
      description1: string;
      description2: string;
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
}
