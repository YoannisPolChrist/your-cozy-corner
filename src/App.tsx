import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import { LanguageProvider } from "@/i18n";
import { AnimatePresence } from "framer-motion";
import { SkipToContent } from "@/components/SkipToContent";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { getCompanionUrl } from "@/lib/site";
import type { Language } from "@/i18n";

const ExternalRedirect = ({ to }: { to: string }) => {
  window.location.replace(to);
  return null;
};

const intakeRedirectTargets = {
  de: "/de/kontakt?subject=individual-guidance",
  en: "/en/contact?subject=individual-guidance",
  fr: "/fr/contact?subject=individual-guidance",
} as const;

export const intakeRedirectAliases = [
  { path: "/eingangsdiagnostik", language: "de" },
  { path: "/Eingangsdiagnostik", language: "de" },
  { path: "/de/eingangsdiagnostik", language: "de" },
  { path: "/de/Eingangsdiagnostik", language: "de" },
  { path: "/fr/eingangsdiagnostik", language: "fr" },
  { path: "/fr/Eingangsdiagnostik", language: "fr" },
  { path: "/en/eingangsdiagnostik", language: "en" },
  { path: "/en/Eingangsdiagnostik", language: "en" },
  { path: "/intake-assessment", language: "en" },
  { path: "/en/intake-assessment", language: "en" },
  { path: "/diagnostic-initial", language: "fr" },
  { path: "/fr/diagnostic-initial", language: "fr" },
] as const;

export function getIntakeRedirectTarget(path: string) {
  const match = intakeRedirectAliases.find((alias) => alias.path === path);
  return match ? intakeRedirectTargets[match.language] : null;
}

const Index = lazy(() => import("./pages/Index"));
const Gestalttherapie = lazy(() => import("./pages/Gestalttherapie"));
const MyWork = lazy(() => import("./pages/MyWork"));
const Angebot = lazy(() => import("./pages/Angebot"));
const UeberMich = lazy(() => import("./pages/UeberMich"));
const Kontakt = lazy(() => import("./pages/Kontakt"));
const PersonalTraining = lazy(() => import("./pages/PersonalTraining"));
const Impressum = lazy(() => import("./pages/Impressum"));
const Datenschutz = lazy(() => import("./pages/Datenschutz"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const getLanguageFromPath = (pathname: string): Language => {
  const match = pathname.match(/^\/(de|en|fr)(\/|$)/);
  return (match?.[1] as Language) ?? "de";
};

const FloatingLoginButton = () => {
  const location = useLocation();
  const language = getLanguageFromPath(location.pathname);

  return (
    <div className="fixed top-4 right-4 z-[70]">
      <Button
        asChild
        variant="gold"
        className="h-10 rounded-full px-4 backdrop-blur-md bg-primary/85 hover:bg-primary text-white border border-white/15 shadow-lg"
      >
        <a href={getCompanionUrl(language)} aria-label="Kind Minds Login">
          <LogIn className="h-4 w-4" />
          Login
        </a>
      </Button>
    </div>
  );
};

const AppRoutes = () => (
  <Suspense fallback={<PageLoader />}>
    <SkipToContent />
    <AnimatePresence mode="wait">
      <Routes>
          <Route path="/" element={<PageLoader />} />

          {/* German routes */}
          <Route path="/de" element={<Index />} />
          <Route path="/de/gestalttherapie" element={<Gestalttherapie />} />
          <Route path="/de/ansatz" element={<MyWork />} />
          <Route path="/de/angebot" element={<Angebot />} />
          <Route path="/de/ueber-mich" element={<UeberMich />} />
          <Route path="/de/kontakt" element={<Kontakt />} />
          <Route path="/de/personal-training" element={<PersonalTraining />} />

          {/* English routes */}
          <Route path="/en" element={<Index />} />
          <Route path="/en/gestalt-therapy" element={<Gestalttherapie />} />
          <Route path="/en/approach" element={<MyWork />} />
          <Route path="/en/services" element={<Angebot />} />
          <Route path="/en/about-me" element={<UeberMich />} />
          <Route path="/en/contact" element={<Kontakt />} />
          <Route path="/en/personal-training" element={<PersonalTraining />} />

          {/* French routes */}
          <Route path="/fr" element={<Index />} />
          <Route path="/fr/gestalt-therapie" element={<Gestalttherapie />} />
          <Route path="/fr/approche" element={<MyWork />} />
          <Route path="/fr/services" element={<Angebot />} />
          <Route path="/fr/a-propos" element={<UeberMich />} />
          <Route path="/fr/contact" element={<Kontakt />} />
          <Route path="/fr/coaching-sportif" element={<PersonalTraining />} />

          {/* Legacy routes */}
          <Route path="/ueber-mich" element={<Navigate to="/de/ueber-mich" replace />} />
          <Route path="/kontakt" element={<Navigate to="/de/kontakt" replace />} />
          <Route path="/impressum" element={<Navigate to="/de/impressum" replace />} />
          <Route path="/datenschutz" element={<Navigate to="/de/datenschutz" replace />} />

          {/* Intake aliases route into the existing localized contact funnel. */}
          {intakeRedirectAliases.map(({ path }) => (
            <Route key={path} path={path} element={<ExternalRedirect to={getIntakeRedirectTarget(path) ?? intakeRedirectTargets.de} />} />
          ))}

          {/* Legal Pages (DE) */}
          <Route path="/de/impressum" element={<Impressum />} />
          <Route path="/de/datenschutz" element={<Datenschutz />} />

          {/* Legal Pages (EN) */}
          <Route path="/en/legal-notice" element={<Impressum />} />
          <Route path="/en/privacy-policy" element={<Datenschutz />} />

          {/* Legal Pages (FR) */}
          <Route path="/fr/mentions-legales" element={<Impressum />} />
          <Route path="/fr/politique-confidentialite" element={<Datenschutz />} />

          <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  </Suspense>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageProvider>
          <ErrorBoundary>
            <FloatingLoginButton />
            <AppRoutes />
          </ErrorBoundary>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
