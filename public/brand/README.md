# Brand assets

The site currently uses a **code-recreated** version of your logo + sun/water
icon (in `src/components/layout/Logo.tsx` and `src/app/icon.svg`) so it's crisp,
fast, and on-brand without any image files.

## Want to use your exact uploaded files instead?
Drop them here, then ping the developer (or follow the note in `Logo.tsx`):

```
public/brand/
  logo-dark.png     # black/navy wordmark — for light backgrounds (header)
  logo-coral.png    # coral wordmark
  logo-white.png    # white wordmark — for dark backgrounds (footer)
  icon.svg          # sun-over-water icon (also used as favicon)
```

To swap the header/footer wordmark to the real file, replace `<BrandMark/>` +
text in `Logo.tsx` with:

```tsx
import Image from "next/image";
<Image src={isLight ? "/brand/logo-white.png" : "/brand/logo-dark.png"}
       alt="Rally Exterior Solutions" width={180} height={48} priority />
```

To use the real favicon, replace `src/app/icon.svg` with your file (keep the
name `icon.svg`, or use `icon.png`).

## Brand palette (already wired into the site)
| Color | Hex | Used for |
| --- | --- | --- |
| Navy | `#173D59` | dark backgrounds, headings, body text |
| Coral | `#EA6F61` | primary buttons & accents |
| Teal | `#39ABA8` | secondary accent, before/after, waves |
| Sand | `#FAF0D7` | warm soft background (icon circle) |
| White | `#FFFFFF` | base |

Colors live in `tailwind.config.ts` (tokens `ink`=navy, `gold`=coral, `sky`=teal,
`cream`=sand). Change them there and the whole site updates.
