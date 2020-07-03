import { getUser } from 'services/userServices';
import { postFavorite } from 'services/favoriteServices';
import { FavoriteData, UserGames } from 'typings/user.typings';
import { Game } from 'typings/game.typings';
import { SubmitGetUser } from 'typings/redux.typings';

export const SUBMIT_GET_USER_GAMES = 'SUBMIT_GET_USER_GAMES';
export const SUBMIT_UPDATE_FAVORITES = 'SUBMIT_UPDATE_FAVORITES';

export const submitGetUser = (username: string): any => {
  return async (dispatch: Function): Promise<unknown> => {
    const getUserResponse = await getUser(username);

    if (getUserResponse?.status === 'error') {
      return await Promise.reject(getUserResponse);
    }

    if (getUserResponse?.status === 'success') {
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
}: UserGames): SubmitGetUser => {
  return {
    type: SUBMIT_GET_USER_GAMES,
    enteredGames,
    favoritedGames,
    signedGames,
  };
};

export const submitUpdateFavorites = (favoriteData: FavoriteData): any => {
  return async (dispatch: Function): Promise<unknown> => {
    const updateFavoriteResponse = await postFavorite(favoriteData);

    if (updateFavoriteResponse?.status === 'error') {
      return await Promise.reject(updateFavoriteResponse);
    }

    if (updateFavoriteResponse?.status === 'success') {
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
