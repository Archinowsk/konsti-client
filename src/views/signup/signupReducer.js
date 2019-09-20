// @flow
import {
  SUBMIT_SIGNUP_TIME,
  SUBMIT_SELECTED_GAMES,
} from 'views/signup/signupActions'
import type { SignupState } from 'flow/redux.flow'

// Initial null value is required for syncing signedGames and selectedGames only once
const initialState = { signupTime: '', selectedGames: null }

export const signupReducer = (
  state: SignupState = initialState,
  action: Function
) => {
  switch (action.type) {
    case SUBMIT_SIGNUP_TIME:
      return { ...state, signupTime: action.signupTime }
    case SUBMIT_SELECTED_GAMES:
      return { ...state, selectedGames: action.selectedGames }
    default:
      return state
  }
}
