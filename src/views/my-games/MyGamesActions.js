import { getUser, postFavorite } from '../../app/api';

export const SUBMIT_GET_USER_GAMES = 'SUBMIT_GET_USER_GAMES';
export const SUBMIT_UPDATE_FAVORITES = 'SUBMIT_UPDATE_FAVORITES';
// export const SUBMIT_DEL_FAVORITE = 'SUBMIT_DEL_FAVORITE';

const submitGetUserAsync = (enteredGames, favoritedGames, signedGames) => {
  return {
    type: SUBMIT_GET_USER_GAMES,
    enteredGames,
    favoritedGames,
    signedGames,
  };
};

export const submitGetUser = username => dispatch =>
  getUser(username)
    .then(response => {
      console.log('submitGetUser() response');
      console.log(response);
      if (response.error) {
        return Promise.reject(response);
      }
      if (response.status === 'success') {
        dispatch(
          submitGetUserAsync(
            response.games.enteredGames,
            response.games.favoritedGames,
            response.games.signedGames
          )
        );
      }
      return undefined;
    })
    .catch(error => {
      console.log(error);
    });

const submitUpdateFavoritesAsync = favoritedGames => {
  return {
    type: SUBMIT_UPDATE_FAVORITES,
    favoritedGames,
  };
};

export const submitUpdateFavorites = favoriteData => dispatch =>
  postFavorite(favoriteData)
    .then(response => {
      console.log('submitUpdateFavorites() response');
      console.log(response);
      if (response.error) {
        return Promise.reject(response);
      }
      if (response.status === 'success') {
        dispatch(submitUpdateFavoritesAsync(favoriteData.favoritedGames));
        return Promise.resolve;
      }
      return response;
    })
    .catch(error => {
      console.log(error);
    });
