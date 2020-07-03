import { postLogin } from 'services/loginServices';
import { saveSession, clearSession } from 'utils/localStorage';
import { Login, LoginData, PostLoginResponse } from 'typings/user.typings';
import { SubmitLogin } from 'typings/redux.typings';
import { ServerError } from 'typings/utils.typings';

export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';

export const submitLogin = (loginData: Login): any => {
  return async (dispatch: Function): Promise<ServerError | undefined> => {
    let loginResponse: PostLoginResponse | ServerError;
    try {
      loginResponse = await postLogin(loginData);
    } catch (error) {
      clearSession();
      throw error;
    }

    if (loginResponse?.status === 'error') {
      clearSession();
      return await Promise.reject(loginResponse);
    }

    if (loginResponse?.status === 'success') {
      saveSession({
        login: { jwt: loginResponse.jwt },
      });

      dispatch(
        submitLoginAsync({
          loggedIn: true,
          username: loginResponse.username,
          jwt: loginResponse.jwt,
          userGroup: loginResponse.userGroup,
          serial: loginResponse.serial,
          groupCode: loginResponse.groupCode,
        })
      );
    }
  };
};

const submitLoginAsync = ({
  username,
  loggedIn,
  jwt,
  userGroup,
  serial,
  groupCode,
}: LoginData): SubmitLogin => {
  return {
    type: SUBMIT_LOGIN,
    username,
    loggedIn,
    jwt,
    userGroup,
    serial,
    groupCode,
  };
};
