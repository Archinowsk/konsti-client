import React, { FunctionComponent, ReactElement } from 'react';
import { Field, reduxForm } from 'redux-form';
import { useTranslation } from 'react-i18next';
import { FormField } from 'components/FormField';
import { required } from 'utils/validate';
import { Accordion } from 'components/Accordion';

interface Props {
  handleSubmit: any;
  submitting: boolean;
  error?: string;
}

const RegistrationForm: FunctionComponent<Props> = (
  props: Props
): ReactElement<'div'> => {
  const { handleSubmit, submitting, error } = props;
  const { t } = useTranslation();

  return (
    <div className='registration-form'>
      <h2>{t('pageTitle.registration')}</h2>
      <form onSubmit={handleSubmit}>
        <Field
          name='username'
          type='text'
          component={FormField}
          validate={required}
        />

        <Field
          name='password'
          type='password'
          component={FormField}
          validate={required}
        />

        <Field
          name='serial'
          id='serial'
          type='text'
          component={FormField}
          validate={required}
        />

        <label htmlFor='serial' className='small'>
          {t('registrationSerialHelp')}
        </label>

        <Field
          name='agreePrivacyPolicy'
          id='agreePrivacyPolicy'
          type='checkbox'
          component={FormField}
          validate={required}
        />

        <Accordion
          text='privacyPolicyText'
          title='privacyPolicyTitle'
          buttonText='privacyPolicyButton'
        />

        <button type='submit' disabled={submitting}>
          {t('button.register')}
        </button>
      </form>

      {typeof error === 'string' && error && (
        <strong className='error'>{error}</strong>
      )}
    </div>
  );
};

export default reduxForm({
  form: 'registration',
})(RegistrationForm);