import type { Language, Translations } from "@/i18n";

export const contactSubjectIds = ["individual-guidance"] as const;

export type ContactSubjectId = (typeof contactSubjectIds)[number];

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
  language: Language;
  sourcePage: string;
  subject?: string;
  website?: string;
}

export interface ContactApiError extends Error {
  code?: string;
  field?: string;
}

const CONTACT_ENDPOINT = "/api/contact";

export function isContactSubjectId(value: string | null): value is ContactSubjectId {
  return typeof value === "string" && contactSubjectIds.includes(value as ContactSubjectId);
}

export function getLocalizedSubjectLabel(t: Translations, subjectId: ContactSubjectId) {
  return t.kontakt.form.subjects[subjectId];
}

export function buildContactPrefill(t: Translations, subjectId: ContactSubjectId) {
  return `${t.kontakt.form.subjectPrefillPrefix} ${getLocalizedSubjectLabel(t, subjectId)}\n\n`;
}

export async function submitContactForm(payload: ContactPayload) {
  const response = await fetch(CONTACT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    return;
  }

  let errorBody: { code?: string; field?: string } | null = null;

  try {
    errorBody = (await response.json()) as { code?: string; field?: string };
  } catch {
    errorBody = null;
  }

  const error = new Error(errorBody?.code || "unknown-error") as ContactApiError;
  error.code = errorBody?.code;
  error.field = errorBody?.field;
  throw error;
}
