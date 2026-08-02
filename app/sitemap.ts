import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { siteUrl } from "@/data/site";
import { locales, route } from "@/i18n/config";

export default function sitemap():MetadataRoute.Sitemap{
  const paths=["","/products","/launch-collection-2026","/custom-projects","/factory","/about","/contact","/privacy","/terms",...products.map(p=>`/products/${p.slug}`)];
  return paths.flatMap(path=>locales.map(locale=>({url:`${siteUrl}${route(locale,path)}`,lastModified:new Date(),changeFrequency:path===""?"weekly" as const:"monthly" as const,priority:path===""?1:path.startsWith("/products/")?.7:.8,alternates:{languages:{en:`${siteUrl}${route("en",path)}`,zh:`${siteUrl}${route("zh",path)}`,ko:`${siteUrl}${route("ko",path)}`,"x-default":`${siteUrl}${route("en",path)}`}}})));
}
