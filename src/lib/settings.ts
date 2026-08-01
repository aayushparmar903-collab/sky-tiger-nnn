import { PRODUCTS } from "./products";
import { readJson, writeJson } from "./storage";

/**
 * Server-only product visibility settings, persisted to product-settings.json
 * (Vercel Blob in production, local file elsewhere) so the /admin panel can
 * toggle product cards at runtime without a database.
 */

export interface ProductSettings {
  enabled: Record<string, boolean>;
  updatedAt: string;
}

const SETTINGS_NAME = "product-settings.json";

export const PRODUCT_IDS = PRODUCTS.map((p) => p.id);

export function defaultSettings(): ProductSettings {
  return {
    enabled: Object.fromEntries(PRODUCT_IDS.map((id) => [id, true])),
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
      defaults.updatedAt = typeof stored?.updatedAt === "string" ? stored.updatedAt : defaults.updatedAt;
      return defaults;
    }
  } catch {
    // fall through to defaults on any read/parse error
  }
  return defaultSettings();
}

export async function saveProductSettings(enabled: Record<string, boolean>): Promise<ProductSettings> {
  // never allow every product to be switched off — the page must keep one card
  const anyOn = PRODUCT_IDS.some((id) => enabled[id]);
  const safe = anyOn ? enabled : { ...enabled, [PRODUCT_IDS[0]]: true };
  const settings: ProductSettings = { enabled: safe, updatedAt: new Date().toISOString() };
  await writeJson(SETTINGS_NAME, settings);
  return settings;
}
