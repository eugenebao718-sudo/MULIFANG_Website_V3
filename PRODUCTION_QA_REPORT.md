# MULIFANG Website V3.0 — Production QA Report

Audit date: August 2, 2026  
Preview: `http://localhost:3000`

## Release status

- ✅ Production build passed
- ✅ Lint and TypeScript checks passed
- ✅ Automated rendering tests passed
- ✅ Dependency audit passed with 0 known vulnerabilities
- ✅ Product images checked
- ✅ Furniture Collection 2026 database checked against the revised English source document
- ✅ SEO metadata, structured data, sitemap and robots checked
- ✅ Desktop and mobile responsive layouts checked
- ✅ Quotation prefill, summary, WhatsApp and email links checked
- ✅ Production server verified on port 3000
- ✅ Technically ready for deployment

Before a public deployment, set `NEXT_PUBLIC_SITE_URL` to the confirmed final HTTPS domain. No unconfirmed or fake public domain is stored in the example environment file.

## Home page

- Hero uses a 1672 × 941 WebP image (approximately 208 KB), loads eagerly with high fetch priority and has no broken source.
- The image overlay was lightened to keep the factory bright and modern while preserving headline contrast.
- Header and Footer use the same official MULIFANG logo asset. The web copy is 320 × 306 PNG (approximately 133 KB); the original master is preserved in `source-assets`.
- Navigation, CTAs, typography, spacing and mobile menu were verified at 1280 px and 390 px widths.
- Mobile hero index is horizontally scrollable instead of clipping labels.

## Product database

- 20 Furniture Collection 2026 records were compared with `MULIFANG_Furniture_Collection_2026_EN_REVISED.docx`.
- Compared fields: product number, code, name, category, dimensions, materials, packaging, features, primary customers, sales positioning and suggested retail price.
- Result: 20/20 products matched, with 0 field mismatches.
- Prices remain numeric values in `data/products.ts` and are formatted as PHP throughout the website.
- Listing, detail page, collection page and quotation links all read from the same product source.

## Product images

- Products scanned: 47 (20 launch + 27 custom).
- Duplicate main-image paths: 0.
- Duplicate real main-image files: 0.
- Missing image data fields: 0.
- Referenced files not found: 0.
- Unused public image files: 0 after archiving 42 legacy/source assets outside the public directory.
- One intentional duplicate-content group remains: the branded `Image Coming Soon` master and its product-specific placeholder copies.
- All launch products use WebP main, gallery and exploded-view images.
- Listing and gallery images lazy-load; product and home hero images load eagerly.

Real independent photography is still requested for these five custom categories; the website currently uses an honest branded placeholder instead of copying another product image:

- MF-CUS-004 — Kitchen Island System
- MF-CUS-006 — Walk-in Closets
- MF-CUS-017 — Hotel Furniture
- MF-CUS-018 — Apartment Furniture
- MF-CUS-019 — Commercial Furniture

## Links and routing

- Sitemap routes checked in production mode: 56.
- Product detail routes checked: 47.
- Non-200 responses: 0.
- Broken rendered images: 0.
- Browser error overlays: 0.
- Google Maps, telephone, email and WhatsApp destinations use the centralized company data.

## Quotation workflow

- Product selection correctly prefills product name, code, reference price, category and quantity.
- Generated summary includes all customer/project fields and the required reference-price disclaimer.
- WhatsApp destination: `639273474888`.
- Email destination: `mulifangph@gmail.com`.
- WhatsApp and email links include the product code, price, quantity and written-quotation disclaimer.
- Required-field validation now applies to Generate Summary, WhatsApp, Email and Copy Summary actions.

## Factory page

- Four factory WebP images load correctly: CNC cutting, edge banding, machining/drilling and dust collection.
- Images are presented without a dark overlay and keep a bright, modern production-page treatment.
- No newer clearly identified factory-production photos were found among the latest supplied image files, so verified existing factory photos were retained.

## SEO

- Every primary page has a unique title, description, canonical URL, Open Graph title, Open Graph URL and social image.
- Product detail pages have product-specific Open Graph images and absolute Product structured-data URLs.
- Global FurnitureStore structured data and product-specific Product structured data render correctly.
- `sitemap.xml` contains all 56 routes; `robots.txt` allows crawling and points to the sitemap.
- A 1200 × 630 MULIFANG social-preview image is available at `public/og.png`.

## Final verification

- `npm install`: passed, 0 known vulnerabilities.
- `npm run check:images`: passed.
- `npm run lint`: passed.
- `npx tsc --noEmit`: passed.
- `npm run build`: passed.
- Rendered HTML tests: 3/3 passed.
- `npm run dev`: passed on port 3000.
- `npm run start`: passed on port 3000.
