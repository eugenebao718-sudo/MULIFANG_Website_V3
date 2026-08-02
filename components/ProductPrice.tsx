import { formatProductPrice, PRICE_ESTIMATE_LABEL, PRICE_TERMS, type Product } from "@/data/products";

export function ProductPrice({ product, compact = false }: { product: Product; compact?: boolean }) {
  if (product.suggestedRetailPrice === null) {
    return <div className={`price-display ${compact ? "compact" : ""}`}><p className="price-note">{formatProductPrice(product)}</p></div>;
  }

  return <div className={`price-display ${compact ? "compact" : ""}`}>
    <p className="product-price">{formatProductPrice(product)}</p>
    <p className="price-context">{PRICE_ESTIMATE_LABEL}</p>
    <p className="price-terms">{PRICE_TERMS}</p>
  </div>;
}
