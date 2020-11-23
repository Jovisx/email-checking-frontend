const NextI18Next = require('next-i18next').default;

const localeSubpaths = {
  // en: 'en',
  // fr: 'fr',
};

module.exports = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['fr'],
  localeSubpaths,
  defaultNS: 'language',
  fallbackNS: 'language',
  fallbackLng: 'en',
  ignoreRoutes: ['/service-worker.js', 'service-worker.js'],
});
