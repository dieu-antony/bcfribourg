// @ts-nocheck
export default {
  siteUrl: 'https://bcfribourg.ch',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/admin', '/admin/*', '/api', '/api/*', '/login'],

  i18n: {
    locales: ['fr-CH', 'de-CH', 'en-US'],
    defaultLocale: 'fr-CH',
  },

  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: 'weekly',
      priority: path === '/' ? 1.0 : 0.7,
      lastmod: new Date().toISOString(),
      alternateRefs: config.i18n.locales.map((locale) => ({
        href: `${config.siteUrl}/${locale}${path === '/' ? '' : path}`,
        hreflang: locale.toLowerCase(),
      })),
    };
  },
};
