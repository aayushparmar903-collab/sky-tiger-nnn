import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * Tiny JSON persistence layer.
 *
 * On Vercel the project filesystem is read-only, so when a Blob store is
 * connected (BLOB_READ_WRITE_TOKEN is present) data lives in Vercel Blob.
 * Everywhere else (local dev, Hostinger VPS) it falls back to a JSON file
 * in the project root, exactly as before.
 */

function useBlob(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export async function readJson(name: string): Promise<unknown | null> {
  if (useBlob()) {
    const { get } = await import("@vercel/blob");
    const result = await get(name, { access: "private", useCache: false });
    if (!result || result.statusCode !== 200 || !result.stream) return null;
    const text = await new Response(result.stream).text();
    try {
      return JSON.parse(text);
    } catch {
      return null;
    }
  }

  try {
    const text = await readFile(path.join(process.cwd(), name), "utf-8");
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export async function writeJson(name: string, data: unknown): Promise<void> {
  const text = JSON.stringify(data, null, 2);

  if (useBlob()) {
    const { put } = await import("@vercel/blob");
    await put(name, text, {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
    return;
  }

  await writeFile(path.join(process.cwd(), name), text, "utf-8");
}
