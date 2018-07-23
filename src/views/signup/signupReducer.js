/* @flow */
import {
  SUBMIT_SIGNUP,
  SUBMIT_SELECT_DATE,
  SUBMIT_SELECTED_GAMES,
} from 'views/signup/signupActions'

const initialState = { status: 'noSubmit', date: '', selectedGames: [] }

const signupReducer = (state: Object = initialState, action: Function) => {
  switch (action.type) {
    case SUBMIT_SIGNUP:
      return { ...state, status: action.status }
    case SUBMIT_SELECT_DATE:
      return { ...state, date: action.date }
    case SUBMIT_SELECTED_GAMES:
      return { ...state, selectedGames: action.selectedGames }
    default:
      return state
  }
}

export default signupReducer
