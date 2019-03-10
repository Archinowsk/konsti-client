/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'

const Loading = () => {
  const { t } = useTranslation()
  return (
    <div className='loading'>
      <p>{t('loading')}</p>
    </div>
  )
}

export default Loading
