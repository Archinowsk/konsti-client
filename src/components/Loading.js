// @flow
import React from 'react';
import { useTranslation } from 'react-i18next';
import loaderImage from '../../assets/loading.gif';
import type { StatelessFunctionalComponent, Element } from 'react';

type Props = {};

export const Loading: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<'div'> => {
  const { t } = useTranslation();
  return (
    <div className='loading'>
      <p>{t('loading')}</p>
      <img alt={t('loading')} src={loaderImage} width='40' />
    </div>
  );
};
