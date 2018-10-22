/* @flow */
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { withNamespaces } from 'react-i18next'

import validate from 'utils/validate'
import FormField from 'components/FormField'
import CheckboxField from 'components/CheckboxField'

type Props = {
  handleSubmit: Function,
  submitting: boolean,
  t: Function,
  error?: string,
}

const RegistrationForm = (props: Props) => {
  const { handleSubmit, submitting, t, error } = props

  return (
    <div className="registration-form">
      <p className="page-title">{t('pageTitle.registration')}</p>
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

        <Field
          name="serial"
          id="serial"
          type="text"
          component={FormField}
          label={t('serial')}
        />

        <label htmlFor="serial" className="help">
          {t('registrationSerialHelp')}
        </label>

        <Field
          name="registerDescription"
          id="registerDescription"
          type="checkbox"
          component={CheckboxField}
        />

        <button type="submit" disabled={submitting}>
          {t('button.register')}
        </button>
      </form>

      {error && <strong className="error">{error}</strong>}
    </div>
  )
}

export default withNamespaces()(
  reduxForm({
    form: 'registration',
    validate,
  })(RegistrationForm)
)
