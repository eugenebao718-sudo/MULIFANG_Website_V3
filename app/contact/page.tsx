import { PageHero } from "@/components/PageHero";
import { QuoteForm } from "@/components/QuoteForm";
import { company } from "@/data/company";
import { createPageMetadata } from "@/data/site";

export const metadata = createPageMetadata({ title: "Contact & Online Quotation", description: "Contact MULIFANG in Bamban, Tarlac or prepare a furniture quotation request online.", path: "/contact" });
const first = (value: string | string[] | undefined) => Array.isArray(value) ? value[0] ?? "" : value ?? "";

export default async function ContactPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  return <>
    <PageHero eyebrow="Contact MULIFANG" title="Let’s discuss your space." text="Contact our team or prepare a structured quotation request for launch furniture, custom cabinetry, doors, windows, mattresses or a complete project." />
    <section className="content-section"><div className="container contact-grid"><aside className="contact-details"><p className="eyebrow">Direct Contact</p><h2>Visit, call or message us.</h2><div className="contact-item"><span>Phone / WhatsApp</span><a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer">{company.phone}</a></div><div className="contact-item"><span>Email</span><a href={`mailto:${company.email}`}>{company.email}</a></div><div className="contact-item"><span>Factory Address</span><p>{company.address}</p></div><div className="contact-item"><span>Business Hours</span><p>{company.hours}</p></div><div className="contact-item"><span>Service Areas</span><p>{company.areas.join(" · ")}</p></div><iframe className="map-frame" title="MULIFANG factory location" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps?q=${company.coordinates}&z=15&output=embed`} /></aside><div id="quotation"><QuoteForm initialProduct={first(query.product)} initialCode={first(query.code)} initialPrice={first(query.price)} initialQuantity={first(query.quantity)} /></div></div></section>
  </>;
}
