import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { readJson, writeJson } from "./storage";

/**
 * Server-only admin authentication helpers.
 *
 * Credentials resolve in this order:
 *   1. admin-credentials.json (Vercel Blob in production, local file
 *      elsewhere — written when the admin changes username/password
 *      from the /admin panel)
 *   2. env vars ADMIN_USER / ADMIN_PASS
 *   3. dev defaults admin / rayz247
 *
 * ADMIN_SECRET (default "onexall-vip-admin-secret") seeds the session token.
 * The stored credentials contain only a SHA-256 hash of the password.
 */

export const ADMIN_COOKIE = "onexall_vip_admin";

const CREDS_NAME = "admin-credentials.json";

interface StoredCreds {
  user: string;
  passHash: string;
}

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

async function readStored(): Promise<StoredCreds | null> {
  try {
    const raw = (await readJson(CREDS_NAME)) as Partial<StoredCreds> | null;
    if (typeof raw?.user === "string" && typeof raw?.passHash === "string") {
      return raw as StoredCreds;
    }
  } catch {
    // fall through
  }
  return null;
}

export async function currentUser(): Promise<string> {
  return (await readStored())?.user ?? process.env.ADMIN_USER ?? "admin";
}

async function currentPassHash(): Promise<string> {
  const stored = await readStored();
  if (stored) return stored.passHash;
  return sha256(process.env.ADMIN_PASS ?? "rayz247");
}

export async function expectedToken(): Promise<string> {
  const secret = process.env.ADMIN_SECRET ?? "onexall-vip-admin-secret";
  return sha256(`${await currentUser()}:${await currentPassHash()}:${secret}`);
}

export async function checkCredentials(username: string, password: string): Promise<boolean> {
  // timing-safe-ish: compare fixed-length hashes instead of raw strings
  const a = createHash("sha256").update(`${username}:${sha256(password)}`).digest();
  const b = createHash("sha256").update(`${await currentUser()}:${await currentPassHash()}`).digest();
  return a.equals(b);
}

export async function checkPassword(password: string): Promise<boolean> {
  const a = createHash("sha256").update(sha256(password)).digest();
  const b = createHash("sha256").update(await currentPassHash()).digest();
  return a.equals(b);
}

export async function saveCredentials(user: string, password: string): Promise<void> {
  const creds: StoredCreds = { user, passHash: sha256(password) };
  await writeJson(CREDS_NAME, creds);
}

export async function isAdminAuthed(): Promise<boolean> {
  const jar = await cookies();
  return jar.get(ADMIN_COOKIE)?.value === (await expectedToken());
}
