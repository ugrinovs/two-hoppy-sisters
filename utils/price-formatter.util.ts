export function formatPrice(price: number): string {
  return Intl.NumberFormat("sr-RS", {
    style: "currency",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    currency: "RSD",
    // currencyDisplay: "code",
  }).format(price);
}
