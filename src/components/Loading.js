/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import type { StatelessFunctionalComponent } from 'react'

const Loading: StatelessFunctionalComponent<{}> = () => {
  const { t } = useTranslation()
  return (
    <div className='loading'>
      <p>{t('loading')}</p>
    </div>
  )
}

export default Loading
