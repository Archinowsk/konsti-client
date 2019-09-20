// @flow
import React from 'react'
import type { StatelessFunctionalComponent, Element } from 'react'

type Props = {| meta: Object |}

export const Error: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<'span'> => {
  const {
    meta: { touched, error },
  } = props

  return touched && error ? <span>{error}</span> : <span />
}
