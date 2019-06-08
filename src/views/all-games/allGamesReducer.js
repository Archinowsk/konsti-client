/* @flow */
import { SUBMIT_GET_GAMES } from 'views/all-games/allGamesActions'
import type { Game } from 'flow/game.flow'

type State = {
  +games: $ReadOnlyArray<Game>,
}

const initialState = { games: [] }

const allGamesReducer = (state: State = initialState, action: Function) => {
  switch (action.type) {
    case SUBMIT_GET_GAMES:
      return { ...state, games: action.games }
    default:
      return state
  }
}

export default allGamesReducer
