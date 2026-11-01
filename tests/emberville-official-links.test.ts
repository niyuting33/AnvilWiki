import * as fs from 'node:fs';
import { join } from 'node:path';
import { describe, expect, test } from 'vitest';
import { site } from '../src/config/site';

const expected = {
  website: 'https://www.cygnuscross.com/',
  official: 'https://store.steampowered.com/app/2295170/Emberville/',
  discord: 'https://discord.gg/emberville',
  youtube: 'https://www.youtube.com/@embervillegame',
  twitter: 'https://x.com/EmbervilleGame',
  reddit: 'https://www.reddit.com/r/Emberville_Official/',
  instagram: 'https://www.instagram.com/embervillegame/',
  facebook: 'https://www.facebook.com/EmbervilleGame/',
  bluesky: 'https://bsky.app/profile/emberville.bsky.social',
  linktree: 'https://linktr.ee/emberville',
} as const;

describe('Emberville official destinations', () => {
  test('keeps every verified official account in the central site config', () => {
    expect(site.social).toEqual(expect.objectContaining(expected));
  });

  test('adds every official destination to sameAs exactly once', () => {
    expect(site.sameAs).toBeDefined();
    for (const url of Object.values(expected)) {
      expect(site.sameAs?.filter((entry) => entry === url)).toHaveLength(1);
    }
    expect(new Set(site.sameAs).size).toBe(site.sameAs?.length);
  });
});

describe('Official Links footer', () => {
  const footerSource = fs.readFileSync(
    join(process.cwd(), 'src', 'components', 'footer', 'SiteFooter.astro'),
    'utf8',
  );
  const en = JSON.parse(fs.readFileSync(join(process.cwd(), 'src', 'locales', 'en.json'), 'utf8'));
  const zh = JSON.parse(fs.readFileSync(join(process.cwd(), 'src', 'locales', 'zh.json'), 'utf8'));

  test('renders configured external destinations safely', () => {
    for (const key of Object.keys(expected)) {
      expect(footerSource).toContain(`site.social.${key}`);
    }
    expect(footerSource).toContain('target="_blank"');
    expect(footerSource).toContain('rel="noopener noreferrer"');
  });

  test('provides localized Official Links and Tools labels', () => {
    for (const locale of [en, zh]) {
      expect(locale.footer.officialLinks).toBe('Official Links');
      expect(locale.footer.tools).toBe('Tools');
      expect(locale.footer.craftingPlanner).toBe('Crafting Planner');
      expect(locale.footer.officialWebsite).toBe('Official Website');
      expect(locale.footer.officialInstagram).toBe('Official Instagram');
      expect(locale.footer.officialFacebook).toBe('Official Facebook');
      expect(locale.footer.officialBluesky).toBe('Official Bluesky');
      expect(locale.footer.officialLinktree).toBe('Official Linktree');
    }
  });

  test('hides the unavailable planner and preserves the fan-site disclaimer', () => {
    expect(footerSource).not.toContain("localizePath('/tools/crafting-planner', locale)");
    expect(footerSource).toContain('site.legalNotice');
  });
});
