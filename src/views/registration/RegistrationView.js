/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'
import { useTranslation } from 'react-i18next'
import { submitRegistration } from 'views/registration/registrationActions'
import RegistrationForm from 'views/registration/components/RegistrationForm'

type Props = {
  onSubmitRegistration: Function,
}

const RegistrationView = (props: Props) => {
  const { onSubmitRegistration } = props
  const { t } = useTranslation()

  const submit = async form => {
    let response = null
    try {
      response = await onSubmitRegistration(form)
    } catch (error) {
      console.log(`onSubmitRegistration error: ${error}`)
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
    <div className='registration-view'>
      <RegistrationForm onSubmit={submit} />
    </div>
  )
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    onSubmitRegistration: registrationInfo =>
      dispatch(submitRegistration(registrationInfo)),
  }
}

export default connect(
  null,
  mapDispatchToProps
)(RegistrationView)
