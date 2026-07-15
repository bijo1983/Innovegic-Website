# Innovegic — Corporate Website

Premium enterprise website for **Innovegic Consultancy and IT Services Co W.L.L**
(www.innovegicit.com), positioning the company as a global digital transformation
and enterprise technology partner.

> Transforming Business Through Innovation, Intelligence & Technology

## Tech Stack

- **HTML5** — static, hosting-agnostic pages (works on any web server / static host)
- **TailwindCSS v3** — compiled to a minified static stylesheet (`css/tailwind.css`),
  theme in `tailwind.config.js`; custom design system in `css/main.css`
- **Vanilla JavaScript (ES6)** in `js/main.js` — zero runtime dependencies
- **Self-hosted fonts** — Poppins (headings) + Inter (body), weights 300–700,
  woff2 in `fonts/` (no external font CDN)
- **Font Awesome** — self-hosted in `lib/fontawesome/`

### Rebuilding the Tailwind stylesheet

Whenever Tailwind utility classes change in the HTML:

```bash
npm install
npm run build:css   # or npm run watch:css during development
```

## Folder Structure

```
/
├── index.html               Home
├── about.html               About Us
├── products.html            Products (XentraERP, HumanVerse360, …)
├── solutions.html           Sector solutions
├── industries.html          Industries served
├── services.html            Services
├── success-stories.html     Case studies
├── resources.html           Insights + FAQs + newsletter
├── careers.html             Careers + open roles
├── contact.html             Lead form, demo form, WhatsApp, map
├── css/tailwind.css         Compiled TailwindCSS (built via npm run build:css)
├── css/main.css             Design system (tokens, components, animations)
├── css/fonts.css            @font-face for self-hosted Poppins + Inter
├── js/main.js               Interactions (nav, reveal, counters, forms)
├── img/                     Brand assets (original logo + optimized derivatives)
├── fonts/                   Self-hosted woff2 fonts
├── lib/fontawesome/         Self-hosted Font Awesome
├── src/tailwind-input.css   Tailwind build entry point
├── tailwind.config.js       Tailwind theme (brand colors, fonts)
├── favicon.ico              Generated from the existing logo hexagon
├── robots.txt / sitemap.xml SEO
└── README.md
```

## Component Architecture

Pages share three components that are kept byte-identical across the site:

1. **Head common** — favicon, fonts, Tailwind config/CDN, `css/main.css`
2. **Header** — glass sticky nav + topbar + mobile menu (per-page `active` state)
3. **Footer** — brand, link columns, contact info, WhatsApp/back-to-top FABs

When editing the header or footer, edit `index.html` first, then apply the same
change to the other nine pages (the markup is identical apart from the
`active` / `aria-current` attributes on the current page's nav link).

Reusable CSS components (see `css/main.css`): `.btn-*`, `.card`,
`.card-top-accent`, `.icon-badge`, `.chip`, `.eyebrow`, `.glass`,
`.glass-dark`, `.section-dark`, `.page-hero`, `.timeline`, `.ai-orbit`,
`.faq`, `.form-input`, `.marquee`, `.reveal*`.

## Design Tokens

| Token     | Value     | Use                          |
|-----------|-----------|------------------------------|
| primary   | `#0F4C81` | Brand blue (from logo text)  |
| secondary | `#00B4D8` | Gradients, highlights        |
| accent    | `#34D399` | Success, checkmarks          |
| dark      | `#0F172A` | Dark sections, footer        |
| light     | `#F8FAFC` | Page background              |
| brandpink | `#E94560` | Logo hexagon accent          |

## Brand Assets

The original `img/logo.png` is untouched. Derivatives generated from it:
`img/logo-sm.png` (optimized header logo), `favicon.ico`,
`img/apple-touch-icon.png`. All photography/illustrations are reused from the
previous site's `img/` folder.

## SEO Implemented

- Unique `<title>` / meta description / keywords per page
- Canonical URLs, Open Graph + Twitter Card tags
- JSON-LD structured data: `Organization`, `WebSite`, `BreadcrumbList`,
  `ItemList` of `SoftwareApplication` (products), `Service` list, `FAQPage`,
  `ContactPage`
- `sitemap.xml` + `robots.txt`
- Semantic HTML5 landmarks, `aria-*` labels, alt text on all images
- `loading="lazy"` on below-the-fold images, explicit width/height
  (prevents layout shift), `fetchpriority="high"` on the hero image

## SEO Recommendations (next steps)

1. **Serve over HTTPS** with HTTP→HTTPS and non-www→www redirects.
2. **Convert large images to WebP/AVIF** (`hero.png`, `poster.jpg`) and serve
   via `<picture>`.
3. **Wire the forms to a backend** (Formspree, Netlify Forms, or a custom
   endpoint) — currently they compose an email via `mailto:` as a fallback.
   Update `data-mailto` handling in `js/main.js`.
4. **Add the real Google Maps embed** in `contact.html` (placeholder marked
   with a comment) and real social profile URLs (currently `href="#"`).
5. Register the site in **Google Search Console** and submit `sitemap.xml`.
6. Publish the Resources guides as real article pages over time — content
   depth is the biggest long-term ranking lever.
