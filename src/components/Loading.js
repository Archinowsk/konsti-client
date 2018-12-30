/* @flow */
import React from 'react'
import { withNamespaces } from 'react-i18next'

type Props = { t: Function }

const Loading = (props: Props) => {
  const { t } = props
  return (
    <div className='loading'>
      <p>{t('loading')}</p>
    </div>
  )
}

export default withNamespaces()(Loading)
