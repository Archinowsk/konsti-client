/* @flow */
import React from 'react'
import type { StatelessFunctionalComponent } from 'react'

type Props = {| meta: Object |}

const NetworkError: StatelessFunctionalComponent<Props> = (props: Props) => {
  const {
    meta: { touched, error },
  } = props

  return touched && error ? <span>{error}</span> : false
}

export default NetworkError
