import { getGames, postGamesUpdate } from 'services/gamesServices';
import { Game } from 'typings/game.typings';
import { AppThunk } from 'typings/utils.typings';
import {
  SubmitGetGamesAsync,
  SUBMIT_GET_GAMES,
} from 'typings/allGamesActions.typings';
import { submitUpdateFavorites } from 'views/my-games/myGamesActions';
import { Dispatch } from 'redux';

export const submitGetGames = (): AppThunk => {
  return async (dispatch): Promise<void> => {
    const getGamesResponse = await getGames();

    if (getGamesResponse?.status === 'error') {
      return await Promise.reject(getGamesResponse);
    }

    if (getGamesResponse?.status === 'success') {
      dispatch(submitGetGamesAsync(getGamesResponse.games));
    }
  };
};

export const submitGamesUpdate = (): AppThunk => {
  return async (dispatch): Promise<void> => {
    const gamesUpdateResponse = await postGamesUpdate();

    if (gamesUpdateResponse?.status === 'error') {
      return await Promise.reject(gamesUpdateResponse);
    }

    if (gamesUpdateResponse?.status === 'success') {
      dispatch(submitGetGamesAsync(gamesUpdateResponse.games));
    }
  };
};

export interface UpdateFavoriteOpts {
  game: Game;
  action: string;
  favoritedGames: readonly Game[];
  username: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: Dispatch<any>;
}

export const updateFavorite = async (
  updateFavoriteOpts: UpdateFavoriteOpts
): Promise<void> => {
  const {
    game,
    action,
    favoritedGames,
    username,
    dispatch,
  } = updateFavoriteOpts;

  if (!game || !game.gameId) return;

  const gameIndex = favoritedGames.findIndex(
    (favoritedGame) => favoritedGame.gameId === game.gameId
  );
  const allFavoritedGames = favoritedGames.slice();

  if (action === 'add' && gameIndex === -1) {
    allFavoritedGames.push(game);
  } else if (action === 'del' && gameIndex > -1) {
    allFavoritedGames.splice(gameIndex, 1);
  }

  const favoriteData = {
    username: username,
    favoritedGames: allFavoritedGames,
  };

  try {
    await dispatch(submitUpdateFavorites(favoriteData));
  } catch (error) {
    throw new Error(`submitUpdateFavorites error: ${error}`);
  }
};

const submitGetGamesAsync = (games: readonly Game[]): SubmitGetGamesAsync => {
  return {
    type: SUBMIT_GET_GAMES,
    games,
  };
};
