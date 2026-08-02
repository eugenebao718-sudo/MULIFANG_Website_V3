"use client";

import { usePathname, useRouter } from "next/navigation";
import { localeNames, locales, switchLocale, type Locale } from "@/i18n/config";

export function LanguageSwitcher({ locale, mobile = false, label }: { locale: Locale; mobile?: boolean; label: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const change = (next: Locale) => {
    document.cookie = `mulifang-locale=${next};path=/;max-age=31536000;SameSite=Lax`;
    localStorage.setItem("mulifang-locale", next);
    router.push(`${switchLocale(pathname, next)}${window.location.search}${window.location.hash}`);
  };
  return <label className={`language-switcher ${mobile ? "mobile-language-switcher" : ""}`}><span className="language-icon" aria-hidden="true">🌐</span><span className="sr-only">{label}</span><select aria-label={label} value={locale} onChange={(event) => change(event.target.value as Locale)}>{locales.map((item) => <option key={item} value={item}>{localeNames[item]}</option>)}</select></label>;
}
