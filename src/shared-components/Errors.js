import React from 'react'
import PropTypes from 'prop-types'

const NetworkError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false

NetworkError.propTypes = {
  meta: PropTypes.object.isRequired,
}

export default NetworkError
