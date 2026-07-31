const ITEMS = [
  "Instant ID Activation",
  "5-Minute Withdrawals",
  "5% First Deposit Bonus",
  "24/7 WhatsApp Support",
  "100+ Sports & Live Markets",
  "3% Weekly Loss Back",
  "UPI · Bank · Crypto",
  "Trusted Gaming IDs",
];

/** Infinite scrolling marketing ticker between hero and products. */
export default function Ticker() {
  const track = [...ITEMS, ...ITEMS]; // duplicated for seamless loop
  return (
    <div className="ticker relative z-10 border-y border-white/5 bg-white/[0.02] py-4">
      <div className="ticker-track">
        {track.map((item, i) => (
          <span key={i} className="ticker-item">
            <span className="ticker-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
