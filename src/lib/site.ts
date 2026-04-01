import type { Language } from "@/i18n";

export const SITE_DOMAIN = "https://johanneschrist.com";
export const SITE_NAME = "Johannes Christ";
export const SITE_DEFAULT_DESCRIPTION =
  "Ganzheitliche Begleitung in Toulouse: Gestalttherapie, Coaching und Personal Training mit Johannes Christ.";
export const SITE_PROFILE_IMAGE = `${SITE_DOMAIN}/assets/images/e688c494-51b1-4167-a52c-840cab4d93c5.webp`;
export const COMPANION_BASE_PATH = "/Prozessbegleitung";

const ensureLeadingSlash = (path?: string) => {
  if (!path || path.trim().length === 0) {
    return "/login";
  }
  return path.startsWith("/") ? path : `/${path}`;
};

export const getCompanionUrl = (language: Language, pathSuffix?: string) =>
  `${SITE_DOMAIN}${COMPANION_BASE_PATH}/${language}${ensureLeadingSlash(pathSuffix)}`;
