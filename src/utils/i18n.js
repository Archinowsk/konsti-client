/* @flow */
import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
// import Cache from 'i18next-localstorage-cache'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

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
  .use(Backend)
  // .use(Cache)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '{{lng}}',
      parse: data => data,
      ajax: loadLocales,
    },

    lng: 'en',
    fallbackLng: 'en',
    debug: false,

    /*
    // Enable for production
    cache: {
      enabled: true,
      prefix: 'i18next_',
    },
    */

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  })

export default i18n
