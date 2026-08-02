# MULIFANG Website V3.0 Production

Production-ready English corporate website for **MULIFANG INC.** Built with Next.js, TypeScript and Tailwind CSS.

## Run locally

Install Node.js 22 or newer, then open a terminal in this folder:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. To verify the production version:

```bash
npm run build
npm run start
```

## Content management

### Edit company information

Open `data/company.ts`. Phone, WhatsApp, email, factory address, business hours, service areas and company statistics are stored together. The WhatsApp value must include the country code and digits only.

### Product systems and data

Open `data/products.ts`. The website keeps two product systems in one structured data source:

- `launchProducts`: 20 standardized products in **Furniture Collection 2026**
- `customProducts`: 27 made-to-order **Custom Furniture Solutions**

Launch records include product number, code, dimensions, materials, packaging, features, primary customers, sales positioning, suggested retail price, disclaimer, main image, exploded view, gallery, featured status and availability status. Keep every slug and product code unique.

## HOW TO CHANGE PRODUCT PRICES

All 20 Furniture Collection 2026 prices have one source of truth: `data/products.ts`. Prices are stored as numbers and formatted as Philippine pesos automatically throughout the website.

1. Open `data/products.ts`.
2. Search for the product code, for example `MF-LR-TV1800`.
3. Change the numeric `suggestedRetailPrice` value. Do not type `₱` or commas in this field.
4. Save the file.
5. Restart the website with `npm run dev`, or rebuild production with `npm run build` followed by `npm run start`.
6. Open the product detail page and confirm the formatted price and quotation link.

Example product price fields:

```ts
{
  code: "MF-LR-TV1800",
  name: "NEST 1800 TV CONSOLE",
  suggestedRetailPrice: 8990,
  currency: "PHP"
}
```

The website formats `8990` automatically as `₱8,990`. One edit updates the Products listing, product detail page, Launch Collection page, quotation form prefill, WhatsApp quotation text and email quotation summary.

### Replace product, factory or project images

- Product images: `public/images/products`
- Furniture Collection 2026 assets: `public/images/products/launch-collection-2026/<product-code>`
- Factory images: `public/images/factory`
- Project images: `public/images/projects`
- Brand assets: `public/images/brand`

Each launch product folder contains `main.webp`, `gallery-01.webp` and `exploded-view.webp`. Preserve those filenames when replacing approved product artwork. Use WebP for web photography where practical, keep images below about 2 MB and preserve their proportions. Original and retired source files are kept outside the public website in `source-assets/unused-public-image-archive`.

Run `npm run check:images` after changing product artwork. The audit reports duplicate product images, missing files, placeholders and unused public images.

### Replace the official logo

Keep the approved master logo in `source-assets/unused-public-image-archive/images/brand/mulifang-official-logo.png`, then export its optimized transparent web copy as `public/images/brand/mulifang-official-logo-web.png`. Do not redraw, crop or alter the mark; Header, Footer and browser icons all use this one web file.

### Edit phone and email

Change `phone`, `whatsapp` and `email` in `data/company.ts`. These values feed the header, footer, contact page and online quotation actions.

## Quotation form

The form validates required fields and prepares a plain-text quotation summary. Product quote links prefill the product name, code, price reference and category. Visitors can open the summary in WhatsApp, open it in their email application or copy it. No customer information is stored on a server. If automatic email delivery or a CRM is required later, connect a secure form endpoint and update the privacy policy.

## Domain and SEO setting

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the final HTTPS domain. The value is used by canonical URLs, sitemap and robots metadata. Also configure the same environment variable on the hosting platform.

## Deploy to Vercel

1. Push this folder to a Git repository.
2. Import the repository at Vercel and keep the detected Next.js settings.
3. Add `NEXT_PUBLIC_SITE_URL` under Project Settings > Environment Variables.
4. Deploy, then update the variable to the assigned custom HTTPS domain if needed.
5. In Project Settings > Domains, add the purchased domain and apply the DNS records Vercel displays.

## Deploy to Netlify

1. Push this folder to a Git repository and choose **Add new site > Import an existing project** in Netlify.
2. Use `npm run build` as the build command. Netlify should detect Next.js automatically.
3. Add `NEXT_PUBLIC_SITE_URL` in Site configuration > Environment variables.
4. Deploy and review all main routes.
5. In Domain management, add the purchased domain and follow the displayed DNS instructions.

## Connect a purchased domain

Add the domain in the selected hosting dashboard first. At the domain registrar, create the exact A, AAAA, CNAME or nameserver records shown by the host. After DNS and HTTPS become active, set `NEXT_PUBLIC_SITE_URL` to the final `https://` address and redeploy so canonical URLs and the sitemap use it.

## Production checklist

- Confirm phone, email, address and business hours.
- Set `NEXT_PUBLIC_SITE_URL` to the live domain.
- Replace reused concept images with approved factory and completed-project photography as it becomes available.
- Test WhatsApp, email and Maps from a real mobile device.
- Run `npm run build` before every deployment.
