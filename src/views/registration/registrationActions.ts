import { postRegistration } from 'services/userServices';
import { submitLogin } from 'views/login/loginActions';
import { RegistrationData } from 'typings/user.typings';

export const submitRegistration = (registrationData: RegistrationData): any => {
  return async (dispatch: Function): Promise<void> => {
    let registrationResponse;
    try {
      registrationResponse = await postRegistration(registrationData);
    } catch (error) {
      return await Promise.reject(error);
    }

    if (registrationResponse?.error) {
      return await Promise.reject(registrationResponse);
    }

    if (registrationResponse && registrationResponse.status === 'success') {
      dispatch(
        submitLogin({
          username: registrationData.username,
          password: registrationData.password,
        })
      );
    }

    return registrationResponse;
  };
};
