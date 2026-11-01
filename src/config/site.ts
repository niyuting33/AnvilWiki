/**
 * Site configuration — the single source of truth for game-specific metadata.
 *
 * 👉 APPLY TEMPLATE: Change every field here when building a new game wiki.
 * This is part of the CONFIG LAYER — framework code reads from here, never the reverse.
 */

export interface SiteConfig {
  /** Full site name, used in <title> suffix and Organization JSON-LD. e.g. "Anvil Quest Wiki" */
  name: string;
  /** Short name for PWA manifest, mobile logo, and the long-title <title> suffix (>50 chars). e.g. "AQ Wiki" */
  shortName: string;
  /** Site description for Organization JSON-LD and og:site_name. */
  description: string;
  /** Domain without protocol or trailing slash. e.g. "anvilquestwiki.wiki" */
  domain: string;
  /** Hero tagline shown under the site title. */
  tagline: string;
  /** Copyright / legal disclaimer line shown in footer. */
  legalNotice: string;
  /**
   * Optional public contact email — rendered as a mailto link on the contact
   * page when set. AdSense reviewers look for a reachable contact channel;
   * if you run no social channels, set this.
   */
  contactEmail?: string;
  social: {
    /** Official store / play URL. */
    official: string;
    /** Official developer or game website. */
    website?: string;
    discord?: string;
    youtube?: string;
    twitter?: string;
    reddit?: string;
    instagram?: string;
    facebook?: string;
    bluesky?: string;
    linktree?: string;
  };
  /**
   * Canonical URLs about the GAME (Steam page, official site, Wikipedia entry…).
   * Emitted as Organization JSON-LD `sameAs` — helps Google / AI engines link
   * this wiki to the game's knowledge-graph entity.
   */
  sameAs?: string[];
  game: {
    /** Full game name. */
    name: string;
    /** Platform: "Roblox" | "Steam" | "Epic Games" | "Mobile" | ... */
    platform: string;
    /** Developer / studio name. */
    developer: string;
    /** Genre description. */
    genre: string;
    /** ISO release date (optional). */
    releaseDate?: string;
  };
  /**
   * Dimensions of the default OG/Twitter share image (public/images/hero.webp).
   * Emitted as og:image:width / og:image:height so social crawlers can render
   * the share card without downloading the image first.
   */
  ogImageWidth: number;
  ogImageHeight: number;
  /** Default author name for articles without an explicit `author` in frontmatter (E-E-A-T signal). */
  defaultAuthor?: string;
}

export const site: SiteConfig = {
  name: 'Emberville Wiki',
  shortName: 'E Wiki',
  description: 'Emberville guides featuring beginner tips, quest walkthroughs, items, bosses, character builds, and the latest game updates.',
  domain: 'niyuting33.pages.dev',
  tagline: 'Rebuild the town. Conquer the Vitromotus.',
  legalNotice: 'Emberville Wiki is a fan-made community site. Not affiliated with or endorsed by the game developer.',
  // Set a real address if you run no social channels — the contact page
  // renders it as a mailto link.
  contactEmail: '',
  social: {
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
  },
  sameAs: [
    'https://www.cygnuscross.com/',
    'https://store.steampowered.com/app/2295170/Emberville/',
    'https://discord.gg/emberville',
    'https://www.youtube.com/@embervillegame',
    'https://x.com/EmbervilleGame',
    'https://www.reddit.com/r/Emberville_Official/',
    'https://www.instagram.com/embervillegame/',
    'https://www.facebook.com/EmbervilleGame/',
    'https://bsky.app/profile/emberville.bsky.social',
    'https://linktr.ee/emberville',
  ],
  game: {
    name: 'Emberville',
    platform: 'PC (Windows）',
    developer: 'Cygnus Cross',
    genre: 'Action RPG / Action-Adventure / Dungeon Crawler',
    releaseDate: '2027-01-07',
  },
  // og:image dims of the SHIPPED hero.webp — if you replace public/images/hero.webp,
  // update these in src/config/site.ts to match (wrong dims mis-crop share cards).
  ogImageWidth: 1200,
  ogImageHeight: 630,
};

/** Absolute site URL (no trailing slash). Falls back to the Astro `site` config. */
export const siteUrl: string = (process.env.SITE_URL || `https://${site.domain}`).replace(
  /\/$/,
  '',
);
