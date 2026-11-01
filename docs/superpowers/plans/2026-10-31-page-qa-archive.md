# Emberville Page QA Archive Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish a verifiable per-page QA archive and create a safe Emberville launch baseline commit.

**Architecture:** Keep the policy, reusable page checklist, and dated baseline report under `docs/qa/`. Derive the public page inventory from source/build output, run the existing content/build/link gates, record browser QA separately from machine QA, then stage only durable source and documentation files.

**Tech Stack:** Astro 7, MDX, pnpm, Vitest, Git, browser QA

**Spec:** `docs/superpowers/specs/2026-10-31-page-qa-archive-design.md`

## Global Constraints

- Every published page must pass `pnpm check-content && pnpm build`.
- Run `pnpm check-links` after the production build.
- Unverified core content stays `draft: true`; uncertain details are listed as `[待补充]`.
- Do not commit build output, caches, environment files, temporary screenshots, or backup assets.
- Shared component changes receive their own archive entry rather than being attributed to one article.

## Review Focus

- Public pages omitted from the archive must be detected by comparing the report with built routes.
- Noindex/draft/empty pages must not be accidentally marked as published and accepted.
- Desktop success must not mask mobile overflow or unreadable text.
- A green build must not mask broken internal links or empty interactive controls.
- Staging must not sweep in secrets, caches, generated output, or local backups.

---

### Task 1: Add the durable QA policy and page template

**Files:**

- Create: `docs/qa/README.md`
- Create: `docs/qa/page-acceptance-template.md`
- Modify: `AGENTS.md`

- [ ] Document the three gates, draft handling, and commit naming rules.
- [ ] Add a reusable checklist with machine, desktop, mobile, feature, evidence, and commit fields.
- [ ] Link the policy from `AGENTS.md` so future page work cannot skip it.
- [ ] Verify the policy explicitly excludes generated and sensitive files.

### Task 2: Create the launch baseline page inventory

**Files:**

- Create: `docs/qa/2026-10-31-launch-baseline.md`

- [ ] Inventory the homepage, published article pages, live category/database pages, and legal pages.
- [ ] Separate noindex/hidden routes from published routes.
- [ ] Record `[待补充]` and draft status without inventing facts.
- [ ] Record shared-component checks separately.

### Task 3: Run machine and visual acceptance

**Files:**

- Modify: `docs/qa/2026-10-31-launch-baseline.md`

- [ ] Run focused tests for current Emberville functionality.
- [ ] Run `pnpm check-content && pnpm build && pnpm check-links` and record exact outcomes.
- [ ] Inspect every public route at desktop and mobile widths for readability, overflow, media, navigation, and empty controls.
- [ ] Fix in-scope failures, rerun affected checks, and update the report.

### Task 4: Create the safe Git baseline

**Files:**

- Stage: durable source, content, tests, and QA documentation only
- Exclude: generated output, caches, local backups, environment files, temporary screenshots

- [ ] Review untracked and deleted files before staging.
- [ ] Stage explicit durable paths and inspect `git diff --cached --stat` plus sensitive-name checks.
- [ ] Commit as `chore: archive Emberville launch baseline`.
- [ ] Add the resulting commit hash to the baseline report; if that follow-up changes the report, create a small documentation commit referencing the baseline hash.
