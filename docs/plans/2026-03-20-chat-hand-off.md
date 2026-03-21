# Chat Agent Hand-off Notes (2026-03-20)

Kurzüberblick für neue Agents, damit ihr ohne langes Nachlesen starten könnt.

## Bisher erledigt

- **Task 2 – Intake Redirects:** Alle Alias-Routen leiten jetzt direkt auf die vorhandene `/kontakt`-Variante pro Sprache weiter. Logik + Test liegen in `src/App.tsx` und `src/test/routes.test.tsx`.
- **Firebase Functions Cleanup:** Fehlende Frontend-Dependency aus `functions/package.json` entfernt; Lockfile neu geschrieben (`npm install` im `functions/`-Ordner).
- **Task 3 – Contact Function Hardening:** Kontaktfunktion in Module zerlegt (`functions/contactHandler.js`, `contactConfig.js`, `contactSecurity.js`, `contactConstants.js`). Neue Regeln:
  - Whitelist-basierte Origin-Prüfung (Standardliste + `CONTACT_ALLOWED_ORIGINS` Secret).
  - Honeypot-Check und optionales Proof-Token (`CONTACT_SPAM_TOKEN` Secret) über Header `X-Contact-Proof`.
  - Saubere Fehlerrückgaben mit `RESPONSE_MESSAGES`.
  - Tests in `src/test/contact-function.test.ts` sichern CORS, Config, Spam und Happy Path ab.
- **General Tests:** `npx vitest run src/test/routes.test.tsx src/test/contact.test.ts src/test/contact-function.test.ts`.

## Noch offen aus dem Stabilization-Plan

1. Homepage-Form gibt es nicht mehr – Task 1 ist nicht mehr relevant, könnte alternativ dokumentiert oder gelöscht werden.
2. Task 4–6 (Backend-Abuse-Guards, Validierung, Accessibility) stehen noch an. Die neuen Module erleichtern das Ergänzen weiterer Checks (Rate Limits, bessere Logging Hooks).

## Secrets & Deployment

- Setze vor dem nächsten Deploy in Firebase:
  - `RESEND_API_KEY` (bereits Pflicht)
  - optional `CONTACT_EMAIL_TO`, `CONTACT_EMAIL_FROM`
  - **neu:** `CONTACT_ALLOWED_ORIGINS` (kommagetrennt) und `CONTACT_SPAM_TOKEN` falls Proof aktiv sein soll.
- Beim lokalen Testen auf `http://localhost:5173` oder `4173` achten – sind bereits whitelisted.

## Schnellzugriff

- Stabilization-Plan: `docs/plans/2026-03-20-stabilization-audit-remediation.md`
- Intake Redirect Tests: `src/test/routes.test.tsx`
- Contact Function Tests: `src/test/contact-function.test.ts`
- Backend Modules: `functions/contact*.js`

## Stand 2026-03-20 – Frontend-Status

- Scroll-Verhalten ist jetzt zentralisiert (`src/lib/scroll.ts`) und respektiert `prefers-reduced-motion`. Alle Komponenten nutzen dieselben Helfer, Tests sind aktualisiert.
- Hero der Personal-Training-Seite orientiert sich visuell stärker an der Gestalttherapie-Seite (Typography, Badge, CTA) und das Headerbild ist netto ca. +25 px nach rechts verschoben (die letzte User-Rückmeldung wollte +50 px, dann −25 px).
- Übersetzungen/Copy bleiben in `src/i18n`, der französische Hero-Text wurde visuell abgeglichen – kein weiterer linguistischer Eingriff nötig.
- Lokaler Dev-Server lässt sich mit `npm run dev -- --host` starten; letzte Kontrolle: 20.03.2026 03:00 MEZ.

## Offene Punkte für nächste Agents

- **Task 5** (Shared Validation + Inline Errors) und **Task 6** (Accessibility-Fixes) aus `docs/plans/2026-03-20-stabilization-audit-remediation.md` bleiben bewusst offen. Bitte darauf aufsetzen – insbesondere Feldfokus, Server-Client-Schema und Skip-Link/Reduced-Motion.
- Scroll-/Layout-Änderungen wurden implementiert, aber bitte nochmals im Browser verifizieren, sobald weitere UI-Tasks anstehen.
- Wenn weitere Sektionen auf hero-typografische Konsistenz geprüft werden sollen, dieselben Styles wie auf `Gestalttherapie` verwenden (`typ-h1`, `typ-lead`, Badge-Pattern).
