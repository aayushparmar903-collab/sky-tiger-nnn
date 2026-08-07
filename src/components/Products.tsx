import { orderedProducts } from "@/lib/products";
import { getProductSettings } from "@/lib/settings";
import { SITE } from "@/lib/site";
import ProductGrid from "./ProductGrid";

export default async function Products() {
  const settings = await getProductSettings();
  const visible = orderedProducts(settings.order).filter((p) => settings.enabled[p.id]);

  return (
    <section id="products" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ProductGrid products={visible} />

        <div className="reveal mx-auto mt-16 max-w-2xl text-center">
          <p className="eyebrow">Choose Your Arena</p>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Pick Your Platform. <span className="text-gradient">Play Your Way.</span>
          </h2>
          <p className="mt-4 text-[var(--color-mist)]">
            Every ID starts at just ₹{SITE.minId} — verified, activated instantly and backed by {SITE.supportHours} support.
          </p>
        </div>
      </div>
    </section>
  );
}
