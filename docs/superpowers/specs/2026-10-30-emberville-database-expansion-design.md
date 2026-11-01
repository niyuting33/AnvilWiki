# Emberville Database Expansion Design

## Goal

Expand the existing Emberville guide site with useful database-style content while preserving the site's trust standard: no invented facts, no copied competitor prose or assets, and no empty categories promoted in primary navigation.

## Scope

The first delivery adds three public content areas:

1. **Classes** — a class-system overview with clearly separated official facts and Steam Next Fest demo observations.
2. **Skills** — a searchable and filterable directory organized by class and active/passive type.
3. **Mechanics** — verified explanations of class switching, skill inheritance, weapon-bound combos, Kymia, gathering/crafting, town rebuilding, and the Estate.

Items, recipes, and monsters receive reusable data structures only when those structures are needed by the first delivery. They remain out of primary navigation until verified content exists. The existing Crafting Planner remains the canonical crafting tool and will eventually consume the same recipe data as recipe pages.

## Information Trust Model

Every structured record carries provenance and status metadata:

- `official`: directly supported by Cygnus Cross or the official Steam listing.
- `demo-observed`: observed in the Steam Next Fest demo but subject to change.
- `pending`: mentioned by a secondary source but not independently verified.

Exact skill costs, cooldowns, rank caps, damage percentages, class base stats, item prices, recipes, and loot tables are not treated as official unless independently supported. Pending values render as `待复核` and do not power recommendations, rankings, or calculators.

All public database pages show the applicable game/demo version and last verification date. Content that cannot meet the minimum evidence threshold remains `draft: true` or is omitted.

## Navigation and Routes

Primary navigation order:

1. Guides
2. Classes
3. Skills
4. Mechanics
5. Bosses
6. Crafting Planner

Routes use existing trailing-slash conventions:

- `/classes/`
- `/skills/`
- `/mechanics/`
- `/tools/crafting-planner/`

Only categories with substantive public content appear in the header and sidebar. Empty Items, Recipes, Monsters, Builds, and Tier List categories remain hidden.

## Page Design

### Classes

The category page answers how Emberville classes work before listing known demo classes. Each class entry shows availability, playstyle, evidence status, and links to related skills. Unverified numeric attributes are omitted rather than copied.

### Skills

The directory supports client-side-free filtering wherever possible through accessible HTML controls and a small progressive-enhancement script only if necessary. Filters include:

- class
- active/passive type
- verification status
- text search

Cards prioritize the skill's purpose and evidence status. Numeric fields are rendered only when their evidence is sufficient; otherwise they display `待复核`.

### Mechanics

Mechanics are presented as question-led sections whose first paragraph directly answers the question. Officially supported systems are published as normal content; demo-only behavior is labeled and version-sensitive details use warning callouts.

## Source and Copyright Policy

Competitor sites are used only to discover user needs and potential data fields. Their prose, images, icons, page code, database exports, and proprietary organization are not copied. Game facts are checked against official Steam/Cygnus Cross material or corroborated sources. Any community-extracted demo data is attributed generically as a demo observation and clearly labeled version-sensitive.

## Validation

Implementation is complete only when all of the following pass:

- focused tests for navigation, database records, filters, and verification labels
- `pnpm check-content`
- `pnpm check-config`
- `pnpm test`
- `pnpm build`
- desktop and mobile visual checks for all new public routes
