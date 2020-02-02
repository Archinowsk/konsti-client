import { getUser } from 'services/userServices';
import { postFavorite } from 'services/favoriteServices';
import { FavoriteData, UserGames } from 'typings/user.typings';
import { Game } from 'typings/game.typings';

export const SUBMIT_GET_USER_GAMES = 'SUBMIT_GET_USER_GAMES';
export const SUBMIT_UPDATE_FAVORITES = 'SUBMIT_UPDATE_FAVORITES';

export const submitGetUser = (username: string): any => {
  return async (dispatch: Function): Promise<any> => {
    let getUserResponse;
    try {
      getUserResponse = await getUser(username);
    } catch (error) {
      console.log(`getUser error:`, error);
    }

    if (getUserResponse?.error) {
      return Promise.reject(getUserResponse);
    }
    if (getUserResponse && getUserResponse.status === 'success') {
      const enteredGames = getUserResponse.games.enteredGames;
      const favoritedGames = getUserResponse.games.favoritedGames;
      const signedGames = getUserResponse.games.signedGames;

      dispatch(
        submitGetUserAsync({
          enteredGames,
          favoritedGames,
          signedGames,
        })
      );
    }

    return getUserResponse;
  };
};

const submitGetUserAsync = ({
  enteredGames,
  favoritedGames,
  signedGames,
}: UserGames) => {
  return {
    type: SUBMIT_GET_USER_GAMES,
    enteredGames,
    favoritedGames,
    signedGames,
  };
};

export const submitUpdateFavorites = (favoriteData: FavoriteData): any => {
  return async (dispatch: Function): Promise<any> => {
    let updateFavoriteResponse;
    try {
      updateFavoriteResponse = await postFavorite(favoriteData);
    } catch (error) {
      console.log(`postFavorite error:`, error);
    }

    if (updateFavoriteResponse?.error) {
      return Promise.reject(updateFavoriteResponse);
    }
    if (updateFavoriteResponse && updateFavoriteResponse.status === 'success') {
      dispatch(
        submitUpdateFavoritesAsync(updateFavoriteResponse.favoritedGames)
      );
    }

    return updateFavoriteResponse;
  };
};

const submitUpdateFavoritesAsync = (favoritedGames: readonly Game[]): any => {
  return {
    type: SUBMIT_UPDATE_FAVORITES,
    favoritedGames,
  };
};
