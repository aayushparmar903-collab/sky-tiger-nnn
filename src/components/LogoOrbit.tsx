import Image from "next/image";
import type { Product } from "@/lib/products";

/**
 * Pure-CSS 3D showpiece: the live platform logos rotate on a horizontal
 * ring in the hero. No JS — the ring spins via keyframes, pauses on hover,
 * and freezes into a static arc under prefers-reduced-motion.
 */
export default function LogoOrbit({ products }: { products: Product[] }) {
  const n = products.length;
  if (n === 0) return null;

  return (
    <div
      className="orbit-stage reveal"
      style={{ "--reveal-delay": "420ms" } as React.CSSProperties}
      aria-label="Our platforms"
    >
      <div className="orbit-ring">
        {products.map((p, i) => (
          <div
            key={p.id}
            className="orbit-panel glass"
            style={{
              transform: `translate(-50%, -50%) rotateY(${(360 / n) * i}deg) translateZ(var(--orbit-radius))`,
            }}
          >
            <Image
              src={p.logo.src}
              alt={p.logo.alt}
              width={p.logo.width}
              height={p.logo.height}
              className="orbit-logo"
            />
          </div>
        ))}
      </div>
      <div className="orbit-floor" aria-hidden />
    </div>
  );
}
