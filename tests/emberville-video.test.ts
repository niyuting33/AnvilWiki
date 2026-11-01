import * as fs from 'node:fs';
import { join } from 'node:path';
import { describe, expect, test } from 'vitest';

const source = fs.readFileSync(
  join(process.cwd(), 'src', 'content', 'wiki', 'en', 'guides', 'gameplay.mdx'),
  'utf8',
);

describe('Emberville official video', () => {
  test('registers and embeds the verified official reveal trailer', () => {
    expect(source).toContain("videos: ['hPsCEHnjBJc']");
    expect(source).toContain("import Video from '~/components/mdx/Video.astro';");
    expect(source).toContain('<Video id="hPsCEHnjBJc"');
    expect(source).toContain('Official Emberville Reveal Trailer');
  });

  test('explains the limits of trailer footage', () => {
    expect(source).toContain('not a current-build feature checklist');
  });
});
