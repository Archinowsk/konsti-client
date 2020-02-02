import { api } from 'utils/api';

export const getSettings = async (): Promise<void> => {
  let response;
  try {
    response = await api.get('/settings');
  } catch (error) {
    if (error.message === 'Network Error') {
      console.log('Network error: no connection to server');
    } else {
      console.log(`getSettings error:`, error);
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

export const postToggleAppOpen = async (appOpen: boolean): Promise<void> => {
  let response;
  try {
    response = await api.post('/toggle-app-open', { appOpen });
  } catch (error) {
    if (error.message === 'Network Error') {
      console.log('Network error: no connection to server');
    } else {
      console.log(`getSettings error:`, error);
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
