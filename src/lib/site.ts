import type { Language } from "@/i18n";

export const SITE_DOMAIN = "https://johanneschrist.com";
export const SITE_PROFILE_IMAGE = `${SITE_DOMAIN}/assets/images/e688c494-51b1-4167-a52c-840cab4d93c5.webp`;

export const getCompanionUrl = (language: Language) =>
  `${SITE_DOMAIN}/Prozessbegleitung/${language}`;
