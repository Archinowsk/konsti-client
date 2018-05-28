import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'
import { translate } from 'react-i18next'

import { submitRegistration } from './registrationActions'
import RegistrationForm from './components/RegistrationForm'

const RegistrationView = props => {
  const { onSubmitLogin, t } = props

  const submit = async form => {
    let response = null
    try {
      response = await onSubmitLogin(form)
      if (response.code === 11) {
        throw new SubmissionError({
          username: t('error.usernameTaken'),
          _error: t('error.registrationFailed'),
        })
      } else if (response.code === 12) {
        throw new SubmissionError({
          serial: t('error.invalidSerial'),
          _error: t('error.registrationFailed'),
        })
      }
      /*
      else {
        throw new SubmissionError({
          _error: t('error.unknown'),
        });
      }
      */
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {/* {t('closingMessage')} */}
      <RegistrationForm onSubmit={submit} />
    </div>
  )
}

RegistrationView.propTypes = {
  onSubmitLogin: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmitLogin: registrationInfo =>
      dispatch(submitRegistration(registrationInfo)),
  }
}

export default translate()(
  connect(
    null,
    mapDispatchToProps
  )(RegistrationView)
)
