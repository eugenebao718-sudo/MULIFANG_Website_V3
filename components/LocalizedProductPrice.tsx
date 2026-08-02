import { formatProductPrice, type Product } from "@/data/products";
import { messages } from "@/i18n/messages";
import type { Locale } from "@/i18n/config";

export function LocalizedProductPrice({ product, locale, compact=false }: { product: Product; locale: Locale; compact?: boolean }) {
  const m=messages[locale];
  if(product.suggestedRetailPrice===null) return <div className={`price-display ${compact?"compact":""}`}><p className="price-note">{m.price.upon}</p></div>;
  return <div className={`price-display ${compact?"compact":""}`}><p className="product-price">{formatProductPrice(product)}</p><p className="price-context">{m.price.estimate}</p><p className="price-terms">{m.price.terms}</p></div>;
}
