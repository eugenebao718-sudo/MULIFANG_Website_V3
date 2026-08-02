import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { siteUrl } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/products", "/launch-collection-2026", "/custom-projects", "/factory", "/about", "/contact", "/privacy", "/terms"];
  return [...pages.map((path) => ({ url: `${siteUrl}${path}`, lastModified: new Date(), changeFrequency: path === "" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : .8 })), ...products.map((item) => ({ url: `${siteUrl}/products/${item.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: .7 }))];
}
