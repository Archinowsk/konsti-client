/* @flow */
import React from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { SubmissionError } from 'redux-form'
import { submitLogin } from 'views/login/loginActions'
import LoginForm from 'views/login/components/LoginForm'
import type { StatelessFunctionalComponent } from 'react'

export const LoginView: StatelessFunctionalComponent<{}> = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const submit = async form => {
    let response = null
    try {
      response = await dispatch(submitLogin(form))
    } catch (error) {
      console.log(`onSubmitLogin error:`, error)
    }

    if (response && response.code === 21) {
      throw new SubmissionError({
        _error: t('error.loginFailed'),
      })
    }

    if (response && response.code === 22) {
      throw new SubmissionError({
        _error: t('error.loginDisabled'),
      })
    }
  }

  return (
    <div className='login-view'>
      <LoginForm onSubmit={submit} />
    </div>
  )
}
