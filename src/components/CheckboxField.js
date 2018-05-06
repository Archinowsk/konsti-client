import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import config from '../../config'

const CheckboxField = props => {
  const {
    input,
    label = '',
    type,
    meta: { touched, error },
    t,
  } = props

  const registerDescriptionLink = `${config.apiServerURL}/rekisteriseloste.txt`

  return (
    <div className="form-row">
      <div className="form-field">
        <div className="form-input-wrapper" id={`${input.name}-wrapper`}>
          <input
            className="form-input checkbox"
            {...input}
            placeholder={label}
            type={type}
            id={input.name}
          />
        </div>

        <label htmlFor={label}>
          {/* {t('agreeTerms')}{' '}} */}
          {t('iAgree')}{' '}
          <a href={registerDescriptionLink} target="_blank">
            {t('registerDescription')}
          </a>
        </label>
      </div>

      {touched && error && <div className="form-field-error">{error}</div>}
    </div>
  )
}

CheckboxField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
}

export default translate()(CheckboxField)
