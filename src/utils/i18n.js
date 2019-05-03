/* @flow */
import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import en from 'locales/en.json'
import fi from 'locales/fi.json'

const loadLocales = (url: string, options: Object, callback: Function) => {
  if (url === 'en') {
    callback(en, { status: '200' })
  } else if (url === 'fi') {
    callback(fi, { status: '200' })
  }
}

i18n
  .use(Backend)
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
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  })

export default i18n
