import { postRegistration } from 'services/userServices';
import { submitLogin } from 'views/login/loginActions';
import { RegistrationData } from 'typings/user.typings';
import { AppThunk } from 'typings/utils.typings';

export const submitRegistration = (
  registrationData: RegistrationData
): AppThunk => {
  return async (dispatch): Promise<void> => {
    let registrationResponse;
    try {
      registrationResponse = await postRegistration(registrationData);
    } catch (error) {
      return await Promise.reject(error);
    }

    if (registrationResponse?.status === 'error') {
      return await Promise.reject(registrationResponse);
    }

    if (registrationResponse?.status === 'success') {
      dispatch(
        submitLogin({
          username: registrationData.username,
          password: registrationData.password,
        })
      );
    }
  };
};
