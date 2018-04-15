import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

const FormSelector = props => {
  const {
    input,
    meta: { touched, error },
    t,
    data,
    label,
  } = props

  return (
    <div>
      <div className="form-selector">
        <label htmlFor={label}>{label}</label>
        <div className="form-input-wrapper">
          <select className="form-input" {...input}>
            <option value="">-</option>
            {data.map((
              val // First letter to uppercase
            ) => (
              <option value={val} key={val}>
                {val.charAt(0).toUpperCase() + val.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="help-tip">
          <p>{t(`tooltip.${input.name}`)}</p>
        </div>
      </div>
      {touched &&
        error && (
          <div className="form-field-error">
            <span>{error}</span>
          </div>
        )}
    </div>
  )
}

FormSelector.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
}

export default translate()(FormSelector)
