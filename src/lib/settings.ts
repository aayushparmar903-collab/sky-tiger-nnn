import { readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";
import { PRODUCTS } from "./products";

/**
 * Server-only product visibility settings, persisted to product-settings.json
 * in the project root so the /admin panel can toggle product cards at runtime
 * without a database.
 */

export interface ProductSettings {
  enabled: Record<string, boolean>;
  updatedAt: string;
}

const SETTINGS_PATH = path.join(process.cwd(), "product-settings.json");

export const PRODUCT_IDS = PRODUCTS.map((p) => p.id);

export function defaultSettings(): ProductSettings {
  return {
    enabled: Object.fromEntries(PRODUCT_IDS.map((id) => [id, true])),
    updatedAt: new Date().toISOString(),
  };
}

export function getProductSettings(): ProductSettings {
  try {
    if (existsSync(SETTINGS_PATH)) {
      const raw = JSON.parse(readFileSync(SETTINGS_PATH, "utf-8"));
      const defaults = defaultSettings();
      for (const id of PRODUCT_IDS) {
        if (typeof raw?.enabled?.[id] === "boolean") {
          defaults.enabled[id] = raw.enabled[id];
        }
      }
      defaults.updatedAt = typeof raw?.updatedAt === "string" ? raw.updatedAt : defaults.updatedAt;
      return defaults;
    }
  } catch {
    // fall through to defaults on any read/parse error
  }
  return defaultSettings();
}

export function saveProductSettings(enabled: Record<string, boolean>): ProductSettings {
  // never allow every product to be switched off — the page must keep one card
  const anyOn = PRODUCT_IDS.some((id) => enabled[id]);
  const safe = anyOn ? enabled : { ...enabled, [PRODUCT_IDS[0]]: true };
  const settings: ProductSettings = { enabled: safe, updatedAt: new Date().toISOString() };
  writeFileSync(SETTINGS_PATH, JSON.stringify(settings, null, 2), "utf-8");
  return settings;
}
