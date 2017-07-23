import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

const Loading = props => {
  const { t } = props;
  return (
    <div>
      <p>
        {t('loading')}
      </p>
    </div>
  );
};

Loading.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate()(Loading);
