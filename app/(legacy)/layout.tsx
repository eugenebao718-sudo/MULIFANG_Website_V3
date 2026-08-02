import { Cormorant_Garamond, Inter } from "next/font/google";
import "../globals.css";
const serif=Cormorant_Garamond({variable:"--font-serif",subsets:["latin"],weight:["400","500","600"]});
const sans=Inter({variable:"--font-sans",subsets:["latin"]});
export default function LegacyLayout({children}:{children:React.ReactNode}){return <html lang="en-PH"><body className={`${serif.variable} ${sans.variable}`}>{children}</body></html>;}
