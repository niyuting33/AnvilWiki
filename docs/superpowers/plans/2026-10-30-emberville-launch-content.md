# Emberville Launch Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a truthful thirteen-page Emberville launch content set and remove all fictional Anvil Quest material.

**Architecture:** Model the merged keyword intents as thirteen MDX guide articles using the repository's existing Astro content collection. Keep unverified game-data categories empty with accurate overview copy, and enforce editorial constraints through a focused Vitest contract.

**Tech Stack:** Astro 7, MDX, TypeScript, Vitest, pnpm

**Spec:** `docs/superpowers/specs/2026-10-30-emberville-launch-content.md`

## Global Constraints

- Preserve all unrelated user changes in the dirty working tree.
- Never present October 27, 2026 as the current release date.
- Never invent gameplay data or link competitors and piracy sites.
- Titles are 40–60 characters; descriptions are 140–160 characters.

## Review Focus

- Old launch-date claims must not survive in any published article.
- Search-intent pages must not become near-duplicate doorway pages.
- Empty categories must not imply that verified bosses, characters, builds, or rankings already exist.
- All internal links must resolve with the configured trailing-slash routing.
- Production build must exclude removed fictional content.

---

### Task 1: Editorial content contract

**Files:**

- Create: `tests/emberville-content.test.ts`

**Interfaces:**

- Consumes: expected thirteen article slugs and the editorial rules in the spec.
- Produces: a repeatable validation contract for Tasks 2 and 3.

- [ ] Write tests for the exact page set, SEO lengths, keywords, current release date, and banned fictional terms.
- [ ] Run `pnpm test tests/emberville-content.test.ts` and verify RED because the new pages do not exist.

### Task 2: Replace demo articles with Emberville pages

**Files:**

- Delete: existing `src/content/wiki/en/**/*.mdx` fictional articles
- Create: thirteen `src/content/wiki/en/guides/*.mdx` articles

**Interfaces:**

- Consumes: Task 1 content contract.
- Produces: the complete English launch article set.

- [ ] Write evidence-led MDX pages with direct answers, H2 sections, FAQs, and official/internal links.
- [ ] Run `pnpm test tests/emberville-content.test.ts` and verify GREEN.

### Task 3: Navigation copy and production verification

**Files:**

- Modify: `src/locales/en.json`

**Interfaces:**

- Consumes: Task 2 page set and existing navigation keys.
- Produces: honest category landing metadata and a buildable production site.

- [ ] Replace template overview text and remove fictional homepage guidance.
- [ ] Run `pnpm check-config`, `pnpm check-content`, `pnpm check`, and `pnpm build`.
- [ ] Inspect the final diff for unrelated changes and content regressions.
