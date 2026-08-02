"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isLocale, route, type Locale } from "@/i18n/config";
export function LocalizedNotFound(){const raw=usePathname().split("/").filter(Boolean)[0],locale:Locale=isLocale(raw)?raw:"en";const copy={en:["Page not found.","The page may have moved or the address may be incomplete.","Return Home"],zh:["未找到页面。","该页面可能已移动，或网址不完整。","返回首页"],ko:["페이지를 찾을 수 없습니다.","페이지가 이동했거나 주소가 올바르지 않을 수 있습니다.","홈으로 돌아가기"]}[locale];return <section className="page-hero"><div className="container"><p className="eyebrow">404</p><h1>{copy[0]}</h1><p className="lead">{copy[1]}</p><Link className="button button-dark" href={route(locale)}>{copy[2]}</Link></div></section>}
