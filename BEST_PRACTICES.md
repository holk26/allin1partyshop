# Best Practices Guide

This document outlines all the best practices implemented in the FastWeb template.

## 📋 Table of Contents

1. [Code Organization](#code-organization)
2. [Styling with TailwindCSS](#styling-with-tailwindcss)
3. [Component Architecture](#component-architecture)
4. [Path Aliases](#path-aliases)
5. [Internationalization (i18n)](#internationalization-i18n)
6. [SEO Optimization](#seo-optimization)
7. [Accessibility](#accessibility)
8. [Performance](#performance)
9. [TypeScript](#typescript)

## Code Organization

### Directory Structure

```
src/
├── components/          # Reusable components
│   ├── ui/             # Generic UI components
│   │   ├── Button.astro
│   │   ├── Card.astro
│   │   ├── Container.astro
│   │   └── Section.astro
│   ├── Navigation.astro
│   ├── Hero.astro
│   ├── Features.astro
│   └── Footer.astro
├── layouts/            # Page layouts
│   └── Layout.astro
├── pages/              # Routes
│   ├── index.astro     # Spanish (default)
│   └── en/
│       └── index.astro # English
└── i18n/               # Internationalization
    └── translations.ts
```

### Best Practice: Separation of Concerns
- **UI Components**: Generic, reusable components in `components/ui/`
- **Feature Components**: Page-specific components in `components/`
- **Layouts**: Page structure in `layouts/`
- **Pages**: Route definitions in `pages/`

## Styling with TailwindCSS

### ✅ DO: Use Utility Classes
```astro
<button class="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
  Click me
</button>
```

### ✅ DO: Create Reusable Components
Instead of repeating classes, create components:

```astro
<!-- components/ui/Button.astro -->
<a href={href} class={`${baseClasses} ${variantClasses[variant]}`}>
  <slot />
</a>
```

### ✅ DO: Use Consistent Spacing
- Use Tailwind's spacing scale: `px-4`, `py-8`, `mb-6`
- Stick to the standard scale for consistency

### ❌ DON'T: Use Inline Styles
Avoid `style` attributes; use Tailwind utilities instead.

### ❌ DON'T: Repeat Complex Class Combinations
Extract them into components or use `@apply` sparingly.

## Component Architecture

### Reusable UI Components

All UI components follow these principles:

1. **Props Interface**: TypeScript interfaces for type safety
2. **Variants**: Support multiple styles via props
3. **Composability**: Use `<slot />` for content
4. **Accessibility**: ARIA labels and semantic HTML

#### Example: Button Component

```astro
---
interface Props {
  href: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const { href, variant = 'primary', size = 'md' } = Astro.props;
---

<a href={href} class={classes}>
  <slot />
</a>
```

### Component Composition

Build complex UIs by composing simple components:

```astro
<Section variant="white">
  <Container size="lg">
    <Card>
      <h2>Title</h2>
      <p>Content</p>
    </Card>
  </Container>
</Section>
```

## Path Aliases

### Configuration

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"],
      "@pages/*": ["src/pages/*"]
    }
  }
}
```

**astro.config.mjs:**
```js
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@layouts': '/src/layouts',
        '@pages': '/src/pages',
      },
    },
  },
});
```

### Usage

```astro
// ❌ DON'T: Relative imports
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';

// ✅ DO: Use path aliases
import Layout from '@layouts/Layout.astro';
import Hero from '@components/Hero.astro';
import { useTranslations } from '@/i18n/translations';
```

### Benefits
- ✅ Cleaner imports
- ✅ Easy refactoring
- ✅ No need to count `../`
- ✅ IDE autocomplete support

## Internationalization (i18n)

### Translation File Structure

```typescript
// src/i18n/translations.ts
export const translations = {
  en: {
    nav: { home: 'Home', features: 'Features' },
    hero: { welcome: 'Welcome to' },
  },
  es: {
    nav: { home: 'Inicio', features: 'Características' },
    hero: { welcome: 'Bienvenido a' },
  },
} as const;

export type Language = keyof typeof translations;

export function useTranslations(lang: Language = 'es') {
  return translations[lang];
}
```

### Usage in Components

```astro
---
import { useTranslations, type Language } from '@/i18n/translations';

interface Props {
  lang?: Language;
}

const { lang = 'es' } = Astro.props;
const t = useTranslations(lang);
---

<h1>{t.hero.welcome}</h1>
```

### Multi-language Pages

```
pages/
├── index.astro          # Spanish (default)
└── en/
    └── index.astro      # English
```

## SEO Optimization

### Meta Tags

All pages include comprehensive meta tags:

```astro
<head>
  <!-- Basic Meta -->
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content={description} />
  <meta name="keywords" content={keywords} />
  
  <!-- Canonical URL -->
  <link rel="canonical" href={canonicalURL} />
  
  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={canonicalURL} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={ogImage} />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage} />
  
  <!-- Structured Data (JSON-LD) -->
  <script is:inline type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "FastWeb",
      "description": description,
      "url": canonicalURL
    }
  </script>
</head>
```

### Sitemap

Configured in `astro.config.mjs`:

```js
export default defineConfig({
  site: 'https://fastweb.example.com',
  integrations: [
    sitemap(),
  ],
});
```

### robots.txt

```
User-agent: *
Allow: /

Sitemap: https://fastweb.example.com/sitemap-index.xml
```

### Semantic HTML

- ✅ Use proper heading hierarchy (h1 → h2 → h3)
- ✅ Use semantic elements (`<nav>`, `<main>`, `<section>`, `<footer>`)
- ✅ One `<h1>` per page
- ✅ Descriptive alt text for images

## Accessibility

### ARIA Labels

```astro
<nav role="navigation" aria-label="Main navigation">
  <button 
    aria-expanded="false"
    aria-controls="mobile-menu"
    aria-label="Toggle navigation menu"
  >
    Menu
  </button>
</nav>
```

### Keyboard Navigation

- ✅ All interactive elements are keyboard accessible
- ✅ Visible focus states on all focusable elements
- ✅ Logical tab order

### Focus States

```astro
<a 
  href="#" 
  class="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded"
>
  Link
</a>
```

### Skip to Content

```astro
<a 
  href="#main-content" 
  class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
>
  Skip to main content
</a>

<main id="main-content">
  <!-- Page content -->
</main>
```

### Color Contrast

- ✅ Minimum 4.5:1 contrast ratio for normal text
- ✅ Minimum 3:1 for large text
- ✅ Test with tools like WebAIM Contrast Checker

## Performance

### Astro Optimizations

- ✅ **Zero JavaScript by default**: Astro ships HTML/CSS
- ✅ **Island Architecture**: Interactive components load independently
- ✅ **Partial Hydration**: Only hydrate what needs interactivity

### Image Optimization

```astro
<!-- Use Astro's Image component -->
<Image 
  src="/image.jpg" 
  alt="Descriptive text"
  width={800}
  height={600}
  loading="lazy"
/>
```

### Preconnect for External Resources

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="dns-prefetch" href="https://fonts.googleapis.com" />
```

### CSS Optimization

- ✅ TailwindCSS automatically purges unused styles
- ✅ Use `@apply` sparingly to avoid bloat
- ✅ Tailwind generates optimized CSS in production

## TypeScript

### Component Props

Always define TypeScript interfaces:

```astro
---
interface Props {
  title: string;
  description?: string;
  variant?: 'primary' | 'secondary';
}

const { title, description, variant = 'primary' } = Astro.props;
---
```

### Type Safety for i18n

```typescript
export type Language = keyof typeof translations;

export function useTranslations(lang: Language = 'es') {
  return translations[lang];
}
```

### Benefits
- ✅ Catch errors at compile time
- ✅ Better IDE autocomplete
- ✅ Self-documenting code
- ✅ Easier refactoring

## Summary Checklist

Use this checklist for new pages/components:

- [ ] Use path aliases (@/) for imports
- [ ] Extract repeated patterns into reusable components
- [ ] Add proper TypeScript interfaces
- [ ] Include proper meta tags (title, description, OG)
- [ ] Use semantic HTML elements
- [ ] Add ARIA labels where needed
- [ ] Ensure keyboard navigation works
- [ ] Add focus states to interactive elements
- [ ] Use Tailwind utilities consistently
- [ ] Support internationalization
- [ ] Test on mobile and desktop
- [ ] Verify heading hierarchy (h1-h6)
- [ ] Check color contrast ratios
- [ ] Optimize images with lazy loading

## Resources

- [Astro Documentation](https://docs.astro.build)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Web Accessibility Initiative (WAI)](https://www.w3.org/WAI/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Schema.org](https://schema.org)
