import { describe, expect, it } from "vitest";

import { sanitizeContactPayload, validateContactForm } from "@/lib/contactSchema";

const basePayload = {
  name: "Test User",
  email: "user@example.com",
  phone: "",
  message: "Hello! This is at least ten chars.",
  language: "de",
  sourcePage: "/de/kontakt",
  subject: undefined,
  website: "",
};

describe("contact schema", () => {
  it("trims values and drops optional phone when empty", () => {
    const sanitized = sanitizeContactPayload({
      ...basePayload,
      name: "  Anna  ",
      email: " USER@Example.com ",
      phone: "   ",
      message: "  Hi there, thanks! ",
    });

    expect(sanitized.name).toBe("Anna");
    expect(sanitized.email).toBe("USER@Example.com");
    expect(sanitized.phone).toBeUndefined();
    expect(sanitized.message).toBe("Hi there, thanks!");
  });

  it("marks invalid emails as failing validation", () => {
    const validation = validateContactForm({
      ...basePayload,
      email: "invalid@",
    });

    expect(validation.success).toBe(false);
    if (!validation.success) {
      expect(validation.errors.email).toBeDefined();
    }
  });

  it("prevents honeypot submissions", () => {
    const validation = validateContactForm({
      ...basePayload,
      website: "http://bot.invalid",
    });

    expect(validation.success).toBe(false);
    if (!validation.success) {
      expect(validation.errors.website).toBeDefined();
    }
  });
});
