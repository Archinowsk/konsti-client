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
  const {
    name,
    onChange,
    onBlur,
    onDragStart,
    onDrop,
    onFocus,
    value,
  } = props.input
  const { touched, error } = props.meta

  const classNames = ['form-input']

  if (type === 'checkbox') {
    classNames.push('checkbox')
  }

  return (
    <div className='form-row'>
      <div className='form-field'>
        <div className='form-input-wrapper' id={`${name}-wrapper`}>
          <input
            className={classNames.join(' ')}
            id={name}
            label={t(name)}
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            onDragStart={onDragStart}
            onDrop={onDrop}
            onFocus={onFocus}
            placeholder={t(name)}
            type={type}
            value={value}
          />
          {type === 'checkbox' && <label htmlFor={name}>{t(name)}</label>}
        </div>
      </div>

      {touched && error && <div className='form-field-error'>{t(error)}</div>}
    </div>
  )
}

export default FormField
