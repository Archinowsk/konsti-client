/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'

export type Props = {
  input: Object,
  meta: Object,
  data: Array<any>,
  label: string,
}

const FormSelector = (props: Props) => {
  const {
    input,
    meta: { touched, error },
    data,
    label,
  } = props
  const { t } = useTranslation()

  if (!input) return <p />

  return (
    <React.Fragment>
      <div className='form-selector'>
        <label htmlFor={label}>{label}</label>
        <div className='form-input-wrapper'>
          <select className='form-input' {...input}>
            <option value=''>-</option>
            {data.map(val => (
              <option value={val} key={val}>
                {// First letter to uppercase
                val.charAt(0).toUpperCase() + val.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className='help-tip'>
          <p>{t(`tooltip.${input.name}`)}</p>
        </div>
      </div>
      {touched && error && (
        <div className='form-field-error'>
          <span>{error}</span>
        </div>
      )}
    </React.Fragment>
  )
}

export default FormSelector
