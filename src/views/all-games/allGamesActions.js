// @flow
import { getGames, postGamesUpdate } from 'services/gamesServices';
import type { Game } from 'flow/game.flow';

export const SUBMIT_GET_GAMES = 'SUBMIT_GET_GAMES';

export const submitGetGames = (): Object => {
  return async (dispatch: Function): Promise<any> => {
    let getGamesResponse = null;
    try {
      getGamesResponse = await getGames();
    } catch (error) {
      console.log(`getGames error:`, error);
    }

    if (getGamesResponse && getGamesResponse.error) {
      return Promise.reject(getGamesResponse);
    }
    if (getGamesResponse && getGamesResponse.status === 'success') {
      dispatch(submitGetGamesAsync(getGamesResponse.games));
    }

    return getGamesResponse;
  };
};

export const submitGamesUpdate = (): Object => {
  return async (dispatch: Function): Promise<any> => {
    let gamesUpdateResponse = null;
    try {
      gamesUpdateResponse = await postGamesUpdate();
    } catch (error) {
      console.log(`postGamesUpdate error:`, error);
    }

    if (gamesUpdateResponse && gamesUpdateResponse.error) {
      return Promise.reject(gamesUpdateResponse);
    }
    if (gamesUpdateResponse && gamesUpdateResponse.status === 'success') {
      dispatch(submitGetGamesAsync(gamesUpdateResponse.games));
    }

    return gamesUpdateResponse;
  };
};

export const submitGetGamesAsync = (games: $ReadOnlyArray<Game>): Object => {
  return {
    type: SUBMIT_GET_GAMES,
    games,
  };
};
