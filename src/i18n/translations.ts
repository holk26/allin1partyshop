export const translations = {
  en: {
    nav: {
      home: 'Home',
      features: 'Features',
      about: 'About',
      contact: 'Contact',
    },
    hero: {
      welcome: 'Welcome to',
      subtitle: 'A modern and fast website built with Astro 5.17 and TailwindCSS',
      explore: 'Explore',
      contact: 'Contact',
    },
    features: {
      title: 'Main Features',
      subtitle: 'Discover why Astro and TailwindCSS are the perfect combination for your next project',
      fast: {
        title: '⚡ Super Fast',
        description: 'Astro generates ultra-fast static sites with zero JavaScript by default.',
      },
      design: {
        title: '🎨 Modern Design',
        description: 'TailwindCSS provides a utility-first design system to create beautiful interfaces.',
      },
      responsive: {
        title: '📱 Responsive',
        description: 'Fully adaptable to all devices, from mobile to desktop.',
      },
      customizable: {
        title: '🔧 Easy to Customize',
        description: 'Clean and modular code that you can easily adapt to your needs.',
      },
      seo: {
        title: '🚀 SEO Optimized',
        description: 'Optimized structure for search engines with meta tags and excellent performance.',
      },
      typescript: {
        title: '💎 TypeScript',
        description: 'Full TypeScript support for safer and more productive development.',
      },
    },
    about: {
      title: 'About This Project',
      content1: 'This website is a modern template created with Astro 5.17, the fastest web framework for content-oriented site building. Combined with TailwindCSS, you get agile development and professional design.',
      content2: 'Astro uses island architecture to ship only the necessary JavaScript, resulting in incredibly fast sites that delight both users and developers.',
    },
    contact: {
      title: 'Ready to Get Started?',
      subtitle: 'This template is ready for you to customize and build something amazing.',
    },
    footer: {
      description: 'A modern website built with the best web technologies.',
      quickLinks: 'Quick Links',
      technologies: 'Technologies',
      rights: 'All rights reserved.',
    },
    meta: {
      defaultDescription: 'A modern website created with Astro and TailwindCSS',
      defaultTitle: 'FastWeb - Modern Site with Astro and TailwindCSS',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      features: 'Características',
      about: 'Acerca',
      contact: 'Contacto',
    },
    hero: {
      welcome: 'Bienvenido a',
      subtitle: 'Un sitio web moderno y rápido construido con Astro 5.17 y TailwindCSS',
      explore: 'Explorar',
      contact: 'Contactar',
    },
    features: {
      title: 'Características Principales',
      subtitle: 'Descubre por qué Astro y TailwindCSS son la combinación perfecta para tu próximo proyecto',
      fast: {
        title: '⚡ Super Rápido',
        description: 'Astro genera sitios estáticos ultra rápidos con cero JavaScript por defecto.',
      },
      design: {
        title: '🎨 Diseño Moderno',
        description: 'TailwindCSS proporciona un sistema de diseño utility-first para crear interfaces hermosas.',
      },
      responsive: {
        title: '📱 Responsive',
        description: 'Totalmente adaptable a todos los dispositivos, desde móviles hasta escritorio.',
      },
      customizable: {
        title: '🔧 Fácil de Personalizar',
        description: 'Código limpio y modular que puedes adaptar fácilmente a tus necesidades.',
      },
      seo: {
        title: '🚀 SEO Optimizado',
        description: 'Estructura optimizada para motores de búsqueda con meta tags y rendimiento excelente.',
      },
      typescript: {
        title: '💎 TypeScript',
        description: 'Soporte completo de TypeScript para desarrollo más seguro y productivo.',
      },
    },
    about: {
      title: 'Acerca de Este Proyecto',
      content1: 'Este sitio web es un template moderno creado con Astro 5.17, el framework web más rápido para construcción de sitios orientados al contenido. Combinado con TailwindCSS, obtienes un desarrollo ágil y un diseño profesional.',
      content2: 'Astro utiliza la arquitectura de islas para enviar solo el JavaScript necesario, resultando en sitios increíblemente rápidos que deleitan tanto a usuarios como a desarrolladores.',
    },
    contact: {
      title: '¿Listo para Comenzar?',
      subtitle: 'Este template está listo para que lo personalices y construyas algo increíble.',
    },
    footer: {
      description: 'Un sitio web moderno construido con las mejores tecnologías web.',
      quickLinks: 'Enlaces Rápidos',
      technologies: 'Tecnologías',
      rights: 'Todos los derechos reservados.',
    },
    meta: {
      defaultDescription: 'Un sitio web moderno creado con Astro y TailwindCSS',
      defaultTitle: 'FastWeb - Sitio Moderno con Astro y TailwindCSS',
    },
  },
} as const;

export type Language = keyof typeof translations;

export function useTranslations(lang: Language = 'es') {
  return translations[lang];
}
