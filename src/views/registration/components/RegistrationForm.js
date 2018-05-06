import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { translate } from 'react-i18next'

import validate from '../../../utils/validate'
import FormField from '../../../components/FormField'
import CheckboxField from '../../../components/CheckboxField'

const RegistrationForm = props => {
  const { handleSubmit, submitting, t, error } = props

  return (
    <div>
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

        {/*
        <label htmlFor="registerDescription">
          I agree to the terms and{' '}
          <a href="https://konsti.ropecon.fi/rekisteriseloste.txt">
            register description
          </a>
        </label>
        <p>
          <input type="checkbox" />
          <span> I agree to the terms and </span>
          <a href="https://konsti.ropecon.fi/rekisteriseloste.txt">
            register description
          </a>
        </p>
*/}

        <button type="submit" disabled={submitting}>
          {t('button.register')}
        </button>
      </form>

      {error && <strong className="error">{error}</strong>}
    </div>
  )
}

RegistrationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  error: PropTypes.string, // eslint-disable-line react/require-default-props
}

export default translate()(
  reduxForm({
    form: 'registration',
    validate,
  })(RegistrationForm)
)
