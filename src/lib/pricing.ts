// Consultoradmin pricing rules (confirmed by direct evidence in the legacy
// code — src/components/organisms/Products.js rendered
// `$ {parseFloat(product.price).toFixed(2)} MXN`, same pattern already
// confirmed on the Auxida/Loyal/Montero sibling migrations):
// - Raw `price` values on dataSite.products are literal MXN amounts.
// - Spanish shows the MXN price as-is, with the "MXN" label visible.
// - English shows the USD equivalent (MXN / MXN_PER_USD), with "USD" visible.
// - The legal products and services render together in products-section.tsx
//   as one catalog group.
// - The legacy "Save X%"/strikethrough original-price badge on each card is
//   NOT preserved: it was a `discountPercentage = 10 + (index % 3) * 2`
//   cosmetic calculation with no real pricing behind it, not a real
//   promotion.
export const MXN_PER_USD = 20;

export type Currency = "MXN" | "USD";

export function getCurrencyForLanguage(language: "en" | "es"): Currency {
  return language === "en" ? "USD" : "MXN";
}

export function convertCurrencyAmount(
  amount: string | number,
  fromCurrency: Currency,
  toCurrency: Currency,
) {
  const numericAmount = Number(amount);

  if (fromCurrency === toCurrency) return numericAmount;

  return fromCurrency === "MXN"
    ? numericAmount / MXN_PER_USD
    : numericAmount * MXN_PER_USD;
}

export function formatCurrencyAmount(
  amount: string | number,
  currency: Currency,
  language: "en" | "es",
) {
  return new Intl.NumberFormat(language === "en" ? "en-US" : "es-MX", {
    style: "currency",
    currency,
    currencyDisplay: "code",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(amount));
}

export function getUsdPrice(price: string | number) {
  return convertCurrencyAmount(price, "MXN", "USD");
}

export function formatProductPrice(
  price: string | number,
  language: "en" | "es",
) {
  const currency = getCurrencyForLanguage(language);
  const amount = convertCurrencyAmount(price, "MXN", currency);

  return formatCurrencyAmount(amount, currency, language);
}
