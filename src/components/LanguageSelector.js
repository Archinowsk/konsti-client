/* @flow */
import React from 'react'
import { withNamespaces } from 'react-i18next'
import moment from 'moment'
import i18n from 'utils/i18n'

type Props = { t: Function }

const LanguageSelector = (props: Props) => {
  const { t } = props

  const language = i18n.language

  // Language toggle
  const toggle = lng => i18n.changeLanguage(lng)
  const setLanguage = event => {
    toggle(event.target.value)
    moment.locale(event.target.value)
  }

  return (
    <React.Fragment>
      <select id='language' type='text' value={language} onChange={setLanguage}>
        <option value='en'>{t('language.english')}</option>
        <option value='fi'>{t('language.finnish')}</option>
      </select>
    </React.Fragment>
  )
}

export default withNamespaces()(LanguageSelector)
