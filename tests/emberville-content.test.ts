import * as fs from 'node:fs';
import { join } from 'node:path';
import { describe, expect, test } from 'vitest';

const root = join(process.cwd(), 'src', 'content', 'wiki', 'en', 'guides');
const bossRoot = join(process.cwd(), 'src', 'content', 'wiki', 'en', 'bosses');

const pages = [
  ['release-date', 'Emberville Release Date'],
  ['early-access', 'Emberville Early Access'],
  ['demo', 'Emberville Demo'],
  ['price', 'Emberville Price'],
  ['steam-deck', 'Emberville Steam Deck'],
  ['consoles', 'Emberville Console'],
  ['multiplayer', 'Emberville Multiplayer'],
  ['gameplay', 'Emberville Gameplay'],
  ['review', 'Emberville Review'],
  ['beginner-guide', 'Emberville Beginner Guide'],
  ['tips', 'Emberville Tips'],
  ['wiki', 'Emberville Wiki'],
  ['community', 'Emberville Community'],
] as const;

function readPage(slug: string): string {
  return fs.readFileSync(join(root, `${slug}.mdx`), 'utf8');
}

function frontmatterValue(source: string, key: string): string {
  const match = source.match(new RegExp(`^${key}: ['"](.+?)['"]$`, 'm'));
  if (!match) throw new Error(`Missing ${key}`);
  return match[1];
}

function bodyOf(source: string): string {
  return source.replace(/^---[\s\S]*?---\s*/m, '').replace(/^import .*$/gm, '').trim();
}

function proseWordCount(source: string): number {
  return bodyOf(source)
    .replace(/<[^>]+>/g, ' ')
    .replace(/[`*_#|{}[\]()>-]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function openingParagraph(source: string): string {
  return bodyOf(source).split(/\n\s*\n/).find((block) => !block.startsWith('#') && !block.startsWith('<')) ?? '';
}

describe('Emberville launch content', () => {
  test('publishes the exact thirteen merged search-intent pages', () => {
    const actual = fs
      .readdirSync(root)
      .filter((name) => name.endsWith('.mdx'))
      .map((name) => name.replace(/\.mdx$/, ''))
      .sort();
    expect(actual).toEqual(pages.map(([slug]) => slug).sort());
  });

  test.each(pages)('%s has compliant keyword-led SEO metadata', (slug, keyword) => {
    const source = readPage(slug);
    const title = frontmatterValue(source, 'title');
    const description = frontmatterValue(source, 'description');

    expect(title.length).toBeGreaterThanOrEqual(40);
    expect(title.length).toBeLessThanOrEqual(60);
    expect(description.length).toBeGreaterThanOrEqual(140);
    expect(description.length).toBeLessThanOrEqual(160);
    expect(title.toLowerCase()).toContain(keyword.toLowerCase());
    expect(description.toLowerCase()).toContain(keyword.toLowerCase());
    const summary = frontmatterValue(source, 'summary');
    const summaryWords = summary.trim().split(/\s+/).length;
    expect(summaryWords).toBeGreaterThanOrEqual(40);
    expect(summaryWords).toBeLessThanOrEqual(60);
    expect((source.match(/^## /gm) ?? []).length).toBeGreaterThanOrEqual(4);
    expect(openingParagraph(source).split(/\s+/).length).toBeGreaterThanOrEqual(25);
    expect(proseWordCount(source)).toBeGreaterThanOrEqual(900);
    expect(proseWordCount(source)).toBeLessThanOrEqual(1500);
  });

  test('publishes one evidence-limited Spider Matriarch boss guide', () => {
    const source = fs.readFileSync(join(bossRoot, 'spider-matriarch.mdx'), 'utf8');
    const title = frontmatterValue(source, 'title');
    const description = frontmatterValue(source, 'description');

    expect(title).toMatch(/Emberville Spider Matriarch/i);
    expect(title.length).toBeGreaterThanOrEqual(40);
    expect(title.length).toBeLessThanOrEqual(60);
    expect(description).toMatch(/Emberville Spider Matriarch/i);
    expect(description.length).toBeGreaterThanOrEqual(140);
    expect(description.length).toBeLessThanOrEqual(160);
    expect(source).toContain('gameVersion:');
    expect(source).toContain('[待补充]');
    expect(openingParagraph(source).split(/\s+/).length).toBeGreaterThanOrEqual(25);
    expect(proseWordCount(source)).toBeGreaterThanOrEqual(900);
    expect(proseWordCount(source)).toBeLessThanOrEqual(1500);
  });

  test('uses the current official release target and removes fictional demo lore', () => {
    const combined = pages.map(([slug]) => readPage(slug)).join('\n');
    expect(readPage('release-date')).toContain('January 7, 2027');
    expect(readPage('early-access')).toContain('January 7, 2027');
    expect(combined).not.toMatch(/Anvil Quest|Emberfang|Stormcaller|Frostbound Monarch|Forge Master Kael/i);
    expect(combined).not.toMatch(/launched (?:on |in )?October 27, 2026|live (?:on |as of )?October 27, 2026/i);
  });

  test('does not publish competitor or piracy destinations', () => {
    const boss = fs.existsSync(join(bossRoot, 'spider-matriarch.mdx'))
      ? fs.readFileSync(join(bossRoot, 'spider-matriarch.mdx'), 'utf8')
      : '';
    const combined = `${pages.map(([slug]) => readPage(slug)).join('\n')}\n${boss}`;
    expect(combined).not.toMatch(/gamerempire|cozygameguides|emberville-game\.wiki|gog unlocked|igg|torrent/i);
  });
});
