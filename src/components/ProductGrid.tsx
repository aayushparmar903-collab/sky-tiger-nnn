"use client";

import Image from "next/image";
import type { Product } from "@/lib/products";
import { SITE } from "@/lib/site";

export default function ProductGrid({ products }: { products: Product[] }) {
  const layout =
    products.length === 1
      ? "mx-auto max-w-md md:grid-cols-1"
      : products.length === 2
        ? "mx-auto max-w-4xl md:grid-cols-2"
        : "md:grid-cols-3";

  return (
    <div className={`mt-14 grid gap-6 lg:gap-8 ${layout}`}>
      {products.map((p, i) => (
            <article
              key={p.id}
              className="glass-card reveal group flex flex-col p-7 sm:p-8"
              style={
                {
                  "--accent": p.accent,
                  "--accent-2": p.accent2,
                  "--accent-rgb": hexToRgb(p.accent),
                  "--accent-2-rgb": hexToRgb(p.accent2),
                  "--reveal-delay": `${i * 120}ms`,
                } as React.CSSProperties
              }
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
              }}
            >
              {p.badge && (
                <span className="chip-tag absolute right-5 top-5 !text-[0.6rem]">{p.badge}</span>
              )}

              {/* logo — box size tuned per brand so all three look equally big */}
              <div className="flex h-24 items-center">
                <div className={`relative transition-transform duration-500 group-hover:scale-105 ${p.logoBox}`}>
                  <Image
                    src={p.logo.src}
                    alt={p.logo.alt}
                    fill
                    sizes="256px"
                    className="object-contain object-left"
                  />
                </div>
              </div>

              <p className="mt-5 font-sora text-sm font-medium" style={{ color: p.accent }}>
                {p.tagline}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-mist)]">{p.desc}</p>

              {/* min ID banner */}
              <div
                className="mt-6 flex items-center justify-between rounded-xl px-4 py-3"
                style={{
                  background: `linear-gradient(120deg, ${p.accent}14, ${p.accent2}0d)`,
                  border: `1px solid ${p.accent}33`,
                }}
              >
                <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-mist)]">Min ID</span>
                <span className="font-display text-2xl font-bold" style={{ color: p.accent }}>
                  ₹{SITE.minId}
                </span>
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-white/85">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0"
                      viewBox="0 0 16 16"
                      fill="none"
                      style={{ color: p.accent }}
                    >
                      <path
                        d="M13.5 4.5 6.5 11.5 2.5 7.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-lux btn-primary mt-8 w-full py-3.5 text-sm"
              >
                Get {p.name} ID
              </a>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-lux btn-ghost mt-3 w-full py-3.5 text-sm"
              >
                Play Now ↗
              </a>
            </article>
          ))}
        </div>
  );
}

function hexToRgb(hex: string): string {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}
