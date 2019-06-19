/* @flow */
import {
  SUBMIT_GET_USER_GAMES,
  SUBMIT_UPDATE_FAVORITES,
} from 'views/my-games/myGamesActions'
import { SUBMIT_SIGNED_GAMES } from 'views/signup/signupActions'

import type { MyGamesState } from 'flow/redux.flow'

const initialState = {
  enteredGames: [],
  favoritedGames: [],
  signedGames: [],
  myGamesLoaded: false,
}

export const myGamesReducer = (
  state: MyGamesState = initialState,
  action: Function
) => {
  switch (action.type) {
    case SUBMIT_GET_USER_GAMES:
      return {
        ...state,
        enteredGames: action.enteredGames,
        favoritedGames: action.favoritedGames,
        signedGames: action.signedGames,
        myGamesLoaded: action.myGamesLoaded,
      }
    case SUBMIT_UPDATE_FAVORITES:
      return {
        ...state,
        favoritedGames: action.favoritedGames,
      }
    case SUBMIT_SIGNED_GAMES:
      return { ...state, signedGames: action.signedGames }
    default:
      return state
  }
}
