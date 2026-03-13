import { describe, expect, it } from "vitest";

import { de } from "@/i18n/de";
import { en } from "@/i18n/en";
import { fr } from "@/i18n/fr";
import { buildContactPrefill, getLocalizedSubjectLabel, isContactSubjectId } from "@/lib/contact";

describe("contact helpers", () => {
  it("recognizes supported subject ids", () => {
    expect(isContactSubjectId("individual-guidance")).toBe(true);
    expect(isContactSubjectId("unknown-subject")).toBe(false);
  });

  it("builds localized prefills", () => {
    expect(buildContactPrefill(de, "individual-guidance")).toContain("Ich interessiere mich besonders für");
    expect(buildContactPrefill(en, "individual-guidance")).toContain("I’m especially interested in");
    expect(buildContactPrefill(fr, "individual-guidance")).toContain("Je m’intéresse surtout à");
  });

  it("returns localized subject labels", () => {
    expect(getLocalizedSubjectLabel(de, "individual-guidance")).toBe("Individuelle Begleitung");
    expect(getLocalizedSubjectLabel(en, "individual-guidance")).toBe("Individual support");
    expect(getLocalizedSubjectLabel(fr, "individual-guidance")).toBe("Accompagnement individuel");
  });
});
