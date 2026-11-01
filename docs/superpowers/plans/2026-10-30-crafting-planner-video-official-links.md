# Emberville Crafting Planner, Video, and Official Links Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a data-safe crafting planner Beta, one contextual official video, and a complete verified Official Links footer to the existing Emberville wiki.

**Architecture:** Keep the site static and framework-free at runtime. Put crafting arithmetic in a pure TypeScript module, verified recipe records in a separate typed data module, and progressive-enhancement UI behavior in an Astro component with browser-local persistence; reuse the existing lazy YouTube facade and central site configuration.

**Tech Stack:** Astro 7, TypeScript, vanilla browser JavaScript, Tailwind CSS, Vitest, existing `Video`/`LazyYouTube` Astro components.

**Spec:** `docs/superpowers/specs/2026-10-30-crafting-planner-and-video-design.md`

## Global Constraints

- Do not copy recipe names, values, descriptions, categories, job levels, or timings from a competitor.
- Do not invent recipes; unverified recipe records must be excluded from calculations.
- Use only verified official destinations and preserve the fan-site disclaimer.
- Do not add a framework, account system, server storage, database, analytics, autoplay, or eager YouTube iframe.
- Keep all calculations integer-only and reject zero, negative, decimal, NaN, and overflow-like quantities.
- Preserve unrelated dirty-worktree changes; do not commit, push, publish, or deploy in this plan.
- Final acceptance requires focused tests, `pnpm check-content`, `pnpm check`, and `pnpm build` to pass.

## Review Focus

- Corrupt or stale `localStorage` must fall back to an empty planner state without breaking the page; pinned in Task 3.
- Maliciously large, decimal, zero, negative, or non-numeric quantities must be rejected; pinned in Task 1.
- Duplicate ingredients in a recipe must aggregate before shortage calculation; pinned in Task 1.
- An empty verified dataset must render an honest waiting-for-verification state, never demo recipes; pinned in Tasks 1 and 3.
- Official external links must use the exact verified HTTPS targets and safe external-link attributes; pinned in Task 2.

---

### Task 1: Crafting calculation domain and verified-data boundary

**Files:**
- Create: `src/lib/crafting-planner.ts`
- Create: `src/data/emberville-recipes.ts`
- Create: `tests/crafting-planner.test.ts`

**Interfaces:**
- Produces: `CraftingIngredient`, `CraftingRecipe`, `Inventory`, and `CraftingPlanRow` types.
- Produces: `parseCraftingQuantity(value: unknown): number | null`.
- Produces: `calculateCraftingPlan(recipe: CraftingRecipe, inventory: Inventory, outputQuantity: number): CraftingPlanRow[]`.
- Produces: `verifiedEmbervilleRecipes: readonly CraftingRecipe[]`, initially empty because no complete first-party recipe is verified.
- Consumes: no earlier task interface.

- [ ] **Step 1: Write failing calculation tests**

Add Vitest cases asserting that a test-only recipe scales by desired output quantity, aggregates duplicate ingredient IDs, reports `required`, `owned`, and `missing`, treats absent inventory as zero, and never mutates recipe or inventory inputs.

- [ ] **Step 2: Write failing validation and empty-dataset tests**

Assert `parseCraftingQuantity` accepts safe positive integers and rejects `0`, negatives, decimals, empty strings, NaN, Infinity, and values above `Number.MAX_SAFE_INTEGER`; assert `verifiedEmbervilleRecipes` is empty and contains no competitor-derived values.

- [ ] **Step 3: Run tests to verify RED**

Run: `pnpm vitest run tests/crafting-planner.test.ts`

Expected: FAIL because `src/lib/crafting-planner.ts` and `src/data/emberville-recipes.ts` do not exist.

- [ ] **Step 4: Implement the pure domain module and empty verified dataset**

Use normalized material IDs as keys, aggregate duplicate ingredients in a `Map`, calculate `missing = Math.max(required - owned, 0)`, freeze exported empty recipe data, and throw or return no result only as pinned by the tests.

- [ ] **Step 5: Run tests to verify GREEN**

Run: `pnpm vitest run tests/crafting-planner.test.ts`

Expected: all Task 1 tests PASS.

- [ ] **Step 6: Record a local checkpoint**

Run: `git diff -- src/lib/crafting-planner.ts src/data/emberville-recipes.ts tests/crafting-planner.test.ts`

Expected: only Task 1 files appear; do not commit because the user worktree contains pre-existing changes.

### Task 2: Complete verified Official Links footer

**Files:**
- Modify: `src/config/site.ts`
- Modify: `src/components/footer/SiteFooter.astro`
- Modify: `src/locales/en.json`
- Modify: `src/locales/zh.json`
- Create: `tests/emberville-official-links.test.ts`

**Interfaces:**
- Consumes: existing `SiteConfig`, `site`, and locale footer dictionaries.
- Produces: optional `website`, `instagram`, `facebook`, `bluesky`, and `linktree` social fields while retaining `official` as the Steam/play URL for backward compatibility.
- Produces: an `Official Links` footer column and a separate internal `Tools` link to `/tools/crafting-planner/`.

- [ ] **Step 1: Write failing official-link contract tests**

Assert `site.social` contains the exact approved HTTPS URLs for website, Steam, Discord, YouTube, X, Reddit, Instagram, Facebook, Bluesky, and Linktree; assert `sameAs` includes each official destination exactly once.

- [ ] **Step 2: Write failing footer-rendering source tests**

Assert `SiteFooter.astro` renders all configured official fields with `target="_blank"` and `rel="noopener noreferrer"`, uses localized `Official Links` and `Tools` headings, links the planner internally, and retains `site.legalNotice`.

- [ ] **Step 3: Run tests to verify RED**

Run: `pnpm vitest run tests/emberville-official-links.test.ts`

Expected: FAIL because the social fields, labels, and footer entries are missing.

- [ ] **Step 4: Extend configuration and locale labels**

Keep `social.official` pointing to Steam for existing homepage CTAs. Add the remaining optional fields and all verified values; populate `sameAs` from the same set. Add English and current fallback-locale labels for every official link, `Official Links`, `Tools`, and `Crafting Planner`.

- [ ] **Step 5: Refactor the footer into four responsive columns**

Render Brand, Tools, Official Links, and Legal using the existing design tokens and icons. Keep links data-driven and filtered by configured URLs; do not hard-code URLs in the component.

- [ ] **Step 6: Run tests to verify GREEN**

Run: `pnpm vitest run tests/emberville-official-links.test.ts`

Expected: all Task 2 tests PASS.

- [ ] **Step 7: Record a local checkpoint**

Run: `git diff -- src/config/site.ts src/components/footer/SiteFooter.astro src/locales/en.json src/locales/zh.json tests/emberville-official-links.test.ts`

Expected: only approved configuration, locale, footer, and test changes appear; do not commit.

### Task 3: Responsive Crafting Planner Beta page

**Files:**
- Create: `src/components/tools/CraftingPlanner.astro`
- Create: `src/pages/tools/crafting-planner.astro`
- Create: `tests/crafting-planner-page.test.ts`

**Interfaces:**
- Consumes: `verifiedEmbervilleRecipes`, `calculateCraftingPlan`, and `parseCraftingQuantity` from Task 1.
- Consumes: `LocaleLayout`, current site styles, and default locale routing.
- Produces: `/tools/crafting-planner/` with `availableLocales={[defaultLocale]}` and no invalid alternate-language route.
- Produces: browser persistence key `emberville-crafting-planner:v1`.

- [ ] **Step 1: Write failing page-contract tests**

Assert the route and component exist; the page has descriptive title/description, Beta/version warning, accessible labelled inventory and goal controls, search/category controls, required/owned/missing result headers, clear/copy actions, and the exact persistence key.

- [ ] **Step 2: Add persistence safety tests**

Extract the state decoder as an exported pure helper if needed and assert malformed JSON, wrong shapes, negative quantities, unknown material IDs, and stale recipe IDs fall back safely without throwing.

- [ ] **Step 3: Run tests to verify RED**

Run: `pnpm vitest run tests/crafting-planner-page.test.ts`

Expected: FAIL because the page/component and state decoder do not exist.

- [ ] **Step 4: Implement the page shell and honest empty state**

Use the existing Emberville card, border, color, and typography tokens. Render the version notice and no-verified-recipes explanation when the dataset is empty; never render placeholder recipes as selectable game data.

- [ ] **Step 5: Implement progressive enhancement and persistence**

Serialize only validated integer inventory values and the last valid recipe/quantity selection. Recompute result rows after every accepted change; support clear, remove, category/search filtering, copy shopping list, and visible status feedback. Keep server-rendered content useful when JavaScript is disabled.

- [ ] **Step 6: Make the interaction responsive and accessible**

Use a one-column mobile layout and two-column desktop layout, explicit labels, keyboard-operable buttons, `aria-live` for calculation/copy feedback, visible focus states, and no horizontal overflow at 320px.

- [ ] **Step 7: Run focused tests to verify GREEN**

Run: `pnpm vitest run tests/crafting-planner.test.ts tests/crafting-planner-page.test.ts`

Expected: all Task 1 and Task 3 tests PASS.

- [ ] **Step 8: Record a local checkpoint**

Run: `git diff -- src/components/tools/CraftingPlanner.astro src/pages/tools/crafting-planner.astro tests/crafting-planner-page.test.ts`

Expected: only Task 3 files appear; do not commit.

### Task 4: Add contextual official video to the Gameplay guide

**Files:**
- Modify: `src/content/wiki/en/guides/gameplay.mdx`
- Create: `tests/emberville-video.test.ts`

**Interfaces:**
- Consumes: existing `Video` component and frontmatter `videos` schema.
- Produces: inline official Reveal Trailer ID `hPsCEHnjBJc`, registered once in frontmatter and once in the matching inline component.

- [ ] **Step 1: Write failing video contract tests**

Assert `gameplay.mdx` imports `Video`, declares `videos: ['hPsCEHnjBJc']`, renders `<Video id="hPsCEHnjBJc" ... />`, mentions that footage is version-sensitive, and does not repeat the obsolete October 27 release date as current.

- [ ] **Step 2: Run tests to verify RED**

Run: `pnpm vitest run tests/emberville-video.test.ts`

Expected: FAIL because the guide has no video metadata or inline player.

- [ ] **Step 3: Add the contextual lazy video block**

Place it after the core-loop explanation with concise copy explaining that the official trailer illustrates tone and intended systems but does not prove current Demo availability or balance. Reuse the existing click-to-load facade; do not add another player implementation.

- [ ] **Step 4: Run tests to verify GREEN**

Run: `pnpm vitest run tests/emberville-video.test.ts`

Expected: all Task 4 tests PASS.

- [ ] **Step 5: Record a local checkpoint**

Run: `git diff -- src/content/wiki/en/guides/gameplay.mdx tests/emberville-video.test.ts`

Expected: only Task 4 files appear; do not commit.

### Task 5: Integration verification and browser QA

**Files:**
- Modify only files from Tasks 1–4 if verification exposes a defect.

**Interfaces:**
- Consumes: all earlier task outputs.
- Produces: a locally verified feature set ready for the user's separate deployment workflow.

- [ ] **Step 1: Run the focused feature suite**

Run: `pnpm vitest run tests/crafting-planner.test.ts tests/crafting-planner-page.test.ts tests/emberville-official-links.test.ts tests/emberville-video.test.ts`

Expected: all focused tests PASS with zero failures.

- [ ] **Step 2: Run repository content validation**

Run: `pnpm check-content`

Expected: `Content lint clean.`

- [ ] **Step 3: Run Astro type and template validation**

Run: `pnpm check`

Expected: zero errors.

- [ ] **Step 4: Run the production build**

Run: `pnpm build`

Expected: exit code 0; `/tools/crafting-planner/index.html` is generated; the draft Tier List remains excluded from production.

- [ ] **Step 5: Run local browser QA**

Verify `/tools/crafting-planner/` and a normal guide page at desktop and mobile widths. Check empty verified-data state, keyboard focus, invalid quantity handling, safe localStorage recovery, footer link layout/targets, planner discoverability, video thumbnail, and click-to-load behavior.

- [ ] **Step 6: Review the final scoped diff**

Run: `git diff --check` and `git status --short`.

Expected: no whitespace errors; report all pre-existing unrelated changes separately and do not stage, commit, push, publish, or deploy.
