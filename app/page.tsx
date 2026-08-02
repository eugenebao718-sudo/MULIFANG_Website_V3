import Image from "next/image";
import Link from "next/link";
import { company } from "@/data/company";
import { launchProducts } from "@/data/products";
import { ProductPrice } from "@/components/ProductPrice";
import { createPageMetadata } from "@/data/site";

export const metadata = createPageMetadata({ title: "Premium Custom Furniture Manufacturer", description: "Premium custom furniture manufacturer in Tarlac serving Metro Manila, Pampanga and Tarlac. Design coordination, CNC manufacturing, delivery and installation.", path: "/" });

const stats = [[company.factoryArea, "Factory area"], [company.machines, "Major machines"], [company.employees, "Current team"], [company.plannedWorkforce, "Planned workforce"]];
const process = ["Consultation", "Site Measurement", "Concept Design", "Material Selection", "Engineering", "CNC Manufacturing", "Quality Inspection", "Installation"];

export default function Home() {
  return <>
    <section className="home-hero">
      <Image className="hero-image" src="/images/brand/mulifang-factory-homepage-hero.webp" alt="MULIFANG INC. furniture manufacturing facility in Bamban, Tarlac" fill priority sizes="100vw" />
      <div className="hero-shade" />
      <div className="container hero-content"><p className="eyebrow light">MULIFANG INC. · Bamban, Tarlac</p><h1>Premium Custom<br />Furniture Manufacturer</h1><p className="hero-slogan">Designed for Living.<br />Built for Life.</p><div className="button-row"><Link className="button button-gold" href="/contact#quotation">Request a Free Quote</Link><Link className="text-link light-link" href="/products">View Product Collection <span>↗</span></Link></div></div>
      <div className="hero-index"><span>Custom Furniture</span><span>Doors & Windows</span><span>Project Installation</span></div>
    </section>

    <section className="section intro-section"><div className="container split intro-grid"><div><p className="eyebrow">Company Introduction</p><h2>Built around your space,<br />not a catalogue.</h2></div><div className="intro-copy"><p>MULIFANG INC. is a premium custom furniture manufacturer based in Bamban, Tarlac. We deliver complete furniture solutions for homes, apartments, hotels, offices and commercial projects.</p><p>From consultation and engineering to CNC manufacturing, delivery and professional installation, one coordinated team carries your project from idea to completion.</p><Link className="text-link" href="/about">Discover MULIFANG <span>↗</span></Link></div></div></section>

    <section className="stats-band"><div className="container stats-grid">{stats.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></section>

    <section className="section"><div className="container section-heading"><div><p className="eyebrow">Furniture Collection 2026</p><h2>Five launch heroes.<br />Built for real living.</h2></div><Link className="text-link" href="/launch-collection-2026">Explore the launch collection <span>↗</span></Link></div><div className="container launch-hero-grid">{launchProducts.filter((item) => item.featured).map((item) => <article className="launch-hero-card" key={item.slug}><Link href={`/products/${item.slug}`}><div className="image-wrap"><Image src={item.mainImage} alt={`${item.name} by MULIFANG`} fill sizes="(max-width:760px) 100vw, (max-width:1050px) 50vw, 33vw" /></div><p>{item.code} · {item.category}</p><h3>{item.name}</h3></Link><ProductPrice product={item} compact /></article>)}</div></section>

    <section className="dark-section section"><div className="container split"><div><p className="eyebrow light">Custom Solutions</p><h2>One partner.<br />Every room.</h2><p className="lead muted">Coordinated furniture, cabinetry, doors, panels and selected window systems for complete interiors.</p><Link className="button button-outline" href="/custom-projects">Plan a Custom Project</Link></div><div className="service-list">{["Residential Homes", "Condominiums & Apartments", "Hotels & Serviced Apartments", "Corporate Offices", "Restaurants & Retail", "Commercial Projects"].map((item, i) => <div key={item}><span>0{i + 1}</span><strong>{item}</strong></div>)}</div></div></section>

    <section className="section factory-preview"><div className="container factory-layout"><div className="factory-copy"><p className="eyebrow">Factory Capability</p><h2>Precision in every stage.</h2><p>Our 4,800 m² Bamban facility brings CNC cutting, edge banding, drilling, machining, assembly, inspection and packaging into one coordinated workflow.</p><Link className="text-link" href="/factory">Inside the factory <span>↗</span></Link></div><div className="factory-image image-wrap"><Image src="/images/factory/cnc-cutting.webp" alt="CNC equipment in the MULIFANG production facility" fill sizes="(max-width: 800px) 100vw, 60vw" /></div></div></section>

    <section className="section process-section"><div className="container"><p className="eyebrow">Design to Installation</p><div className="section-heading"><h2>A clear path to completion.</h2><p>Transparent project stages keep design decisions, production and installation aligned.</p></div><ol className="process-grid">{process.map((item, i) => <li key={item}><span>{String(i + 1).padStart(2, "0")}</span><strong>{item}</strong></li>)}</ol></div></section>

    <section className="service-area"><div className="container"><p className="eyebrow light">Service Areas</p><h2>Metro Manila · Pampanga · Tarlac</h2><p>Project consultation, measurement, delivery and installation coordinated from our Bamban factory.</p></div></section>

    <section className="quote-banner"><div className="container"><p className="eyebrow">Start Your Project</p><h2>Tell us what you want to build.</h2><p>Share your space, dimensions and preferred finish. Our team will prepare a quotation based on your project.</p><Link className="button button-dark" href="/contact#quotation">Request a Free Quote</Link></div></section>
  </>;
}
