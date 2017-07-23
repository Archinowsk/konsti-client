import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import Cache from 'i18next-localstorage-cache';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '../locales/en.json';
import fi from '../locales/fi.json';

function loadLocales(url, options, callback) {
  if (url === 'en') {
    callback(en, { status: '200' });
  } else if (url === 'fi') {
    callback(fi, { status: '200' });
  }
  /*
  try {
    let waitForLocale = require(`bundle-loader!../locales/${url}.json`);

    waitForLocale(locale => {
      callback(locale, { status: '200' });
    });
  } catch (e) {
    callback(null, { status: '404' });
  }
  */
}

i18n.use(XHR).use(Cache).use(LanguageDetector).init({
  backend: {
    loadPath: '{{lng}}',
    parse: data => data,
    ajax: loadLocales,
    // Path to POST missing resources
    // addPath: '/locales/add/{{lng}}/',
  },
  // Calls save missing key function on backend if key not found
  // TODO: Save missing translations to server not working
  // saveMissing: true,

  lng: 'en',
  fallbackLng: 'en',
  wait: false, // globally set to wait for loaded translations in translate hoc

  // Have a common namespace used around the full app
  // ns: ['common'],
  // defaultNS: 'common',

  // debug: true,

  /*
  // Enable for production
  cache: {
    enabled: true,
    prefix: 'i18next_',
  },
  */

  /*
    interpolation: {
      escapeValue: false, // Not needed for React!
      formatSeparator: ',',
      format(value, format, lng) {
        if (format === 'uppercase') return value.toUpperCase();
        return value;
      },
    },
    */
});

export default i18n;
