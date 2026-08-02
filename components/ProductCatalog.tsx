"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatProductPrice, products, type ProductSystem } from "@/data/products";
import { ProductPrice } from "@/components/ProductPrice";

const systems: { label: string; value: "all" | ProductSystem }[] = [
  { label: "All Products", value: "all" },
  { label: "Furniture Collection 2026", value: "launch" },
  { label: "Custom Furniture Solutions", value: "custom" },
];

const quoteHref = (name: string, code: string, price: string) => `/contact?product=${encodeURIComponent(name)}&code=${encodeURIComponent(code)}&price=${encodeURIComponent(price)}&quantity=1#quotation`;

export function ProductCatalog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [system, setSystem] = useState<"all" | ProductSystem>("all");
  const categories = useMemo(() => ["All", ...Array.from(new Set(products.filter((item) => system === "all" || item.system === system).map((item) => item.category)))], [system]);
  const filtered = useMemo(() => products.filter((item) => {
    const matchesSystem = system === "all" || item.system === system;
    const matchesCategory = category === "All" || item.category === category;
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || `${item.name} ${item.code} ${item.category} ${item.description}`.toLowerCase().includes(query);
    return matchesSystem && matchesCategory && matchesSearch;
  }), [search, category, system]);

  const chooseSystem = (value: "all" | ProductSystem) => { setSystem(value); setCategory("All"); };

  return <>
    <div className="system-tabs" aria-label="Product system">
      {systems.map((item) => <button className={system === item.value ? "active" : ""} type="button" key={item.value} onClick={() => chooseSystem(item.value)}>{item.label}</button>)}
    </div>
    <div className="catalog-tools" role="search">
      <label className="sr-only" htmlFor="product-search">Search products</label>
      <input id="product-search" type="search" placeholder="Search product name, code or category" value={search} onChange={(event) => setSearch(event.target.value)} />
      <label className="sr-only" htmlFor="category-filter">Filter by category</label>
      <select id="category-filter" value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select>
    </div>
    <div className="catalog-count" aria-live="polite"><strong>{filtered.length}</strong> {filtered.length === 1 ? "product" : "products"}</div>
    <div className="product-grid">
      {filtered.map((item) => <article className={`product-card ${item.system} ${item.featured ? "featured" : ""}`} key={item.slug}>
        <Link href={`/products/${item.slug}`} aria-label={`View ${item.name}`}><div className="image-wrap"><Image src={item.mainImage} alt={`${item.name} from the MULIFANG collection`} fill sizes="(max-width:760px) 100vw, (max-width:1050px) 50vw, 33vw" />{item.featured && <span className="card-badge">Featured Launch Product</span>}</div></Link>
        <p className="category">{item.system === "launch" ? `Collection 2026 · ${item.category}` : `Custom Solutions · ${item.category}`}</p>
        <p className="product-code">{item.code}</p>
        <h2><Link href={`/products/${item.slug}`}>{item.name}</Link></h2>
        <p>{item.shortDescription}</p>
        <ProductPrice product={item} compact />
        <div className="card-actions"><Link className="text-link" href={`/products/${item.slug}`}>View Details <span>↗</span></Link><Link className="text-link" href={quoteHref(item.name, item.code, formatProductPrice(item))}>Request Quote <span>↗</span></Link></div>
      </article>)}
      {!filtered.length && <div className="empty-state"><h2>No matching products</h2><p>Try another product name or code, or select All categories.</p></div>}
    </div>
  </>;
}
