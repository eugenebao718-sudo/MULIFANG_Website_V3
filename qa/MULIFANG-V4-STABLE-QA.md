# MULIFANG Website V4.0 Stable — Production QA

Date: 2026-08-03 (Asia/Manila)

## Result

- English, Simplified Chinese, and Korean visible-content checks passed.
- 47 product cards checked: 47 unique main images, zero missing files, zero placeholders, and zero perceptual duplicates.
- Approved product order, codes, prices, descriptions, and image assignments are unchanged.
- Luxury Villa Project 1 and Luxury Villa Project 2 are present in the approved first and second custom-project positions.
- Desktop widths checked: 1440, 1366, 1280, and 1024 pixels.
- Mobile widths checked: 320, 360, 375, 390, 414, and 768 pixels.
- Mobile menu, all eight menu destinations, language switching, product filtering, and quotation summary generation passed real-browser interaction tests.
- Quote form validation, product/code/reference-price/quantity prefill, WhatsApp destination, and email destination passed in all three languages.
- SEO checks passed for unique titles, descriptions, canonical URLs, en/zh/ko/x-default hreflang, Open Graph, Organization/Product/Breadcrumb schema, sitemap, and robots.
- 158 rendered internal links returned valid destinations.
- 168 localized production routes returned HTTP 200 in the Vercel production preview.
- English, Chinese, and Korean missing routes return branded localized HTML with HTTP 404.
- Vercel Build Output API is intact at `.vercel/output`, including `config.json`, static assets, and the server function.

## Commands

- `npm install`: passed; zero vulnerabilities.
- `npm run lint`: passed with zero warnings.
- `npm run check:images`: passed.
- `npm run build`: passed; generated `.vercel/output`.
- `npm test`: 11/11 passed.

## Confirmed defects fixed

1. Localized quote actions now always use the site's English/Chinese/Korean validation and summary workflow instead of browser-native validation.
2. Invalid production routes now return a branded localized HTML 404 instead of Vinext's plain-text fallback.
3. The mobile homepage WhatsApp control no longer covers the hero service labels.
4. All three mobile hero service labels fit without clipping.

## Visual evidence

### Desktop

- [English homepage](screenshots/v4-stable-desktop-en-home.jpg)
- [English product list](screenshots/v4-stable-desktop-en-products.jpg)
- [Chinese homepage](screenshots/v4-stable-desktop-zh-home.jpg)
- [Korean homepage](screenshots/v4-stable-desktop-ko-home.jpg)

### Mobile

- [English homepage](screenshots/v4-stable-mobile-en-home.jpg)
- [English product list](screenshots/v4-stable-mobile-en-products.jpg)
- [Chinese homepage](screenshots/v4-stable-mobile-zh-home.jpg)
- [Korean homepage](screenshots/v4-stable-mobile-ko-home.jpg)

### Interactions and product verification

- [Product detail](screenshots/v4-stable-product-detail.jpg)
- [Mobile menu open](screenshots/v4-stable-mobile-menu-open.jpg)
- [Language selector focused/open](screenshots/v4-stable-language-selector-open.jpg)
- [Villa project cards](screenshots/v4-stable-villa-project-cards.jpg)

## Toolchain note

Vite reports its upstream `INEFFECTIVE_DYNAMIC_IMPORT` diagnostic for Vinext's internal error-boundary and slot shims. It is emitted from `node_modules`, does not originate in application code, and does not affect the successful bundle, routes, runtime, or deployment output.
