import Image from "next/image";
import Link from "next/link";
import { ProductPrice } from "@/components/ProductPrice";
import { launchPriceRange, launchProducts, PRICE_NOTE } from "@/data/products";
import { createPageMetadata } from "@/data/site";

export const metadata = createPageMetadata({ title: "MULIFANG Furniture Collection 2026", description: `Discover 20 MULIFANG launch products designed for repeatable production and Philippine living, with suggested retail prices from ${launchPriceRange}.`, path: "/launch-collection-2026", image: launchProducts[0].mainImage });

const stats = [["20", "Launch SKUs"], ["5", "Room categories"], [launchPriceRange, "Suggested retail range"], ["18 mm", "Core board platform"], ["4–6", "Primary production modules"]];
const principles = [
  ["Small-space utility", "Multifunctional furniture, shallow storage and efficient footprints answer the realities of Philippine homes."],
  ["Visible storage value", "Drawers, cubbies, appliance niches and concealed compartments make benefits immediately understandable."],
  ["Repeatable production", "Shared board thicknesses, repeated drawer boxes and common hardware reduce part variety and speed assembly."],
  ["Social-commerce ready", "Clear names, strong silhouettes, exact product codes and accessible prices support online presentation."],
];

export default function LaunchCollectionPage() {
  return <>
    <section className="launch-page-hero"><div className="container"><p className="eyebrow light">MULIFANG Furniture Collection 2026</p><h1>Designed for repeatable production and Philippine living.</h1><p className="lead">Twenty standardized furniture products positioned between entry-level furniture and premium imported systems—supported by MULIFANG’s local manufacturing and project customization capability.</p><div className="button-row"><Link className="button button-gold" href="/products">Browse All 20 Products</Link><Link className="text-link light-link" href="/contact#quotation">Request a Quote <span>↗</span></Link></div></div></section>
    <section className="collection-stats"><div className="container collection-stats-grid">{stats.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></section>
    <section className="section"><div className="container section-heading"><div><p className="eyebrow">Hero Launch Products</p><h2>Five products lead the collection.</h2></div><p>NEST, LIFT, REST, FAMILY and FOCUS span living, bedroom, dining and home office needs.</p></div><div className="container launch-hero-grid">{launchProducts.filter((item) => item.featured).map((item) => <article className="launch-hero-card" key={item.slug}><Link href={`/products/${item.slug}`}><div className="image-wrap"><Image src={item.mainImage} alt={item.name} fill sizes="(max-width:760px) 100vw, 33vw" /></div><p>{item.code} · {item.category}</p><h3>{item.name}</h3></Link><ProductPrice product={item} compact /></article>)}</div></section>
    <section className="dark-section section"><div className="container"><div className="section-heading"><div><p className="eyebrow light">Collection Logic</p><h2>Made to sell clearly—and build efficiently.</h2></div></div><div className="principles-grid">{principles.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <section className="section"><div className="container section-heading"><div><p className="eyebrow">Complete Range</p><h2>All 20 launch SKUs.</h2></div><Link className="text-link" href="/products">Search and filter products <span>↗</span></Link></div><div className="container compact-product-grid">{launchProducts.map((item) => <article key={item.slug}><Link href={`/products/${item.slug}`}><span>{String(item.number).padStart(2, "0")}</span><div><small>{item.code} · {item.category}</small><h3>{item.name}</h3></div></Link><ProductPrice product={item} compact /></article>)}</div><div className="container collection-note"><p>{PRICE_NOTE}</p></div></section>
    <section className="quote-banner"><div className="container"><p className="eyebrow">Furniture Collection 2026</p><h2>Request a product quotation.</h2><p>Choose any product to send its exact name, code, reference price and quantity to the MULIFANG team.</p><Link className="button button-dark" href="/products">Choose a Product</Link></div></section>
  </>;
}
