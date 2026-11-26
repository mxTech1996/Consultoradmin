"use client";

import { useContext } from "react";
import { CartContext } from "ui-old-version";
import { motion } from "framer-motion";

import { dataSite } from "@/lib/data";
import { productSpanish, useLanguage } from "@/lib/language";
import { formatProductPrice } from "@/lib/pricing";

// All 8 legacy products are the same kind of thing (digital legal
// kits/toolkits/reports/audits, no physical goods) — see src/lib/pricing.ts
// header comment — so they render together here as a single group, same
// as the legacy ProductGrid.js "Our Digital Products" section.
export const products = dataSite.products;

// Composition: a "case file" card grid — a photo in a brief-corner frame,
// then a gold file-plate directly under the photo showing the docket
// number + price (before the title, per the pricing-display rule), then
// title/description and a square outlined add-to-cart control. The
// legacy's fake "Save X%" strikethrough discount badge is NOT preserved
// (see pricing.ts header comment — it had no real pricing behind it).
export function ProductsSection() {
  const { handleAddOrRemoveProduct, validateProductInCart } =
    useContext(CartContext);
  const { language, t } = useLanguage();

  if (products.length === 0) return null;

  return (
    <section id="products" className="w-full bg-secondary/40 py-20 md:py-28">
      <div className="container mx-auto [padding-inline:1rem] md:[padding-inline:1.5rem]">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {t("productsHeading")}
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {t("productsParagraph")}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => {
            const localized =
              language === "es" ? productSpanish[product.id] : undefined;
            const isInCart = validateProductInCart(product.id);

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="flex flex-col border border-border bg-card"
              >
                {product.image && (
                  <div className="brief-corner relative aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={product.image}
                      alt={localized?.name ?? product.name}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                )}

                {/* File plate: directly under the photo, before the title */}
                <div className="flex items-center justify-between border-b border-border bg-seal px-4 py-2.5">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-seal-foreground">
                    {t("fileLabel")} №{product.id}
                  </span>
                  <span className="font-display text-base text-seal-foreground">
                    {formatProductPrice(product.price, language)}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-base text-foreground">
                    {localized?.name ?? product.name}
                  </h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-xs leading-5 text-muted-foreground">
                    {localized?.description ?? product.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleAddOrRemoveProduct(product.id)}
                    className={`mt-4 flex items-center justify-center gap-2 border px-4 py-2.5 text-xs font-bold uppercase tracking-[0.06em] transition-colors ${
                      isInCart
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-foreground text-foreground hover:bg-foreground hover:text-background"
                    }`}
                  >
                    {isInCart ? t("removeFromCart") : t("addToCart")}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
