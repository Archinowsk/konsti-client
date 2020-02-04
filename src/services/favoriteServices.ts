import { api } from 'utils/api';
import { FavoriteData } from 'typings/user.typings';

export const postFavorite = async (
  favoriteData: FavoriteData
): Promise<void> => {
  let response;
  try {
    response = await api.post('/favorite', { favoriteData });
  } catch (error) {
    if (error.message === 'Network Error') {
      console.log('Network error: no connection to server');
    } else {
      console.log(`postFavorite error:`, error);
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