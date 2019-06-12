/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import type { FieldProps } from 'redux-form'
import type { StatelessFunctionalComponent } from 'react'

const FormField: StatelessFunctionalComponent<FieldProps> = (
  props: FieldProps
) => {
  const { t } = useTranslation()

  if (!props) return <p />

  // $FlowFixMe: Cannot get field.type because property type is missing in FieldProps [1].
  const { type } = props
  const { name, onChange } = props.input
  const { touched, error } = props.meta

  return (
    <div className='form-row'>
      <div className='form-field'>
        <div className='form-input-wrapper' id={`${name}-wrapper`}>
          <input
            className='form-input'
            onChange={onChange}
            placeholder={t(name)}
            id={name}
            type={type}
            label={t(name)}
          />
        </div>
      </div>

      {touched && error && <div className='form-field-error'>{t(error)}</div>}
    </div>
  )
}

export default FormField
