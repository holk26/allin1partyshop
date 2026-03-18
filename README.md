# FastWeb

Un template de sitio web moderno creado con Astro 5.17 y TailwindCSS, implementando las mejores prácticas de desarrollo web.

## ✨ Características Principales

- ⚡ **Astro 5.17** - Framework web ultra rápido con arquitectura de islas
- 🎨 **TailwindCSS 3** - Framework CSS utility-first para diseño rápido
- 💎 **TypeScript** - Tipado estático para desarrollo más seguro
- 📱 **Diseño Responsive** - Optimizado para todos los dispositivos
- 🌍 **i18n** - Soporte multiidioma (Español/Inglés)
- 🔧 **Componentes Reutilizables** - Arquitectura de componentes modular
- 🚀 **SEO Optimizado** - Meta tags, sitemap, structured data
- ♿ **Accesible** - WCAG compliant con ARIA labels y navegación por teclado
- 📂 **Path Aliases** - Importaciones limpias con @/

## 🏆 Best Practices Implementadas

Este template implementa las mejores prácticas de desarrollo web moderno:

1. **Organización de Código**: Estructura clara y modular
2. **Componentes Reutilizables**: Sin duplicación de código
3. **Path Aliases**: Rutas relativas con @/ para imports limpios
4. **i18n**: Soporte completo para internacionalización
5. **SEO**: Open Graph, Twitter Cards, JSON-LD, sitemap
6. **Accesibilidad**: ARIA labels, navegación por teclado, contraste de colores
7. **Performance**: Optimización de imágenes, preconnect, lazy loading
8. **TypeScript**: Interfaces y tipos en todos los componentes

📖 **[Ver Guía Completa de Best Practices →](./BEST_PRACTICES.md)**

## 🚀 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto:

| Comando                   | Acción                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Instala las dependencias                         |
| `npm run dev`             | Inicia el servidor de desarrollo en `localhost:4321` |
| `npm run build`           | Construye el sitio para producción en `./dist/`  |
| `npm run preview`         | Previsualiza el build de producción localmente   |

## 📁 Estructura del Proyecto

```
/
├── public/                 # Archivos estáticos
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── ui/            # Componentes UI genéricos
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   ├── Container.astro
│   │   │   └── Section.astro
│   │   ├── Navigation.astro
│   │   ├── Hero.astro
│   │   ├── Features.astro
│   │   └── Footer.astro
│   ├── i18n/              # Internacionalización
│   │   └── translations.ts
│   ├── layouts/           # Layouts de página
│   │   └── Layout.astro
│   └── pages/             # Páginas del sitio
│       ├── index.astro    # Español (por defecto)
│       └── en/
│           └── index.astro # Inglés
├── astro.config.mjs       # Configuración de Astro
├── tailwind.config.mjs    # Configuración de TailwindCSS
├── tsconfig.json          # Configuración de TypeScript
└── BEST_PRACTICES.md      # Guía de mejores prácticas
```

## 🎨 Personalización

### Path Aliases

El proyecto usa path aliases para imports más limpios:

```astro
// ❌ Antes
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';

// ✅ Ahora
import Layout from '@layouts/Layout.astro';
import Hero from '@components/Hero.astro';
import { useTranslations } from '@/i18n/translations';
```

### Componentes UI

Componentes reutilizables en `src/components/ui/`:

```astro
<Button href="#" variant="primary" size="md">
  Explorar
</Button>

<Card>
  <h3>Título</h3>
  <p>Contenido</p>
</Card>

<Section variant="white">
  <Container size="lg">
    <!-- Contenido -->
  </Container>
</Section>
```

### Internacionalización (i18n)

Soporte para múltiples idiomas:

```astro
---
import { useTranslations } from '@/i18n/translations';

const t = useTranslations('es'); // 'es' o 'en'
---

<h1>{t.hero.welcome}</h1>
```

**URLs:**
- Español (default): `/`
- Inglés: `/en/`

### Colores y Tema

Modifica los colores en `tailwind.config.mjs`:

```js
export default {
  theme: {
    extend: {
      colors: {
        primary: '#4f46e5',
        // Añade tus colores personalizados
      },
    },
  },
}
```

### Contenido

Edita los archivos `.astro` en `src/pages/` y `src/components/` para personalizar el contenido.

Las traducciones se gestionan en `src/i18n/translations.ts`.

## 🔍 SEO

El template incluye optimización SEO completa:

- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags (Facebook)
- ✅ Twitter Cards
- ✅ Canonical URLs
- ✅ Structured Data (JSON-LD)
- ✅ Sitemap automático
- ✅ robots.txt
- ✅ Jerarquía de headings semántica

**Configura tu sitio en `astro.config.mjs`:**

```js
export default defineConfig({
  site: 'https://tu-dominio.com', // Tu URL
  // ...
});
```

## ♿ Accesibilidad

El template sigue las pautas WCAG:

- ✅ Navegación por teclado
- ✅ Focus states visibles
- ✅ ARIA labels
- ✅ Skip to content link
- ✅ Contraste de colores adecuado
- ✅ HTML semántico

## 📚 Recursos y Documentación

- [Guía de Best Practices](./BEST_PRACTICES.md)
- [Documentación de Astro](https://docs.astro.build)
- [Documentación de TailwindCSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 📄 Licencia

ISC License

---

**¿Listo para comenzar?** Clona este template y construye algo increíble. 🚀

