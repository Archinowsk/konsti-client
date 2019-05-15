/* @flow */
import React from 'react'
import { hot } from 'react-hot-loader/root'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import Routes from 'Routes'
import LanguageSelector from 'components/LanguageSelector'
import config from 'config'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import type { StatelessFunctionalComponent } from 'react'

type Props = {
  username: string,
  loggedIn: boolean,
  serial: string,
}

const App: StatelessFunctionalComponent<Props> = (props: Props) => {
  const { username, loggedIn, serial } = props
  const { appOpen } = config
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

const mapStateToProps = state => {
  return {
    username: state.login.username,
    serial: state.login.serial,
    loggedIn: state.login.loggedIn,
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {}
}

export default hot(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
