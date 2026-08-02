import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { LocalizedFooter, LocalizedHeader } from "@/components/LocalizedChrome";
import { company } from "@/data/company";
import { siteUrl, socialImage } from "@/data/site";
import { htmlLanguages, isLocale, locales, type Locale } from "@/i18n/config";
import { messages } from "@/i18n/messages";
import "../globals.css";

const serif=Cormorant_Garamond({variable:"--font-serif",subsets:["latin"],weight:["400","500","600"]});
const sans=Inter({variable:"--font-sans",subsets:["latin"]});
export const metadata:Metadata={metadataBase:new URL(siteUrl),openGraph:{siteName:"MULIFANG",type:"website",images:[{url:socialImage,width:1200,height:630,alt:"MULIFANG INC."}]},twitter:{card:"summary_large_image",images:[socialImage]},icons:{icon:"/images/brand/mulifang-official-logo-web.png",apple:"/images/brand/mulifang-official-logo-web.png"}};
export const viewport:Viewport={width:"device-width",initialScale:1,themeColor:"#172e29"};
export const generateStaticParams=()=>locales.map(locale=>({locale}));
export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){const {locale:raw}=await params;if(!isLocale(raw))notFound();const locale=raw as Locale,m=messages[locale];const schema={"@context":"https://schema.org","@type":["Organization","FurnitureStore"],name:company.name,description:m.position,telephone:company.phone,email:company.email,url:`https://mulifang.ph/${locale}`,availableLanguage:["English","Chinese","Korean"],address:{"@type":"PostalAddress",streetAddress:"408 Sitio Gumain, Lourdes 2317",addressLocality:"Bamban",addressRegion:"Tarlac",addressCountry:"PH"},geo:{"@type":"GeoCoordinates",latitude:15.258421,longitude:120.549457},openingHours:"Mo-Sa 09:00-17:00",areaServed:company.areas};return <html lang={htmlLanguages[locale]}><body className={`${serif.variable} ${sans.variable}`}><div className={`locale-${locale}`}><a className="skip-link" href="#main">{m.skip}</a><LocalizedHeader locale={locale}/><main id="main">{children}</main><LocalizedFooter locale={locale}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/></div></body></html>;}
