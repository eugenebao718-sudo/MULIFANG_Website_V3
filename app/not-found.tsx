import Link from "next/link";
export default function NotFound() { return <section className="page-hero"><div className="container"><p className="eyebrow">404</p><h1>Page not found.</h1><p className="lead">The page may have moved or the address may be incomplete.</p><Link className="button button-dark" href="/">Return Home</Link></div></section>; }
