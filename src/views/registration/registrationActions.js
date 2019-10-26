// @flow
import { postRegistration } from 'services/userServices';
import { submitLogin } from 'views/login/loginActions';
import type { RegistrationData } from 'flow/user.flow';

export const submitRegistration = (
  registrationData: RegistrationData
): Object => {
  return async (dispatch: Function): Promise<any> => {
    let registrationResponse = null;
    try {
      registrationResponse = await postRegistration(registrationData);
    } catch (error) {
      return Promise.reject(error);
    }

    if (registrationResponse && registrationResponse.error) {
      return Promise.reject(registrationResponse);
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
