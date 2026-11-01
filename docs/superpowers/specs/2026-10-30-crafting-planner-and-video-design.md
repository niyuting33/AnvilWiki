# Emberville Crafting Planner and Official Video Design

## Intent

Add a useful, version-aware crafting tool and contextual official video to the existing Emberville guide site. The tool should help players plan materials without copying another site's recipe database or presenting unverified Demo values as facts.

## Goals

- Create a responsive `Crafting Planner (Beta)` page that matches the existing Emberville visual system.
- Let a player enter inventory quantities, select a verified recipe and quantity, and see owned, required, and missing materials.
- Support search/filtering and browser-local persistence without accounts or server storage.
- Keep recipe data isolated in a typed local data file with a visible game-version/source status for later updates.
- Add one contextually placed, click-to-play official Emberville video using the site's existing `Video`/`LazyYouTube` components.
- Add a distinct `Official Website` link to the global footer while retaining the separate Steam action.
- Preserve the site's current static Astro architecture and zero-framework-runtime approach.

## Non-goals

- Do not copy recipe names, quantities, descriptions, categories, job levels, or timings from a competitor.
- Do not scrape or synchronize competitor data.
- Do not invent recipes to make the calculator appear populated.
- Do not add accounts, cloud saves, analytics, a database, or a new JavaScript framework.
- Do not auto-play video or load the full YouTube player before the visitor clicks.

## Data and trust boundary

The initial recipe dataset contains only entries supported by current first-party material or user-supplied in-game evidence. If no complete recipe meets that standard, the planner launches with an explicit empty/awaiting-verification state and sample UI data is never presented as a real Emberville recipe.

Every future recipe record must contain a stable ID, output name and quantity, ingredient quantities, category, applicable `gameVersion`, verification status, and source note. Unverified records remain excluded from calculations. The page displays its data version and warns that Demo recipes can change.

## User experience

The page has four compact areas:

1. **Version notice** — Beta label, current data version, and a warning that only verified recipes are included.
2. **Inventory** — searchable material selector, non-negative quantity input, add/update/remove actions, and clear button.
3. **Goal** — verified recipe selector, desired output quantity, category filter, and search.
4. **Result** — table showing required, owned, and missing quantities, plus a copyable shopping list; empty states explain exactly what is unavailable.

Inventory and the last selected goal are stored in `localStorage`. All controls are keyboard accessible, labelled, and usable on mobile. Calculations use integer arithmetic and reject invalid or negative values.

## Video placement

Embed one verified official Emberville video in the existing Gameplay or Demo guide, next to text explaining what the footage can and cannot prove. Register the same 11-character YouTube ID in frontmatter `videos` for VideoObject structured data. Label footage as version-sensitive and never use an obsolete release-date claim as current release information.

## Official links footer

The current footer treats the Steam store URL as the site's only official-game link. Extend the central site configuration so every verified official destination remains a separate single-source field. Rename the footer group to `Official Links` and render the following destinations with distinct icons and safe external-link attributes:

- Official Website — `https://www.cygnuscross.com/`
- Steam — `https://store.steampowered.com/app/2295170/Emberville/`
- Official Discord — `https://discord.gg/emberville`
- Official YouTube — `https://www.youtube.com/@embervillegame`
- Official X — `https://x.com/EmbervilleGame`
- Official Reddit — `https://www.reddit.com/r/Emberville_Official/`
- Official Instagram — `https://www.instagram.com/embervillegame/`
- Official Facebook — `https://www.facebook.com/EmbervilleGame/`
- Official Bluesky — `https://bsky.app/profile/emberville.bsky.social`
- Official Linktree — `https://linktr.ee/emberville`

These destinations are taken from the Emberville press listing and the game's linked official Linktree, not from another guide site's labels. Keep the existing fan-site disclaimer visible beneath the footer so visitors cannot mistake this wiki for the developer's site. Do not reproduce another wiki's full footer or link to competing guide sites.

## Approaches considered

### Selected: verified-data planner with safe empty state

Build the complete interaction now but calculate only from verified records. This gives the site a durable tool without trading accuracy for apparent completeness.

### Rejected: copy the competitor's recorded recipes

This would ship faster, but their own page says recipe details may change. Copying also creates accuracy, provenance, differentiation, and potential copyright problems.

### Deferred: wait until a complete recipe database exists

This minimizes the first release, but delays testing the interaction and data format. The selected Beta approach lets verified recipes be added incrementally without redesigning the tool.

## Validation

- Unit tests cover requirement scaling, missing-material calculation, invalid quantities, and empty verified datasets.
- Existing content validation confirms video metadata and guide structure.
- Run `pnpm check-content`, focused tests, `pnpm check`, and `pnpm build`.
- Browser QA covers desktop and mobile layout, persistence, keyboard operation, and the video click-to-load fallback.

## Delivery boundary

This change remains local to the existing AnvilWiki repository. It will not deploy, publish, push, or copy external recipe data without a separate user request.
