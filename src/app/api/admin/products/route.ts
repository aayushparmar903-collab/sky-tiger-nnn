import { isAdminAuthed } from "@/lib/admin-auth";
import { PRODUCT_IDS, getProductSettings, saveProductSettings } from "@/lib/settings";

export async function GET() {
  if (!(await isAdminAuthed())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return Response.json(getProductSettings());
}

export async function POST(request: Request) {
  if (!(await isAdminAuthed())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { enabled?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  if (typeof body.enabled !== "object" || body.enabled === null) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const raw = body.enabled as Record<string, unknown>;
  const clean: Record<string, boolean> = {};
  for (const id of PRODUCT_IDS) {
    clean[id] = typeof raw[id] === "boolean" ? (raw[id] as boolean) : true;
  }

  const saved = saveProductSettings(clean);
  return Response.json(saved);
}
