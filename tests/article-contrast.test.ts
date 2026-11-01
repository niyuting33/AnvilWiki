import * as fs from 'node:fs';
import { join } from 'node:path';
import { describe, expect, test } from 'vitest';

const root = process.cwd();
const read = (path: string) => fs.readFileSync(join(root, path), 'utf8');

describe('article text contrast on the game background', () => {
  test.each(['src/components/article/ArticlePage.astro', 'src/components/layout/LegalPage.astro'])(
    '%s uses high-contrast prose in every theme state',
    (path) => {
      const source = read(path);
      expect(source).toMatch(/class="[^"]*\bprose-invert\b/);
      expect(source).not.toContain('dark:prose-invert');
    },
  );
});
