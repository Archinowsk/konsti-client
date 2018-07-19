/* @flow */
import { SUBMIT_GET_GAMES } from 'views/all-games/allGamesActions'

const initialState = { games: [] }

const allGamesReducer = (state: Object = initialState, action: Function) => {
  switch (action.type) {
    case SUBMIT_GET_GAMES:
      return { ...state, games: action.games }
    default:
      return state
  }
}

export default allGamesReducer
