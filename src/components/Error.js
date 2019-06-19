/* @flow */
import React from 'react'
import type { StatelessFunctionalComponent } from 'react'

type Props = {| meta: Object |}

export const Error: StatelessFunctionalComponent<Props> = (props: Props) => {
  const {
    meta: { touched, error },
  } = props

  return touched && error ? <span>{error}</span> : false
}
