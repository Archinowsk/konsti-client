import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { translate } from 'react-i18next';

import validate from '../../../app/validate';
import FormField from '../../../shared-components/FormField';

const LoginForm = props => {
  const { handleSubmit, submitting, t } = props;

  return (
    <div>
      <p>
        {t('pageTitle.login')}
      </p>
      <form onSubmit={handleSubmit}>
        <Field
          name="username"
          type="text"
          component={FormField}
          label={t('username')}
        />

        <Field
          name="password"
          type="password"
          component={FormField}
          label={t('password')}
        />

        <button type="submit" disabled={submitting}>
          {t('button.login')}
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate()(
  reduxForm({
    form: 'login',
    validate,
  })(LoginForm)
);
