import * as fs from 'node:fs';
import { join } from 'node:path';
import { describe, expect, test } from 'vitest';

const root = process.cwd();
const read = (path: string) => fs.readFileSync(join(root, path), 'utf8');

describe('Emberville useful navigation and homepage actions', () => {
  test('header exposes only live content categories and no unavailable tools', () => {
    const navigation = read('src/config/navigation.ts');
    const header = read('src/components/header/SiteHeader.astro');

    expect(navigation).toMatch(
      /PRIMARY_NAV_KEYS[^\n]*\['guides', 'classes', 'skills', 'mechanics', 'bosses'\]/,
    );
    const liveKeyPositions = ['guides', 'classes', 'skills', 'mechanics', 'bosses'].map((key) =>
      navigation.indexOf(`key: '${key}'`),
    );
    expect(liveKeyPositions).toEqual([...liveKeyPositions].sort((a, b) => a - b));
    expect(header).toContain('PRIMARY_NAV_KEYS');
    expect(header).not.toContain('/tools/crafting-planner');
    expect(header).not.toContain('craftingPlanner');
  });

  test('article sidebar hides empty and draft-only categories', () => {
    const sidebar = read('src/components/sidebar/WikiSidebar.astro');
    expect(sidebar).toContain('PRIMARY_NAV_KEYS');
    expect(sidebar).toMatch(/getDynamicNavigation\(locale, nav\)\)\.filter/);
  });

  test.each(['classes', 'skills', 'mechanics'])(
    'Chinese %s navigation destination has a substantive landing page',
    (key) => {
      const page = `src/pages/zh/${key}/index.astro`;
      expect(fs.existsSync(join(root, page))).toBe(true);
      expect(read(page)).toMatch(/<h1|SkillsDirectory/);
    },
  );

  test('footer omits unavailable Crafting Planner and empty FAQ destinations', () => {
    const footer = read('src/components/footer/SiteFooter.astro');
    expect(footer).not.toContain('/tools/crafting-planner');
    expect(footer).not.toContain('footer.tools');
    expect(footer).not.toMatch(/['"]faq['"]/);
  });

  test('homepage actions target the beginner guide and official trailer', () => {
    const home = read('src/components/home/HomePage.astro');
    const video = read('src/components/home/VideoSection.astro');
    expect(home).toContain("detailPath('guides', 'beginner-guide', locale)");
    expect(home).toContain('href="#official-trailer"');
    expect(video).toContain('id="official-trailer"');
  });

  test.each(['en', 'zh'])(
    '%s homepage config includes the official trailer and no empty destinations',
    (locale) => {
      const ui = JSON.parse(read(`src/locales/${locale}.json`));
      expect(ui.home.hero.videoId).toBe('hPsCEHnjBJc');

      const destinations = [
        ...ui.home.start.cards.map((card: { href: string }) => card.href),
        ...ui.home.popular.quickLinks.map((link: { href: string }) => link.href),
      ];
      expect(destinations).not.toContain('/tools/crafting-planner/');
      expect(destinations.join('\n')).not.toMatch(/^\/(items|characters|builds|tier-list)\/?$/m);
      if (locale === 'zh') {
        expect(destinations).not.toContain('/guides');
        expect(destinations).not.toContain('/bosses');
      }
      expect(JSON.stringify(ui.home)).not.toMatch(/starter codes|Replace this overview text/i);
      expect(ui.overview.bosses.overviewDescription).not.toMatch(/Replace this overview text/i);
    },
  );

  test('skills landing page does not promote the unavailable planner', () => {
    const skills = read('src/pages/skills/index.astro');
    expect(skills).not.toContain('/tools/crafting-planner/');
  });
});
