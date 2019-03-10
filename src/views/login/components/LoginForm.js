/* @flow */
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { useTranslation } from 'react-i18next'
import { required } from 'utils/validate'
import FormField from 'components/FormField'

type Props = {
  handleSubmit: Function,
  submitting: boolean,
  error?: string,
}

const LoginForm = (props: Props) => {
  const { handleSubmit, submitting, error } = props
  const { t } = useTranslation()

  return (
    <div className='login-form'>
      <p className='page-title'>{t('pageTitle.login')}</p>
      <form onSubmit={handleSubmit}>
        <Field
          name='username'
          type='text'
          component={FormField}
          label={t('username')}
          validate={required}
        />

        <Field
          name='password'
          type='password'
          component={FormField}
          label={t('password')}
          validate={required}
        />

        <button type='submit' disabled={submitting}>
          {t('button.login')}
        </button>
      </form>

      {error && <strong className='error'>{error}</strong>}
    </div>
  )
}

export default reduxForm({
  form: 'login',
})(LoginForm)
