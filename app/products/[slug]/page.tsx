import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductPrice } from "@/components/ProductPrice";
import { company } from "@/data/company";
import { formatProductPrice, getProduct, PRICE_NOTE, products, QUOTATION_REFERENCE_NOTE } from "@/data/products";
import { absoluteUrl } from "@/data/site";

export const generateStaticParams = () => products.map((item) => ({ slug: item.slug }));
export const dynamicParams = false;

const titleCase = (name: string) => name.split(" ").map((word, index) => index === 0 || ["TV", "MFC", "KD"].includes(word) || /[0-9+&×]/.test(word) ? word : `${word[0]}${word.slice(1).toLowerCase()}`).join(" ");
const quoteHref = (name: string, code: string, price: string) => `/contact?product=${encodeURIComponent(name)}&code=${encodeURIComponent(code)}&price=${encodeURIComponent(price)}&quantity=1#quotation`;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getProduct(slug);
  if (!item) return {};
  const title = item.system === "launch" ? `${titleCase(item.name)} | MULIFANG Philippines` : `${item.name} | MULIFANG Philippines`;
  return {
    title: { absolute: title },
    description: item.shortDescription,
    alternates: { canonical: `/products/${slug}` },
    openGraph: { title, description: item.shortDescription, url: absoluteUrl(`/products/${slug}`), siteName: "MULIFANG", locale: "en_PH", type: "website", images: [{ url: absoluteUrl(item.mainImage), alt: item.name }] },
    twitter: { card: "summary_large_image", title, description: item.shortDescription, images: [absoluteUrl(item.mainImage)] },
  };
}

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getProduct(slug);
  if (!item) notFound();

  const related = products.filter((product) => product.system === item.system && product.category === item.category && product.slug !== item.slug).slice(0, 3);
  const displayPrice = formatProductPrice(item);
  const quote = quoteHref(item.name, item.code, displayPrice);
  const whatsappText = `Hello MULIFANG, I would like a quotation for ${item.name} (${item.code}). Reference price: ${displayPrice}. Quantity: 1. ${QUOTATION_REFERENCE_NOTE}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    sku: item.code,
    name: item.name,
    category: item.category,
    description: item.description,
    image: item.gallery.map(absoluteUrl),
    brand: { "@type": "Brand", name: "MULIFANG" },
    offers: item.suggestedRetailPrice !== null
      ? { "@type": "Offer", priceCurrency: item.currency, price: item.suggestedRetailPrice, availability: "https://schema.org/InStock", url: absoluteUrl(`/products/${item.slug}`), description: QUOTATION_REFERENCE_NOTE }
      : { "@type": "Offer", priceSpecification: { "@type": "PriceSpecification", description: "Price available upon written quotation" }, availability: "https://schema.org/InStock" },
  };

  return <>
    <section className="product-hero">
      <div className="product-hero-image"><Image src={item.mainImage} alt={`${item.name} by MULIFANG`} fill priority sizes="(max-width:760px) 100vw, 56vw" /></div>
      <div className="product-hero-copy">
        <p className="eyebrow">{item.system === "launch" ? "Furniture Collection 2026" : "Custom Furniture Solutions"} · {item.category}</p>
        <p className="product-code">{item.code}</p>
        <h1>{item.name}</h1>
        <p className="lead">{item.description}</p>
        <ProductPrice product={item} />
        <div className="button-row"><Link className="button button-dark" href={quote}>Request a Quote</Link><a className="button secondary-dark" href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(whatsappText)}`} target="_blank" rel="noreferrer">WhatsApp</a></div>
      </div>
    </section>

    {item.system === "launch" ? <>
      <section className="content-section"><div className="container product-specs"><div className="spec-card"><span>Product number</span><strong>{String(item.number).padStart(2, "0")} / 20</strong></div><div className="spec-card"><span>Dimensions</span><strong>{item.dimensions}</strong></div><div className="spec-card"><span>Packaging</span><strong>{item.packaging}</strong></div><div className="spec-card"><span>Status</span><strong>Launch collection · Active</strong></div></div><div className="container detail-grid launch-details"><div><div className="detail-block"><h2>Main Features</h2><ul>{item.features.map((value) => <li key={value}>{value}</li>)}</ul></div><div className="detail-block"><h2>Materials</h2><ul>{item.materials.map((value) => <li key={value}>{value}</li>)}</ul></div></div><div><div className="detail-block"><h2>Primary Customers</h2><ul>{item.primaryCustomers.map((value) => <li key={value}>{value}</li>)}</ul></div><div className="detail-block"><h2>Sales Positioning</h2><p>{item.salesPositioning}</p></div></div></div></section>
      {item.gallery.length > 1 && <section className="content-section product-gallery-section"><div className="container"><div className="section-heading"><div><p className="eyebrow">Product Gallery</p><h2>Additional product view.</h2></div><p>Reference imagery supports product selection; final materials and finishes are confirmed in the written quotation.</p></div><div className="product-gallery-grid">{item.gallery.slice(1).map((image, index) => <div className="image-wrap" key={image}><Image src={image} alt={`${item.name} additional product view ${index + 1}`} fill sizes="(max-width:760px) 100vw, 70vw" /></div>)}</div></div></section>}
      <section className="content-section alt"><div className="container exploded-layout"><div><p className="eyebrow">Construction Reference</p><h2>Exploded view.</h2><p>The component view communicates the launch product’s repeatable board, hardware and assembly logic.</p></div><div className="exploded-image image-wrap"><Image src={item.explodedViewImage} alt={`${item.name} exploded construction view`} fill sizes="(max-width:760px) 100vw, 60vw" /></div></div></section>
      <section className="pricing-note"><div className="container"><p>{PRICE_NOTE}</p><p>{QUOTATION_REFERENCE_NOTE}</p></div></section>
    </> : <section className="content-section"><div className="container detail-grid"><div><div className="detail-block"><h2>Main Features</h2><ul>{item.features.map((value) => <li key={value}>{value}</li>)}</ul></div><div className="detail-block"><h2>Materials</h2><ul>{item.materials.map((value) => <li key={value}>{value}</li>)}</ul></div></div><div><div className="detail-block"><h2>Customization</h2><ul>{item.customization.map((value) => <li key={value}>{value}</li>)}</ul></div><div className="detail-block"><h2>Suitable Applications</h2><ul>{item.applications.map((value) => <li key={value}>{value}</li>)}</ul></div></div></div></section>}

    <section className="section"><div className="container"><div className="section-heading"><div><p className="eyebrow">Related Products</p><h2>Continue exploring.</h2></div><Link className="text-link" href="/products">All products <span>↗</span></Link></div><div className="product-grid">{related.map((product) => <article className={`product-card ${product.system}`} key={product.slug}><Link href={`/products/${product.slug}`}><div className="image-wrap"><Image src={product.mainImage} alt={product.name} fill sizes="33vw" /></div><p className="category">{product.category}</p><h2>{product.name}</h2></Link><ProductPrice product={product} compact /></article>)}</div></div></section>
    <section className="quote-banner"><div className="container"><p className="eyebrow">Request a Written Quotation</p><h2>Ask about {titleCase(item.name)}.</h2><p>Your request includes the product name, code, reference price and quantity for a faster response.</p><Link className="button button-dark" href={quote}>Request a Quote</Link></div></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  </>;
}
