# ALL IN ONE Party SHOP

Create, Decorate & Celebrate — tienda de artículos para fiestas.

## Stack

- **Vite + React 19 + TypeScript**
- **Tailwind CSS v3 + shadcn/ui** (40+ componentes en `src/components/ui/`)
- **Fuentes**: Figtree, Inter, Plus Jakarta Sans, Space Grotesk

## Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de producción → dist/
```

## Estructura

```
src/
  components/ui/   # componentes shadcn (button, card, dialog, etc.)
  hooks/           # use-mobile y otros
  lib/             # utils (cn para clases)
  pages/           # Home y páginas del sitio
public/
  images/          # imágenes del sitio
```

## Deploy

Build estático con `npm run build` → sirve `dist/` con cualquier hosting estático
(nginx, Cloudflare Pages, Vercel, etc.).
