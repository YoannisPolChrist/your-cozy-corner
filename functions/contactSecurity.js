const { RESPONSE_MESSAGES, DEFAULT_RATE_LIMIT } = require("./contactConstants");

function isOriginAllowed(origin, allowedOrigins) {
  if (!origin) {
    return false;
  }

  const normalizedOrigin = origin.trim().toLowerCase();
  return allowedOrigins.some((allowed) => allowed.toLowerCase() === normalizedOrigin);
}

function applyCorsHeaders(res, origin) {
  if (!origin) {
    return res;
  }

  res.set("Access-Control-Allow-Origin", origin);
  res.set("Vary", "Origin");
  res.set("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type,Contact-Proof");
  res.set("Access-Control-Max-Age", "3600");
  return res;
}

function validateOrigin(origin, allowedOrigins) {
  const ok = isOriginAllowed(origin, allowedOrigins);
  return ok ? { ok: true } : { ok: false, code: RESPONSE_MESSAGES.forbiddenOrigin };
}

function extractProof(headers = {}) {
  const lower = Object.fromEntries(Object.entries(headers).map(([key, value]) => [key.toLowerCase(), value]));
  return lower["x-contact-proof"] || lower["contact-proof"] || lower["x-contact-token"] || null;
}

function checkSpam(payload, headers, config) {
  const honeypot = typeof payload.website === "string" ? payload.website.trim() : "";
  if (honeypot.length > 0) {
    return { ok: false, code: RESPONSE_MESSAGES.spamDetected, field: "website" };
  }

  if (config.spamProofToken) {
    const proof = extractProof(headers);
    if (!proof || proof !== config.spamProofToken) {
      return { ok: false, code: RESPONSE_MESSAGES.spamDetected };
    }
  }

  return { ok: true };
}

function getClientKey(request) {
  const headers = Object.fromEntries(
    Object.entries(request.headers || {}).map(([key, value]) => [key.toLowerCase(), value]),
  );
  const explicit = headers["x-contact-client"];
  if (explicit) {
    return String(explicit);
  }

  const forwarded = headers["x-forwarded-for"];
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  if (typeof request.ip === "string") {
    return request.ip;
  }

  return "unknown";
}

function createRateLimiter(initialOptions = DEFAULT_RATE_LIMIT) {
  const visits = new Map();
  const defaults = {
    windowMs: initialOptions.windowMs,
    max: initialOptions.max,
  };

  function getOptions(customOptions) {
    if (!customOptions) {
      return defaults;
    }
    return {
      windowMs: Number.isFinite(customOptions.windowMs) && customOptions.windowMs > 0 ? customOptions.windowMs : defaults.windowMs,
      max: Number.isFinite(customOptions.max) && customOptions.max > 0 ? customOptions.max : defaults.max,
    };
  }

  function cleanup(now) {
    for (const [key, entry] of visits) {
      if (now - entry.start >= defaults.windowMs * 5) {
        visits.delete(key);
      }
    }
  }

  return {
    check(key, options) {
      const now = Date.now();
      const { windowMs, max } = getOptions(options);
      const entry = visits.get(key);

      if (!entry || now - entry.start >= windowMs) {
        visits.set(key, { start: now, count: 1 });
        cleanup(now);
        return { ok: true };
      }

      if (entry.count >= max) {
        const retryAfterMs = entry.start + windowMs - now;
        return { ok: false, retryAfterMs: Math.max(0, retryAfterMs) };
      }

      entry.count += 1;
      return { ok: true };
    },
  };
}

module.exports = {
  applyCorsHeaders,
  checkSpam,
  extractProof,
  createRateLimiter,
  getClientKey,
  isOriginAllowed,
  validateOrigin,
};
