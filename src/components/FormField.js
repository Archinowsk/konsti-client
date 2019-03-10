/* @flow */
import React from 'react'

export type Props = {
  input: Object,
  label?: string,
  type: string,
  meta: Object,
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
  } = props

  if (!input) return <p />

  return (
    <div className='form-row'>
      <div className='form-field'>
        {!required && <label htmlFor={label}>{label}</label>}
        {required === true && <label htmlFor={label}>{label} *</label>}

        <div className='form-input-wrapper' id={`${input.name}-wrapper`}>
          <input
            className='form-input'
            {...input}
            placeholder={label}
            type={type}
            id={input.name}
          />
        </div>
      </div>

      {touched && error && <div className='form-field-error'>{error}</div>}
    </div>
  )
}

export default FormField
