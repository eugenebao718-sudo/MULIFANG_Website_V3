"use client";

import { useState } from "react";
import type { FormEvent, MouseEvent } from "react";
import { company } from "@/data/company";
import { products, QUOTATION_REFERENCE_NOTE } from "@/data/products";

type QuoteData = Record<string, string>;
const baseData: QuoteData = { fullName:"", phone:"", email:"", location:"", customerType:"Homeowner", productCategory:"Living Room", productName:"", productCode:"", priceReference:"", quantity:"1", dimensions:"", material:"", color:"", budget:"", deliveryDate:"", installation:"Yes", details:"" };
const labels: Record<string,string> = { fullName:"Full Name", phone:"Phone / WhatsApp", email:"Email", location:"City / Province", customerType:"Customer Type", productCategory:"Product Category", productName:"Product Name", productCode:"Product Code", priceReference:"Reference Price", quantity:"Quantity", dimensions:"Dimensions", material:"Preferred Material", color:"Preferred Color", budget:"Budget Range", deliveryDate:"Target Delivery Date", installation:"Installation Required", details:"Project Details" };

type QuoteFormProps = { initialProduct?: string; initialCode?: string; initialPrice?: string; initialQuantity?: string };

export function QuoteForm({ initialProduct = "", initialCode = "", initialPrice = "", initialQuantity = "1" }: QuoteFormProps) {
  const matched = products.find((item) => item.code === initialCode || item.name === initialProduct);
  const [data, setData] = useState<QuoteData>({ ...baseData, productName: initialProduct, productCode: initialCode, priceReference: initialPrice, quantity: initialQuantity || "1", productCategory: matched?.category ?? baseData.productCategory });
  const [summary, setSummary] = useState("");
  const [message, setMessage] = useState("");
  const update = (name:string, value:string) => setData((current) => ({...current,[name]:value}));
  const buildSummary = () => `MULIFANG QUOTATION REQUEST\n${"-".repeat(30)}\n${Object.entries(labels).map(([key,label]) => `${label}: ${data[key] || "Not specified"}`).join("\n")}\n\n${QUOTATION_REFERENCE_NOTE}\n\nSubmitted from the MULIFANG website.`;
  const validate = () => { if (!data.fullName || !data.phone || !data.email || !data.location || !data.details) { setMessage("Please complete all required fields before preparing or sending the quotation request."); return false; } return true; };
  const generate = (event?: FormEvent) => { event?.preventDefault(); if (!validate()) return; const text = buildSummary(); setSummary(text); setMessage("Your quotation summary is ready. Choose WhatsApp, email or copy below."); };
  const shareText = summary || buildSummary();
  const whatsappHref = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(shareText)}`;
  const emailHref = `mailto:${company.email}?subject=${encodeURIComponent(`Quotation Request - ${data.fullName || data.productCode || "Website Enquiry"}`)}&body=${encodeURIComponent(shareText)}`;
  const prepareShare = (event: MouseEvent<HTMLAnchorElement>) => { if (!validate()) { event.preventDefault(); return; } setSummary(shareText); setMessage("Your quotation summary is ready to send."); };
  const copy = async () => { if (!validate()) return; const text = summary || buildSummary(); setSummary(text); await navigator.clipboard.writeText(text); setMessage("Quotation summary copied successfully."); };
  const fields = (items: {name:string; type?:string; options?:string[]; full?:boolean; placeholder?:string; required?:boolean; readOnly?:boolean}[]) => items.map((field) => <div className={`field ${field.full ? "full" : ""}`} key={field.name}><label htmlFor={field.name}>{labels[field.name]}{field.required ? " *" : ""}</label>{field.name === "details" ? <textarea id={field.name} name={field.name} value={data[field.name]} onChange={(e) => update(field.name,e.target.value)} placeholder={field.placeholder} required={field.required} /> : field.options ? <select id={field.name} name={field.name} value={data[field.name]} onChange={(e) => update(field.name,e.target.value)} required={field.required}>{field.options.map((option) => <option key={option}>{option}</option>)}</select> : <input id={field.name} name={field.name} type={field.type || "text"} value={data[field.name]} onChange={(e) => update(field.name,e.target.value)} placeholder={field.placeholder} required={field.required} min={field.type === "number" ? "1" : undefined} readOnly={field.readOnly} />}</div>);
  return <form className="quote-form" onSubmit={generate}>
    <p className="eyebrow">Online Quotation</p><h2>Tell us about your project.</h2><p className="quote-form-intro">Required fields are marked *. Product links automatically include the product, code, reference price and quantity.</p><p className="quotation-reference-note">{QUOTATION_REFERENCE_NOTE}</p>
    <div className="form-grid">
      {fields([{name:"fullName",required:true},{name:"phone",type:"tel",required:true},{name:"email",type:"email",required:true},{name:"location",required:true},{name:"customerType",options:["Homeowner","Interior Designer","Architect","Contractor","Property Developer","Business / Organization","Other"]},{name:"productCategory",options:[...new Set(products.map((item) => item.category))]},{name:"productName",placeholder:"Specific product or room"},{name:"productCode",placeholder:"e.g. MF-LR-TV1800"},{name:"priceReference",placeholder:"Suggested retail price or quotation basis"},{name:"quantity",type:"number"},{name:"dimensions",placeholder:"Width × height × depth, or room size"},{name:"material",placeholder:"e.g. oak veneer, laminate"},{name:"color",placeholder:"Preferred tone or finish"},{name:"budget",options:["Not decided","Below PHP 100,000","PHP 100,000-300,000","PHP 300,000-600,000","PHP 600,000-1,000,000","Above PHP 1,000,000"]},{name:"deliveryDate",type:"date"},{name:"installation",options:["Yes","No","To be discussed"]},{name:"details",full:true,required:true,placeholder:"Describe the space, scope, style direction and any site considerations."}])}
    </div>
    <div className="form-actions"><button className="button button-dark" type="submit">Generate Summary</button><a className="button secondary" href={whatsappHref} target="_blank" rel="noreferrer" onClick={prepareShare}>Send by WhatsApp</a><a className="button secondary" href={emailHref} onClick={prepareShare}>Send by Email</a><button className="button secondary" type="button" onClick={copy}>Copy Summary</button></div>
    {message && <p className="form-message" role="status">{message}</p>}{summary && <div className="summary-box" aria-label="Generated quotation summary">{summary}</div>}
  </form>;
}
