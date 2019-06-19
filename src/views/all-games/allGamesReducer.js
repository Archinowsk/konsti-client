/* @flow */
import { SUBMIT_GET_GAMES } from 'views/all-games/allGamesActions'
import type { AllGamesState } from 'flow/redux.flow'

const initialState = { games: [] }

export const allGamesReducer = (
  state: AllGamesState = initialState,
  action: Function
) => {
  switch (action.type) {
    case SUBMIT_GET_GAMES:
      return { ...state, games: action.games }
    default:
      return state
  }
}
