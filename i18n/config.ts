export const locales = ["en", "zh", "ko"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const isLocale = (value: string | undefined): value is Locale => Boolean(value && locales.includes(value as Locale));
export const localeNames: Record<Locale, string> = { en: "English", zh: "简体中文", ko: "한국어" };
export const htmlLanguages: Record<Locale, string> = { en: "en-PH", zh: "zh-CN", ko: "ko-KR" };
export const ogLocales: Record<Locale, string> = { en: "en_PH", zh: "zh_CN", ko: "ko_KR" };

export function route(locale: Locale, path = "") {
  const normalized = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalized}`;
}

export function switchLocale(pathname: string, locale: Locale) {
  const parts = pathname.split("/").filter(Boolean);
  if (isLocale(parts[0])) parts[0] = locale;
  else parts.unshift(locale);
  return `/${parts.join("/")}`;
}
