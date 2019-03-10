/* @flow */
import { t } from 'i18next'

type Values = {
  username: string,
  password: string,
  serial: string,
  registerDescription: string,
}

const validate = (values: Values) => {
  const errors = {}

  if (!values.username) {
    errors.username = t('validation.required')
  }

  if (!values.password) {
    errors.password = t('validation.required')
  }

  if (!values.serial) {
    errors.serial = t('validation.required')
  }

  if (!values.registerDescription) {
    errors.registerDescription = t('validation.required')
  }
  return errors
}

export default validate
