import Link from "next/link";
import { navItems } from "@/data/company";

export function Header() {
  return (
    <header className="site-header">
      <div className="header-inner container">
        <Link className="brand" href="/" aria-label="MULIFANG home">
          {/* Direct loading preserves the official PNG exactly in every host. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/brand/mulifang-official-logo-web.png" alt="Official MULIFANG logo" width="58" height="56" />
          <span><strong>MULIFANG</strong><small>INC.</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <Link className="button button-small header-cta" href="/contact#quotation">Request a Quote</Link>
        <details className="mobile-nav">
          <summary aria-label="Open menu"><span /><span /><span /></summary>
          <div className="mobile-nav-panel">
            {navItems.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            <Link className="button" href="/contact#quotation">Request a Quote</Link>
          </div>
        </details>
      </div>
    </header>
  );
}
