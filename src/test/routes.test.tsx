import { describe, expect, it } from "vitest";

import { getIntakeRedirectTarget, intakeRedirectAliases } from "@/App";

describe("intake redirect routing", () => {
  it("maps every intake alias to a real localized destination", () => {
    expect(intakeRedirectAliases.length).toBeGreaterThan(0);

    for (const alias of intakeRedirectAliases) {
      const target = getIntakeRedirectTarget(alias.path);

      expect(target, `missing redirect for ${alias.path}`).toBeTruthy();
      expect(target).not.toBe("/Anamnese");
      expect(target).toMatch(/^\/(de\/kontakt|en\/contact|fr\/contact)\?subject=individual-guidance$/);
    }
  });

  it("returns null for unknown routes", () => {
    expect(getIntakeRedirectTarget("/not-a-real-route")).toBeNull();
  });
});
