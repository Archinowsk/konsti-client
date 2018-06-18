/* @flow */
import React from 'react'
import { hot } from 'react-hot-loader'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import Routes from './Routes'
import LanguageSelector from './components/LanguageSelector'

type Props = {
  t: Function,
  username: string,
  loggedIn: boolean,
}

const App = (props: Props) => {
  const { t, username, loggedIn } = props

  return (
    <div className="main-container">
      <header>
        <h1>Konsti</h1>
        <p>{t('header')}</p>
        <LanguageSelector />

        {loggedIn && (
          <span className="username">
            {t('user')}: {username}
          </span>
        )}
      </header>

      <div>
        <Routes />
      </div>
      {/*
      <footer>
        <p>
          {t('footer')}
        </p>
      </footer>
      */}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    username: state.login.username,
    loggedIn: state.login.loggedIn,
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {}
}

export default hot(module)(
  translate()(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(App)
  )
)
