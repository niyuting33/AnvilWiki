# Emberville Launch Content Specification

## Goal

Replace the fictional Anvil Quest demo articles with a launch-ready, evidence-led Emberville information hub built from the user's merged keyword intents and collected research.

## Page Set

Create thirteen English guide pages: release date, early access, demo, price, Steam Deck, consoles, multiplayer, gameplay, review, beginner guide, tips, wiki overview, and community.

## Editorial Rules

- Answer the search question immediately in the summary and opening paragraph.
- Use the current official Early Access target of January 7, 2027; treat October 27, 2026 as superseded.
- Separate confirmed facts, stated plans, preview observations, and unknown details.
- Do not invent stats, classes, characters, bosses, prices, codes, performance figures, or platform releases.
- Link only to official Emberville, Cygnus Cross, Steam, Steam Community, Discord, Reddit, Twitch, and YouTube destinations that are present in the collected research.
- Do not link to competing guide sites or piracy/download mirrors.
- Keep titles at 40–60 characters and descriptions at 140–160 characters, with the primary page keyword in both.
- Use H2 sections and short, scannable paragraphs.
- Mark unresolved information as `To be confirmed`.

## Site Integration

- Place all thirteen launch pages under `src/content/wiki/en/guides/` because they are game-information and player-help search intents.
- Remove the eight fictional Anvil Quest articles.
- Replace template overview text for all seven navigation categories with honest Emberville-specific copy.
- Keep empty categories available for later verified content rather than publishing fabricated filler.

## Verification

- A content contract test validates the page set, SEO lengths, primary keyword presence, current release date, and absence of known fictional/demo terms.
- `pnpm check-config`, `pnpm check-content`, `pnpm check`, and `pnpm build` must pass before the site is considered launch-ready.
