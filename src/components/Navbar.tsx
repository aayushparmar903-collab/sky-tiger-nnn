import { SITE } from "@/lib/site";

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="glass mt-4 flex items-center justify-between rounded-2xl px-5 py-3.5 sm:px-7">
          <a href="#top" className="font-display text-lg font-bold tracking-tight sm:text-xl">
            ONEXALL<span className="text-gradient">.VIP</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-[var(--color-mist)] md:flex">
            <a href="#bonuses" className="transition hover:text-white">Bonuses</a>
            <a href="#products" className="transition hover:text-white">Platforms</a>
            <a href="#why" className="transition hover:text-white">Why Us</a>
            <a href="#payments" className="transition hover:text-white">Payments</a>
          </nav>

          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-lux btn-primary px-5 py-2.5 text-xs sm:px-6 sm:text-sm"
          >
            Get ID — ₹{SITE.minId}
          </a>
        </div>
      </div>
    </header>
  );
}
