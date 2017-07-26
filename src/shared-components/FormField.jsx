import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

const FormField = props => {
  const {
    input,
    label = '',
    type,
    required = false,
    meta: { touched, error },
    t,
    tooltip = true,
  } = props;

  return (
    <div className="form-row">
      <div className="form-field">
        {!required &&
          <label htmlFor={label}>
            {label}
          </label>}
        {required === true &&
          <label htmlFor={label}>
            {label} *
          </label>}

        <div className="form-input-wrapper" id={`${input.name}-wrapper`}>
          <input
            className="form-input"
            {...input}
            placeholder={label}
            type={type}
            id={input.name}
          />
        </div>

        {/*
        {tooltip === true &&
          <div className="help-tip">
            <p>
              {t(`tooltip.${input.name}`)}
            </p>
          </div>}
        */}
      </div>

      {touched &&
        error &&
        <div className="form-field-error">
          {error}
        </div>}
    </div>
  );
};

FormField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string, // eslint-disable-line react/require-default-props
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  required: PropTypes.bool, // eslint-disable-line react/require-default-props
  tooltip: PropTypes.bool, // eslint-disable-line react/require-default-props
};

export default translate()(FormField);
