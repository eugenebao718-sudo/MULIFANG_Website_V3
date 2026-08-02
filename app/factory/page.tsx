import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { company } from "@/data/company";
import { createPageMetadata } from "@/data/site";

export const metadata = createPageMetadata({ title: "Factory Capability", description: "Explore MULIFANG's 4,800 m² Bamban furniture factory, equipment and production workflow.", path: "/factory" });
const equipment = [["/images/factory/cnc-cutting.webp", "CNC Cutting", "Computer-guided panel processing supports repeatable, project-specific component production."], ["/images/factory/edge-banding.webp", "Edge Banding", "Coordinated edge finishing helps protect panels and deliver clean, consistent lines."], ["/images/factory/machining.webp", "Machining & Drilling", "Production equipment supports accurate drilling and machining for assembly and hardware."], ["/images/factory/dust-collection.webp", "Dust Collection", "Central dust collection supports a cleaner, more controlled production environment."]];
const capabilities = ["CNC cutting", "Edge banding", "Drilling", "Machining", "Assembly", "Quality inspection", "Dust collection", "Packaging", "Delivery coordination", "Custom production", "Batch production", "Installation coordination"];

export default function FactoryPage() { return <>
  <PageHero eyebrow="Factory Capability" title="A production workflow built for precision." text={`Our ${company.factoryArea} facility in Bamban coordinates ${company.machines} major production machines, skilled assembly and quality inspection for custom and batch projects.`} />
  <section className="content-section"><div className="container factory-gallery">{equipment.map(([image, title, text]) => <article className="factory-card" key={title}><div className="image-wrap"><Image src={image} alt={`${title} equipment used in furniture production`} fill sizes="(max-width:760px) 100vw, 50vw" /></div><h3>{title}</h3><p>{text}</p></article>)}</div></section>
  <section className="content-section alt"><div className="container split"><div><p className="eyebrow">Production Scope</p><h2>From panel processing to protected delivery.</h2><p className="lead" style={{marginTop:30}}>Our workflow connects manufacturing steps with inspection, packing and project coordination.</p></div><ul className="capability-list">{capabilities.map((item) => <li key={item}>{item}</li>)}</ul></div></section>
  <section className="stats-band"><div className="container stats-grid"><div><strong>{company.factoryArea}</strong><span>Factory area</span></div><div><strong>{company.machines}</strong><span>Major machines</span></div><div><strong>{company.employees}</strong><span>Current employees</span></div><div><strong>{company.plannedWorkforce}</strong><span>Planned workforce</span></div></div></section>
  <section className="quote-banner"><div className="container"><p className="eyebrow">Production Enquiry</p><h2>Discuss your manufacturing needs.</h2><p>Send your project scope for a quotation based on materials, dimensions, quantities and installation requirements.</p><Link className="button button-dark" href="/contact#quotation">Request a Quote</Link></div></section>
  </>; }
