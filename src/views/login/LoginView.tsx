import React, { FunctionComponent, ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { SubmissionError } from 'redux-form';
import { submitLogin } from 'views/login/loginActions';
import LoginForm from 'views/login/components/LoginForm';

export const LoginView: FunctionComponent<{}> = (): ReactElement<'div'> => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const submit = async (form): Promise<void> => {
    let response;
    try {
      response = await dispatch(submitLogin(form));
    } catch (error) {
      console.log(`submitLogin error:`, error);
    }

    if (response && response.code === 21) {
      throw new SubmissionError({
        _error: t('error.loginFailed'),
      });
    }

    if (response && response.code === 22) {
      throw new SubmissionError({
        _error: t('error.loginDisabled'),
      });
    }
  };

  return (
    <div className='login-view'>
      <LoginForm onSubmit={submit} />
    </div>
  );
};
