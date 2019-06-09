/* @flow */
import {
  SUBMIT_GET_USER_GAMES,
  SUBMIT_UPDATE_FAVORITES,
} from 'views/my-games/myGamesActions'
import { SUBMIT_SIGNED_GAMES } from 'views/signup/signupActions'

import type { Signup } from 'flow/user.flow'
import type { Game } from 'flow/game.flow'

type State = {
  +enteredGames: $ReadOnlyArray<Signup>,
  +favoritedGames: $ReadOnlyArray<Game>,
  +signedGames: $ReadOnlyArray<Signup>,
  +myGamesLoaded: boolean,
}

const initialState = {
  enteredGames: [],
  favoritedGames: [],
  signedGames: [],
  myGamesLoaded: false,
}

const myGamesReducer = (state: State = initialState, action: Function) => {
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

export default myGamesReducer
