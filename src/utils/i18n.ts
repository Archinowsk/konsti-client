import i18next from 'i18next';
import backend from 'i18next-xhr-backend';
import languageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from 'locales/en.json';
import fi from 'locales/fi.json';

const loadLocales = (url: string, options: any, callback: Function) => {
  if (url === 'en') {
    callback(en, { status: '200' });
  } else if (url === 'fi') {
    callback(fi, { status: '200' });
  }
};

i18next
  .use(backend)
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '{{lng}}',
      parse: (data) => data,
      ajax: loadLocales,
    },
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    detection: {
      order: ['localStorage'],
    },
  });
