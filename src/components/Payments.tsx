const METHODS = [
  { name: "UPI", desc: "GPay · PhonePe · Paytm", time: "Instant" },
  { name: "Bank Transfer", desc: "IMPS · NEFT · RTGS", time: "< 5 min" },
  { name: "Net Banking", desc: "All major banks", time: "Instant" },
  { name: "Crypto", desc: "USDT · BTC · ETH", time: "< 2 min" },
];

export default function Payments() {
  return (
    <section id="payments" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="eyebrow">Payments</p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Money In. <span className="text-gradient">Money Out. Instantly.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {METHODS.map((m, i) => (
            <div
              key={m.name}
              className="glass-card reveal flex items-center justify-between gap-4 p-6"
              style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
            >
              <div>
                <p className="font-sora text-base font-semibold">{m.name}</p>
                <p className="mt-1 text-xs text-[var(--color-mist)]">{m.desc}</p>
              </div>
              <span className="chip-tag shrink-0 !tracking-[0.08em]">{m.time}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
