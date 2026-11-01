import { describe, expect, test } from 'vitest';
import {
  calculateCraftingPlan,
  parseCraftingQuantity,
  type CraftingRecipe,
} from '../src/lib/crafting-planner';
import { verifiedEmbervilleRecipes } from '../src/data/emberville-recipes';

const fixtureRecipe: CraftingRecipe = {
  id: 'test-field-kit',
  outputName: 'Test Field Kit',
  outputQuantity: 2,
  category: 'test-only',
  gameVersion: 'test-build',
  verificationStatus: 'verified',
  sourceNote: 'Test fixture; not game data.',
  ingredients: [
    { id: 'softwood', name: 'Softwood', quantity: 3 },
    { id: 'resin', name: 'Resin', quantity: 2 },
    { id: ' softwood ', name: 'Softwood', quantity: 1 },
  ],
};

describe('calculateCraftingPlan', () => {
  test('scales and aggregates ingredients without mutating its inputs', () => {
    const recipeBefore = structuredClone(fixtureRecipe);
    const inventory = { softwood: 5, resin: 8 };
    const inventoryBefore = structuredClone(inventory);

    expect(calculateCraftingPlan(fixtureRecipe, inventory, 4)).toEqual([
      { id: 'softwood', name: 'Softwood', required: 8, owned: 5, missing: 3 },
      { id: 'resin', name: 'Resin', required: 4, owned: 8, missing: 0 },
    ]);
    expect(fixtureRecipe).toEqual(recipeBefore);
    expect(inventory).toEqual(inventoryBefore);
  });

  test('treats absent inventory entries as zero', () => {
    expect(calculateCraftingPlan(fixtureRecipe, {}, 2)).toEqual([
      { id: 'softwood', name: 'Softwood', required: 4, owned: 0, missing: 4 },
      { id: 'resin', name: 'Resin', required: 2, owned: 0, missing: 2 },
    ]);
  });

  test.each([0, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY, Number.MAX_SAFE_INTEGER + 1])(
    'rejects invalid requested output quantity %s',
    (quantity) => {
      expect(() => calculateCraftingPlan(fixtureRecipe, {}, quantity)).toThrow(RangeError);
    },
  );
});

describe('parseCraftingQuantity', () => {
  test.each([
    [1, 1],
    ['1', 1],
    [' 42 ', 42],
    [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  ])('accepts safe positive integer %s', (input, expected) => {
    expect(parseCraftingQuantity(input)).toBe(expected);
  });

  test.each([
    0,
    -1,
    1.5,
    '',
    '   ',
    '1.5',
    'abc',
    Number.NaN,
    Number.POSITIVE_INFINITY,
    Number.MAX_SAFE_INTEGER + 1,
  ])('rejects invalid quantity %s', (input) => {
    expect(parseCraftingQuantity(input)).toBeNull();
  });
});

describe('verified Emberville recipe data', () => {
  test('starts empty and immutable until first-party recipes are verified', () => {
    expect(verifiedEmbervilleRecipes).toEqual([]);
    expect(Object.isFrozen(verifiedEmbervilleRecipes)).toBe(true);
  });
});
