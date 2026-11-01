import * as fs from 'node:fs';
import { join } from 'node:path';
import { describe, expect, test } from 'vitest';

const root = process.cwd();
const read = (path: string) => fs.readFileSync(join(root, path), 'utf8');

describe('Emberville release date and category videos', () => {
  test('homepage derives the current release date from site config and links its evidence page', () => {
    const home = read('src/components/home/HomePage.astro');
    expect(home).toContain('site.game.releaseDate');
    expect(home).toContain("detailPath('guides', 'release-date', locale)");
    expect(home).toContain('<time');
  });

  test('all five primary content sections have a curated video configuration', () => {
    const config = read('src/config/category-videos.ts');
    for (const category of ['guides', 'classes', 'skills', 'mechanics', 'bosses']) {
      expect(config).toMatch(new RegExp(`\\b${category}:\\s*{`));
    }
    expect(config).toContain('videoId');
    expect(config).toContain('sourceUrl');
    expect(config).toContain('versionNote');
    expect(config).toContain('watchFor');
  });

  test('category video uses the shared click-to-load YouTube player', () => {
    const component = read('src/components/video/CategoryVideo.astro');
    expect(component).toContain("from '~/components/video/LazyYouTube.astro'");
    expect(component).toContain('<LazyYouTube');
    expect(component).toContain('video.sourceUrl');
    expect(component).toContain('copy.versionNote');
    expect(component).toContain('copy.watchFor');
  });

  test('dynamic category lists and custom skill pages render the category video module', () => {
    expect(read('src/components/article/ListPage.astro')).toContain('<CategoryVideo');
    for (const page of [
      'src/pages/skills/index.astro',
      'src/pages/zh/classes/index.astro',
      'src/pages/zh/mechanics/index.astro',
      'src/pages/zh/skills/index.astro',
    ]) {
      expect(read(page)).toContain('<CategoryVideo');
    }
  });
});
