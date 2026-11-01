# Emberville Content and Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish thirteen comprehensive keyword-intent guides and one Spider Matriarch guide, then remove empty navigation paths and make the homepage actions, trailer, and Crafting Planner useful and visible.

**Architecture:** Keep all factual articles in the existing Astro content collection, with a contract test enforcing editorial and SEO constraints. Separate schema-level content categories from header-visible destinations so future categories remain valid without exposing empty list pages. Configure homepage copy and video through locale JSON and route all calls to live pages or the trailer anchor.

**Tech Stack:** Astro 7, MDX, TypeScript, locale JSON, Vitest, pnpm

**Spec:** `docs/superpowers/specs/2026-10-30-emberville-content-navigation-design.md`

## Global Constraints

- Preserve unrelated changes in the dirty worktree; do not commit, push, or deploy.
- Never copy competitor prose or link competitor/piracy sites.
- Never publish October 27, 2026 as the current release date.
- Never invent game numbers, names, recipes, codes, or drops.
- Titles are 40–60 characters; descriptions are 140–160 characters; openings answer directly.
- Keep the existing pure Astro/no-framework architecture and put UI strings in locale JSON.

## Review Focus

- Synonym keywords must consolidate into the correct canonical page without creating duplicate intent pages.
- Historical launch claims in the source material must not survive as current facts.
- Header and homepage links must resolve to built, non-empty destinations.
- The Spider guide must distinguish observed demo tactics from unverified numerical claims.
- Chinese fallback/navigation must not point to a nonexistent localized planner or boss page.

---

### Task 1: Editorial and navigation contract

**Files:**
- Modify: `tests/emberville-content.test.ts`
- Create: `tests/emberville-navigation-home.test.ts`

**Interfaces:**
- Consumes: approved page set, SEO rules, visible header destinations, official video ID.
- Produces: executable contracts for Tasks 2–4.

- [ ] Add failing assertions for exactly thirteen canonical guide slugs plus `bosses/spider-matriarch`, 40–60 character titles, 140–160 character descriptions, direct-answer openings, approximate 900–1,500 word depth, no current October 27 launch claim, and no competitor/piracy links.
- [ ] Add failing assertions that the header exposes Guides, Bosses, and Crafting Planner but not empty categories; the footer no longer exposes the planner; homepage CTAs resolve to the beginner guide and trailer anchor; and homepage video ID is `hPsCEHnjBJc`.
- [ ] Run the two focused tests and verify RED for missing depth, Spider page, and navigation/home behavior.

### Task 2: Thirteen consolidated keyword-intent guides

**Files:**
- Modify: `src/content/wiki/en/guides/release-date.mdx`
- Modify: `src/content/wiki/en/guides/early-access.mdx`
- Modify: `src/content/wiki/en/guides/demo.mdx`
- Modify: `src/content/wiki/en/guides/price.mdx`
- Modify: `src/content/wiki/en/guides/steam-deck.mdx`
- Modify: `src/content/wiki/en/guides/consoles.mdx`
- Modify: `src/content/wiki/en/guides/multiplayer.mdx`
- Modify: `src/content/wiki/en/guides/gameplay.mdx`
- Modify: `src/content/wiki/en/guides/review.mdx`
- Modify: `src/content/wiki/en/guides/beginner-guide.mdx`
- Modify: `src/content/wiki/en/guides/tips.mdx`
- Modify: `src/content/wiki/en/guides/wiki.mdx`
- Modify: `src/content/wiki/en/guides/community.mdx`

**Interfaces:**
- Consumes: filtered `keywords.json`, `关键词素材.md`, official-date ruling, existing component vocabulary.
- Produces: thirteen canonical guide pages referenced by homepage and internal links.

- [ ] Map every safe keyword to one canonical guide and remove duplicate/irrelevant source material.
- [ ] Expand each page to roughly 1,200 English words with direct opening, H2 sections, short paragraphs, tables/callouts where useful, and at least three valid internal links.
- [ ] Preserve unknowns explicitly and correct every superseded release statement.
- [ ] Run the focused content contract and verify the thirteen-guide portion is GREEN.

### Task 3: Spider Matriarch boss guide

**Files:**
- Create: `src/content/wiki/en/bosses/spider-matriarch.mdx`

**Interfaces:**
- Consumes: cross-source demo observations and existing `Video`/`Callout`/`Accordion` components.
- Produces: a published Bosses list entry and direct homepage destination.

- [ ] Write an evidence-limited demo guide with a direct answer, preparation, egg/add control, movement windows, recovery guidance, difficulty caveats, and explicit `[待补充]` fields for unverified stats/drops.
- [ ] Register an appropriate verified gameplay video only if the collected material contains a usable YouTube ID; otherwise omit video rather than inventing one.
- [ ] Run content/navigation contracts and verify the Spider page turns GREEN.

### Task 4: Header, footer, homepage CTA, cards, and trailer

**Files:**
- Modify: `src/config/navigation.ts`
- Modify: `src/components/header/SiteHeader.astro`
- Modify: `src/components/footer/SiteFooter.astro`
- Modify: `src/components/home/HomePage.astro`
- Modify: `src/locales/en.json`
- Modify: `src/locales/zh.json`

**Interfaces:**
- Consumes: live guide/boss routes from Tasks 2–3 and planner route `/tools/crafting-planner/`.
- Produces: a header with only useful destinations and a homepage with explicit actions and a visible official trailer.

- [ ] Add a header-visible key list separate from schema categories and render Guides/Bosses plus a localized Crafting Planner tool link on desktop and mobile.
- [ ] Remove the footer Tools column while retaining all official links and legal notice.
- [ ] Point the primary hero CTA at `/guides/beginner-guide/`, the secondary CTA at `#official-trailer`, configure `home.hero.videoId`, and give `VideoSection` the matching anchor.
- [ ] Replace quick-start/explore destinations that target empty categories with live guide, Spider, and planner routes.
- [ ] Run navigation/home contract and verify GREEN.

### Task 5: Production verification and browser QA

**Files:**
- No production files unless verification exposes a defect.

**Interfaces:**
- Consumes: all earlier task outputs.
- Produces: verified local launch candidate.

- [ ] Run focused tests and read the full output.
- [ ] Run `pnpm check-content`, `pnpm check-config`, and `pnpm build`; repair in-scope failures and rerun.
- [ ] Run scoped `git diff --check` and inspect the changed-file list for unrelated edits.
- [ ] Browser-check homepage, header/mobile menu, trailer anchor, Bosses list, Spider guide, and Crafting Planner.
