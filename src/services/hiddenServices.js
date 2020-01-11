// @flow
import { api } from 'utils/api';
import type { Game } from 'flow/game.flow';

export const postHidden = async (
  hiddenData: $ReadOnlyArray<Game>
): Promise<void> => {
  let response = null;
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
    return Promise.reject(response);
  }

  if (response) {
    return response.data;
  }
};
