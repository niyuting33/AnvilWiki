export interface CraftingIngredient {
  id: string;
  name: string;
  quantity: number;
}

export interface CraftingRecipe {
  id: string;
  outputName: string;
  outputQuantity: number;
  category: string;
  gameVersion: string;
  verificationStatus: 'verified';
  sourceNote: string;
  ingredients: readonly CraftingIngredient[];
}

export type Inventory = Readonly<Record<string, number>>;

export const CRAFTING_PLANNER_STORAGE_VERSION = 1 as const;

export interface CraftingPlannerState {
  version: typeof CRAFTING_PLANNER_STORAGE_VERSION;
  recipeId: string;
  outputQuantity: number;
  inventory: Inventory;
}

export interface CraftingPlanRow {
  id: string;
  name: string;
  required: number;
  owned: number;
  missing: number;
}

function normalizeMaterialId(id: string): string {
  return id.trim().toLowerCase();
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** Safely decodes untrusted localStorage data and rejects old schema versions. */
export function decodeCraftingPlannerState(raw: string | null): CraftingPlannerState | null {
  if (!raw) return null;

  try {
    const value: unknown = JSON.parse(raw);
    if (!isRecord(value) || value.version !== CRAFTING_PLANNER_STORAGE_VERSION) return null;
    if (typeof value.recipeId !== 'string') return null;
    if (parseCraftingQuantity(value.outputQuantity) === null) return null;
    if (!isRecord(value.inventory)) return null;

    const inventory: Record<string, number> = {};
    for (const [rawId, rawQuantity] of Object.entries(value.inventory)) {
      const id = normalizeMaterialId(rawId);
      if (!id || typeof rawQuantity !== 'number' || !Number.isSafeInteger(rawQuantity) || rawQuantity < 0) {
        return null;
      }
      if (rawQuantity === 0) continue;
      const next = (inventory[id] ?? 0) + rawQuantity;
      if (!Number.isSafeInteger(next)) return null;
      inventory[id] = next;
    }

    return {
      version: CRAFTING_PLANNER_STORAGE_VERSION,
      recipeId: value.recipeId,
      outputQuantity: value.outputQuantity as number,
      inventory,
    };
  } catch {
    return null;
  }
}

export function parseCraftingQuantity(value: unknown): number | null {
  if (typeof value === 'string' && value.trim() === '') return null;
  if (typeof value !== 'string' && typeof value !== 'number') return null;

  const quantity = typeof value === 'number' ? value : Number(value.trim());
  return Number.isSafeInteger(quantity) && quantity > 0 ? quantity : null;
}

function requirePositiveInteger(value: number, label: string): number {
  const parsed = parseCraftingQuantity(value);
  if (parsed === null) throw new RangeError(`${label} must be a safe positive integer.`);
  return parsed;
}

export function calculateCraftingPlan(
  recipe: CraftingRecipe,
  inventory: Inventory,
  outputQuantity: number,
): CraftingPlanRow[] {
  const requestedOutput = requirePositiveInteger(outputQuantity, 'Output quantity');
  const recipeOutput = requirePositiveInteger(recipe.outputQuantity, 'Recipe output quantity');
  const batches = Math.ceil(requestedOutput / recipeOutput);
  const rows = new Map<string, CraftingPlanRow>();

  for (const ingredient of recipe.ingredients) {
    const id = normalizeMaterialId(ingredient.id);
    if (!id) throw new RangeError('Ingredient ID must not be empty.');

    const perBatch = requirePositiveInteger(ingredient.quantity, `Ingredient ${id} quantity`);
    const existing = rows.get(id);
    const required = (existing?.required ?? 0) + perBatch * batches;
    if (!Number.isSafeInteger(required)) {
      throw new RangeError(`Required quantity for ${id} exceeds the safe integer limit.`);
    }

    const rawOwned = inventory[id] ?? 0;
    const owned = rawOwned === 0 ? 0 : requirePositiveInteger(rawOwned, `Inventory ${id} quantity`);
    rows.set(id, {
      id,
      name: existing?.name ?? ingredient.name,
      required,
      owned,
      missing: Math.max(required - owned, 0),
    });
  }

  return [...rows.values()];
}
