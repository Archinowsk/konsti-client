import { postRegistration } from 'services/userServices';
import { submitLogin } from 'views/login/loginActions';
import { RegistrationData } from 'typings/user.typings';
import { ServerError } from 'typings/utils.typings';

export const submitRegistration = (registrationData: RegistrationData): any => {
  return async (dispatch: Function): Promise<ServerError | undefined> => {
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
