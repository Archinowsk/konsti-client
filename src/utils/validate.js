/* @flow */
import { t } from 'i18next'

export const required = (value: string) => {
  return value ? undefined : t('validation.required')
}
