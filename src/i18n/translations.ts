export const translations = {
  en: {
    nav: {
      home: 'Home',
      rentals: 'Rentals',
      about: 'About',
      faq: 'FAQ',
      contact: 'Contact',
    },
    hero: {
      heading: "Vancouver Island's Premier Event Rental Company",
      tagline: 'Create, Decorate & Celebrate',
      subtitle: 'From intimate gatherings to grand celebrations — All In One Party Shop has everything you need for your perfect event on Vancouver Island.',
      browseCta: 'Browse Rentals',
      contactCta: 'Get a Quote',
    },
    features: {
      title: 'Why Choose All In One Party Shop?',
      subtitle: 'Serving Vancouver Island since 1994 with the largest rental inventory in the region',
      inventory: {
        title: '🎪 Largest Inventory',
        description: 'The largest selection of party and event rentals on Northern Vancouver Island — tents, tables, chairs, linens, decor and much more.',
      },
      delivery: {
        title: '🚚 Island-Wide Delivery',
        description: 'Professional delivery and setup service throughout Vancouver Island and the Gulf Islands.',
      },
      weddings: {
        title: '💍 Wedding Specialists',
        description: 'From intimate ceremonies to grand receptions of 5,000+ guests, we have everything to make your day perfect.',
      },
      corporate: {
        title: '🏢 Corporate Events',
        description: 'Full-service corporate event solutions including trade shows, conferences, and company celebrations.',
      },
      ordering: {
        title: '⏱️ Easy Online Ordering',
        description: 'Browse our full catalogue and build your rental quote online — fast, simple, and convenient.',
      },
      experience: {
        title: '🤝 30+ Years Experience',
        description: 'A trusted family business founded in 1994. We bring decades of expertise to every event we support.',
      },
    },
    about: {
      title: 'Our Story',
      subtitle: 'Family-owned and community-focused since 1994',
      content1: 'All In One Party Shop began in 1994 as Campbell River Party Rentals, founded by Tessa Tomlinson with a passion for helping the community celebrate life\'s biggest moments. Over the decades, we grew our inventory, our team, and our reach across Vancouver Island.',
      content2: 'Today we operate two full showrooms — in Comox Valley and Campbell River — offering the largest selection of event rentals on Northern Vancouver Island. Whether you\'re planning an intimate backyard wedding or a large corporate gala, our experienced team is here to help you Create, Decorate & Celebrate.',
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Two convenient locations on Vancouver Island to serve you',
      comoxValley: 'Comox Valley',
      campbellRiver: 'Campbell River',
      hours: 'Hours',
      hoursDetail: 'Mon–Fri 10am–4pm · Sat by appointment · Sun closed',
      emergency: 'Emergency Line',
    },
    footer: {
      tagline: 'Create, Decorate & Celebrate',
      description: 'Vancouver Island\'s premier party and event rental company. Serving Comox Valley, Campbell River, and surrounding areas since 1994.',
      quickLinks: 'Quick Links',
      comoxValley: 'Comox Valley',
      campbellRiver: 'Campbell River',
      hours: 'Mon–Fri 10am–4pm',
      hoursSat: 'Sat by appointment',
      hoursSun: 'Sun closed',
      rights: 'All rights reserved.',
    },
    meta: {
      defaultDescription: 'All In One Party Shop — Vancouver Island\'s premier party and event rental company. Tents, tables, chairs, linens, decor and more. Serving Comox Valley & Campbell River since 1994.',
      defaultTitle: 'All In One Party Shop | Event Rentals on Vancouver Island',
    },
  },
} as const;

export type Language = keyof typeof translations;

export function useTranslations(lang: Language = 'en') {
  return translations[lang];
}
