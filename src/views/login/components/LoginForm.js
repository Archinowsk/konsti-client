/* @flow */
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { translate } from 'react-i18next'

import validate from '/utils/validate'
import FormField from '/components/FormField'

type Props = {
  handleSubmit: Function,
  submitting: boolean,
  t: Function,
  error?: string,
}

const LoginForm = (props: Props) => {
  const { handleSubmit, submitting, t, error } = props

  return (
    <div>
      <p className="page-title">{t('pageTitle.login')}</p>
      <form onSubmit={handleSubmit}>
        <Field
          name="username"
          type="text"
          component={FormField}
          label={t('username')}
        />

        <Field
          name="password"
          type="password"
          component={FormField}
          label={t('password')}
        />

        <button type="submit" disabled={submitting}>
          {t('button.login')}
        </button>
      </form>

      {error && <strong className="error">{error}</strong>}
    </div>
  )
}

export default translate()(
  reduxForm({
    form: 'login',
    validate,
  })(LoginForm)
)
