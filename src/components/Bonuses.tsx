import { SITE } from "@/lib/site";

const BONUSES = [
  {
    pct: "5%",
    title: "First Deposit Bonus",
    desc: "Extra 5% on your very first top-up — start ahead of the game.",
  },
  {
    pct: "2%",
    title: "Every Deposit Bonus",
    desc: "2% back on every single reload. No cap, no fine print.",
  },
  {
    pct: "3%",
    title: "Weekly Loss Back",
    desc: "3% of your weekly losses returned — every week, automatically.",
  },
  {
    pct: "3%",
    title: "New Game Bonus",
    desc: "3% extra when you play newly launched games.",
  },
];

export default function Bonuses() {
  return (
    <section id="bonuses" className="relative py-16 sm:py-24">
      <div className="aurora-blob left-[55%] top-[10%] h-[24rem] w-[24rem] bg-[rgba(212,245,33,0.09)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="eyebrow">Rewards on Every Move</p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Bonuses That <span className="text-gradient">Never Sleep</span>
          </h2>
          <p className="mt-4 text-[var(--color-mist)]">
            Four ways we pay you back — from your first deposit to every week you play.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {BONUSES.map((b, i) => (
            <div
              key={b.title}
              className="glass-card reveal p-7 text-center"
              style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
            >
              <p className="font-display text-gradient text-5xl font-bold tracking-tight sm:text-6xl">
                {b.pct}
              </p>
              <div className="divider-glow mx-auto mt-5 w-16" />
              <h3 className="font-sora mt-5 text-base font-semibold sm:text-lg">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-mist)]">{b.desc}</p>
            </div>
          ))}
        </div>

        <div className="reveal mt-12 text-center" style={{ "--reveal-delay": "400ms" } as React.CSSProperties}>
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-lux btn-primary px-10 py-4 text-sm sm:text-base"
          >
            Claim Your Bonus Now →
          </a>
          <p className="mt-4 text-xs text-white/40">
            Bonuses are credited by our support team after each qualifying deposit. Message us to activate.
          </p>
        </div>
      </div>
    </section>
  );
}
