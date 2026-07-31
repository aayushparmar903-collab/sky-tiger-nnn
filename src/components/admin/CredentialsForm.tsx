"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type State = "idle" | "saving" | "saved" | "error";

/** Lets the admin change the /admin username + password. */
export default function CredentialsForm({ currentUser }: { currentUser: string }) {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newUsername, setNewUsername] = useState(currentUser);
  const [newPassword, setNewPassword] = useState("");
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    setState("saving");
    try {
      const res = await fetch("/api/admin/credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newUsername, newPassword }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }
      if (!res.ok) {
        setState("error");
        setMessage(data.error ?? "Could not save. Try again.");
        return;
      }
      setState("saved");
      setMessage("Username & password updated.");
      setCurrentPassword("");
      setNewPassword("");
    } catch {
      setState("error");
      setMessage("Network error. Please try again.");
    }
  }

  const inputCls =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-transparent focus:ring-2 focus:ring-[rgb(var(--accent-rgb))]";
  const labelCls = "mb-2 block text-xs uppercase tracking-[0.2em] text-white/50";

  return (
    <div className="glass mt-10 rounded-3xl p-7 sm:p-8">
      <p className="eyebrow">Security</p>
      <h2 className="font-display mt-2 text-2xl font-bold text-white">Change Admin ID &amp; Password</h2>
      <p className="mt-2 text-sm text-white/50">
        Applies immediately — use the new credentials on your next login.
      </p>

      <form onSubmit={handleSubmit} className="mt-7 grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="cred-current" className={labelCls}>Current Password</label>
          <input
            id="cred-current"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            autoComplete="current-password"
            required
            className={inputCls}
            placeholder="••••••••"
          />
        </div>
        <div>
          <label htmlFor="cred-username" className={labelCls}>New Username</label>
          <input
            id="cred-username"
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            autoComplete="username"
            required
            minLength={3}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="cred-password" className={labelCls}>New Password</label>
          <input
            id="cred-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
            required
            minLength={6}
            className={inputCls}
            placeholder="min. 6 characters"
          />
        </div>

        <div className="flex items-center gap-4 sm:col-span-3">
          <button
            type="submit"
            disabled={state === "saving"}
            className="btn-lux btn-primary px-8 py-3 text-sm disabled:pointer-events-none disabled:opacity-60"
          >
            {state === "saving" ? "Updating…" : "Update Credentials"}
          </button>
          {message && (
            <span className={`text-sm ${state === "error" ? "text-red-400" : "text-emerald-400"}`}>
              {message}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
