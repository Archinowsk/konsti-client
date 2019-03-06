/* @flow */
import React from 'react'

type Props = { meta: Object }

const NetworkError = (props: Props) => {
  const {
    meta: { touched, error },
  } = props

  if (!touched) return

  return touched && error ? <span>{error}</span> : false
}

export default NetworkError
