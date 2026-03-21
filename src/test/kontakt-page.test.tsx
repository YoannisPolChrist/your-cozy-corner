import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, beforeEach, vi } from "vitest";

import { LanguageProvider } from "@/i18n/LanguageContext";
import Kontakt from "@/pages/Kontakt";

const submitContactFormMock = vi.fn();

vi.mock("@/components/Navigation", () => ({
  Navigation: () => <nav data-testid="nav" />,
}));

vi.mock("@/components/Footer", () => ({
  Footer: () => <footer data-testid="footer" />,
}));

vi.mock("@/components/SEO", () => ({
  SEO: () => null,
}));

vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({ toast: vi.fn() }),
}));

vi.mock("@/lib/contact", () => ({
  contactSubjectIds: ["individual-guidance"],
  submitContactForm: (...args: unknown[]) => submitContactFormMock(...args),
  buildContactPrefill: () => "Prefill",
  getLocalizedSubjectLabel: () => "Individual guidance",
  isContactSubjectId: () => false,
}));

const renderKontakt = () =>
  render(
    <MemoryRouter initialEntries={["/de/kontakt"]}>
      <LanguageProvider>
        <Kontakt />
      </LanguageProvider>
    </MemoryRouter>,
  );

describe("Kontakt page form", () => {
  beforeEach(() => {
    submitContactFormMock.mockReset();
  });

  it("shows inline errors and focuses the first invalid field when submitting empty form", async () => {
    renderKontakt();
    const submitButton = screen.getByRole("button", { name: /Nachricht senden/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText("Bitte gib deinen Namen ein.")).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toHaveFocus();
  });

  it("submits sanitized payload when inputs are valid", async () => {
    renderKontakt();

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: "  Anna  " } });
    fireEvent.change(screen.getByLabelText(/E-Mail/i), { target: { value: "user@example.com" } });
    fireEvent.change(screen.getByLabelText(/Telefon/), { target: { value: "+49 123 456" } });
    fireEvent.change(screen.getByLabelText(/Deine Nachricht/i), { target: { value: "Das ist eine Nachricht mit genug Inhalt." } });

    fireEvent.click(screen.getByRole("button", { name: /Nachricht senden/i }));

    await waitFor(() => expect(submitContactFormMock).toHaveBeenCalledTimes(1));
    expect(submitContactFormMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Anna",
        email: "user@example.com",
        phone: "+49 123 456",
        message: "Das ist eine Nachricht mit genug Inhalt.",
      }),
    );
  });
});
