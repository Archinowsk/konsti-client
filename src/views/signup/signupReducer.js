/* @flow */
import {
  SUBMIT_SIGNUP,
  SUBMIT_SELECT_DATE,
  SUBMIT_SELECT_GAME,
  SUBMIT_DESELECT_GAME,
  SUBMIT_UPDATE_GAME,
  SUBMIT_ALL_SELECTED_GAMES,
} from './signupActions'

const initialState = { status: false, date: '', selectedGames: [] }

const signupReducer = (state: Object = initialState, action: Function) => {
  switch (action.type) {
    case SUBMIT_SIGNUP:
      return { ...state, status: action.status }
    case SUBMIT_SELECT_DATE:
      return { ...state, date: action.date }
    case SUBMIT_ALL_SELECTED_GAMES:
      return { ...state, selectedGames: action.selectedGames }
    case SUBMIT_SELECT_GAME:
      return {
        ...state,
        selectedGames: [...state.selectedGames, action.signupData],
      }
    case SUBMIT_DESELECT_GAME:
      return {
        ...state,
        selectedGames: [
          ...state.selectedGames.slice(0, action.gameIndex),
          ...state.selectedGames.slice(action.gameIndex + 1),
        ],
      }
    case SUBMIT_UPDATE_GAME:
      return {
        ...state,
        selectedGames: state.selectedGames.map(
          selectedGame =>
            selectedGame.id === action.signupData.id
              ? { ...selectedGame, priority: action.signupData.priority }
              : selectedGame
        ),
      }
    default:
      return state
  }
}

export default signupReducer
