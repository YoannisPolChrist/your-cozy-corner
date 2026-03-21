const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { Resend } = require("resend");
const { createContactHandler } = require("./contactHandler");

const REGION = "europe-west1";

const handler = createContactHandler({
  resendFactory: (apiKey) => new Resend(apiKey),
  logger,
});

exports.contact = onRequest(
  {
    region: REGION,
    cors: false,
    secrets: [
      "RESEND_API_KEY",
      "CONTACT_EMAIL_TO",
      "CONTACT_EMAIL_FROM",
      "CONTACT_ALLOWED_ORIGINS",
      "CONTACT_SPAM_TOKEN",
    ],
  },
  handler,
);
