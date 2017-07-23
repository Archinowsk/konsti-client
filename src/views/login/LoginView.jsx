import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import { submitLogin } from './LoginActions';
import LoginForm from './components/LoginForm';

const LoginView = props => {
  const { onSubmitLogin, t, history } = props;

  return (
    <div>
      <LoginForm onSubmit={onSubmitLogin} />

      {/*
      <button
        onClick={() => {
          history.push('/registration');
        }}
      >
        {t('button.register')}
      </button>
      */}
    </div>
  );
};

LoginView.propTypes = {
  onSubmitLogin: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    username: state.login.username,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmitLogin: loginInfo => dispatch(submitLogin(loginInfo)),
  };
};

export default withRouter(
  translate()(connect(mapStateToProps, mapDispatchToProps)(LoginView))
);
