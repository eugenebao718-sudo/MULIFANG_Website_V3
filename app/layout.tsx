import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { company } from "@/data/company";
import { siteUrl, socialImage } from "@/data/site";
import "./globals.css";

const serif = Cormorant_Garamond({ variable: "--font-serif", subsets: ["latin"], weight: ["400", "500", "600"] });
const sans = Inter({ variable: "--font-sans", subsets: ["latin"] });
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "MULIFANG | Custom Furniture Manufacturer Philippines", template: "%s | MULIFANG" },
  description: "Premium custom furniture manufacturer in Tarlac serving Metro Manila, Pampanga and Tarlac. Design coordination, CNC manufacturing, delivery and installation.",
  alternates: { canonical: "/" },
  openGraph: { title: "MULIFANG INC.", description: company.slogan, url: siteUrl, siteName: "MULIFANG", locale: "en_PH", type: "website", images: [{ url: socialImage, width: 1200, height: 630, alt: "MULIFANG INC. — Designed for Living. Built for Life." }] },
  twitter: { card: "summary_large_image", title: "MULIFANG INC.", description: company.slogan, images: [socialImage] },
  icons: { icon: "/images/brand/mulifang-official-logo-web.png", apple: "/images/brand/mulifang-official-logo-web.png" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#172e29" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const localBusiness = {
    "@context": "https://schema.org", "@type": "FurnitureStore", name: company.name,
    description: company.position, telephone: company.phone, email: company.email,
    address: { "@type": "PostalAddress", streetAddress: "408 Sitio Gumain, Lourdes 2317", addressLocality: "Bamban", addressRegion: "Tarlac", addressCountry: "PH" },
    geo: { "@type": "GeoCoordinates", latitude: 15.258421, longitude: 120.549457 },
    openingHours: "Mo-Sa 09:00-17:00", areaServed: company.areas,
  };
  return <html lang="en"><body className={`${serif.variable} ${sans.variable}`}><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main">{children}</main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} /></body></html>;
}
