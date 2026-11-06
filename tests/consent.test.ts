/**
 * Consent-literal contract — CONSENT_STORAGE_KEY / CONSENT_ACCEPTED_EVENT
 * are canonically exported from src/lib/shared-ui.ts but DUPLICATED as
 * string literals in three component scripts: CookieConsent's bundled
 * module cannot see frontmatter imports, and AdsterraSlot / MobileAnchorAd
 * run untranspiled is:inline scripts that cannot import at all.
 *
 * fail-closed direction: any single-sided rename means consumers can no
 * longer read the stored choice and the accept event never fires — ads
 * silently never load. This suite pins every duplicate to the canonical
 * export so a partial rename goes red instead.
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';
import { transformSync } from 'esbuild';
import { describe, expect, test } from 'vitest';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel: string) => readFileSync(join(root, rel), 'utf8');

/** Each consumer's own assignment idiom for the two literals. */
const CONSUMERS: { file: string; keyRe: RegExp; eventRe: RegExp }[] = [
  {
    file: 'src/components/layout/CookieConsent.astro',
    keyRe: /const KEY = '([^']+)'/,
    eventRe: /const ACCEPTED_EVENT = '([^']+)'/,
  },
  {
    file: 'src/components/ads/AdsterraSlot.astro',
    keyRe: /var CONSENT_KEY = '([^']+)'/,
    eventRe: /var CONSENT_EVENT = '([^']+)'/,
  },
  {
    file: 'src/components/ads/MobileAnchorAd.astro',
    keyRe: /var CONSENT_KEY = '([^']+)'/,
    eventRe: /var CONSENT_EVENT = '([^']+)'/,
  },
];

describe('consent literals pinned to shared-ui.ts', () => {
  const sharedUi = read('src/lib/shared-ui.ts');
  const storageKey = /export const CONSENT_STORAGE_KEY = '([^']+)'/.exec(sharedUi)?.[1];
  const acceptedEvent = /export const CONSENT_ACCEPTED_EVENT = '([^']+)'/.exec(sharedUi)?.[1];

  test('shared-ui.ts still exports both canonical constants', () => {
    expect(storageKey, 'CONSENT_STORAGE_KEY export missing in shared-ui.ts').toBeTruthy();
    expect(acceptedEvent, 'CONSENT_ACCEPTED_EVENT export missing in shared-ui.ts').toBeTruthy();
  });

  for (const { file, keyRe, eventRe } of CONSUMERS) {
    test(`${file} hardcodes the canonical values`, () => {
      const src = read(file);
      const key = keyRe.exec(src)?.[1];
      const event = eventRe.exec(src)?.[1];
      expect(key, `${file}: storage-key literal not found or drifted`).toBe(storageKey);
      expect(event, `${file}: accepted-event literal not found or drifted`).toBe(acceptedEvent);
    });
  }
});

// Execute the actual inline loader and bundled banner script. Only the DOM,
// storage and remote script boundary are simulated; no Clarity traffic is sent.
function consentPage(stored: string | null, projectId = 'testproject123', storageThrows = false) {
  const scripts = [...read('src/components/layout/BaseLayout.astro').matchAll(
    /<script\b[^>]*>([\s\S]*?)<\/script>/g,
  )];
  const loader = scripts.find((match) => match[1].includes('window.__awLoadTrackers ='))?.[1];
  if (!loader) throw new Error('Tracker loader not found');
  const bannerSource = /<script>([\s\S]*?)<\/script>/.exec(
    read('src/components/layout/CookieConsent.astro'),
  )?.[1];
  if (!bannerSource) throw new Error('Consent banner script not found');
  const requests: Array<{ src: string; async?: boolean }> = [];
  const clicks = new Map<string, () => void>();
  const banner = {
    hidden: true,
    remove() {},
    querySelector: (selector: string) => ({
      addEventListener: (_event: string, handler: () => void) => clicks.set(selector, handler),
    }),
  };
  const storage = new Map(stored === null ? [] : [['aw-cookie-consent', stored]]);
  const context = {
    gaId: '', adsenseClient: '', clarityProjectId: projectId,
    window: {} as Record<string, unknown>,
    document: {
      head: { appendChild: (script: { src: string; async?: boolean }) => requests.push(script) },
      createElement: () => ({}),
      getElementById: () => banner,
      dispatchEvent: () => true,
    },
    localStorage: {
      getItem: (key: string) => {
        if (storageThrows) throw new Error('Storage unavailable');
        return storage.get(key) ?? null;
      },
      setItem: (key: string, value: string) => {
        if (storageThrows) throw new Error('Storage unavailable');
        storage.set(key, value);
      },
    },
    CustomEvent: class { constructor(public type: string) {} },
  };
  runInNewContext(loader, context);
  runInNewContext(transformSync(bannerSource, { loader: 'ts' }).code, context);
  return {
    requests, banner, storage, context,
    accept: () => clicks.get('[data-consent-accept]')?.(),
    decline: () => clicks.get('[data-consent-decline]')?.(),
  };
}

describe('Clarity follows the real consent banner', () => {
  test('an undecided visitor sends no Clarity request', () => {
    const page = consentPage(null);
    expect(page.requests).toEqual([]);
    expect(page.banner.hidden).toBe(false);
  });

  test('accepting loads the configured async tag and grants analytics, not ads', () => {
    const page = consentPage(null);
    page.accept();
    expect(page.requests).toEqual([{ src: 'https://www.clarity.ms/tag/testproject123', async: true }]);
    const clarity = page.context.window.clarity as { q: IArguments[] };
    expect(Array.from(clarity.q[0])).toEqual([
      'consentv2', { analytics_Storage: 'granted', ad_Storage: 'denied' },
    ]);
    expect(page.storage.get('aw-cookie-consent')).toBe('accepted');
  });

  test('a returning accepted visitor loads Clarity only once', () => {
    const page = consentPage('accepted');
    (page.context.window.__awLoadTrackers as () => void)();
    expect(page.requests.map((script) => script.src)).toEqual(['https://www.clarity.ms/tag/testproject123']);
    expect(page.banner.hidden).toBe(true);
  });

  test('declining, now or on a later visit, sends no Clarity request', () => {
    const page = consentPage(null);
    page.decline();
    expect(page.requests).toEqual([]);
    expect(page.storage.get('aw-cookie-consent')).toBe('declined');
    expect(consentPage('declined').requests).toEqual([]);
  });

  test('disabled Clarity stays off even for an accepted visitor', () => {
    expect(consentPage('accepted', '').requests).toEqual([]);
  });

  test('unavailable storage stays off until the visitor explicitly accepts', () => {
    const page = consentPage(null, 'testproject123', true);
    expect(page.requests).toEqual([]);
    page.accept();
    expect(page.requests.map((script) => script.src)).toEqual(['https://www.clarity.ms/tag/testproject123']);
  });
});
