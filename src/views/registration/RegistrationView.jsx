import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { translate } from 'react-i18next';

import { submitRegistration } from './RegistrationActions';
import RegistrationForm from './components/RegistrationForm';

const RegistrationView = props => {
  const { onSubmitLogin, t } = props;

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  const submitData = form => {
    return onSubmitLogin(form).then(
      response => {
        console.log('response');
        console.log(response);
        if (response.code === 11) {
          throw new SubmissionError({
            username: t('error.usernameTaken'),
            _error: t('error.registrationFailed'),
          });
        } else if (response.code === 12) {
          throw new SubmissionError({
            serial: t('error.invalidSerial'),
            _error: t('error.registrationFailed'),
          });
        }
      },
      error => {
        console.log('error');
        console.log(error);
      }
    );
  };

  return (
    <div>
      <RegistrationForm onSubmit={submitData} />
    </div>
  );
};

RegistrationView.propTypes = {
  onSubmitLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmitLogin: registrationInfo =>
      dispatch(submitRegistration(registrationInfo)),
  };
};

export default translate()(connect(null, mapDispatchToProps)(RegistrationView));
