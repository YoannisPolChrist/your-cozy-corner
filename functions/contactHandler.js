const path = require("path");
const { RESPONSE_MESSAGES } = require("./contactConstants");
const { getContactConfig } = require("./contactConfig");
const security = require("./contactSecurity");
const contactRules = require(path.join(__dirname, "shared", "contact-rules.json"));

const MAX_LENGTHS = contactRules.maxLengths;
const MIN_LENGTHS = contactRules.minLengths;
const SUPPORTED_LANGUAGES = contactRules.languages;
const EMAIL_REGEX = new RegExp(contactRules.patterns.email);
const PHONE_REGEX = new RegExp(contactRules.patterns.phone);

function normalizeString(value, maxLength) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function getFieldError(payload) {
  const language = SUPPORTED_LANGUAGES.includes(payload.language) ? payload.language : "de";
  const name = normalizeString(payload.name, MAX_LENGTHS.name);
  const email = normalizeString(payload.email, MAX_LENGTHS.email);
  const phone = normalizeString(payload.phone, MAX_LENGTHS.phone);
  const message = normalizeString(payload.message, MAX_LENGTHS.message);
  const subject = normalizeString(payload.subject, MAX_LENGTHS.subject);
  const sourcePage = normalizeString(payload.sourcePage, MAX_LENGTHS.sourcePage);
  const website = normalizeString(payload.website, 255);

  if (!name || name.length < MIN_LENGTHS.name) {
    return { code: RESPONSE_MESSAGES.invalidPayload, field: "name" };
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    return { code: RESPONSE_MESSAGES.invalidPayload, field: "email" };
  }

  if (!message || message.length < MIN_LENGTHS.message) {
    return { code: RESPONSE_MESSAGES.invalidPayload, field: "message" };
  }

  if (phone && !PHONE_REGEX.test(phone)) {
    return { code: RESPONSE_MESSAGES.invalidPayload, field: "phone" };
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

function createContactHandler({
  getConfig = getContactConfig,
  resendFactory,
  logger = console,
  securityUtils = security,
} = {}) {
  const rateLimiter = securityUtils.createRateLimiter();

  return async function handleContactRequest(request, response) {
    const origin = request.get?.("origin") || request.headers?.origin || "";
    const config = getConfig();

    const corsResult = securityUtils.validateOrigin(origin, config.allowedOrigins);
    if (!corsResult.ok) {
      logger.warn?.("Blocked contact request due to origin", { origin });
      response.status(403).json({ ok: false, code: RESPONSE_MESSAGES.forbiddenOrigin });
      return;
    }

    securityUtils.applyCorsHeaders(response, origin);

    if (request.method === "OPTIONS") {
      response.status(204).send("");
      return;
    }

    if (request.method !== "POST") {
      logger.warn?.("Blocked contact request due to method", { method: request.method });
      response.status(405).json({ ok: false, code: RESPONSE_MESSAGES.methodNotAllowed });
      return;
    }

    const clientKey = securityUtils.getClientKey(request);
    const rateCheck = rateLimiter.check(clientKey, config.rateLimit);
    if (!rateCheck.ok) {
      logger.warn?.("Rate limit exceeded for contact request", { clientKey });
      if (typeof rateCheck.retryAfterMs === "number") {
        response.set("Retry-After", Math.ceil(rateCheck.retryAfterMs / 1000).toString());
      }
      response.status(429).json({ ok: false, code: RESPONSE_MESSAGES.tooManyRequests });
      return;
    }

    const payload = request.body ?? {};
    const spamResult = securityUtils.checkSpam(payload, request.headers, config);
    if (!spamResult.ok) {
      logger.warn?.("Blocked contact request due to spam detection", { clientKey });
      response.status(400).json({ ok: false, code: spamResult.code, field: spamResult.field });
      return;
    }

    const checked = getFieldError(payload);
    if (!checked.payload) {
      logger.warn?.("Blocked contact request due to invalid payload", { clientKey, field: checked.field });
      response.status(400).json({ ok: false, code: checked.code, field: checked.field });
      return;
    }

    if (!config.resendApiKey || config.resendApiKey.startsWith("MISSING_")) {
      logger.error("Missing RESEND_API_KEY secret.");
      response.status(503).json({ ok: false, code: RESPONSE_MESSAGES.missingConfig });
      return;
    }

    try {
      const resend = resendFactory(config.resendApiKey);
      await resend.emails.send({
        from: `Website Kontakt <${config.fromEmail}>`,
        to: [config.contactEmail],
        replyTo: checked.payload.email,
        subject: buildSubject(checked.payload),
        text: buildTextBody(checked.payload),
        html: buildHtmlBody(checked.payload),
      });

      logger.info("Contact message delivered", {
        language: checked.payload.language,
        sourcePage: checked.payload.sourcePage,
        clientKey,
      });

      response.status(200).json({ ok: true });
    } catch (error) {
      logger.error("Failed to send contact form email.", error);
      response.status(500).json({ ok: false, code: RESPONSE_MESSAGES.emailSendFailed });
    }
  };
}

module.exports = {
  MAX_LENGTHS,
  buildHtmlBody,
  buildSubject,
  buildTextBody,
  createContactHandler,
  getFieldError,
  normalizeString,
};
