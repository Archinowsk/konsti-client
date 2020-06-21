import { SUBMIT_GET_GAMES } from 'views/all-games/allGamesActions';
import { AllGamesState } from 'typings/redux.typings';

const initialState = { games: [] };

export const allGamesReducer = (
  state: AllGamesState = initialState,
  action: any
): AllGamesState => {
  switch (action.type) {
    case SUBMIT_GET_GAMES:
      return { ...state, games: action.games };
    default:
      return state;
  }
};
