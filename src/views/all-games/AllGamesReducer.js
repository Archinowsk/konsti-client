import { SUBMIT_GET_GAMES } from './allGamesActions'

const initialState = { games: [] }

const allGamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_GET_GAMES:
      return { ...state, games: action.games }
    default:
      return state
  }
}

export default allGamesReducer
