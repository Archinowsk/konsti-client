import PropTypes from 'prop-types'
import React from 'react'
import { hot } from 'react-hot-loader'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import Routes from './Routes'
import LanguageSelector from './components/LanguageSelector'

const App = props => {
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

App.propTypes = {
  t: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool.isRequired,
}

const mapStateToProps = state => {
  return {
    username: state.login.username,
    loggedIn: state.login.loggedIn,
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default hot(module)(
  translate()(connect(mapStateToProps, mapDispatchToProps)(App))
)
