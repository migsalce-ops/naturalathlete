# Natural Athlete — Keep Stacking Days

Brand site for **Natural Athlete**, an athletic apparel label founded in Cebu, Philippines for multi-sport athletes who keep stacking days.

🌐 **Live (once deployed):** https://naturalathlete.shop/

## Stack

- Static HTML / CSS / vanilla JS — zero build step.
- Google Fonts: Bagel Fat One (display) + Inter (body).
- Deployable to Vercel, Netlify, Cloudflare Pages, or GitHub Pages with no configuration.

## Structure

```
naturalathlete/
├── index.html          # Home: hero, story, athlete showcase, signup
├── about.html          # Founder + brand story
├── style.css           # Theme
├── script.js           # Nav toggle, scroll reveals, footer year
├── assets/img/         # Logos + photography (see checklist below)
├── robots.txt
├── sitemap.xml
└── README.md
```

## ⚠️ Image upload checklist

The HTML references these asset paths — drop the source files into `assets/img/` with these exact names:

| Path | Source image |
|---|---|
| `assets/img/logo-a.png` | The A-with-lightning-bolt mark (image 1) |
| `assets/img/keep-stacking-days.png` | The arched "KEEP STACKING DAYS" wordmark (image 2) |
| `assets/img/model-runner.jpg` | NYC runner in Roses singlet (image 3) |
| `assets/img/model-boxer.jpg` | Boxer training in B&W (image 4) |
| `assets/img/model-champion.jpg` | Champion with belt (image 5) |
| `assets/img/founder.jpg` | Edryan on the field, #2 jersey (image 6) |

Until those files are uploaded, the image slots will show as broken — but the site structure, copy, SEO, and styling are complete.

## Editable copy placeholders

Search the codebase for these tags to find content the founder should personalize:

- `about.html` → `FOUNDER_BIO_PLACEHOLDER` (2–3 sentence personal bio block)
- Any `<!-- ... -->` comment marked with `PLACEHOLDER`

## SEO baseline (already wired)

- Semantic HTML5 throughout, single H1 per page, proper heading hierarchy.
- Meta title, description, keywords on every page.
- Open Graph + Twitter Card tags with share images.
- JSON-LD structured data: `Organization`, `WebSite` + `SearchAction` (home), `Person`, `AboutPage` (about).
- `robots.txt` allowing all crawlers + `sitemap.xml`.
- Descriptive `alt` text on every meaningful image.
- `loading="lazy"` + explicit width/height on below-fold images (prevents CLS).
- Font preconnect + `display=swap` for fast first paint.
- Skip-to-content link + WCAG AAA contrast (black on white).

## Local dev

It's static HTML — just open `index.html` in a browser, or:

```sh
python3 -m http.server 8000
# → http://localhost:8000
```

## License

© Natural Athlete. All rights reserved.
