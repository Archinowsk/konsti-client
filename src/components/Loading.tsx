import React, { FunctionComponent, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import loaderImage from '../../assets/loading.gif';

export const Loading: FunctionComponent<{}> = (): ReactElement<'div'> => {
  const { t } = useTranslation();
  return (
    <div className='loading'>
      <p>{t('loading')}</p>
      <img alt={t('loading')} src={loaderImage} width='40' />
    </div>
  );
};
