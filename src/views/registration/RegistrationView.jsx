import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { submitRegistration } from './RegistrationActions';
import RegistrationForm from './components/RegistrationForm';

const RegistrationView = props => {
  const { onSubmitLogin } = props;

  return (
    <div>
      <RegistrationForm onSubmit={onSubmitLogin} />
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

export default connect(null, mapDispatchToProps)(RegistrationView);
