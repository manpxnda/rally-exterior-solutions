# Image assets

Drop your real photos in this folder, then reference them from the data files.
Until you do, the site renders clean, on-brand placeholders automatically — so
nothing ever looks broken.

## Where images are referenced

| What | File to edit | Field |
| --- | --- | --- |
| Service page hero/photo | `src/data/services.ts` | `image` |
| Before / after sliders | `src/data/gallery.ts` (`beforeAfters`) | `before`, `after` |
| Showcase gallery | `src/data/gallery.ts` (`showcase`) | `src` |
| About page photo | `src/app/about/page.tsx` | `<MediaFrame src=... />` |

## Suggested folders

```
public/images/
  services/        # one hero photo per service (e.g. permanent-lighting.jpg)
  gallery/         # before/after + finished project photos
  team/            # crew / about photos
```

## Tips for fast, high-converting visuals

- Export at ~1600px wide, compressed (use https://squoosh.app). Aim < 250 KB.
- Prefer `.webp` or `.avif` (Next.js also auto-optimizes `.jpg`/`.png`).
- For before/after pairs, shoot from the **same angle, distance, and lighting**.
- Lighting shots: take them at dusk/blue hour for the most dramatic effect.
- Name files descriptively (`roof-washing-moundsville-after.jpg`) — it helps SEO.

Example, after adding a file:

```ts
// src/data/services.ts
image: "/images/services/permanent-lighting.jpg",
```
