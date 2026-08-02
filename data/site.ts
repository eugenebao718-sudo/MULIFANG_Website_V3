import type { Metadata } from "next";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://mulifang.ph").replace(/\/$/, "");
export const socialImage = "/og.png";

export const absoluteUrl = (path: string) => new URL(path, `${siteUrl}/`).toString();

export function createPageMetadata({ title, description, path, image = socialImage }: { title: string; description: string; path: string; image?: string }): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      siteName: "MULIFANG",
      locale: "en_PH",
      type: "website",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: `${title} — MULIFANG` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [imageUrl] },
  };
}
