import { cookies } from "next/headers";
import { ADMIN_COOKIE, checkCredentials, expectedToken } from "@/lib/admin-auth";

export async function POST(request: Request) {
  let body: { username?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const username = typeof body.username === "string" ? body.username : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!checkCredentials(username, password)) {
    return Response.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
  }

  const jar = await cookies();
  jar.set(ADMIN_COOKIE, expectedToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
  return Response.json({ ok: true });
}
