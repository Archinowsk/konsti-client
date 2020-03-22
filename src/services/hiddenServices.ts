import { api } from 'utils/api';
import { Game } from 'typings/game.typings';

export const postHidden = async (
  hiddenData: readonly Game[]
): Promise<void> => {
  let response;
  try {
    response = await api.post('/hidden', { hiddenData });
  } catch (error) {
    if (error.message === 'Network Error') {
      console.log('Network error: no connection to server');
    } else {
      console.log(`postHidden error:`, error);
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
