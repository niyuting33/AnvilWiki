import { describe, expect, test } from 'vitest';
import {
  CRAFTING_PLANNER_STORAGE_VERSION,
  decodeCraftingPlannerState,
  type CraftingPlannerState,
} from '../src/lib/crafting-planner';

const valid: CraftingPlannerState = {
  version: CRAFTING_PLANNER_STORAGE_VERSION,
  recipeId: 'iron-shield',
  outputQuantity: 2,
  inventory: { copper: 3, wood: 10 },
};

describe('decodeCraftingPlannerState', () => {
  test('accepts a current, well-formed saved state', () => {
    expect(decodeCraftingPlannerState(JSON.stringify(valid))).toEqual(valid);
  });

  test.each([
    null,
    '',
    '{broken',
    JSON.stringify({ ...valid, version: 0 }),
    JSON.stringify({ ...valid, outputQuantity: 0 }),
    JSON.stringify({ ...valid, outputQuantity: 1.5 }),
    JSON.stringify({ ...valid, inventory: { copper: -1 } }),
    JSON.stringify({ ...valid, inventory: { copper: '3' } }),
    JSON.stringify({ ...valid, recipeId: 7 }),
  ])('rejects corrupt, stale, or unsafe state: %s', (value) => {
    expect(decodeCraftingPlannerState(value)).toBeNull();
  });

  test('normalizes material IDs and sums duplicates safely', () => {
    const raw = JSON.stringify({
      ...valid,
      inventory: { Copper: 2, ' copper ': 3, WOOD: 0 },
    });

    expect(decodeCraftingPlannerState(raw)).toEqual({
      ...valid,
      inventory: { copper: 5 },
    });
  });
});
