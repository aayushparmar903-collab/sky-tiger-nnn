import { SITE } from "@/lib/site";

const REASONS = [
  {
    title: "Instant Activation",
    desc: "Your ID is live within minutes of payment — no waiting, no paperwork.",
    icon: (
      <path d="M13 2 4.5 13.5H11L9.5 22 19 9.5h-6.5L13 2Z" strokeLinejoin="round" />
    ),
  },
  {
    title: "Verified & Secure",
    desc: "Every ID is genuine and platform-verified. Your balance stays yours.",
    icon: (
      <path d="M12 2 4 5.5v5c0 5 3.4 9.3 8 10.5 4.6-1.2 8-5.5 8-10.5v-5L12 2Zm-3 9.5 2.2 2.2L15.5 9" strokeLinejoin="round" />
    ),
  },
  {
    title: "5-Min Withdrawals",
    desc: "Cash out to UPI or bank within 5 minutes, any time of day or night.",
    icon: (
      <path d="M12 8v4l2.5 2.5M21 12a9 9 0 1 1-9-9 9 9 0 0 1 9 9Z" strokeLinejoin="round" />
    ),
  },
  {
    title: "24/7 Human Support",
    desc: "Real people on WhatsApp around the clock — deposits, issues, anything.",
    icon: (
      <path d="M21 12a8.5 8.5 0 0 1-12.4 7.5L3 21l1.6-5.4A8.5 8.5 0 1 1 21 12Z" strokeLinejoin="round" />
    ),
  },
];

export default function WhyUs() {
  return (
    <section id="why" className="relative py-20 sm:py-28">
      <div className="aurora-blob left-[30%] top-[20%] h-[26rem] w-[26rem] bg-[rgba(255,213,74,0.08)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="eyebrow">Why ONEXALL.VIP</p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Built Like a <span className="text-gradient">Concierge</span>, Not a Counter
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((r, i) => (
            <div
              key={r.title}
              className="glass-card reveal p-7"
              style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{
                  background: "rgba(var(--accent-rgb), 0.1)",
                  border: "1px solid rgba(var(--accent-rgb), 0.3)",
                }}
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgb(var(--accent-rgb))"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                >
                  {r.icon}
                </svg>
              </div>
              <h3 className="font-sora mt-5 text-lg font-semibold">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-mist)]">{r.desc}</p>
            </div>
          ))}
        </div>

        {/* stats strip */}
        <div className="glass reveal mt-14 grid grid-cols-2 divide-x divide-[var(--color-line)] rounded-2xl md:grid-cols-4">
          {[
            { v: `₹${SITE.minId}`, l: "Minimum ID" },
            { v: "5 Min", l: "Avg. Withdrawal" },
            { v: "3", l: "Elite Platforms" },
            { v: "24/7", l: "Live Support" },
          ].map((s) => (
            <div key={s.l} className="px-6 py-7 text-center">
              <p className="font-display text-3xl font-bold text-gradient sm:text-4xl">{s.v}</p>
              <p className="mt-1.5 text-xs uppercase tracking-[0.2em] text-[var(--color-mist)]">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
