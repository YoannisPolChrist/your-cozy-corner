import { describe, expect, it, vi } from "vitest";

import { createContactHandler } from "../../functions/contactHandler";
import { RESPONSE_MESSAGES } from "../../functions/contactConstants";

const basePayload = {
  name: "Test User",
  email: "user@example.com",
  message: "Hello this is a valid inquiry",
  language: "de",
  sourcePage: "/de/kontakt",
  website: "",
};

function createReqRes({
  method = "POST",
  origin = "https://allowed.example",
  body = basePayload,
  headers: extraHeaders = {},
}: {
  method?: string;
  origin?: string;
  body?: Record<string, unknown>;
  headers?: Record<string, string>;
} = {}) {
  const headers: Record<string, string> = { "x-forwarded-for": "203.0.113.1", ...extraHeaders };
  if (origin) {
    headers.origin = origin;
  }

  const req = {
    method,
    body,
    headers,
    get: (key: string) => headers[key.toLowerCase()],
  } as any;

  const res = {
    statusCode: 200,
    jsonBody: undefined as unknown,
    headers: {} as Record<string, string>,
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    set(field: string, value: string) {
      this.headers[field.toLowerCase()] = value;
      return this;
    },
    json(body: unknown) {
      this.jsonBody = body;
      return this;
    },
    send(body: unknown) {
      this.jsonBody = body;
      return this;
    },
  };

  return { req, res };
}

function createHandler({ overrides = {} }: { overrides?: Record<string, any> } = {}) {
  const sendEmail = vi.fn().mockResolvedValue({});
  const logger = {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  };

  const { rateLimit: rateLimitOverride, ...restOverrides } = overrides;

  const handler = createContactHandler({
    getConfig: () => ({
      resendApiKey: "test-api-key",
      contactEmail: "contact@example.com",
      fromEmail: "from@example.com",
      allowedOrigins: ["https://allowed.example"],
      spamProofToken: null,
      rateLimit: {
        windowMs: 1_000,
        max: 2,
        ...(rateLimitOverride || {}),
      },
      ...restOverrides,
    }),
    resendFactory: () => ({
      emails: { send: sendEmail },
    }),
    logger,
  });

  return { handler, sendEmail, logger };
}

describe("contact cloud function security", () => {
  it("rejects disallowed origins", async () => {
    const { handler, sendEmail } = createHandler();
    const { req, res } = createReqRes({ origin: "https://evil.example" });

    await handler(req, res);

    expect(res.statusCode).toBe(403);
    expect(res.jsonBody).toEqual({ ok: false, code: RESPONSE_MESSAGES.forbiddenOrigin });
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("fails when config is missing", async () => {
    const { handler } = createHandler({ overrides: { resendApiKey: "" } });
    const { req, res } = createReqRes();

    await handler(req, res);

    expect(res.statusCode).toBe(503);
    expect(res.jsonBody).toEqual({ ok: false, code: RESPONSE_MESSAGES.missingConfig });
  });

  it("succeeds for valid payload and allowed origin", async () => {
    const { handler, sendEmail } = createHandler();
    const { req, res } = createReqRes();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.jsonBody).toEqual({ ok: true });
    expect(sendEmail).toHaveBeenCalledTimes(1);
  });

  it("rejects spam submissions using the honeypot field", async () => {
    const { handler } = createHandler();
    const { req, res } = createReqRes({
      body: { ...basePayload, website: "http://bot.example" },
    });

    await handler(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.jsonBody).toEqual({ ok: false, code: RESPONSE_MESSAGES.spamDetected, field: "website" });
  });

  it("throttles repeated requests from the same client", async () => {
    const { handler } = createHandler({ overrides: { rateLimit: { max: 1, windowMs: 10_000 } } });
    const headers = { "x-forwarded-for": "198.51.100.5" };

    const { req: req1, res: res1 } = createReqRes({ headers });
    await handler(req1, res1);
    expect(res1.statusCode).toBe(200);

    const { req: req2, res: res2 } = createReqRes({ headers });
    await handler(req2, res2);

    expect(res2.statusCode).toBe(429);
    expect(res2.jsonBody).toEqual({ ok: false, code: RESPONSE_MESSAGES.tooManyRequests });
    expect(res2.headers["retry-after"]).toBeDefined();
  });
});
