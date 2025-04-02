// Ensure the env.js file exists and handles its content correctly
await import('./src/env.js');

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,

  // Comment out the i18n configuration if using `appDir`
  i18n: {
    locales: ['fr-CH', 'de-CH', 'en'],
    defaultLocale: 'fr-CH',
  },
};

export default config;

