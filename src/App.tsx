import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LanguageProvider } from "@/i18n";

// Lazy load pages for better performance (code splitting)
const Index = lazy(() => import("./pages/Index"));
const Gestalttherapie = lazy(() => import("./pages/Gestalttherapie"));
const MyWork = lazy(() => import("./pages/MyWork"));
const Angebot = lazy(() => import("./pages/Angebot"));
const UeberMich = lazy(() => import("./pages/UeberMich"));
const Kontakt = lazy(() => import("./pages/Kontakt"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Simple loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

// Routes wrapped in language provider
const AppRoutes = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      {/* Redirect root to language-prefixed route */}
      <Route path="/" element={<Navigate to="/en" replace />} />

      {/* German routes */}
      <Route path="/de" element={<Index />} />
      <Route path="/de/gestalttherapie" element={<Gestalttherapie />} />
      <Route path="/de/ansatz" element={<MyWork />} />
      <Route path="/de/angebot" element={<Angebot />} />
      <Route path="/de/ueber-mich" element={<UeberMich />} />
      <Route path="/de/kontakt" element={<Kontakt />} />

      {/* English routes */}
      <Route path="/en" element={<Index />} />
      <Route path="/en/gestalt-therapy" element={<Gestalttherapie />} />
      <Route path="/en/approach" element={<MyWork />} />
      <Route path="/en/services" element={<Angebot />} />
      <Route path="/en/about-me" element={<UeberMich />} />
      <Route path="/en/contact" element={<Kontakt />} />

      {/* French routes */}
      <Route path="/fr" element={<Index />} />
      <Route path="/fr/gestalt-therapie" element={<Gestalttherapie />} />
      <Route path="/fr/approche" element={<MyWork />} />
      <Route path="/fr/services" element={<Angebot />} />
      <Route path="/fr/a-propos" element={<UeberMich />} />
      <Route path="/fr/contact" element={<Kontakt />} />

      {/* Legacy routes - redirect to German */}
      <Route path="/gestalttherapie" element={<Navigate to="/de/gestalttherapie" replace />} />
      <Route path="/angebot" element={<Navigate to="/de/angebot" replace />} />
      <Route path="/ueber-mich" element={<Navigate to="/de/ueber-mich" replace />} />
      <Route path="/kontakt" element={<Navigate to="/de/kontakt" replace />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageProvider>
          <AppRoutes />
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
