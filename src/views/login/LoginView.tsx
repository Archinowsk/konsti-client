import React, { FC, ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { SubmissionError } from 'redux-form';
import { submitLogin } from 'views/login/loginActions';
import LoginForm from 'views/login/components/LoginForm';

export const LoginView: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const submit = async (form: any): Promise<void> => {
    try {
      await dispatch(submitLogin(form));
    } catch (error) {
      switch (error.code) {
        case 21:
          throw new SubmissionError({
            _error: t('error.loginFailed'),
          });
        case 22:
          throw new SubmissionError({
            _error: t('error.loginDisabled'),
          });
        default:
          throw new Error(`submitLogin error: ${error.message}`);
      }
    }
  };

  return (
    <div className='login-view'>
      <LoginForm onSubmit={submit} />
    </div>
  );
};
