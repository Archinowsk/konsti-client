import {
  SUBMIT_GET_USER_GAMES,
  SUBMIT_UPDATE_FAVORITES,
} from 'views/my-games/myGamesActions';
import { SUBMIT_SIGNED_GAMES } from 'views/signup/signupActions';

import { MyGamesState } from 'typings/redux.typings';

const initialState = {
  enteredGames: [],
  favoritedGames: [],
  signedGames: [],
};

export const myGamesReducer = (
  state: MyGamesState = initialState,
  action: any
) => {
  switch (action.type) {
    case SUBMIT_GET_USER_GAMES:
      return {
        ...state,
        enteredGames: action.enteredGames,
        favoritedGames: action.favoritedGames,
        signedGames: action.signedGames,
      };
    case SUBMIT_UPDATE_FAVORITES:
      return {
        ...state,
        favoritedGames: action.favoritedGames,
      };
    case SUBMIT_SIGNED_GAMES:
      return { ...state, signedGames: action.signedGames };
    default:
      return state;
  }
};
