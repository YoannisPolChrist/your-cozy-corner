import { z } from "zod";
import contactRules from "../../functions/shared/contact-rules.json";

const languages = contactRules.languages as [string, ...string[]];
const max = contactRules.maxLengths;
const min = contactRules.minLengths;
const emailRegex = new RegExp(contactRules.patterns.email);
const phoneRegex = new RegExp(contactRules.patterns.phone);

export const inlineErrorKeys = {
  nameRequired: "nameRequired",
  nameTooLong: "nameTooLong",
  emailRequired: "emailRequired",
  emailInvalid: "emailInvalid",
  emailTooLong: "emailTooLong",
  phoneInvalid: "phoneInvalid",
  phoneTooLong: "phoneTooLong",
  messageTooShort: "messageTooShort",
  messageTooLong: "messageTooLong",
  honeypot: "honeypot",
} as const;

const emptyToUndefined = z
  .string()
  .trim()
  .transform((value) => (value.length === 0 ? undefined : value));

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(min.name, { message: inlineErrorKeys.nameRequired })
    .max(max.name, { message: inlineErrorKeys.nameTooLong }),
  email: z
    .string()
    .trim()
    .min(1, { message: inlineErrorKeys.emailRequired })
    .max(max.email, { message: inlineErrorKeys.emailTooLong })
    .regex(emailRegex, { message: inlineErrorKeys.emailInvalid }),
  phone: emptyToUndefined
    .optional()
    .refine(
      (value) => !value || phoneRegex.test(value),
      () => ({ message: inlineErrorKeys.phoneInvalid }),
    )
    .refine(
      (value) => !value || value.length <= max.phone,
      () => ({ message: inlineErrorKeys.phoneTooLong }),
    ),
  message: z
    .string()
    .trim()
    .min(min.message, { message: inlineErrorKeys.messageTooShort })
    .max(max.message, { message: inlineErrorKeys.messageTooLong }),
  language: z.enum(languages as [typeof languages[number], ...typeof languages[number][]]),
  sourcePage: z.string().trim().max(max.sourcePage).default(""),
  subject: emptyToUndefined.optional(),
  website: z
    .string()
    .trim()
    .max(0, { message: inlineErrorKeys.honeypot })
    .optional()
    .default(""),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
export type ContactField = "name" | "email" | "phone" | "message" | "website";

export const fieldOrder: ContactField[] = ["name", "email", "phone", "message"];

export type ContactValidationErrorMap = Partial<Record<ContactField, string>>;

export function validateContactForm(
  input: Partial<ContactFormValues>,
): { success: true; data: ContactFormValues } | { success: false; errors: ContactValidationErrorMap } {
  const result = contactSchema.safeParse(input);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors: ContactValidationErrorMap = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0];
    if (typeof field === "string" && !errors[field as ContactField]) {
      errors[field as ContactField] = issue.message;
    }
  }

  return { success: false, errors };
}

export function sanitizeContactPayload(input: Partial<ContactFormValues>): ContactFormValues {
  const result = contactSchema.parse(input);
  return result;
}
