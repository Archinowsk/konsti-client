import { getGames, postGamesUpdate } from 'services/gamesServices';
import { Game } from 'typings/game.typings';
import { AppThunk } from 'typings/utils.typings';

export const SUBMIT_GET_GAMES = 'SUBMIT_GET_GAMES';

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

const submitGetGamesAsync = (games: readonly Game[]): any => {
  return {
    type: SUBMIT_GET_GAMES,
    games,
  };
};
