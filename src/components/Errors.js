/* @flow */
import React from 'react'

type Props = { meta: Object }

const NetworkError = (props: Props) => {
  const {
    meta: { touched, error },
  } = props
  return touched && error ? <span>{error}</span> : false
}

export default NetworkError
