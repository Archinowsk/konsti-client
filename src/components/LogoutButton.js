import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
// import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom'

import { submitLogout } from '../views/login/loginActions'

const Logout = props => {
  const { onSubmitLogout, t } = props

  return (
    <span>
      <a
        role="link"
        // tabIndex={0}
        className="router-link"
        onClick={() => {
          onSubmitLogout()
        }}
      >
        {t('button.logout')}
      </a>
    </span>
  )
}

Logout.propTypes = {
  onSubmitLogout: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

// Hook up events with actions and Redux's dispatch method
const mapDispatchToProps = dispatch => {
  return {
    onSubmitLogout: () => dispatch(submitLogout()),
  }
}

// Use connect method to hook up component with app state
export default translate()(
  connect(
    null,
    mapDispatchToProps
  )(Logout)
)
