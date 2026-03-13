const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { Resend } = require("resend");

const REGION = "europe-west1";
const DEFAULT_CONTACT_EMAIL = "contact@johanneschrist.com";
const MAX_LENGTHS = {
  name: 120,
  email: 160,
  phone: 40,
  message: 5000,
  subject: 120,
  sourcePage: 160,
};

const RESPONSE_MESSAGES = {
  invalidPayload: "invalid-payload",
  methodNotAllowed: "method-not-allowed",
  missingConfig: "missing-config",
  emailSendFailed: "email-send-failed",
};

function normalizeString(value, maxLength) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function getFieldError(payload) {
  const language = ["de", "en", "fr"].includes(payload.language) ? payload.language : "de";
  const name = normalizeString(payload.name, MAX_LENGTHS.name);
  const email = normalizeString(payload.email, MAX_LENGTHS.email);
  const phone = normalizeString(payload.phone, MAX_LENGTHS.phone);
  const message = normalizeString(payload.message, MAX_LENGTHS.message);
  const subject = normalizeString(payload.subject, MAX_LENGTHS.subject);
  const sourcePage = normalizeString(payload.sourcePage, MAX_LENGTHS.sourcePage);
  const website = normalizeString(payload.website, 255);

  if (!name || name.length < 2) {
    return { code: RESPONSE_MESSAGES.invalidPayload, field: "name" };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { code: RESPONSE_MESSAGES.invalidPayload, field: "email" };
  }

  if (!message || message.length < 10) {
    return { code: RESPONSE_MESSAGES.invalidPayload, field: "message" };
  }

  if (website) {
    return { code: RESPONSE_MESSAGES.invalidPayload, field: "website" };
  }

  return {
    payload: {
      language,
      name,
      email,
      phone,
      message,
      subject,
      sourcePage,
    },
  };
}

function buildSubject(payload) {
  const subject = payload.subject ? ` | ${payload.subject}` : "";
  return `Website-Anfrage (${payload.language.toUpperCase()})${subject}`;
}

function buildTextBody(payload) {
  return [
    "Neue Anfrage ueber das Kontaktformular",
    "",
    `Sprache: ${payload.language}`,
    `Seite: ${payload.sourcePage || "unbekannt"}`,
    `Betreff: ${payload.subject || "nicht angegeben"}`,
    "",
    `Name: ${payload.name}`,
    `E-Mail: ${payload.email}`,
    `Telefon: ${payload.phone || "nicht angegeben"}`,
    "",
    "Nachricht:",
    payload.message,
  ].join("\n");
}

function buildHtmlBody(payload) {
  const escapeHtml = (value) =>
    value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");

  const safeMessage = escapeHtml(payload.message).replaceAll("\n", "<br />");

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #132f3b;">
      <h2 style="margin-bottom: 16px;">Neue Anfrage ueber das Kontaktformular</h2>
      <p><strong>Sprache:</strong> ${escapeHtml(payload.language)}</p>
      <p><strong>Seite:</strong> ${escapeHtml(payload.sourcePage || "unbekannt")}</p>
      <p><strong>Betreff:</strong> ${escapeHtml(payload.subject || "nicht angegeben")}</p>
      <hr style="margin: 20px 0; border: none; border-top: 1px solid #d8dfdf;" />
      <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>E-Mail:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Telefon:</strong> ${escapeHtml(payload.phone || "nicht angegeben")}</p>
      <hr style="margin: 20px 0; border: none; border-top: 1px solid #d8dfdf;" />
      <p><strong>Nachricht:</strong></p>
      <p>${safeMessage}</p>
    </div>
  `;
}

exports.contact = onRequest(
  {
    region: REGION,
    cors: true,
    secrets: ["RESEND_API_KEY"],
  },
  async (request, response) => {
    if (request.method === "OPTIONS") {
      response.status(204).send("");
      return;
    }

    if (request.method !== "POST") {
      response.status(405).json({ ok: false, code: RESPONSE_MESSAGES.methodNotAllowed });
      return;
    }

    const checked = getFieldError(request.body ?? {});
    if (!checked.payload) {
      response.status(400).json({ ok: false, code: checked.code, field: checked.field });
      return;
    }

    const apiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL_TO || DEFAULT_CONTACT_EMAIL;
    const fromEmail = process.env.CONTACT_EMAIL_FROM || DEFAULT_CONTACT_EMAIL;

    if (!apiKey) {
      logger.error("Missing RESEND_API_KEY secret.");
      response.status(503).json({ ok: false, code: RESPONSE_MESSAGES.missingConfig });
      return;
    }

    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: `Website Kontakt <${fromEmail}>`,
        to: [contactEmail],
        replyTo: checked.payload.email,
        subject: buildSubject(checked.payload),
        text: buildTextBody(checked.payload),
        html: buildHtmlBody(checked.payload),
      });

      response.status(200).json({ ok: true });
    } catch (error) {
      logger.error("Failed to send contact form email.", error);
      response.status(500).json({ ok: false, code: RESPONSE_MESSAGES.emailSendFailed });
    }
  },
);
