const { DEFAULT_ALLOWED_ORIGINS, DEFAULT_CONTACT_EMAIL, DEFAULT_RATE_LIMIT } = require("./contactConstants");

function parseAllowedOrigins(raw) {
  if (!raw) {
    return DEFAULT_ALLOWED_ORIGINS;
  }

  return raw
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

function getContactConfig(env = process.env) {
  return {
    resendApiKey: env.RESEND_API_KEY || "",
    contactEmail: env.CONTACT_EMAIL_TO || DEFAULT_CONTACT_EMAIL,
    fromEmail: env.CONTACT_EMAIL_FROM || DEFAULT_CONTACT_EMAIL,
    allowedOrigins: parseAllowedOrigins(env.CONTACT_ALLOWED_ORIGINS),
    spamProofToken: env.CONTACT_SPAM_TOKEN || null,
    rateLimit: {
      windowMs: Number.parseInt(env.CONTACT_RATE_LIMIT_WINDOW_MS ?? "", 10) || DEFAULT_RATE_LIMIT.windowMs,
      max: Number.parseInt(env.CONTACT_RATE_LIMIT_MAX ?? "", 10) || DEFAULT_RATE_LIMIT.max,
    },
  };
}

module.exports = {
  getContactConfig,
  parseAllowedOrigins,
};
