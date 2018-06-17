/* @flow */
import React from 'react'
import { translate } from 'react-i18next'

type Props = { t: Function }

const Loading = (props: Props) => {
  const { t } = props
  return (
    <div>
      <p>{t('loading')}</p>
    </div>
  )
}

export default translate()(Loading)
