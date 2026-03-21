import type { Language, Translations } from "@/i18n";
import type { ContactFormValues } from "@/lib/contactSchema";

export const contactSubjectIds = ["individual-guidance"] as const;

export type ContactSubjectId = (typeof contactSubjectIds)[number];

export interface ContactApiError extends Error {
  code?: string;
  field?: string;
}

const CONTACT_ENDPOINT = "/api/contact";
const CONTACT_PROOF_HEADER = "X-Contact-Proof";
const CONTACT_PROOF_TOKEN = import.meta.env.VITE_CONTACT_PROOF_TOKEN;

export function isContactSubjectId(value: string | null): value is ContactSubjectId {
  return typeof value === "string" && contactSubjectIds.includes(value as ContactSubjectId);
}

export function getLocalizedSubjectLabel(t: Translations, subjectId: ContactSubjectId) {
  return t.kontakt.form.subjects[subjectId];
}

export function buildContactPrefill(t: Translations, subjectId: ContactSubjectId) {
  return `${t.kontakt.form.subjectPrefillPrefix} ${getLocalizedSubjectLabel(t, subjectId)}\n\n`;
}

export type ContactPayload = Pick<ContactFormValues, "name" | "email" | "phone" | "message" | "language" | "sourcePage" | "subject" | "website">;

export async function submitContactForm(payload: ContactPayload) {
  const response = await fetch(CONTACT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(CONTACT_PROOF_TOKEN ? { [CONTACT_PROOF_HEADER]: CONTACT_PROOF_TOKEN } : {}),
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
