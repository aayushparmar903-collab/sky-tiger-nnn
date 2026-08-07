import { PRODUCTS } from "./products";
import { readJson, writeJson } from "./storage";

/**
 * Server-only product visibility settings, persisted to product-settings.json
 * (Vercel Blob in production, local file elsewhere) so the /admin panel can
 * toggle product cards at runtime without a database.
 */

export interface ProductSettings {
  enabled: Record<string, boolean>;
  /** product ids in display order (first = shown first on the page) */
  order: string[];
  updatedAt: string;
}

const SETTINGS_NAME = "product-settings.json";

export const PRODUCT_IDS = PRODUCTS.map((p) => p.id);

/** Keep only known ids, then append any new products at the end. */
function sanitizeOrder(stored: unknown): string[] {
  const list = Array.isArray(stored)
    ? stored.filter((id): id is string => typeof id === "string" && (PRODUCT_IDS as string[]).includes(id))
    : [];
  const missing = PRODUCT_IDS.filter((id) => !list.includes(id));
  return [...list, ...missing];
}

export function defaultSettings(): ProductSettings {
  return {
    enabled: Object.fromEntries(PRODUCT_IDS.map((id) => [id, true])),
    order: [...PRODUCT_IDS],
    updatedAt: new Date().toISOString(),
  };
}

export async function getProductSettings(): Promise<ProductSettings> {
  try {
    const raw = await readJson(SETTINGS_NAME);
    if (raw) {
      const defaults = defaultSettings();
      const stored = raw as Partial<ProductSettings>;
      for (const id of PRODUCT_IDS) {
        if (typeof stored?.enabled?.[id] === "boolean") {
          defaults.enabled[id] = stored.enabled[id];
        }
      }
      defaults.order = sanitizeOrder(stored?.order);
      defaults.updatedAt = typeof stored?.updatedAt === "string" ? stored.updatedAt : defaults.updatedAt;
      return defaults;
    }
  } catch {
    // fall through to defaults on any read/parse error
  }
  return defaultSettings();
}

export async function saveProductSettings(
  enabled: Record<string, boolean>,
  order?: unknown
): Promise<ProductSettings> {
  // never allow every product to be switched off — the page must keep one card
  const anyOn = PRODUCT_IDS.some((id) => enabled[id]);
  const safe = anyOn ? enabled : { ...enabled, [PRODUCT_IDS[0]]: true };
  const settings: ProductSettings = {
    enabled: safe,
    order: sanitizeOrder(order),
    updatedAt: new Date().toISOString(),
  };
  await writeJson(SETTINGS_NAME, settings);
  return settings;
}
