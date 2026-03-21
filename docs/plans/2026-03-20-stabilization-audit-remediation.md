# Website Stabilization Audit Remediation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Stabilize the most important conversion, security, accessibility, SEO, and maintainability risks uncovered in the 6-agent audit without introducing unnecessary refactors too early.

**Architecture:** Start with blocker fixes on the live contact and intake funnels, then harden the Firebase contact backend, then improve user-facing accessibility and validation flows, and only after that perform structural cleanup. Keep shared rules centralized where possible, and prefer small verifiable steps over broad rewrites.

**Tech Stack:** Vite, React, TypeScript, Vitest, React Testing Library, Firebase Functions v2, Resend, Tailwind, Framer Motion

---

## Phase Order

1. Restore broken conversion paths
2. Harden the public contact backend
3. Improve validation and accessibility on forms
4. Fix production SEO and domain configuration
5. Add regression coverage for critical flows
6. Perform structural cleanup after behavior is safe

---

### Task 1: Restore the live contact funnel on the homepage

**Files:**
- Modify: `src/components/ContactSection.tsx`
- Modify: `src/lib/contact.ts`
- Test: `src/test/contact-section.test.tsx`

**Step 1: Write the failing test**

Create `src/test/contact-section.test.tsx` covering:
- submit on homepage calls the real contact submission path
- success resets fields only after resolved submission
- failure does not show a false success state

**Step 2: Run test to verify it fails**

Run: `npx vitest run src/test/contact-section.test.tsx`
Expected: FAIL because `ContactSection` currently never calls `submitContactForm`.

**Step 3: Write minimal implementation**

- Reuse `submitContactForm` in `ContactSection`
- Add loading state
- Keep success toast only after fulfilled request
- Keep failure toast for rejected request
- If the homepage form should not exist long-term, replace it with a CTA to `/kontakt` instead of maintaining duplicate form logic

**Step 4: Run tests to verify behavior**

Run: `npx vitest run src/test/contact-section.test.tsx src/test/contact.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/ContactSection.tsx src/lib/contact.ts src/test/contact-section.test.tsx
git commit -m "fix: wire homepage contact form to real submission flow"
```

---

### Task 2: Fix the broken Anamnese redirect funnel

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/i18n/LanguageContext.tsx`
- Test: `src/test/routes.test.tsx`

**Step 1: Write the failing test**

Create `src/test/routes.test.tsx` covering:
- each intake alias resolves to a real destination
- redirect target is not `/Anamnese` unless that route exists

**Step 2: Run test to verify it fails**

Run: `npx vitest run src/test/routes.test.tsx`
Expected: FAIL because current aliases redirect to an undefined route.

**Step 3: Write minimal implementation**

Choose one of these concrete outcomes and document it in code:
- route all aliases to the real external intake URL
- or add a real internal `Anamnese` route

Also align any localized path helpers if they reference the intake funnel.

**Step 4: Run tests to verify behavior**

Run: `npx vitest run src/test/routes.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add src/App.tsx src/i18n/LanguageContext.tsx src/test/routes.test.tsx
git commit -m "fix: restore intake redirect flow"
```

---

### Task 3: Remove oversized frontend coupling from Firebase Functions

**Files:**
- Modify: `functions/package.json`
- Modify: `functions/package-lock.json`
- Test: manual verification in `functions/`

**Step 1: Write the failing check**

Document the expected dependency set:
- `firebase-functions`
- `resend`
- no root frontend package via `file:..`

**Step 2: Run check to verify current bad state**

Run: `Get-Content functions/package.json`
Expected: contains `"vite_react_shadcn_ts": "file:.."`.

**Step 3: Write minimal implementation**

- Remove the root-app `file:..` dependency from `functions/package.json`
- Reinstall dependencies inside `functions/` to update the lockfile

**Step 4: Run verification**

Run: `npm install`
Workdir: `functions`
Expected: install succeeds with only the actual server-side dependency tree.

**Step 5: Commit**

```bash
git add functions/package.json functions/package-lock.json
git commit -m "build: decouple firebase function from frontend package"
```

---

### Task 4: Harden the contact backend against abuse and misconfiguration

**Files:**
- Modify: `functions/index.js`
- Create: `functions/contactConfig.js`
- Create: `functions/contactSecurity.js`
- Test: `functions/contact.test.js` or `src/test/contact-function.test.ts`

**Step 1: Write the failing test**

Cover:
- requests from disallowed origins are rejected
- invalid payloads still return correct field codes
- missing config fails predictably
- spam-protection guard blocks requests without proof

**Step 2: Run test to verify it fails**

Run: `npx vitest run src/test/contact-function.test.ts`
Expected: FAIL because function currently allows open CORS and has no real abuse gate.

**Step 3: Write minimal implementation**

- Move env/config reads into `functions/contactConfig.js`
- Restrict `cors` to known origins
- Add a guard layer for anti-spam verification
- Add lightweight request throttling strategy or at least a clear extension point for it
- Add structured success/rejection/error logging

**Step 4: Run tests to verify behavior**

Run: `npx vitest run src/test/contact-function.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add functions/index.js functions/contactConfig.js functions/contactSecurity.js src/test/contact-function.test.ts
git commit -m "feat: harden contact function against abuse"
```

---

### Task 5: Surface field-level validation and unify the client-server contract

**Files:**
- Create: `src/lib/contactSchema.ts`
- Modify: `src/lib/contact.ts`
- Modify: `src/pages/Kontakt.tsx`
- Modify: `src/components/ContactSection.tsx`
- Modify: `functions/index.js`
- Test: `src/test/contact-schema.test.ts`
- Test: `src/test/kontakt-page.test.tsx`

**Step 1: Write the failing test**

Cover:
- client rejects obviously invalid values before request
- backend and frontend share the same max lengths and required fields
- server `{ field }` responses are shown next to the correct input
- first invalid field receives focus

**Step 2: Run test to verify it fails**

Run: `npx vitest run src/test/contact-schema.test.ts src/test/kontakt-page.test.tsx`
Expected: FAIL because validation rules are currently split and field errors are only shown as toast text.

**Step 3: Write minimal implementation**

- Extract shared field constraints and error codes
- Add inline error state to the contact page
- Bind `name`, `autocomplete`, `aria-describedby`, and focus management
- Reuse the same rules in homepage and dedicated contact form where applicable

**Step 4: Run tests to verify behavior**

Run: `npx vitest run src/test/contact-schema.test.ts src/test/kontakt-page.test.tsx src/test/contact-section.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add src/lib/contactSchema.ts src/lib/contact.ts src/pages/Kontakt.tsx src/components/ContactSection.tsx functions/index.js src/test/contact-schema.test.ts src/test/kontakt-page.test.tsx
git commit -m "feat: add shared contact validation and inline field errors"
```

---

### Task 6: Ship the accessibility foundation fixes

**Files:**
- Create: `src/components/SkipToContent.tsx`
- Modify: `src/App.tsx`
- Modify: `src/components/SmoothScroll.tsx`
- Modify: `src/components/LanguageSwitcher.tsx`
- Modify: `src/components/Footer.tsx`
- Modify: `src/components/ContactSection.tsx`
- Modify: `src/pages/Kontakt.tsx`
- Modify: `src/index.css`
- Test: `src/test/accessibility-smoke.test.tsx`

**Step 1: Write the failing test**

Cover:
- skip link exists on all routed pages
- reduced-motion mode disables forced smooth scrolling
- language switcher exposes active state accessibly
- decorative icons are hidden from assistive tech

**Step 2: Run test to verify it fails**

Run: `npx vitest run src/test/accessibility-smoke.test.tsx`
Expected: FAIL because skip link and reduced-motion handling are incomplete.

**Step 3: Write minimal implementation**

- Add a shared skip link rendered before navigation
- Ensure every page reaches a `main` target with a stable id
- Disable Lenis and CSS smooth scroll when `prefers-reduced-motion: reduce`
- Add `aria-current` or `aria-pressed` semantics to language switcher
- Hide decorative icons with `aria-hidden`
- Add semantic `name` and `autocomplete` attributes to contact inputs

**Step 4: Run tests to verify behavior**

Run: `npx vitest run src/test/accessibility-smoke.test.tsx src/test/kontakt-page.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/SkipToContent.tsx src/App.tsx src/components/SmoothScroll.tsx src/components/LanguageSwitcher.tsx src/components/Footer.tsx src/components/ContactSection.tsx src/pages/Kontakt.tsx src/index.css src/test/accessibility-smoke.test.tsx
git commit -m "fix: improve navigation and motion accessibility"
```

---

### Task 7: Externalize production domain and SEO host configuration

**Files:**
- Modify: `src/components/SEO.tsx`
- Modify: `src/pages/Index.tsx`
- Modify: `src/pages/Gestalttherapie.tsx`
- Modify: `src/pages/MyWork.tsx`
- Modify: `src/pages/Kontakt.tsx`
- Modify: `src/pages/PersonalTraining.tsx`
- Modify: `src/pages/UeberMich.tsx`
- Modify: `src/pages/Angebot.tsx`
- Modify: `src/pages/Datenschutz.tsx`
- Modify: `src/pages/Impressum.tsx`
- Create: `.env.example`
- Test: manual metadata verification

**Step 1: Write the failing check**

Search for hard-coded `https://johanneschrist-website.web.app`.

**Step 2: Run check to verify current bad state**

Run: `Get-ChildItem src -Recurse -File | Select-String 'johanneschrist-website.web.app'`
Expected: MATCHES in SEO and schema code.

**Step 3: Write minimal implementation**

- Introduce `VITE_SITE_URL`
- Centralize canonical host generation in `SEO.tsx`
- Replace hard-coded schema/image/canonical host references with env-driven URL helpers
- Document the variable in `.env.example`

**Step 4: Run verification**

Run: `npm run build`
Expected: PASS and generated site uses env-based canonical host logic.

**Step 5: Commit**

```bash
git add src/components/SEO.tsx src/pages/Index.tsx src/pages/Gestalttherapie.tsx src/pages/MyWork.tsx src/pages/Kontakt.tsx src/pages/PersonalTraining.tsx src/pages/UeberMich.tsx src/pages/Angebot.tsx src/pages/Datenschutz.tsx src/pages/Impressum.tsx .env.example
git commit -m "feat: externalize site url for seo metadata"
```

---

### Task 8: Expand regression coverage around critical paths

**Files:**
- Modify: `vitest.config.ts`
- Create: `src/test/kontakt-page.test.tsx`
- Create: `src/test/contact-function.test.ts`
- Create: `src/test/accessibility-smoke.test.tsx`
- Create: `playwright.config.ts`
- Create: `tests/e2e/smoke.spec.ts`

**Step 1: Write the failing test**

Add:
- component tests for `/kontakt`
- backend contract tests for the contact function
- accessibility smoke tests
- one E2E smoke path for navigation, language switch, and contact submission

**Step 2: Run test to verify it fails**

Run: `npx vitest run src/test/kontakt-page.test.tsx src/test/contact-function.test.ts src/test/accessibility-smoke.test.tsx`
Expected: FAIL until new coverage is implemented.

**Step 3: Write minimal implementation**

- Add targeted RTL tests
- Add backend handler tests with mocks
- Add Playwright smoke config and first test
- Add sensible coverage thresholds after the new tests are stable

**Step 4: Run verification**

Run: `npm run test`
Run: `npx playwright test tests/e2e/smoke.spec.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add vitest.config.ts src/test/kontakt-page.test.tsx src/test/contact-function.test.ts src/test/accessibility-smoke.test.tsx playwright.config.ts tests/e2e/smoke.spec.ts
git commit -m "test: cover critical contact and navigation flows"
```

---

### Task 9: Consolidate shared routing and layout after blockers are fixed

**Files:**
- Create: `src/config/routes.ts`
- Create: `src/components/AppLayout.tsx`
- Modify: `src/App.tsx`
- Modify: `src/i18n/LanguageContext.tsx`
- Modify: `src/components/SEO.tsx`
- Test: `src/test/routes.test.tsx`

**Step 1: Write the failing test**

Cover:
- route definitions come from a single source of truth
- language-specific path generation and SEO path generation stay aligned

**Step 2: Run test to verify it fails**

Run: `npx vitest run src/test/routes.test.tsx`
Expected: FAIL until routing metadata is centralized.

**Step 3: Write minimal implementation**

- Move localized route metadata into `src/config/routes.ts`
- Build `AppLayout` for shared skip link, navigation, footer, and common wrappers
- Make router, language helpers, and SEO consume the same route manifest

**Step 4: Run verification**

Run: `npm run test`
Expected: PASS with unchanged user-facing routing behavior.

**Step 5: Commit**

```bash
git add src/config/routes.ts src/components/AppLayout.tsx src/App.tsx src/i18n/LanguageContext.tsx src/components/SEO.tsx src/test/routes.test.tsx
git commit -m "refactor: centralize route metadata and shared layout"
```

---

### Task 10: Remove or quarantine stale unused marketing components

**Files:**
- Modify or Delete: `src/components/CTASection.tsx`
- Modify or Delete: `src/components/ProgramsSection.tsx`
- Modify or Delete: `src/components/ContactSection.tsx`
- Modify: `src/pages/Index.tsx`
- Test: `npm run build`

**Step 1: Write the failing check**

Identify components that are not rendered anywhere and still contain live-looking UX paths or anchors.

**Step 2: Run check to verify current bad state**

Run: `Get-ChildItem src -Recurse -File | Select-String 'CTASection|ProgramsSection|ContactSection|document.getElementById\\(\"kontakt\"\\)'`
Expected: definitions exist with stale assumptions or disconnected anchors.

**Step 3: Write minimal implementation**

Choose one outcome per file:
- delete dead component
- or explicitly wire it into a live page
- or move it into a documented draft/archive area

Do not leave ambiguous “looks live but is unused” code paths in production.

**Step 4: Run verification**

Run: `npm run build`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/CTASection.tsx src/components/ProgramsSection.tsx src/components/ContactSection.tsx src/pages/Index.tsx
git commit -m "chore: remove stale marketing component paths"
```

---

## Recommended Execution Order

1. Task 1
2. Task 2
3. Task 3
4. Task 4
5. Task 5
6. Task 6
7. Task 7
8. Task 8
9. Task 9
10. Task 10

## Exit Criteria

- Homepage and dedicated contact flows both behave truthfully
- Intake links never lead to 404
- Firebase function is no longer oversized or openly abusable
- Contact validation is shared and field-level feedback is visible
- Reduced-motion and keyboard bypass support work across routes
- Canonical SEO host is environment-driven
- Critical user journeys have component and E2E coverage
- Routing and layout metadata are centralized only after behavior is stabilized
