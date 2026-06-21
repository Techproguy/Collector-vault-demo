# MAISON ARCHIVE

A private digital vault for the discerning watch collector — a high-fidelity
single-page demo built for an ultra-premium audience.

> Ownership doesn't end at the sale. It is a lifelong, documented, transferable
> experience.

## What it is

MAISON ARCHIVE presents one collector's vault across four tabs:

1. **The Collection** — three timepieces, each on an elegant card with an
   authenticated badge and estimated value.
2. **Provenance** — the showpiece. A gold-dotted vertical timeline telling each
   watch's life story: Acquired → Authenticated → Documented → Serviced →
   Insured → Ready for Transfer.
3. **Documents** — an encrypted, verified paper trail per piece.
4. **Legacy** — a calm, ceremonial panel for generational transfer.

## Design language

- Deep near-black canvas (`#0A0A0C`), champagne-gold accent (`#C5A572`), soft
  ivory text, used sparingly and intentionally.
- Refined serif (Cormorant Garamond) headings, clean Inter UI type.
- Generous negative space, 1px gold hairlines, slow elegant fade/slide
  animations, and a faint rotating watch-face motif in the header.

## Tech

- React 18 + Vite
- Tailwind CSS (custom `vault` palette)
- Framer Motion (tab + node transitions)
- lucide-react icons

All data is hardcoded mock data at the top of
[`src/MaisonArchive.jsx`](src/MaisonArchive.jsx) — easy to read and edit. No API
calls, no external images (placeholders are inline SVG), no localStorage.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
```

```bash
npm run build    # production build
npm run preview  # preview the build
```
