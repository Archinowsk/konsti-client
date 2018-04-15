import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'

import i18n from './i18n'
import Routes from './Routes'

const Layout = props => {
  const { t, username, loggedIn } = props
  const toggle = lng => i18n.changeLanguage(lng)
  const language = i18n.language
  const setLanguage = event => {
    toggle(event.target.value)
  }

  return (
    <div className="main-container">
      <header>
        <h1>Konsti</h1>
        <p>{t('header')}</p>
        <select
          id="language"
          type="text"
          value={language}
          onChange={setLanguage}
        >
          <option value="en">{t('language.english')}</option>
          <option value="fi">{t('language.finnish')}</option>
        </select>

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

Layout.propTypes = {
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

export default translate()(connect(mapStateToProps, mapDispatchToProps)(Layout))
