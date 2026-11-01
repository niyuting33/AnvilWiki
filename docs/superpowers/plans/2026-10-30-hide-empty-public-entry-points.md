# Hide Empty Public Entry Points Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep unfinished destinations out of public navigation and search, surface the verified release date on the homepage, and give every primary content section a relevant, version-labeled video.

**Architecture:** Remove all promotional links to the empty Crafting Planner and FAQ from shared navigation, homepage data, skill landing content, and article copy. Keep the routes, but emit `noindex, follow` so they remain directly testable without becoming search landing pages. Add a reusable category-video component backed by one central evidence-aware configuration, and derive the homepage release date from `site.game.releaseDate`.

**Tech Stack:** Astro 7, TypeScript, Vitest, locale JSON.

**Spec:** User-approved conversation decision on 2026-10-30.

## Global Constraints

- Preserve the unfinished Crafting Planner implementation and verified-data policy.
- Do not invent recipes or FAQ answers.
- Public navigation must only advertise destinations with useful content.
- Empty/unavailable pages must emit `noindex, follow`.
- Release information must use the current official January 7, 2027 PC Early Access target.
- Videos must identify their source, version context, viewing purpose, and any superseded date shown in older footage.
- YouTube embeds must remain click-to-load.
- `pnpm check-content` and `pnpm build` must pass before completion.

## Review Focus

- Desktop and mobile navigation must both omit the planner.
- English and Chinese homepage cards and popular links must not expose the planner.
- Footer must omit FAQ while retaining the remaining legal links.
- Contextual article and skills-page links must not continue promoting the planner.
- Direct planner and empty FAQ URLs must render `noindex, follow`.
- Guides, Classes, Skills, Mechanics, and Bosses must each render a relevant video module.
- The homepage release date must link to the detailed release-date guide.

---

### Task 1: Lock the public-entry contract

**Files:**

- Modify: `tests/emberville-navigation-home.test.ts`
- Modify: `tests/crafting-planner-page.test.ts`

- [ ] Write assertions for no public planner/FAQ links and `noindex` route metadata.
- [ ] Run focused tests and confirm they fail for the old behavior.

### Task 2: Hide unfinished destinations

**Files:**

- Modify: `src/components/header/SiteHeader.astro`
- Modify: `src/components/footer/SiteFooter.astro`
- Modify: `src/locales/en.json`
- Modify: `src/locales/zh.json`
- Modify: `src/pages/skills/index.astro`
- Modify: relevant English MDX guide/mechanics files
- Modify: `src/pages/tools/crafting-planner.astro`
- Modify: `src/pages/faq.astro`
- Modify: `src/pages/[locale]/faq.astro`
- Modify: `src/components/layout/BaseLayout.astro`

- [ ] Remove promotional links while preserving useful replacement destinations.
- [ ] Apply `noindex, follow` to unavailable pages.
- [ ] Run focused tests and confirm they pass.

### Task 3: Audit and verify

**Files:** None expected.

- [ ] Search all public source surfaces for leftover planner and FAQ links.
- [ ] Run `pnpm check-content`.
- [ ] Run `pnpm build`.
- [ ] Run internal-link verification and report any unrelated pre-existing failures.

### Task 4: Release-date and category video modules

**Files:**

- Create: `src/config/category-videos.ts`
- Create: `src/components/video/CategoryVideo.astro`
- Modify: `src/components/article/ListPage.astro`
- Modify: `src/pages/skills/index.astro`
- Modify: `src/pages/zh/classes/index.astro`
- Modify: `src/pages/zh/mechanics/index.astro`
- Modify: `src/pages/zh/skills/index.astro`
- Modify: `src/components/home/HomePage.astro`
- Test: `tests/emberville-category-videos.test.ts`

- [ ] Add failing tests for five category video mappings, click-to-load rendering, and homepage release-date derivation.
- [ ] Implement the centralized video evidence configuration and reusable module.
- [ ] Render the module on all English and Chinese primary section pages.
- [ ] Render a linked, localized PC Early Access date beneath the homepage hero actions.
- [ ] Run focused tests, content checks, and the production build.
