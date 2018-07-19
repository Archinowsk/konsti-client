/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'

import { submitLogout } from 'views/login/loginActions'

type Props = {
  onSubmitLogout: Function,
  t: Function,
}

const Logout = (props: Props) => {
  const { onSubmitLogout, t } = props

  return (
    <span>
      <a
        role="link"
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

// Hook up events with actions and Redux's dispatch method
const mapDispatchToProps = (dispatch: Function) => {
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
