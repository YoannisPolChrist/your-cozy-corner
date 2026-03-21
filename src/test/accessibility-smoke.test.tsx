import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, beforeAll, beforeEach, it, vi } from "vitest";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { Footer } from "@/components/Footer";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SkipToContent } from "@/components/SkipToContent";
import { SmoothScroll } from "@/components/SmoothScroll";

const wrapInProviders = (children: React.ReactNode, initialPath = "/de/kontakt") => (
  <MemoryRouter initialEntries={[initialPath]}>
    <LanguageProvider>{children}</LanguageProvider>
  </MemoryRouter>
);

beforeAll(() => {
  // @ts-expect-error jsdom stub
  window.scrollTo = vi.fn();
});

describe("accessibility primitives", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders a skip link with the correct label and target", () => {
    render(wrapInProviders(<SkipToContent />, "/de/kontakt"));
    const skipLink = screen.getByRole("link", { name: "Zum Hauptinhalt springen" });
    expect(skipLink).toHaveAttribute("href", "#main-content");
  });

  it("resets scroll position with native browser scrolling", () => {
    render(
      <MemoryRouter initialEntries={["/de"]}>
        <SmoothScroll>
          <div>content</div>
        </SmoothScroll>
      </MemoryRouter>,
    );

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: "smooth" });
  });

  it("falls back to instant scroll when prefers-reduced-motion is enabled", () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockReturnValue({
      matches: true,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={["/de"]}>
        <SmoothScroll>
          <div>content</div>
        </SmoothScroll>
      </MemoryRouter>,
    );

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: "auto" });
    window.matchMedia = originalMatchMedia;
  });

  it("exposes language switcher state via aria attributes", () => {
    render(wrapInProviders(<LanguageSwitcher />));
    const germanButton = screen.getByRole("button", { name: /Wechseln zu Deutsch/i });
    expect(germanButton).toHaveAttribute("aria-pressed", "true");
  });

  it("hides decorative footer icons from assistive tech", () => {
    render(wrapInProviders(<Footer />));
    const decorativeIcons = document.querySelectorAll("svg[aria-hidden=\"true\"]");
    expect(decorativeIcons.length).toBeGreaterThanOrEqual(3);
  });
});
