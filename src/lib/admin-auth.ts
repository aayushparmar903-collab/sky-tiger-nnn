import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import { cookies } from "next/headers";

/**
 * Server-only admin authentication helpers.
 *
 * Credentials resolve in this order:
 *   1. admin-credentials.json in the project root (written when the admin
 *      changes username/password from the /admin panel)
 *   2. env vars ADMIN_USER / ADMIN_PASS
 *   3. dev defaults admin / rayz247
 *
 * ADMIN_SECRET (default "onexall-vip-admin-secret") seeds the session token.
 * The credentials file stores only a SHA-256 hash of the password.
 */

export const ADMIN_COOKIE = "onexall_vip_admin";

const CREDS_PATH = path.join(process.cwd(), "admin-credentials.json");

interface StoredCreds {
  user: string;
  passHash: string;
}

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function readStored(): StoredCreds | null {
  try {
    if (existsSync(CREDS_PATH)) {
      const raw = JSON.parse(readFileSync(CREDS_PATH, "utf-8"));
      if (typeof raw?.user === "string" && typeof raw?.passHash === "string") {
        return raw as StoredCreds;
      }
    }
  } catch {
    // fall through
  }
  return null;
}

export function currentUser(): string {
  return readStored()?.user ?? process.env.ADMIN_USER ?? "admin";
}

function currentPassHash(): string {
  const stored = readStored();
  if (stored) return stored.passHash;
  return sha256(process.env.ADMIN_PASS ?? "rayz247");
}

export function expectedToken(): string {
  const secret = process.env.ADMIN_SECRET ?? "onexall-vip-admin-secret";
  return sha256(`${currentUser()}:${currentPassHash()}:${secret}`);
}

export function checkCredentials(username: string, password: string): boolean {
  // timing-safe-ish: compare fixed-length hashes instead of raw strings
  const a = createHash("sha256").update(`${username}:${sha256(password)}`).digest();
  const b = createHash("sha256").update(`${currentUser()}:${currentPassHash()}`).digest();
  return a.equals(b);
}

export function checkPassword(password: string): boolean {
  const a = createHash("sha256").update(sha256(password)).digest();
  const b = createHash("sha256").update(currentPassHash()).digest();
  return a.equals(b);
}

export function saveCredentials(user: string, password: string): void {
  const creds: StoredCreds = { user, passHash: sha256(password) };
  writeFileSync(CREDS_PATH, JSON.stringify(creds, null, 2), "utf-8");
}

export async function isAdminAuthed(): Promise<boolean> {
  const jar = await cookies();
  return jar.get(ADMIN_COOKIE)?.value === expectedToken();
}
