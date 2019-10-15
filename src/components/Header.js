// @flow
import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { LanguageSelector } from 'components/LanguageSelector'
import { config } from 'config'
import { TimeSelector } from 'test/test-components/TimeSelector'

export const Header = () => {
  const username: string = useSelector(state => state.login.username)
  const loggedIn: boolean = useSelector(state => state.login.loggedIn)
  const serial: string = useSelector(state => state.login.serial)
  const { t } = useTranslation()
  const { loadedSettings, CONVENTION_NAME, CONVENTION_YEAR } = config

  return (
    <header>
      {loadedSettings !== 'production' && <TimeSelector />}

      <h1>
        <a href='/' className='logo'>
          {t('appTitle')}
        </a>
      </h1>

      <div className='header-bar'>
        {t('appDescription', { CONVENTION_NAME, CONVENTION_YEAR })}
        <LanguageSelector />
      </div>

      {loggedIn && (
        <div className='logged-user-details'>
          <span className='user-info-username'>
            {t('user')}: {username}
          </span>
          <span className='user-info-serial'>
            {t('code')}: {serial}
          </span>
        </div>
      )}
    </header>
  )
}
