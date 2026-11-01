import type { CraftingRecipe } from '~/lib/crafting-planner';

/**
 * Only first-party or user-supplied in-game evidence may enter this list.
 * Keep it empty until a complete recipe is verified for the named build.
 */
export const verifiedEmbervilleRecipes: readonly CraftingRecipe[] = Object.freeze([]);
