// @flow
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { useTranslation } from 'react-i18next'
import { required } from 'utils/validate'
import { FormField } from 'components/FormField'
import type { StatelessFunctionalComponent, Element } from 'react'

type Props = {|
  handleSubmit: Function,
  submitting: boolean,
  error?: string,
|}

const LoginForm: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<'div'> => {
  const { handleSubmit, submitting, error } = props
  const { t } = useTranslation()

  return (
    <div className='login-form'>
      <h2>{t('pageTitle.login')}</h2>
      <form onSubmit={handleSubmit}>
        <Field
          name='username'
          type='text'
          component={FormField}
          validate={required}
        />

        <Field
          name='password'
          type='password'
          component={FormField}
          validate={required}
        />

        <button type='submit' disabled={submitting}>
          {t('button.login')}
        </button>
      </form>

      {typeof error === 'string' && error && (
        <strong className='error'>{error}</strong>
      )}
    </div>
  )
}

export default reduxForm({
  form: 'login',
})(LoginForm)
