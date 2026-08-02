"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import { LanguageSwitcher } from "./LanguageSwitcher";

type NavItem = { href: string; label: string };

export function MobileNavigation({ locale, items, menuLabel, languageLabel, quoteLabel, quoteHref }: {
  locale: Locale;
  items: NavItem[];
  menuLabel: string;
  languageLabel: string;
  quoteLabel: string;
  quoteHref: string;
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    document.body.classList.toggle("mobile-menu-open", open);
    return () => document.body.classList.remove("mobile-menu-open");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return <div className={`mobile-nav${open ? " is-open" : ""}`}>
    <button className="mobile-nav-toggle" type="button" aria-label={menuLabel} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(value => !value)}>
      <span/><span/><span/>
    </button>
    <button className="mobile-nav-backdrop" type="button" tabIndex={open ? 0 : -1} aria-label={menuLabel} onClick={close}/>
    <div className="mobile-nav-panel" id="mobile-navigation" aria-hidden={!open}>
      <nav aria-label={menuLabel}>{items.map(item => <Link key={item.href} href={item.href} onClick={close}>{item.label}</Link>)}</nav>
      <LanguageSwitcher locale={locale} mobile label={languageLabel} onChangeComplete={close}/>
      <Link className="button" href={quoteHref} onClick={close}>{quoteLabel}</Link>
    </div>
  </div>;
}
