import React, { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getUserBySerial, updateUserPassword } from 'services/userServices';

export const PasswordManagement: FC<{}> = (): ReactElement => {
  const { t } = useTranslation();

  const [serial, setSerial] = React.useState<string>('');
  const [username, setUsername] = React.useState<string>('');
  const [passwordFieldType, setPasswordFieldType] = React.useState<string>(
    'password'
  );
  const [userSerialInput, setUserSerialInput] = React.useState<string>('');
  const [changePasswordInput, setChangePasswordInput] = React.useState<string>(
    ''
  );
  const [
    changePasswordInputVisible,
    setChangePasswordInputVisible,
  ] = React.useState<boolean>(false);
  const [userFoundMessage, setUserFoundMessage] = React.useState<string>('');
  const [passwordChangeMessage, setPasswordChangeMessage] = React.useState<
    string
  >('');

  const submitGetUser = async () => {
    let response;
    try {
      response = await getUserBySerial(userSerialInput);
    } catch (error) {
      console.error(error);
    }

    if (!response || response.status === 'error') {
      setUserFoundMessage(`${t('userNotFound')}`);
    } else if (response.status === 'success') {
      setUserFoundMessage(`${t('foundUser')}: ${response.username}`);
      setSerial(response.serial);
      setUsername(response.username);
      setChangePasswordInputVisible(true);
    }
  };

  const submitUpdatePassword = async () => {
    const response = await updateUserPassword(
      username,
      serial,
      changePasswordInput,
      true
    );
    if (!response || response.status === 'error') {
      setPasswordChangeMessage(`${t('changingPasswordError')}`);
    } else if (response.status === 'success') {
      setPasswordChangeMessage(`${t('changingPasswordSuccess')}`);
    }
  };

  const handleSerialChange = event => {
    setUserSerialInput(event.target.value);
  };

  const handlePasswordChange = event => {
    setChangePasswordInput(event.target.value);
  };

  const togglePasswordVisibility = () => {
    if (passwordFieldType === 'password') setPasswordFieldType('text');
    else if (passwordFieldType === 'text') setPasswordFieldType('password');
  };

  return (
    <div className='password-management'>
      <h3>{t('helperPasswordManagement')}</h3>
      <div>
        <p>{t('userCode')}</p>
        <input
          key='user-serial'
          className='form-input'
          placeholder={t('userCode')}
          value={userSerialInput}
          onChange={handleSerialChange}
        />
        <button onClick={submitGetUser}>{t('button.find')}</button>
        <p>{userFoundMessage && <span>{userFoundMessage}</span>}</p>
      </div>

      <div>
        {changePasswordInputVisible && (
          <>
            <p>{t('newPassword')}</p>
            <input
              type={passwordFieldType}
              key='new-password'
              className='form-input'
              placeholder={t('newPassword')}
              value={changePasswordInput}
              onChange={handlePasswordChange}
            />
            <button onClick={submitUpdatePassword}>{t('button.save')}</button>

            <span className='form-field-icon'>
              <FontAwesomeIcon
                icon={passwordFieldType === 'password' ? 'eye' : 'eye-slash'}
                onClick={togglePasswordVisibility}
              />
            </span>

            <p>
              {passwordChangeMessage && <span>{passwordChangeMessage}</span>}
            </p>
          </>
        )}
      </div>
    </div>
  );
};
