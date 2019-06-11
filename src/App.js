/* @flow */
import React from 'react'
import { hot } from 'react-hot-loader/root'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import Routes from 'Routes'
import LanguageSelector from 'components/LanguageSelector'
import config from 'config'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import type { StatelessFunctionalComponent } from 'react'

const App: StatelessFunctionalComponent<{}> = () => {
  const { appOpen } = config
  const username: string = useSelector(state => state.login.username)
  const loggedIn: boolean = useSelector(state => state.login.loggedIn)
  const serial: string = useSelector(state => state.login.serial)

  const { t } = useTranslation()

  library.add(faAngleUp, faAngleDown)

  return (
    <React.Fragment>
      <header>
        <h1>
          <a href='/' className='logo'>
            Konsti
          </a>
        </h1>
        <p>{t('header')}</p>
        <LanguageSelector />

        {loggedIn && (
          <span className='username'>
            {t('user')}: {username} | {t('code')}: {serial}
          </span>
        )}
      </header>

      <div className='body'>
        {!appOpen && t('closingMessage')}
        {appOpen && <Routes />}
      </div>
    </React.Fragment>
  )
}

export default hot(App)
