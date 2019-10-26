// @flow
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import type { StatelessFunctionalComponent, Element } from 'react';

type Props = {};

export const LanguageSelector: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<typeof Fragment> => {
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
        type='text'
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
