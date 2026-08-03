import { defineMiddleware } from "nitro";
import { products } from "../../data/products";

const locales = new Set(["en", "zh", "ko"]);
const pages = new Set([
  "",
  "products",
  "launch-collection-2026",
  "custom-projects",
  "factory",
  "about",
  "contact",
  "privacy",
  "terms",
]);
const productSlugs = new Set(products.map((product) => product.slug));

const copy = {
  en: {
    lang: "en-PH",
    title: "Page not found | MULIFANG",
    heading: "Page not found.",
    text: "The page may have moved or the address may be incomplete.",
    action: "Return Home",
  },
  zh: {
    lang: "zh-CN",
    title: "未找到页面 | MULIFANG",
    heading: "未找到页面。",
    text: "该页面可能已移动，或网址不完整。",
    action: "返回首页",
  },
  ko: {
    lang: "ko-KR",
    title: "페이지를 찾을 수 없습니다 | MULIFANG",
    heading: "페이지를 찾을 수 없습니다.",
    text: "페이지가 이동했거나 주소가 올바르지 않을 수 있습니다.",
    action: "홈으로 돌아가기",
  },
} as const;

function isKnownRoute(parts: string[]) {
  const [first = "", second = "", third, ...rest] = parts;
  const localized = locales.has(first);
  const page = localized ? second : first;
  const slug = localized ? third : second;
  const extras = localized ? rest : parts.slice(2);

  if (page === "products" && slug) {
    return extras.length === 0 && productSlugs.has(slug);
  }

  return !slug && pages.has(page);
}

function html(locale: keyof typeof copy) {
  const content = copy[locale];
  return `<!doctype html><html lang="${content.lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>${content.title}</title><style>*{box-sizing:border-box}body{margin:0;color:#17201e;background:#f4f0e8;font-family:Arial,sans-serif}.shell{min-height:100svh;display:grid;grid-template-rows:auto 1fr}.header{height:84px;display:flex;align-items:center;padding:0 max(20px,calc((100vw - 1240px)/2));background:#fff;border-bottom:1px solid rgba(23,32,30,.18)}.brand{display:flex;align-items:center;gap:12px;color:#17201e;text-decoration:none;font-weight:800;letter-spacing:.14em}.brand img{width:47px;height:47px;object-fit:contain}.main{display:flex;align-items:center;padding:72px max(20px,calc((100vw - 1240px)/2))}.eyebrow{margin:0 0 22px;color:#b88935;font-size:12px;font-weight:800;letter-spacing:.2em}.main h1{max-width:850px;margin:0;font-family:Georgia,serif;font-size:clamp(52px,8vw,108px);font-weight:500;line-height:.98}.main p{max-width:640px;margin:30px 0;color:#59615f;font-size:clamp(17px,2vw,23px);line-height:1.6}.button{display:inline-flex;min-height:50px;align-items:center;padding:0 25px;background:#17332d;color:#fff;text-decoration:none;font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}@media(max-width:760px){.header{height:72px}.main{align-items:flex-start;padding-top:80px}.main h1{font-size:clamp(46px,14vw,64px)}}</style></head><body><div class="shell"><header class="header"><a class="brand" href="/${locale}/"><img src="/images/brand/mulifang-official-logo-web.png" alt="MULIFANG"><span>MULIFANG INC.</span></a></header><main class="main"><div><p class="eyebrow">404</p><h1>${content.heading}</h1><p>${content.text}</p><a class="button" href="/${locale}/">${content.action}</a></div></main></div></body></html>`;
}

export default defineMiddleware((event) => {
  const pathname = event.url.pathname;
  if (
    pathname.startsWith("/_") ||
    pathname.startsWith("/assets/") ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/.well-known/") ||
    pathname === "/favicon.ico" ||
    pathname === "/og.png" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return;
  }

  const parts = pathname.split("/").filter(Boolean);
  if (isKnownRoute(parts)) return;

  const requestedLocale = locales.has(parts[0]) ? parts[0] : "en";
  return new Response(html(requestedLocale as keyof typeof copy), {
    status: 404,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
});
