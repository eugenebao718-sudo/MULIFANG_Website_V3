"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatProductPrice, type ProductSystem } from "@/data/products";
import { localizedProducts } from "@/i18n/products";
import { messages } from "@/i18n/messages";
import { route, type Locale } from "@/i18n/config";
import { LocalizedProductPrice } from "./LocalizedProductPrice";

export function LocalizedProductCatalog({ locale }: { locale: Locale }) {
  const m=messages[locale], all=localizedProducts(locale);
  const [search,setSearch]=useState(""), [category,setCategory]=useState("all"), [system,setSystem]=useState<"all"|ProductSystem>("all");
  const systems:[string,"all"|ProductSystem][]=[[m.productsPage.systems[0],"all"],[m.productsPage.systems[1],"launch"],[m.productsPage.systems[2],"custom"]];
  const categories=useMemo(()=>["all",...Array.from(new Set(all.filter(p=>system==="all"||p.system===system).map(p=>p.localizedCategory)))],[all,system]);
  const filtered=useMemo(()=>all.filter(p=>{const q=search.trim().toLowerCase(); return (system==="all"||p.system===system)&&(category==="all"||p.localizedCategory===category)&&(!q||`${p.localizedName} ${p.name} ${p.code} ${p.localizedCategory} ${p.localizedDescription}`.toLowerCase().includes(q));}),[all,search,category,system]);
  const choose=(v:"all"|ProductSystem)=>{setSystem(v);setCategory("all");};
  return <><div className="system-tabs" aria-label={m.productsPage.eyebrow}>{systems.map(([label,value])=><button key={value} className={system===value?"active":""} type="button" onClick={()=>choose(value)}>{label}</button>)}</div><div className="catalog-tools" role="search"><label className="sr-only" htmlFor="product-search">{m.productsPage.search}</label><input id="product-search" type="search" placeholder={m.productsPage.search} value={search} onChange={e=>setSearch(e.target.value)}/><label className="sr-only" htmlFor="category-filter">{m.productsPage.filter}</label><select id="category-filter" value={category} onChange={e=>setCategory(e.target.value)}>{categories.map(c=><option key={c} value={c}>{c==="all"?m.common.all:c}</option>)}</select></div><div className="catalog-count" aria-live="polite"><strong>{filtered.length}</strong> {filtered.length===1?m.common.product:m.common.products}</div><div className="product-grid">{filtered.map(p=>{const detail=route(locale,`/products/${p.slug}`), quote=`${route(locale,"/contact")}?product=${encodeURIComponent(p.localizedName)}&code=${p.code}&price=${encodeURIComponent(formatProductPrice(p))}&quantity=1#quotation`;return <article className={`product-card ${p.system} ${p.featured?"featured":""}`} key={p.slug}><Link href={detail} aria-label={`${m.common.view}: ${p.localizedName}`}><div className="image-wrap"><Image src={p.mainImage} alt={p.localizedName} fill sizes="(max-width:760px) calc(100vw - 40px), (max-width:1050px) 50vw, 33vw" loading="lazy"/>{p.featured&&<span className="card-badge">{m.productsPage.featured}</span>}</div></Link><p className="category">{p.system==="launch"?m.productsPage.launchPrefix:m.productsPage.customPrefix} · {p.localizedCategory}</p><p className="product-code">{p.code}</p><h2><Link href={detail}>{p.localizedName}</Link></h2><p className="product-card-subcategory">{p.localizedCategory}</p><p>{p.localizedShortDescription}</p><LocalizedProductPrice product={p} locale={locale} compact/><div className="card-actions"><Link className="text-link" href={detail}>{m.common.view} <span>↗</span></Link><Link className="text-link" href={quote}>{m.quote} <span>↗</span></Link></div></article>;})}{!filtered.length&&<div className="empty-state"><h2>{m.productsPage.noMatch}</h2><p>{m.productsPage.tryAgain}</p></div>}</div></>;
}
