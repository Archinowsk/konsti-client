import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { SubmissionError } from 'redux-form'

import { submitLogin } from './loginActions'
import LoginForm from './components/LoginForm'

const LoginView = props => {
  const { onSubmitLogin, t } = props

  const submit = form =>
    onSubmitLogin(form).then(response => {
      if (response.code === 21) {
        throw new SubmissionError({
          _error: t('error.loginFailed'),
        })
      }
      /*
      else {
        throw new SubmissionError({
          _error: t('error.unknown'),
        });
      }
      */
    })

  return (
    <div>
      {/* {t('closingMessage')} */}
      <LoginForm onSubmit={submit} />
    </div>
  )
}

LoginView.propTypes = {
  onSubmitLogin: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  return {
    username: state.login.username,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmitLogin: loginInfo => dispatch(submitLogin(loginInfo)),
  }
}

export default translate()(
  connect(mapStateToProps, mapDispatchToProps)(LoginView)
)
