# CheckTalent

**Explainable Candidate Evaluation Through Code Analysis and Technical Interviews**

An AI-powered developer intelligence and candidate evaluation platform that transforms repositories, code analysis, and technical interviews into explainable candidate evaluations recruiters can trust.

---

## Branching & Release Workflow

This repository enforces a **branch-only management workflow**. Direct feature work is never committed straight to `main`.

| Branch         | Purpose                                                 | Promotion Rule                                                  |
| :------------- | :------------------------------------------------------ | :-------------------------------------------------------------- |
| `main`         | Protected production baseline                           | Receives verified merges only from staging branches             |
| `staging-1`    | Primary QA & integration testing branch                 | Receives PRs from feature branches (`landing-page`, `feat/*`)   |
| `staging-2`    | Secondary pre-production / UAT verification branch      | Used for parallel test cohorts & release sign-off before `main` |
| `landing-page` | Complete CheckTalent desktop-first product landing page | Feature branch containing the Next.js App Router frontend       |

See [`BRANCHING.md`](./BRANCHING.md) for exact Git promotion commands and workflow conventions.

---

## Technology Stack (`landing-page` branch)

- **Framework:** Next.js 15 (App Router) + React 19
- **Language:** TypeScript (`strict: true`, `noUncheckedIndexedAccess: true`)
- **Styling:** Tailwind CSS + CSS architectural grids & noise overlays
- **UI Primitives:** `shadcn/ui` + Radix UI (`Accordion`, `Dialog`, `Tabs`, `Select`, `Label`)
- **Motion:** GSAP + ScrollTrigger (with `prefers-reduced-motion` safeguards and clean unmount teardown)
- **Typography:** Geist Sans & Geist Mono (`geist`)
- **Icons:** Lucide React
- **Visual Stage Architecture:** Isolated `VisualStage` boundary designed so future 3D scenes can be introduced behind a stable component contract without refactoring page sections.

---

## Local Development

Switch to the `landing-page` branch (or merge it into `staging-1` / `staging-2` for testing) and run:

```bash
git checkout landing-page
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

### Verification Scripts

```bash
npm run typecheck   # Strict TypeScript validation
npm run build       # Production Next.js build
npm run start       # Start production server
```
