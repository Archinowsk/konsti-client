import { postLogin } from 'services/loginServices';
import { saveSession, clearSession } from 'utils/localStorage';
import { Login, LoginData } from 'typings/user.typings';

export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';

export const submitLogin = (loginData: Login): any => {
  return async (dispatch: Function): Promise<void> => {
    let loginResponse;
    try {
      loginResponse = await postLogin(loginData);
    } catch (error) {
      console.log(`postLogin error:`, error);
      clearSession();
      return Promise.reject(loginResponse);
    }

    if (loginResponse?.error) {
      clearSession();
      return Promise.reject(loginResponse);
    }
    if (loginResponse && loginResponse.status === 'success') {
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

    return loginResponse;
  };
};

const submitLoginAsync = ({
  username,
  loggedIn,
  jwt,
  userGroup,
  serial,
  groupCode,
}: LoginData) => {
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
