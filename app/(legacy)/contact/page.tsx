import { redirect } from "next/navigation";
export default async function Page({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}){const p=await searchParams;const q=new URLSearchParams();for(const [k,v] of Object.entries(p)){const value=Array.isArray(v)?v[0]:v;if(value)q.set(k,value);}redirect(`/en/contact${q.size?`?${q}`:""}`);}
