/* @flow */
import React from 'react'
import { translate } from 'react-i18next'

type Props = {
  input: Object,
  label?: string,
  type: string,
  meta: Object,
  t: Function,
  required?: boolean,
  tooltip?: boolean,
}

const FormField = (props: Props) => {
  const {
    input,
    label = '',
    type,
    required = false,
    meta: { touched, error },
    // t,
    // tooltip = true,
  } = props

  return (
    <div className="form-row">
      <div className="form-field">
        {!required && <label htmlFor={label}>{label}</label>}
        {required === true && <label htmlFor={label}>{label} *</label>}

        <div className="form-input-wrapper" id={`${input.name}-wrapper`}>
          <input
            className="form-input"
            {...input}
            placeholder={label}
            type={type}
            id={input.name}
          />
        </div>

        {/*
        {tooltip === true &&
          <div className="help-tip">
            <p>
              {t(`tooltip.${input.name}`)}
            </p>
          </div>}
        */}
      </div>

      {touched && error && <div className="form-field-error">{error}</div>}
    </div>
  )
}

export default translate()(FormField)
