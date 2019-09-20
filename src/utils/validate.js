// @flow
export const required = (value: string) => {
  if (!value) return 'validation.required'
}
