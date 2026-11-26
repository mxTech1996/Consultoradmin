"use client";
import { MainProvider } from "ui-old-version";
import { products } from "../components/home/products-section";
import { LanguageProvider, useLanguage } from "../lib/language";
import { getUsdPrice } from "../lib/pricing";

// The generic cart engine (ui-old-version) works in a single currency.
// Consultoradmin's raw prices are MXN (the legacy site rendered them as
// `$ {price} MXN` — see src/components/organisms/Products.js prior to this
// migration), so we convert to USD once here; the storefront then
// re-derives the MXN/USD display per language in src/lib/pricing.ts.
const cartProducts = products.map((product) => ({
  ...product,
  price: String(getUsdPrice(product.price)),
}));

// --primary (#1a2540, hsl(222 38% 15%)) kept in sync here — see
// src/app/globals.css.
const LocalizedMainProvider = ({ children }) => {
  const { language } = useLanguage();

  return (
    <MainProvider
      products={cartProducts}
      locale={language}
      colorPrimary={"#1a2540"}
    >
      {children}
    </MainProvider>
  );
};

const Provider = ({ children }) => (
  <LanguageProvider>
    <LocalizedMainProvider>{children}</LocalizedMainProvider>
  </LanguageProvider>
);

export default Provider;
