import { PRODUCTS } from "@/lib/products";
import { getProductSettings } from "@/lib/settings";
import { SITE } from "@/lib/site";
import ProductGrid from "./ProductGrid";

export default function Products() {
  const settings = getProductSettings();
  const visible = PRODUCTS.filter((p) => settings.enabled[p.id]);

  return (
    <section id="products" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="eyebrow">Choose Your Arena</p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            {visible.length === 1 ? (
              <>Our Platform. <span className="text-gradient">One Standard.</span></>
            ) : (
              <>{visible.length === 2 ? "Two" : "Three"} Platforms. <span className="text-gradient">One Standard.</span></>
            )}
          </h2>
          <p className="mt-4 text-[var(--color-mist)]">
            Every ID starts at just ₹{SITE.minId} — verified, activated instantly and backed by {SITE.supportHours} support.
          </p>
        </div>

        <ProductGrid products={visible} />
      </div>
    </section>
  );
}
