# Emberville Database Expansion Implementation Plan

> **For Codex:** Execute this plan task-by-task. Keep competitor material out of shipped copy and assets; all version-sensitive data must carry a verification state.

**Goal:** Add trustworthy Classes, Skills, and Mechanics areas to the Emberville wiki without publishing empty categories or presenting community-extracted demo values as official facts.

**Architecture:** Keep prose pages in the existing Astro content collection and add a small typed data layer for searchable skill records. Public navigation is driven by `PRIMARY_NAV_KEYS`, while the custom skills directory consumes the typed records and renders accessible filters with progressive enhancement. Evidence status and demo version labels are part of the record schema and visible UI.

**Tech Stack:** Astro 7, TypeScript, MDX content collections, native browser JavaScript, Vitest, Tailwind.

---

## Task 1: Lock navigation and trust requirements with failing tests

**Files:**

- Modify: `tests/emberville-navigation-home.test.ts`
- Create: `tests/emberville-database.test.ts`

1. Update the navigation expectation to require `guides`, `classes`, `skills`, `mechanics`, and `bosses` in that order.
2. Add tests that require typed class/skill records to expose `status`, `gameVersion`, and `lastVerified`.
3. Add tests that forbid pending numeric values and competitor URLs in shipped database data.
4. Run the two focused test files and confirm they fail for the missing implementation.

## Task 2: Add content categories and localized labels

**Files:**

- Modify: `src/config/navigation.ts`
- Modify: `src/locales/en.json`
- Modify: `src/locales/zh.json`
- Modify: `src/components/header/SiteHeader.astro`
- Modify: `src/components/sidebar/WikiSidebar.astro`

1. Add `skills` and `mechanics` as content category keys with appropriate Lucide icons.
2. Set primary navigation to `guides`, `classes`, `skills`, `mechanics`, `bosses`.
3. Add English and Chinese nav labels and substantive overview descriptions.
4. Preserve Crafting Planner as the final utility link rather than a content category.
5. Run `pnpm check-config` and the focused navigation test.

## Task 3: Create the typed demo database

**Files:**

- Create: `src/data/emberville-database.ts`
- Create: `src/lib/emberville-database.ts`
- Test: `tests/emberville-database.test.ts`

1. Define `EvidenceStatus` as `official | demo-observed | pending`.
2. Define class and skill record types with source labels, version, verification date, and optional fields.
3. Add class records supported by the demo evidence, clearly labeling their status and omitting unverified base-stat numbers.
4. Add skill-name records as demo observations only; paraphrase purposes and omit or mark uncorroborated costs, cooldowns, ranks, and percentages.
5. Implement pure filter helpers for class, type, status, and text query.
6. Run the database tests until green.

## Task 4: Publish substantive class and mechanics articles

**Files:**

- Create: `src/content/wiki/en/classes/class-system.mdx`
- Create: `src/content/wiki/en/classes/demo-classes.mdx`
- Create: `src/content/wiki/en/mechanics/combat-and-skill-inheritance.mdx`
- Create: `src/content/wiki/en/mechanics/kymia-crafting-and-town-rebuilding.mdx`

1. Use compliant frontmatter with `gameVersion`, direct-answer summaries, and existing tags.
2. Separate official facts from demo observations using `Callout` warnings.
3. Use question-shaped H2 headings and at least three valid internal links per article.
4. Do not publish exact values that lack independent evidence.
5. Run `pnpm check-content` and fix all errors.

## Task 5: Build the searchable Skills directory

**Files:**

- Create: `src/components/database/SkillsDirectory.astro`
- Create: `src/pages/skills/index.astro`
- Create: `src/pages/zh/skills/index.astro` only if localized content is ready; otherwise keep English-only and rely on existing locale behavior.
- Modify: `src/styles/globals.css` only if component-local utility classes are insufficient.
- Test: `tests/emberville-database.test.ts`

1. Render an immediate answer, version notice, evidence legend, and total records.
2. Render search plus class/type/status filters with accessible labels.
3. Use a minimal native script to hide/show cards; keep the complete directory readable without JavaScript.
4. Display `待复核` instead of unknown numeric values.
5. Include links to Classes, Mechanics, Beginner Guide, and Crafting Planner.
6. Run focused tests and build.

## Task 6: Update discovery surfaces without creating thin pages

**Files:**

- Modify: `src/locales/en.json`
- Modify: `src/locales/zh.json`
- Modify: `src/components/home/QuickStart.astro` or homepage configuration only if needed
- Modify: `src/components/footer/SiteFooter.astro` only if a database section already exists and can be extended cleanly

1. Add Classes and Skills to useful homepage discovery links.
2. Do not add Items, Recipes, Monsters, Builds, or Tier List until substantive content exists.
3. Ensure no homepage or navigation destination renders an empty state.
4. Run navigation/home tests.

## Task 7: Full verification and visual QA

1. Run `pnpm check-content`.
2. Run `pnpm check-config`.
3. Run `pnpm test`.
4. Run `pnpm build`.
5. Preview `/classes/`, `/skills/`, `/mechanics/`, and `/tools/crafting-planner/` at desktop and mobile widths.
6. Confirm filters work, unknown values are labeled, no competitor links appear, and every primary navigation destination contains substantive content.
