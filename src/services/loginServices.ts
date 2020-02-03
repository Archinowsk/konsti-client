import { api } from 'utils/api';
import { Login } from 'typings/user.typings';

export const postLogin = async (loginData: Login): Promise<void> => {
  const { username, password, jwt } = loginData;
  let response;
  try {
    response = await api.post('/login', { username, password, jwt });
  } catch (error) {
    if (error.message === 'Network Error') {
      console.log('Network error: no connection to server');
    } else {
      console.log(`postLogin error:`, error);
    }
  }

  if ((response && response.status !== 200) || (response && !response.data)) {
    console.log('Response status !== 200, reject');
    return Promise.reject(response);
  }

  if (response) {
    return response.data;
  }
};
