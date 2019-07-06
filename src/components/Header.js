/* @flow */
import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { LanguageSelector } from 'components/LanguageSelector'
import { config } from 'config'
import { TimeSelector } from 'test/TimeSelector'

export const Header = () => {
  const username: string = useSelector(state => state.login.username)
  const loggedIn: boolean = useSelector(state => state.login.loggedIn)
  const serial: string = useSelector(state => state.login.serial)
  const { t } = useTranslation()

  return (
    <header>
      {config.loadedSettings !== 'production' && <TimeSelector />}

      <div className='title-and-description'>
        <h1>
          <a href='/' className='logo'>
            {t('appTitle')}
          </a>
        </h1>
        <p>{t('appDescription')}</p>
      </div>

      <div className='header-bar'>
        {loggedIn && (
          <div className='logged-user-details'>
            <span>
              {t('user')}: {username}
            </span>
            <span>
              {t('code')}: {serial}
            </span>
          </div>
        )}

        <LanguageSelector />
      </div>
    </header>
  )
}
