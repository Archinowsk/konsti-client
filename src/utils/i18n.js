/* @flow */
import i18n from 'i18next'
import XHR from 'i18next-xhr-backend'
// import Cache from 'i18next-localstorage-cache'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from 'locales/en.json'
import fi from 'locales/fi.json'

const loadLocales = (url, options, callback) => {
  if (url === 'en') {
    callback(en, { status: '200' })
  } else if (url === 'fi') {
    callback(fi, { status: '200' })
  }
}

i18n
  .use(XHR)
  // .use(Cache)
  .use(LanguageDetector)
  .init({
    backend: {
      loadPath: '{{lng}}',
      parse: data => data,
      ajax: loadLocales,
    },

    lng: 'en',
    fallbackLng: 'en',
    // debug: true,

    /*
    // Enable for production
    cache: {
      enabled: true,
      prefix: 'i18next_',
    },
    */

    // Override default options for translate HOC
    react: {
      wait: false,
    },
  })

export default i18n
