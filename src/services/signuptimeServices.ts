import { api } from 'utils/api';

export const postSignupTime = async (signupTime: string): Promise<void> => {
  let response;
  try {
    response = await api.post('/signuptime', { signupTime });
  } catch (error) {
    if (error.message === 'Network Error') {
      console.log('Network error: no connection to server');
    } else {
      console.log(`postSignupTime error:`, error);
    }
  }

  if ((response && response.status !== 200) || (response && !response.data)) {
    console.log('Response status !== 200, reject');
    return await Promise.reject(response);
  }

  if (response) {
    return response.data;
  }
};
