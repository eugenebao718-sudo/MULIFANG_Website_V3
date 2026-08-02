import { PageHero } from "@/components/PageHero";
import { ProductCatalog } from "@/components/ProductCatalog";
import { createPageMetadata } from "@/data/site";

export const metadata = createPageMetadata({ title: "Furniture Collection & Custom Solutions", description: "Explore 20 standardized MULIFANG Furniture Collection 2026 products and 27 custom furniture solutions.", path: "/products" });

export default function ProductsPage() {
  return <><PageHero eyebrow="Two Product Systems · 47 Products" title="Ready-to-launch furniture. Made-to-order solutions." text="Explore the 20-product Furniture Collection 2026 or browse 27 Custom Furniture Solutions engineered around your space and project requirements." /><section className="content-section"><div className="container"><ProductCatalog /></div></section></>;
}
