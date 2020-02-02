import { api } from 'utils/api';
import { RegistrationData } from 'typings/user.typings';

export const postRegistration = async (
  registrationData: RegistrationData
): Promise<void> => {
  const { username, password, serial } = registrationData;

  let response;
  try {
    response = await api.post('/user', { username, password, serial });
  } catch (error) {
    if (error.message === 'Network Error') {
      console.log('Network error: no connection to server');
    } else {
      console.log(`postRegistration error:`, error);
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

export const getUser = async (username: string): Promise<void> => {
  let response;
  try {
    response = await api.get('/user', {
      params: {
        username,
      },
    });
  } catch (error) {
    if (error.message === 'Network Error') {
      console.log('Network error: no connection to server');
    } else {
      console.log(`getUser error:`, error);
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

export const getUserBySerial = async (serial: string): Promise<void> => {
  let response;
  try {
    response = await api.get('/user', {
      params: {
        serial,
      },
    });
  } catch (error) {
    if (error.message === 'Network Error') {
      console.log('Network error: no connection to server');
    } else {
      console.log(`getUser error:`, error);
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

export const updateUserPassword = async (
  username: string,
  serial: string,
  password: string,
  changePassword: boolean
): Promise<any> => {
  let response;
  try {
    response = await api.post('/user', {
      username,
      serial,
      password,
      changePassword,
    });
  } catch (error) {
    if (error.message === 'Network Error') {
      console.log('Network error: no connection to server');
    } else {
      console.log(`postRegistration error:`, error);
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
