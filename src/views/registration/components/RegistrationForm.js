/* @flow */
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { useTranslation } from 'react-i18next'
import FormField from 'components/FormField'
import CheckboxField from 'components/CheckboxField'
import { required } from 'utils/validate'
import Accordion from 'components/Accordion'

type Props = {
  handleSubmit: Function,
  submitting: boolean,
  error?: string,
}

const RegistrationForm = (props: Props) => {
  const { handleSubmit, submitting, error } = props
  const { t } = useTranslation()

  return (
    <div className='registration-form'>
      <p className='page-title'>{t('pageTitle.registration')}</p>
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

        <Field
          name='serial'
          id='serial'
          type='text'
          component={FormField}
          validate={required}
        />

        <label htmlFor='serial' className='help'>
          {t('registrationSerialHelp')}
        </label>

        <Field
          name='registerDescription'
          id='registerDescription'
          type='checkbox'
          component={CheckboxField}
          validate={required}
        />

        <Accordion
          text='registerDescriptionText'
          title='registerDescriptionTitle'
        />

        <button type='submit' disabled={submitting}>
          {t('button.register')}
        </button>
      </form>

      {error && <strong className='error'>{error}</strong>}
    </div>
  )
}

export default reduxForm({
  form: 'registration',
})(RegistrationForm)
