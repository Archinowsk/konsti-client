import React, { Fragment, FunctionComponent, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

export const LanguageSelector: FunctionComponent<{}> = (): ReactElement<typeof Fragment> => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  // Language toggle
  const toggle = lng => i18n.changeLanguage(lng);

  const setLanguage = event => {
    toggle(event.target.value);
    moment.locale(event.target.value);
  };

  return (
    <Fragment>
      <select
        className='language-selector'
        id='language'
        value={language}
        onChange={setLanguage}
      >
        <option title={t('language.english')} value='en'>
          {t('language.englishShort')}
        </option>
        <option title={t('language.finnish')} value='fi'>
          {t('language.finnishShort')}
        </option>
      </select>
    </Fragment>
  );
};
