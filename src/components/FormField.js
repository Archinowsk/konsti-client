/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { FieldProps } from 'redux-form'
import type { StatelessFunctionalComponent } from 'react'

export const FormField: StatelessFunctionalComponent<FieldProps> = (
  props: FieldProps
) => {
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
  const { t } = useTranslation()

  const [fieldType, setFieldType] = React.useState('')
  ;(fieldType: string)

  React.useEffect(() => {
    setFieldType(type)
  }, [])

  const classNames = ['form-input']

  if (type === 'checkbox') {
    classNames.push('checkbox')
  }

  const togglePasswordVisibility = () => {
    if (fieldType === 'password') setFieldType('text')
    else if (fieldType === 'text') setFieldType('password')
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
            type={fieldType}
            value={value}
          />
          {type === 'checkbox' && <label htmlFor={name}>{t(name)}</label>}
          {type === 'password' && (
            <FontAwesomeIcon
              className='password-hide-icon'
              icon={fieldType === 'password' ? 'eye' : 'eye-slash'}
              onClick={togglePasswordVisibility}
            />
          )}
        </div>
      </div>

      {touched && error && <div className='form-field-error'>{t(error)}</div>}
    </div>
  )
}
