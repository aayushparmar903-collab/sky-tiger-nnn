import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { SITE } from "@/lib/site";
import { PRODUCTS } from "@/lib/products";

/**
 * Hero. If you drop a `hero.webp` (or hero.png / hero.jpg) into /public,
 * it automatically becomes the hero artwork — no code change needed.
 * Until then a designed logo composition is shown.
 */
function findHeroArt(): { desktop: string; mobile: string | null } | null {
  const dir = path.join(process.cwd(), "public");
  let desktop: string | null = null;
  for (const name of ["hero.webp", "hero.png", "hero.jpg", "hero.jpeg"]) {
    if (existsSync(path.join(dir, name))) {
      desktop = `/${name}`;
      break;
    }
  }
  if (!desktop) return null;
  const mobile = existsSync(path.join(dir, "hero-mobile.webp")) ? "/hero-mobile.webp" : null;
  return { desktop, mobile };
}

export default function Hero() {
  const heroArt = findHeroArt();

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* atmosphere */}
      <div className="aurora-blob left-[-10%] top-[-20%] h-[34rem] w-[34rem] bg-[rgba(212,245,33,0.12)]" />
      <div className="aurora-blob right-[-12%] top-[10%] h-[30rem] w-[30rem] bg-[rgba(255,213,74,0.1)] [animation-delay:-6s]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(70% 60% at 50% 30%, black, transparent)",
          WebkitMaskImage: "radial-gradient(70% 60% at 50% 30%, black, transparent)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        {heroArt ? (
          <div className="text-center">
            <div className="reveal">
              <span className="chip-tag">
                <span className="live-dot" />
                IDs from just ₹{SITE.minId} · {SITE.supportHours} support
              </span>
            </div>

            {/* hero artwork */}
            <div
              className="reveal relative mx-auto mt-10 max-w-6xl"
              style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            >
              <div
                className="pointer-events-none absolute -inset-6 rounded-[2.5rem] opacity-60 blur-3xl"
                style={{
                  background:
                    "radial-gradient(60% 60% at 50% 50%, rgba(var(--accent-rgb), 0.18), transparent 70%)",
                }}
              />
              <picture>
                {heroArt.mobile && <source media="(max-width: 640px)" srcSet={heroArt.mobile} />}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={heroArt.desktop}
                  alt="ONEXALL.VIP — Your game, your way, your win. Live betting, top odds, instant payouts."
                  className="relative w-full rounded-[1.5rem] border border-white/10 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
                />
              </picture>
            </div>

            <p
              className="reveal mx-auto mt-10 max-w-xl text-base leading-relaxed text-[var(--color-mist)] sm:text-lg"
              style={{ "--reveal-delay": "220ms" } as React.CSSProperties}
            >
              {SITE.name} is your single gateway to SKY247, REDDY247 and TIGEREXCH —
              verified IDs, instant UPI deposits and 5-minute withdrawals.
            </p>

            <div
              className="reveal mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
              style={{ "--reveal-delay": "300ms" } as React.CSSProperties}
            >
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-lux btn-primary px-9 py-4 text-sm sm:text-base"
              >
                Get Your ID Now →
              </a>
              <a href="#products" className="btn-lux btn-ghost px-9 py-4 text-sm sm:text-base">
                View Platforms
              </a>
            </div>
          </div>
        ) : (
          <FallbackHero />
        )}
      </div>
    </section>
  );
}

/** Shown until /public/hero.webp is provided. */
function FallbackHero() {
  return (
    <>
      <div className="mx-auto max-w-3xl text-center">
        <div className="reveal">
          <span className="chip-tag">
            <span className="live-dot" />
            IDs from just ₹{SITE.minId} · {SITE.supportHours} support
          </span>
        </div>

        <h1
          className="reveal font-display mt-7 text-5xl font-bold leading-[1.04] tracking-tight sm:text-7xl"
          style={{ "--reveal-delay": "90ms" } as React.CSSProperties}
        >
          One Pass.
          <br />
          <span className="text-gradient">Three Elite Platforms.</span>
        </h1>

        <p
          className="reveal mx-auto mt-6 max-w-xl text-base leading-relaxed text-[var(--color-mist)] sm:text-lg"
          style={{ "--reveal-delay": "180ms" } as React.CSSProperties}
        >
          {SITE.name} is your single gateway to SKY247, REDDY247 and TIGEREXCH —
          verified IDs, instant UPI deposits and 5-minute withdrawals.
        </p>

        <div
          className="reveal mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
          style={{ "--reveal-delay": "270ms" } as React.CSSProperties}
        >
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-lux btn-primary px-9 py-4 text-sm sm:text-base"
          >
            Get Your ID Now →
          </a>
          <a href="#products" className="btn-lux btn-ghost px-9 py-4 text-sm sm:text-base">
            View Platforms
          </a>
        </div>
      </div>

      <div
        className="reveal relative mx-auto mt-16 max-w-4xl sm:mt-20"
        style={{ "--reveal-delay": "380ms" } as React.CSSProperties}
      >
        <div className="glass relative rounded-[1.75rem] px-6 py-10 sm:px-12 sm:py-14">
          <div className="pointer-events-none absolute inset-x-16 top-0 divider-glow" />
          <p className="eyebrow text-center">Our Platforms</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-10 sm:flex-row sm:gap-16">
            {PRODUCTS.map((p, i) => (
              <div key={p.id} className="animate-float" style={{ animationDelay: `${i * -2.2}s` }}>
                <div className="relative h-12 w-44 sm:h-16 sm:w-56">
                  <Image
                    src={p.logo.src}
                    alt={p.logo.alt}
                    fill
                    sizes="224px"
                    priority
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-x-16 bottom-0 divider-glow" />
        </div>
      </div>
    </>
  );
}
