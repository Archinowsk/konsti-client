import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

const LanguageSelector = props => {
  const { input, meta: { touched, error }, t } = props;
  const languages = ['English', 'Finnish', 'Swedish'];

  return (
    <div>
      <select {...input}>
        <option value="">
          {t('dropdown.language')}
        </option>
        {languages.map(val =>
          <option value={val} key={val}>
            {val}
          </option>
        )}
      </select>
      {touched &&
        error &&
        <span>
          {error}
        </span>}
    </div>
  );
};

LanguageSelector.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate()(LanguageSelector);
