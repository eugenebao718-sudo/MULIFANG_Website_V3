/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { company } from "@/data/company";
import { messages } from "@/i18n/messages";
import { route, type Locale } from "@/i18n/config";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNavigation } from "./MobileNavigation";

const paths = ["", "/products", "/launch-collection-2026", "/custom-projects", "/factory", "/about", "/contact"];

export function LocalizedHeader({ locale }: { locale: Locale }) {
  const m = messages[locale];
  const items = m.nav.map((label, i) => ({ label, href: route(locale, paths[i]) }));
  return <header className="site-header"><div className="header-inner container">
    <Link className="brand" href={route(locale)} aria-label={`MULIFANG ${m.nav[0]}`}><img src="/images/brand/mulifang-official-logo-web.png" alt="MULIFANG" width="58" height="56" /><span><strong>MULIFANG</strong><small>INC.</small></span></Link>
    <nav className="desktop-nav" aria-label={m.menu}>{m.nav.map((label, i) => <Link key={paths[i]} href={route(locale, paths[i])}>{label}</Link>)}</nav>
    <LanguageSwitcher locale={locale} label={m.language} />
    <Link className="button button-small header-cta" href={`${route(locale, "/contact")}#quotation`}>{m.quote}</Link>
    <MobileNavigation locale={locale} items={items} menuLabel={m.menu} languageLabel={m.language} quoteLabel={m.quote} quoteHref={`${route(locale, "/contact")}#quotation`}/>
  </div></header>;
}

export function LocalizedFooter({ locale }: { locale: Locale }) {
  const m = messages[locale];
  const hours = locale === "zh" ? "星期一至星期六\n上午 9:00–下午 5:00" : locale === "ko" ? "월요일–토요일\n오전 9:00–오후 5:00" : company.hours;
  return <footer className="footer"><div className="container footer-grid"><div className="footer-brand"><img src="/images/brand/mulifang-official-logo-web.png" alt="MULIFANG" width="110" height="106" loading="lazy"/><p className="eyebrow">{m.position}</p><h2>{m.slogan}</h2></div>
    <div><h3>{m.footer.contact}</h3><a href={`tel:+63${company.phone.replace(/\D/g, "").slice(1)}`}>{company.phone}</a><a href={`mailto:${company.email}`}>{company.email}</a><p>{company.address}</p></div>
    <div><h3>{m.footer.visit}</h3><p>{hours}</p><p>{m.footer.serving} {company.areas.join(", ")}</p><a href={`https://www.google.com/maps?q=${company.coordinates}`} target="_blank" rel="noreferrer">{m.footer.maps}</a></div>
    <div><h3>{m.footer.explore}</h3>{m.nav.map((label,i)=><Link key={paths[i]} href={route(locale,paths[i])}>{label}</Link>)}<Link href={route(locale,"/privacy")}>{m.footer.privacy}</Link><Link href={route(locale,"/terms")}>{m.footer.terms}</Link></div>
  </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} MULIFANG INC.</span><span>{m.slogan}</span></div><a className="whatsapp-float" href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer" aria-label={m.footer.whatsapp}>WhatsApp</a></footer>;
}
