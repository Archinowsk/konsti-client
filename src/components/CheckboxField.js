/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import type { FieldProps } from 'redux-form'
import config from 'config'

const CheckboxField = (field: FieldProps) => {
  const { t } = useTranslation()

  if (!field) return <p />

  const { name } = field.input
  const { touched, error } = field.meta

  const registerDescriptionLink = `${config.apiServerURL}/rekisteriseloste.txt`

  return (
    <div className='form-row'>
      <div className='form-field'>
        <div className='form-input-wrapper' id={`${name}-wrapper`}>
          <input
            className='form-input checkbox'
            {...field.input}
            placeholder={t(name)}
            id={name}
            // $FlowFixMe: Cannot get field.type because property type is missing in FieldProps [1].
            type={field.type}
            label={t(name)}
          />
        </div>

        <label htmlFor={name}>
          {t('iAgree')}{' '}
          <a
            href={registerDescriptionLink}
            target='_blank'
            rel='noopener noreferrer'
          >
            {t('registerDescription')}
          </a>
        </label>
      </div>

      {touched && error && <div className='form-field-error'>{t(error)}</div>}
    </div>
  )
}

export default CheckboxField
