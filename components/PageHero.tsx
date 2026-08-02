export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <section className="page-hero"><div className="container"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lead">{text}</p></div></section>;
}
