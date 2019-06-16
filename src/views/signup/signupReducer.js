/* @flow */
import {
  SUBMIT_SIGNUP_TIME,
  SUBMIT_SELECTED_GAMES,
} from 'views/signup/signupActions'
import type { SignupState } from 'flow/redux.flow'

const initialState = { signupTime: '', selectedGames: [] }

const signupReducer = (state: SignupState = initialState, action: Function) => {
  switch (action.type) {
    case SUBMIT_SIGNUP_TIME:
      return { ...state, signupTime: action.signupTime }
    case SUBMIT_SELECTED_GAMES:
      return { ...state, selectedGames: action.selectedGames }
    default:
      return state
  }
}

export default signupReducer
