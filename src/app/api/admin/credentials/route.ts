import { cookies } from "next/headers";
import { ADMIN_COOKIE, checkPassword, currentUser, expectedToken, isAdminAuthed, saveCredentials } from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!(await isAdminAuthed())) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let body: { currentPassword?: unknown; newUsername?: unknown; newPassword?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const currentPassword = typeof body.currentPassword === "string" ? body.currentPassword : "";
  const newUsername = typeof body.newUsername === "string" ? body.newUsername.trim() : "";
  const newPassword = typeof body.newPassword === "string" ? body.newPassword : "";

  if (!(await checkPassword(currentPassword))) {
    return Response.json({ ok: false, error: "Current password is wrong" }, { status: 403 });
  }
  if (newUsername.length < 3) {
    return Response.json({ ok: false, error: "Username must be at least 3 characters" }, { status: 400 });
  }
  if (newPassword.length < 6) {
    return Response.json({ ok: false, error: "Password must be at least 6 characters" }, { status: 400 });
  }

  await saveCredentials(newUsername, newPassword);

  // re-issue the session cookie — it derives from the credentials
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, await expectedToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return Response.json({ ok: true, user: await currentUser() });
}
