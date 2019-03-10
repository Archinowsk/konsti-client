/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'

export type Props = {
  input: Object,
  label?: string,
  type: string,
  meta: Object,
}

const FormField = (props: Props) => {
  const {
    input,
    label = '',
    type,
    meta: { touched, error },
  } = props
  const { t } = useTranslation()

  if (!input) return <p />

  return (
    <div className='form-row'>
      <div className='form-field'>
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

      {touched && error && <div className='form-field-error'>{t(error)}</div>}
    </div>
  )
}

export default FormField
