import Image from "next/image";
import type { Product } from "@/lib/products";

/**
 * Pure-CSS 3D showpiece: the live platform logos orbit a globe-style ring
 * in the hero. Every panel counter-rotates while the ring spins, so logos
 * always face the viewer and glide smoothly — no popping at the edges.
 * No JS; pauses on hover, freezes under prefers-reduced-motion.
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
            style={
              {
                "--a": `${(360 / n) * i}deg`,
                transform: "translate(-50%, -50%) rotateY(var(--a)) translateZ(var(--orbit-radius))",
              } as React.CSSProperties
            }
          >
            <div className="orbit-face">
              <Image
                src={p.logo.src}
                alt={p.logo.alt}
                width={p.logo.width}
                height={p.logo.height}
                className="orbit-logo"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="orbit-floor" aria-hidden />
    </div>
  );
}
