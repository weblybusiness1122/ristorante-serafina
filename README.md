# Ristorante Serafina — Website (Demo)

A premium, white **Italian-classical** restaurant website. Static HTML/CSS/JS — no build step, no dependencies. Fully responsive (phone / tablet / laptop / desktop) with light, performance-friendly animations.

> ⚠️ **Demo data.** All details below (brand, address, phone, reviews, menu, prices) are **fictional**, generated for this demo. Replace with the real restaurant's information before going live.

## Pages
| File | Page |
|------|------|
| `index.html` | Home — intro animation, hero + page buttons, signature dishes, story, reviews, visit band |
| `menu.html` | Menu — sticky category tabs (Antipasti → Caffè), featured photos, priced listings |
| `about.html` | About — story, image mosaic, ambience, values, signature dishes (no prices) |
| `gallery.html` | Gallery — filterable masonry + lightbox |
| `contact.html` | Contact — cards, hours table, live map, socials |

## Demo brand data
- **Name:** Ristorante Serafina — *Cucina Italiana dal 1987*
- **Address:** 47 Mount Street, Mayfair, London W1K 2RX, United Kingdom
- **Phone:** +44 20 7946 0188  ·  **Email:** ciao@ristoranteserafina.co.uk
- **Head Chef:** Marco De Luca
- **Hours:** Mon closed · Tue–Thu 12–15 & 18–22:30 · Fri–Sat 12–15:30 & 18–23:30 · Sun 12:30–21:00
- **Social:** Instagram, Facebook, X, TikTok, YouTube (placeholder links)

## Design
- **Palette:** ivory/white ground, antique gold accent, deep green + wine as sparing details
- **Type:** Playfair Display (headings), Cormorant Garamond (accents), Jost (body/nav) via Google Fonts
- **Motifs:** arched image frames, gold fleuron dividers, marble textures
- **Animations:** one-time intro, scroll reveals, hover zoom — all GPU-friendly and disabled under `prefers-reduced-motion`
- **Images:** [Unsplash](https://unsplash.com) (free to use); swap for the restaurant's own photography when ready

## Run locally
Just open `index.html` in a browser, or serve the folder:
```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to GitHub Pages
```bash
git init
git add .
git commit -m "Ristorante Serafina website"
git branch -M main
git remote add origin https://github.com/<account>/<repo>.git
git push -u origin main
```
Then in the repo: **Settings → Pages → Build from branch → `main` / root**.

## Customise
- Text/menu/prices live directly in the `.html` files.
- All colours, spacing and type are CSS variables at the top of `css/style.css` (`:root { … }`).
- Replace image URLs (`https://images.unsplash.com/...`) with your own.
