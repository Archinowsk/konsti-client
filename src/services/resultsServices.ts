import { api } from 'utils/api';

export const getResults = async (startTime: string): Promise<void> => {
  let response;
  try {
    response = await api.get('/results', {
      params: {
        startTime,
      },
    });
  } catch (error) {
    if (error.message === 'Network Error') {
      console.log('Network error: no connection to server');
    } else {
      console.log(`getResults error:`, error);
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
