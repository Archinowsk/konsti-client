/* @flow */
import {
  SUBMIT_SELECT_DATE,
  SUBMIT_SELECTED_GAMES,
} from 'views/signup/signupActions'

const initialState = { date: '', selectedGames: [] }

const signupReducer = (state: Object = initialState, action: Function) => {
  switch (action.type) {
    case SUBMIT_SELECT_DATE:
      return { ...state, date: action.date }
    case SUBMIT_SELECTED_GAMES:
      return { ...state, selectedGames: action.selectedGames }
    default:
      return state
  }
}

export default signupReducer
