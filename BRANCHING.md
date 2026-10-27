# Branch-Only Repository Management Guide

All development in **Proof of Skill** follows an isolated branch promotion model:

```text
feature branches (e.g., landing-page, feat/*)
        │
        ├──► staging-1  (Integration & QA Testing Environment 1)
        │
        └──► staging-2  (Pre-Release / Parallel Testing Environment 2)
                │
                ▼
              main      (Stable Production Branch)
```

## Branch Inventory

1. **`main`** — Clean production baseline. Never commit experimental or unverified feature work directly to `main`.
2. **`staging-1`** — First staging branch for integration testing, build verification, and UI review.
3. **`staging-2`** — Second staging branch for parallel feature testing, regression checks, or UAT validation before promoting to `main`.
4. **`landing-page`** — Dedicated feature branch containing the full Proof of Skill Next.js landing page implementation (all 15 product sections, 38-feature explorer, interactive Skill Proof Card, GSAP animations, and client-validated early-access flow).

## Common Workflows

### 1. Promote `landing-page` into `staging-1` for testing
```bash
git checkout staging-1
git merge --no-ff landing-page -m "chore(staging-1): merge landing-page for QA testing"
git push origin staging-1
```

### 2. Promote `landing-page` (or `staging-1`) into `staging-2` for secondary testing
```bash
git checkout staging-2
git merge --no-ff staging-1 -m "chore(staging-2): promote verified build from staging-1"
git push origin staging-2
```

### 3. Release verified staging branch to `main`
```bash
git checkout main
git merge --no-ff staging-2 -m "release(main): promote verified staging-2 build"
git push origin main
```
