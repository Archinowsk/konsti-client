import { getGames, postGamesUpdate } from 'services/gamesServices';
import { Game } from 'typings/game.typings';

export const SUBMIT_GET_GAMES = 'SUBMIT_GET_GAMES';

export const submitGetGames = (): any => {
  return async (dispatch: Function): Promise<unknown> => {
    let getGamesResponse;
    try {
      getGamesResponse = await getGames();
    } catch (error) {
      console.log(`getGames error:`, error);
    }

    if (getGamesResponse?.error) {
      return Promise.reject(getGamesResponse);
    }
    if (getGamesResponse && getGamesResponse.status === 'success') {
      dispatch(submitGetGamesAsync(getGamesResponse.games));
    }

    return getGamesResponse;
  };
};

export const submitGamesUpdate = (): any => {
  return async (dispatch: Function): Promise<unknown> => {
    let gamesUpdateResponse;
    try {
      gamesUpdateResponse = await postGamesUpdate();
    } catch (error) {
      console.log(`postGamesUpdate error:`, error);
    }

    if (gamesUpdateResponse?.error) {
      return Promise.reject(gamesUpdateResponse);
    }
    if (gamesUpdateResponse && gamesUpdateResponse.status === 'success') {
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
