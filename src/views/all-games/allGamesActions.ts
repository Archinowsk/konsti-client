import { getGames, postGamesUpdate } from 'services/gamesServices';
import { Game } from 'typings/game.typings';

export const SUBMIT_GET_GAMES = 'SUBMIT_GET_GAMES';

export const submitGetGames = (): any => {
  return async (dispatch: Function): Promise<unknown> => {
    const getGamesResponse = await getGames();

    if (getGamesResponse?.status === 'error') {
      return await Promise.reject(getGamesResponse);
    }

    if (getGamesResponse?.status === 'success') {
      dispatch(submitGetGamesAsync(getGamesResponse.games));
    }

    return getGamesResponse;
  };
};

export const submitGamesUpdate = (): any => {
  return async (dispatch: Function): Promise<unknown> => {
    const gamesUpdateResponse = await postGamesUpdate();

    if (gamesUpdateResponse?.status === 'error') {
      return await Promise.reject(gamesUpdateResponse);
    }

    if (gamesUpdateResponse?.status === 'success') {
      dispatch(submitGetGamesAsync(gamesUpdateResponse.games));
    }

    return gamesUpdateResponse;
  };
};

const submitGetGamesAsync = (games: readonly Game[]): any => {
  return {
    type: SUBMIT_GET_GAMES,
    games,
  };
};
