import Link from "next/link";
import { company, navItems } from "@/data/company";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          {/* Direct loading preserves the official PNG exactly in every host. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/brand/mulifang-official-logo-web.png" alt="Official MULIFANG logo" width="110" height="106" loading="lazy" />
          <p className="eyebrow">{company.position}</p>
          <h2>{company.slogan}</h2>
        </div>
        <div><h3>Contact</h3><a href={`tel:+63${company.phone.replace(/\D/g, "").slice(1)}`}>{company.phone}</a><a href={`mailto:${company.email}`}>{company.email}</a><p>{company.address}</p></div>
        <div><h3>Visit</h3><p>{company.hours}</p><p>Serving {company.areas.join(", ")}</p><a href={`https://www.google.com/maps?q=${company.coordinates}`} target="_blank" rel="noreferrer">Open in Google Maps</a></div>
        <div><h3>Explore</h3>{navItems.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}<Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms of Use</Link></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} MULIFANG INC.</span><span>Designed for Living. Built for Life.</span></div>
      <a className="whatsapp-float" href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer" aria-label="Contact MULIFANG on WhatsApp">WhatsApp</a>
    </footer>
  );
}
