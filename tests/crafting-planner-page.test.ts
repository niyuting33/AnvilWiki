import * as fs from 'node:fs';
import { join } from 'node:path';
import { describe, expect, test } from 'vitest';

const pagePath = join(process.cwd(), 'src', 'pages', 'tools', 'crafting-planner.astro');
const componentPath = join(process.cwd(), 'src', 'components', 'tools', 'CraftingPlanner.astro');

describe('Crafting Planner page', () => {
  test('ships a default-locale tool route with honest metadata', () => {
    const source = fs.readFileSync(pagePath, 'utf8');
    expect(source).toContain('Crafting Planner (Beta)');
    expect(source).toContain('availableLocales={[defaultLocale]}');
    expect(source).toContain('<CraftingPlanner');
    expect(source).toContain('noindex');
  });

  test('empty FAQ routes stay out of search until useful answers exist', () => {
    for (const route of ['src/pages/faq.astro', 'src/pages/[locale]/faq.astro']) {
      const source = fs.readFileSync(join(process.cwd(), route), 'utf8');
      expect(source).toContain('noindex={faq.items.length === 0}');
    }

    const layout = fs.readFileSync(
      join(process.cwd(), 'src/components/layout/BaseLayout.astro'),
      'utf8',
    );
    expect(layout).toContain('content="noindex, follow"');
  });

  test('uses only the verified recipe dataset and explains an empty dataset', () => {
    const source = fs.readFileSync(componentPath, 'utf8');
    expect(source).toContain('verifiedEmbervilleRecipes');
    expect(source).toContain('No verified recipes are available yet');
    expect(source).toContain('first-party or in-game evidence');
  });

  test('has usable planner controls and browser-local persistence', () => {
    const source = fs.readFileSync(componentPath, 'utf8');
    for (const marker of [
      'data-planner-search',
      'data-planner-category',
      'data-planner-recipe',
      'data-planner-output',
      'data-planner-results',
      'data-copy-list',
    ]) {
      expect(source).toContain(marker);
    }
    expect(source).toContain('emberville-crafting-planner:v1');
    expect(source).toContain('decodeCraftingPlannerState');
    expect(source).toContain('aria-live="polite"');
  });
});
