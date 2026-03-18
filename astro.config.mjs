import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Update this to your production domain before deployment
  site: 'https://fastweb.example.com',
  integrations: [
    tailwind(),
    sitemap(),
  ],
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
