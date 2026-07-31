"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PRODUCTS } from "@/lib/products";
import type { ProductSettings } from "@/lib/settings";
import CredentialsForm from "./CredentialsForm";

type SaveState = "idle" | "saving" | "saved" | "error";

interface AdminDashboardProps {
  initialSettings: ProductSettings;
  currentUser: string;
}

export default function AdminDashboard({ initialSettings, currentUser }: AdminDashboardProps) {
  const router = useRouter();
  const [enabled, setEnabled] = useState<Record<string, boolean>>(initialSettings.enabled);
  const [updatedAt, setUpdatedAt] = useState<string>(initialSettings.updatedAt);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [hint, setHint] = useState<string | null>(null);

  async function save(next: Record<string, boolean>) {
    setSaveState("saving");
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: next }),
      });
      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }
      if (!res.ok) {
        setSaveState("error");
        return;
      }
      const saved = (await res.json()) as ProductSettings;
      setEnabled(saved.enabled);
      setUpdatedAt(saved.updatedAt);
      setSaveState("saved");
    } catch {
      setSaveState("error");
    }
  }

  function toggle(id: string) {
    const next = { ...enabled, [id]: !enabled[id] };
    if (!PRODUCTS.some((p) => next[p.id])) {
      setHint("At least one product must stay on.");
      return;
    }
    setHint(null);
    setEnabled(next);
    void save(next);
  }

  async function logout() {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      router.replace("/admin/login");
    }
  }

  const savedTime = new Date(updatedAt).toLocaleTimeString();
  const liveCount = PRODUCTS.filter((p) => enabled[p.id]).length;

  return (
    <div className="min-h-screen bg-[var(--color-void)]">
      <div className="mx-auto max-w-5xl px-5 py-10">
        <header className="mb-3 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Admin Panel</p>
            <h1 className="font-display mt-2 text-4xl font-bold text-white">
              Product Control <span className="text-gradient">Center</span>
            </h1>
          </div>
          <div className="flex gap-3">
            <Link href="/" className="btn-lux btn-ghost px-5 py-2.5 text-sm">
              View Site
            </Link>
            <button type="button" onClick={() => void logout()} className="btn-lux btn-ghost px-5 py-2.5 text-sm">
              Logout
            </button>
          </div>
        </header>

        <p className="mb-8 max-w-2xl text-sm text-white/50">
          Switch a product off and its card instantly disappears from the onexall.vip landing page.
          At least one product must stay on. Currently live: {liveCount} of {PRODUCTS.length}.
        </p>

        <div className="grid gap-5 sm:grid-cols-3">
          {PRODUCTS.map((p) => {
            const on = enabled[p.id];
            return (
              <div
                key={p.id}
                className="glass-card flex flex-col gap-4 rounded-3xl p-6"
                style={
                  {
                    "--accent": p.accent,
                    "--accent-2": p.accent2,
                    "--accent-rgb": hexToRgb(p.accent),
                    "--accent-2-rgb": hexToRgb(p.accent2),
                  } as React.CSSProperties
                }
              >
                <div className="flex h-12 items-center">
                  <div className={`relative h-9 w-36 transition-opacity ${on ? "" : "opacity-30 grayscale"}`}>
                    <Image
                      src={p.logo.src}
                      alt={p.logo.alt}
                      fill
                      sizes="144px"
                      className="object-contain object-left"
                    />
                  </div>
                </div>
                <div>
                  <h2 className="font-display text-lg font-semibold text-white">{p.name}</h2>
                  <p className="text-xs text-white/40">{p.tagline}</p>
                </div>

                <div className="mt-auto flex items-center gap-3">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={on}
                    aria-label={`Toggle ${p.name}`}
                    onClick={() => toggle(p.id)}
                    className={`relative h-8 w-14 shrink-0 rounded-full transition-colors duration-300 ${
                      on
                        ? "bg-gradient-to-r from-[rgb(var(--accent-rgb))] to-[rgb(var(--accent-2-rgb))]"
                        : "bg-white/10"
                    }`}
                  >
                    <span
                      className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-300 ${
                        on ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <span className={`text-sm font-medium ${on ? "text-emerald-400" : "text-white/40"}`}>
                    {on ? "Live" : "Hidden"}
                  </span>
                </div>

                <span className="text-xs" style={{ color: p.accent }}>
                  onexall.vip · #{p.id}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex items-center gap-4 text-xs">
          <span
            className={
              saveState === "error" ? "text-red-400" : saveState === "saving" ? "text-white/40" : "text-emerald-400"
            }
          >
            {saveState === "saving" && "Saving…"}
            {saveState === "error" && "Error saving"}
            {(saveState === "saved" || saveState === "idle") && `Saved · ${savedTime}`}
          </span>
          {hint && <span className="text-amber-400">{hint}</span>}
        </div>

        <CredentialsForm currentUser={currentUser} />
      </div>
    </div>
  );
}

function hexToRgb(hex: string): string {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}
