# Emberville Content and Navigation Design

## Intent

Turn the current guide-heavy but partially empty Emberville wiki into a launch-ready information architecture: thirteen evidence-led keyword-intent guides, one Spider Matriarch boss guide, no navigation links to empty categories, clear homepage actions, a visible official trailer, and the Crafting Planner in the primary header.

## Approved scope

- Treat `keywords.json` as the query inventory and `关键词素材.md` as an untrusted fact pool.
- Merge the 70 raw keywords into the thirteen already-approved search-intent pages rather than creating duplicate doorway pages.
- Expand each English intent page to roughly 1,200 words while preserving scannable H2 sections and 3–4 sentence paragraphs.
- Add one `Spider Matriarch Boss Guide` based on cross-source demo evidence; omit unverified health, damage, drops, and exact phase values.
- Show only `Guides` and `Bosses` from content categories in the primary header, followed by `Crafting Planner` as a first-class tool link.
- Hide `Items`, `Characters`, `Classes`, `Builds`, and `Tier List` from the header until they have useful verified content. Keep their category keys in the content schema so later articles and the existing draft remain valid.
- Move Crafting Planner out of the footer Tools column.
- Make homepage actions explicit: beginner guide as the primary action and official trailer as the secondary action.
- Render the official trailer directly below the hero and replace homepage links that lead to empty category pages with live guide or boss destinations.

## Editorial constraints

- English page titles contain the primary keyword and are 40–60 characters.
- Meta descriptions contain the primary keyword and are 140–160 characters.
- The opening paragraph directly answers the search question.
- Body headings begin at H2 and are question-shaped where natural.
- Facts must come from the collected material after filtering or from primary/clearly attributable verification used to resolve conflicts.
- Current official release target is January 7, 2027; October 27, 2026 is historical and superseded.
- Unknown details use `To be confirmed` or `[待补充]`; no invented stats, classes, characters, codes, prices, recipes, or drop data.
- Do not link competing guide sites or piracy/download mirrors.
- Dangerous download queries are answered by directing readers to the official Steam page, not by creating piracy pages.

## Approaches considered

1. **Seventy pages, one per raw keyword** — rejected because synonyms would create near-duplicate doorway pages and keyword cannibalization.
2. **Hide every empty category and publish only the thirteen guides** — safe but leaves verified Spider Matriarch demand unserved.
3. **Approved hybrid** — thirteen consolidated intent pages plus one evidence-limited Spider Matriarch page; hide only categories without useful published content and promote the planner/tool and trailer.

## Verification

- Contract tests cover page count, SEO lengths, primary keywords, approximate article depth, current date language, banned fictional terms, navigation destinations, homepage CTA targets, and trailer presence.
- Run focused tests, `pnpm check-content`, `pnpm check-config`, and `pnpm build`.
- Browser-check desktop and mobile-width navigation, homepage CTA/video, Bosses listing, Spider guide, and Crafting Planner entry.
