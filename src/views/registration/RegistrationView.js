// @flow
import React from 'react';
import { useDispatch } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { useTranslation } from 'react-i18next';
import { submitRegistration } from 'views/registration/registrationActions';
import RegistrationForm from 'views/registration/components/RegistrationForm';
import type { StatelessFunctionalComponent, Element } from 'react';

type Props = {};

export const RegistrationView: StatelessFunctionalComponent<Props> = (
  props: Props
): Element<'div'> => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const submit = async (form): Promise<any> => {
    let response = null;
    try {
      response = await dispatch(submitRegistration(form));
    } catch (error) {
      console.log(`submitRegistration error:`, error);
    }

    if (response && response.code === 11) {
      throw new SubmissionError({
        username: t('error.usernameTaken'),
        _error: t('error.registrationFailed'),
      });
    } else if (response && response.code === 12) {
      throw new SubmissionError({
        serial: t('error.invalidSerial'),
        _error: t('error.registrationFailed'),
      });
    }
  };

  return (
    <div className='registration-view'>
      <RegistrationForm onSubmit={submit} />
    </div>
  );
};
