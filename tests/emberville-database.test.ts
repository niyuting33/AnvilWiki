import * as fs from 'node:fs';
import { join } from 'node:path';
import { describe, expect, test } from 'vitest';

import {
  EMBERVILLE_CLASSES,
  EMBERVILLE_SKILLS,
  filterSkills,
} from '../src/data/emberville-database';

const root = process.cwd();
const read = (path: string) => fs.readFileSync(join(root, path), 'utf8');

describe('Emberville database trust model', () => {
  test('every class and skill exposes versioned evidence metadata', () => {
    for (const record of [...EMBERVILLE_CLASSES, ...EMBERVILLE_SKILLS]) {
      expect(['official', 'demo-observed', 'pending']).toContain(record.status);
      expect(record.gameVersion).toBeTruthy();
      expect(record.lastVerified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  test('pending records cannot publish exact gameplay numbers', () => {
    for (const record of EMBERVILLE_SKILLS.filter((entry) => entry.status === 'pending')) {
      expect(record).not.toHaveProperty('kymiaCost');
      expect(record).not.toHaveProperty('cooldownSeconds');
      expect(record).not.toHaveProperty('maxRanks');
      expect(record).not.toHaveProperty('damagePercent');
    }
  });

  test('shipped records never link to competitor sites', () => {
    const serialized = JSON.stringify({ classes: EMBERVILLE_CLASSES, skills: EMBERVILLE_SKILLS });
    expect(serialized).not.toMatch(/embervillers|emberville\.space|meowdb|emberviller\.wiki/i);
  });

  test('skills can be filtered by class, type, status and query', () => {
    const filtered = filterSkills(EMBERVILLE_SKILLS, {
      classKey: 'mage',
      type: 'active',
      status: 'demo-observed',
      query: 'kymia',
    });

    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((skill) => skill.classKey === 'mage')).toBe(true);
    expect(filtered.every((skill) => skill.type === 'active')).toBe(true);
    expect(filtered.every((skill) => skill.status === 'demo-observed')).toBe(true);
    expect(filtered.every((skill) => `${skill.name} ${skill.purpose}`.toLowerCase().includes('kymia'))).toBe(true);
  });

  test('skills directory communicates evidence and offers all four filters', () => {
    const directory = read('src/components/database/SkillsDirectory.astro');
    expect(directory).toContain('data-skill-search');
    expect(directory).toContain('data-filter-class');
    expect(directory).toContain('data-filter-type');
    expect(directory).toContain('data-filter-status');
    expect(directory).toMatch(/Demo snapshot|Steam Next Fest demo/);
    expect(directory).toContain('待复核');
  });
});
