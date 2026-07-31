import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative pb-10 pt-6">
      {/* final CTA */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="glass reveal relative overflow-hidden rounded-[2rem] px-6 py-14 text-center sm:px-12 sm:py-20">
          <div className="aurora-blob left-[-10%] top-[-40%] h-[24rem] w-[24rem] bg-[rgba(255,213,74,0.14)]" />
          <div className="aurora-blob right-[-10%] bottom-[-40%] h-[24rem] w-[24rem] bg-[rgba(0,212,255,0.1)] [animation-delay:-8s]" />
          <div className="relative">
            <p className="eyebrow">Ready When You Are</p>
            <h2 className="font-display mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
              Your ID Is <span className="text-gradient">One Message Away</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[var(--color-mist)]">
              Message us on WhatsApp, pick your platform, deposit ₹{SITE.minId} — and play.
            </p>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-lux btn-primary mt-9 px-10 py-4 text-sm sm:text-base"
            >
              Chat on WhatsApp →
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-7xl px-5 sm:px-8">
        <div className="divider-glow" />
        <div className="mt-10 flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="font-display text-lg font-bold tracking-tight">
            ONEXALL<span className="text-gradient">.VIP</span>
          </p>
          <nav className="flex items-center gap-7 text-sm text-[var(--color-mist)]">
            <a href="#products" className="transition hover:text-white">Platforms</a>
            <a href="#why" className="transition hover:text-white">Why Us</a>
            <a href="#payments" className="transition hover:text-white">Payments</a>
          </nav>
          <p className="text-xs text-[var(--color-mist)]">
            © {new Date().getFullYear()} {SITE.domain}. All rights reserved.
          </p>
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-[11px] leading-relaxed text-white/35">
          18+ only. Play responsibly — set limits and never stake more than you can afford to lose.
          {SITE.name} is an independent ID provider and is not affiliated with or endorsed by the
          platforms mentioned. All brand names and logos belong to their respective owners.
        </p>
      </div>
    </footer>
  );
}
