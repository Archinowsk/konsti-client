/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'
import { translate } from 'react-i18next'

import { submitRegistration } from 'views/registration/registrationActions'
import RegistrationForm from 'views/registration/components/RegistrationForm'

type Props = {
  onSubmitLogin: Function,
  t: Function,
}

const RegistrationView = (props: Props) => {
  const { onSubmitLogin, t } = props

  const submit = async form => {
    let response = null
    try {
      response = await onSubmitLogin(form)
    } catch (error) {
      console.log(error)
    }

    if (response && response.code === 11) {
      throw new SubmissionError({
        username: t('error.usernameTaken'),
        _error: t('error.registrationFailed'),
      })
    } else if (response && response.code === 12) {
      throw new SubmissionError({
        serial: t('error.invalidSerial'),
        _error: t('error.registrationFailed'),
      })
    }
  }

  return (
    <div>
      <RegistrationForm onSubmit={submit} />
    </div>
  )
}

const mapDispatchToProps = (dispatch: Function) => {
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
