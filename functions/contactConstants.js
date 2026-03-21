const DEFAULT_CONTACT_EMAIL = "contact@johanneschrist.com";

const RESPONSE_MESSAGES = {
  invalidPayload: "invalid-payload",
  methodNotAllowed: "method-not-allowed",
  missingConfig: "missing-config",
  emailSendFailed: "email-send-failed",
  forbiddenOrigin: "forbidden-origin",
  spamDetected: "spam-detected",
  tooManyRequests: "too-many-requests",
};

const DEFAULT_ALLOWED_ORIGINS = [
  "https://johanneschrist.com",
  "https://www.johanneschrist.com",
  "https://johanneschrist-website.web.app",
  "https://your-cozy-corner.web.app",
  "http://localhost:4173",
  "http://localhost:5173",
];

const DEFAULT_RATE_LIMIT = {
  windowMs: 60_000,
  max: 5,
};

module.exports = {
  DEFAULT_ALLOWED_ORIGINS,
  DEFAULT_CONTACT_EMAIL,
  DEFAULT_RATE_LIMIT,
  RESPONSE_MESSAGES,
};
