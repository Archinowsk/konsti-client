/* @flow */
import {
  SUBMIT_GET_USER_GAMES,
  SUBMIT_UPDATE_FAVORITES,
} from 'views/my-games/myGamesActions'
import type { Signup } from 'flow/user.flow'
import type { Game } from 'flow/game.flow'

type State = {
  enteredGames: Array<Signup>,
  favoritedGames: Array<Game>,
  signedGames: Array<Signup>,
  myGamesLoaded: boolean,
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
    default:
      return state
  }
}

export default myGamesReducer
