// @flow
import { api } from 'utils/api';
import type { Login } from 'flow/user.flow';

export const postLogin = async (loginData: Login): Promise<any> => {
  const { username, password, jwt } = loginData;
  let response = null;
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
