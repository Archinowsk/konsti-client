/* @flow */
import React from 'react'
import { useTranslation } from 'react-i18next'
import config from 'config'

export type Props = {
  input: Object,
  label?: string,
  type: string,
  meta: Object,
}

const CheckboxField = (props: Props) => {
  const {
    input,
    label = '',
    type,
    meta: { touched, error },
  } = props
  const { t } = useTranslation()

  const registerDescriptionLink = `${config.apiServerURL}/rekisteriseloste.txt`

  return (
    <div className='form-row'>
      <div className='form-field'>
        <div className='form-input-wrapper' id={`${input.name}-wrapper`}>
          <input
            className='form-input checkbox'
            {...input}
            placeholder={label}
            type={type}
            id={input.name}
          />
        </div>

        <label htmlFor={label}>
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

      {touched && error && <div className='form-field-error'>{error}</div>}
    </div>
  )
}

export default CheckboxField
