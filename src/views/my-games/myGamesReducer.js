/* @flow */
import {
  SUBMIT_GET_USER_GAMES,
  SUBMIT_UPDATE_FAVORITES,
} from '/views/my-games/myGamesActions'

const initialState = {
  enteredGames: [],
  favoritedGames: [],
  signedGames: [],
}

const myGamesReducer = (state: Object = initialState, action: Function) => {
  switch (action.type) {
    case SUBMIT_GET_USER_GAMES:
      return {
        ...state,
        enteredGames: action.enteredGames,
        favoritedGames: action.favoritedGames,
        signedGames: action.signedGames,
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
